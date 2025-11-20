import React, { useState } from "react"; 
import SearchBar from "../components/SearchBar";
import StockChart from "../components/StockChart";
import SentimentCard from "../components/SentimentCard";
import PredictionCard from "../components/PredictionCard";
import NewsList from "../components/NewsList";
import Loader from "../components/Loader";
import { fetchCombined } from "../services/api";

// NEW COMPONENTS 🔥
import TrendingStocks from "../components/TrendingStocks";
import NewsFeed from "../components/NewsFeed";
import AnalystRating from "../components/AnalystRating";
import StockComparison from "../components/StockComparison";
import SentimentMeter from "../components/SentimentMeter";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  async function onSearch(sym) {
    setLoading(true);
    setError(null);
    setSymbol(sym);
    setStock(null); 
    setSentiment(null); 
    setPrediction(null);

    try {
      const { stock: s, sentiment: sen, prediction: pred } = await fetchCombined(sym);
      if (!s && !sen && !pred) {
        setError("No data returned from the server. Check backend.");
      } else {
        setStock(s);
        setSentiment(sen);
        setPrediction(pred);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. See console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header row */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <h3 className="mb-1">Stock Market Sentiment Analysis</h3>
          <p className="text-muted small">Enter ticker to fetch stock data, sentiment and prediction.</p>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-end">
          <div className="text-muted small">
            Status: {loading ? "Loading..." : symbol || "idle"}
          </div>
        </div>
      </div>

      {/* Search input */}
      <SearchBar onSearch={onSearch} disabled={loading} />

      {/* New Components Top Row */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <TrendingStocks />
        </div>
        <div className="col-lg-4">
          <SentimentMeter sentiment={sentiment?.score || 0.5} />
        </div>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Main Content */}
      <div className="row mt-4">
        <div className="col-lg-8">

          {/* Main Chart */}
          <StockChart data={stock?.chartData || stock?.historical || []} />

          {/* News Feed (custom + API news together) */}
          <NewsFeed />
          <NewsList news={stock?.news || sentiment?.news || []} />
        </div>

        <div className="col-lg-4">

          {/* Sentiment card */}
          <SentimentCard sentiment={sentiment} />

          {/* Prediction */}
          <PredictionCard prediction={prediction} />

          {/* Analyst Rating */}
          <AnalystRating 
            buy={12} 
            hold={6} 
            sell={3} 
          />

          {/* Quick Stats */}
          <div className="card mb-3">
            <div className="card-header">Quick Stats</div>
            <div className="card-body">
              <div className="small text-muted">Current price</div>
              <div className="h5">{stock?.currentPrice ?? "-"}</div>

              <div className="small text-muted mt-2">Last updated</div>
              <div>{stock?.lastUpdated ? new Date(stock.lastUpdated).toLocaleString() : "-"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Comparison Bottom Section */}
      <div className="row mt-4">
        <div className="col-12">
          <StockComparison />
        </div>
      </div>
    </>
  );
}
