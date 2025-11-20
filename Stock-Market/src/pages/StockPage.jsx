import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StockHeader from "../components/StockHeader";
import KeyStats from "../components/KeyStats";
import Tabs from "../components/Tabs";
import ChartSimple from "../components/ChartSimple";
import PeerTable from "../components/PeerTable";
import FinancialTable from "../components/FinancialTable";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function StockPage({ defaultSymbol }) {
  const [symbol, setSymbol] = useState(defaultSymbol || "AAPL");
  const [stock, setStock] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAll(sym) {
    setLoading(true);
    try {
      const [sRes, snRes, pRes] = await Promise.all([
        fetch(`${API_BASE}/stock/${sym}`),
        fetch(`${API_BASE}/sentiment/${sym}`),
        fetch(`${API_BASE}/predict/${sym}`)
      ]);
      if (!sRes.ok) throw new Error("stock failed");
      const sjson = await sRes.json();
      const snjson = snRes.ok ? await snRes.json() : null;
      const pjson = pRes.ok ? await pRes.json() : null;
      setStock(sjson);
      setSentiment(snjson);
      setPrediction(pjson);
      setSymbol(sym);
    } catch (err) {
      console.error("fetch error", err);
      setStock(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(symbol); }, []); // initial

  return (
    <div>
      <Navbar onSearch={fetchAll} />
      <div className="page-container">
        {loading && <div className="banner">Loading...</div>}
        {!stock && !loading && <div className="banner error">No data — try another symbol</div>}

        {stock && (
          <>
            <StockHeader data={stock} sentiment={sentiment} />
            <div className="two-col">
              <main className="main-col">
                <div className="card">
                  <ChartSimple chartData={stock.chartData} />
                </div>

                <div className="card">
                  <h3>About</h3>
                  <p>{stock.companyName} — {stock.companyName ? "Incorporated business overview (mock)..." : ""}</p>
                  <p><strong>Summary:</strong> {stock.companyName} is a sample description. Replace with real corporate description returned from backend when available.</p>
                  <a className="link" href="#">Read More</a>
                </div>

                <div className="card">
                  <h3>Quarterly Results</h3>
                  <FinancialTable rows={stock.chartData || []} />
                </div>
              </main>

              <aside className="side-col">
                <KeyStats data={stock} />

                <div className="card">
                  <h3>Peers</h3>
                  <PeerTable rows={[
                    { name: "Apex Frozen Food", cmp: 292.13, pe: 43.85, mcap: 912.91, div: 0.68 },
                    { name: "Sharat Industrie", cmp: 136, pe: 37.35, mcap: 533.32, div: 0.18 },
                    { name: stock.companyName || stock.symbol, cmp: stock.currentPrice, pe: 27.2, mcap: 281.57, div: 0.52 }
                  ]} />
                </div>

                <div className="card">
                  <h3>Pros & Cons</h3>
                  <ul>
                    <li>Pros: Trading at 1.04x book value</li>
                    <li>Cons: Low interest coverage</li>
                    <li>Machine-generated suggestions</li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="card">
              <h3>Documents & Announcements</h3>
              <ul className="ann-list">
                <li>11 Nov - Unaudited Financial Results (Q2)</li>
                <li>10 Nov - Board Meeting Outcome</li>
                <li>6 Nov - Export approval news</li>
              </ul>
            </div>
          </>
        )}
      </div>
      <footer className="footer">Screener-style demo • Data mock • © YourName</footer>
    </div>
  );
}
