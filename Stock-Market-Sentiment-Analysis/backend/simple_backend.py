from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Mock data generator
def generate_stock_data(symbol, days=30):
    base_price = 100 + random.randint(-50, 100)
    data = []
    current_date = datetime.now() - timedelta(days=days)
    
    for i in range(days):
        current_date += timedelta(days=1)
        price_change = random.uniform(-5, 5)
        base_price += price_change
        base_price = max(10, base_price)  # Ensure price doesn't go below 10
        
        data.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'open': round(base_price - random.uniform(0, 2), 2),
            'high': round(base_price + random.uniform(0, 3), 2),
            'low': round(base_price - random.uniform(0, 3), 2),
            'close': round(base_price, 2),
            'volume': random.randint(1000000, 50000000)
        })
    
    return data

@app.route('/')
def home():
    return jsonify({"message": "Stock Analysis API", "status": "running"})

@app.route('/api/stock/<symbol>')
def get_stock_data(symbol):
    try:
        chart_data = generate_stock_data(symbol)
        current_price = chart_data[-1]['close'] if chart_data else 150.0
        
        return jsonify({
            'symbol': symbol.upper(),
            'companyName': f'{symbol.upper()} Company Inc.',
            'currentPrice': current_price,
            'previousClose': chart_data[-2]['close'] if len(chart_data) > 1 else current_price,
            'chartData': chart_data,
            'lastUpdated': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sentiment/<symbol>')
def get_sentiment(symbol):
    try:
        sentiments = [
            {"label": "Positive", "score": 0.8, "color": "success"},
            {"label": "Negative", "score": 0.3, "color": "danger"}, 
            {"label": "Neutral", "score": 0.5, "color": "warning"}
        ]
        sentiment = random.choice(sentiments)
        
        return jsonify({
            'symbol': symbol.upper(),
            'label': sentiment['label'],
            'score': sentiment['score'],
            'summary': f"Sentiment analysis shows {sentiment['label'].lower()} outlook for {symbol.upper()}",
            'news': [
                {
                    'title': f"Breaking: {symbol.upper()} shows strong performance",
                    'summary': f"Market analysts are optimistic about {symbol.upper()}'s future growth",
                    'source': 'Financial Times',
                    'date': (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
                    'url': '#'
                },
                {
                    'title': f"{symbol.upper()} announces new partnership",
                    'summary': f"Strategic move expected to boost {symbol.upper()} market position",
                    'source': 'Business Insider',
                    'date': (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d'),
                    'url': '#'
                }
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/<symbol>')
def get_prediction(symbol):
    try:
        predictions = [
            {"prediction": "Bullish", "confidence": 0.75, "reason": "Strong technical indicators"},
            {"prediction": "Bearish", "confidence": 0.65, "reason": "Market volatility concerns"},
            {"prediction": "Neutral", "confidence": 0.55, "reason": "Mixed signals from analysis"}
        ]
        prediction = random.choice(predictions)
        
        return jsonify({
            'symbol': symbol.upper(),
            'prediction': prediction['prediction'],
            'confidence': prediction['confidence'],
            'reasoning': prediction['reason']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')