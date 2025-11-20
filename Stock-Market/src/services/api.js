import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
});

export async function fetchStock(symbol) {
  const resp = await client.get(`/stock/${symbol}`);
  return resp.data;
}

export async function fetchSentiment(symbol) {
  const resp = await client.get(`/sentiment/${symbol}`);
  return resp.data;
}

export async function fetchPrediction(symbol) {
  const resp = await client.get(`/predict/${symbol}`);
  return resp.data;
}

export async function fetchCombined(symbol) {
  const [stock, sentiment, prediction] = await Promise.allSettled([
    fetchStock(symbol),
    fetchSentiment(symbol),
    fetchPrediction(symbol),
  ]);

  return {
    stock: stock.status === "fulfilled" ? stock.value : null,
    sentiment: sentiment.status === "fulfilled" ? sentiment.value : null,
    prediction: prediction.status === "fulfilled" ? prediction.value : null,
  };
}
