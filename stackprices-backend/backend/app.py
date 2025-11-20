from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Your existing sentiment analysis and prediction functions here
# (Copy from the original repository)

@app.route('/')
def home():
    return jsonify({"message": "Stock Market Sentiment Analysis API", "status": "running"})

@app.route('/api/stock/<symbol>')
def get_stock_data(symbol):
    try:
        # Get stock data from Yahoo Finance
        stock = yf.Ticker(symbol)
        hist = stock.history(period="6mo")
        
        # Format historical data for chart
        chart_data = []
        for date, row in hist.iterrows():
            chart_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'open': round(row['Open'], 2),
                'high': round(row['High'], 2),
                'low': round(row['Low'], 2),
                'close': round(row['Close'], 2),
                'volume': int(row['Volume'])
            })
        
        info = stock.info
        return jsonify({
            'symbol': symbol.upper(),
            'companyName': info.get('longName', 'N/A'),
            'currentPrice': info.get('currentPrice', info.get('regularMarketPrice', 0)),
            'previousClose': info.get('previousClose', 0),
            'marketCap': info.get('marketCap', 0),
            'volume': info.get('volume', 0),
            'chartData': chart_data[-60:],  # Last 60 days
            'lastUpdated': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sentiment/<symbol>')
def get_sentiment(symbol):
    try:
        # Mock sentiment analysis - replace with actual sentiment code from repository
        from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
        
        analyzer = SentimentIntensityAnalyzer()
        
        # Sample news headlines (replace with actual news fetching)
        sample_news = [
            f"{symbol} shows strong growth in quarterly results",
            f"Analysts bullish on {symbol} future prospects",
            f"{symbol} announces new strategic partnerships",
            f"Market reacts positively to {symbol} innovations"
        ]
        
        # Analyze sentiment for each headline
        sentiments = [analyzer.polarity_scores(headline) for headline in sample_news]
        avg_compound = sum([s['compound'] for s in sentiments]) / len(sentiments)
        
        if avg_compound >= 0.05:
            label = "Positive"
        elif avg_compound <= -0.05:
            label = "Negative"
        else:
            label = "Neutral"
        
        return jsonify({
            'symbol': symbol.upper(),
            'label': label,
            'score': round(avg_compound, 3),
            'summary': f"Overall sentiment for {symbol} is {label.lower()} based on recent news analysis.",
            'news': [
                {
                    'title': headline,
                    'summary': f"News about {symbol}",
                    'source': 'Financial News',
                    'date': (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d'),
                    'url': '#'
                } for i, headline in enumerate(sample_news)
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/<symbol>')
def get_prediction(symbol):
    try:
        # Mock prediction - replace with actual ML model from repository
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1mo")
        
        if len(hist) < 2:
            return jsonify({'error': 'Insufficient data for prediction'}), 400
        
        recent_trend = (hist['Close'][-1] - hist['Close'][0]) / hist['Close'][0] * 100
        
        if recent_trend > 5:
            prediction = "Bullish"
            confidence = 0.7 + random.random() * 0.2
        elif recent_trend < -5:
            prediction = "Bearish"
            confidence = 0.6 + random.random() * 0.2
        else:
            prediction = "Neutral"
            confidence = 0.5 + random.random() * 0.2
        
        return jsonify({
            'symbol': symbol.upper(),
            'prediction': prediction,
            'confidence': round(confidence, 2),
            'reasoning': f"Based on recent price trend of {recent_trend:.2f}% over the past month"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')