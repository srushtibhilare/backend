import React from "react";
import "./About.css";


export default function About() {
  return (
    <div className="about-card card p-4">
      <h4 className="about-title">About This Project</h4>

      <p className="about-text">
        This project is based on the <strong>Stock-Market-Sentiment-Analysis</strong> 
        repository by Gandalf1819. The goal is to identify trends in stock
        prices using fundamental analysis and sentiment analysis.
      </p>

      <h5 className="about-sub">How It Works</h5>
      <ul className="about-list">
        <li>
          News articles are used as the training dataset, classified into 
          “positive” or “neutral” categories.
        </li>
        <li>
          Sentiment score is calculated by counting positive vs negative words
          in each article.
        </li>
        <li>
          Stock price data (closing price etc.) is compared against sentiment
          scores to find correlations.
        </li>
      </ul>

      <h5 className="about-sub">Machine Learning Models Used</h5>
      <p className="about-text">
        The project uses Naive Bayes, OneR, and Random Forest algorithms to
        classify articles and evaluate performance.
      </p>

      <h5 className="about-sub">Why It Matters</h5>
      <p className="about-text">
        Stock prices are influenced by technical and fundamental factors.
        Combining news sentiment with analysis provides deeper insights and can
        show how news affects or predicts market movement.
      </p>
    </div>
  );
}
