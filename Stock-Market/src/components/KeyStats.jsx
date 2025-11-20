import React from "react";

export default function KeyStats({ data }) {
  const stats = {
    "Market Cap": "₹ 282 Cr.",
    "Current Price": `₹ ${Number(data.currentPrice).toFixed(2)}`,
    "High / Low": "₹ 55.3 / 29.7",
    "Stock P/E": "27.2",
    "Book Value": "₹ 40.5",
    "Dividend Yield": "0.52 %",
    "ROCE": "4.61 %",
    "ROE": "1.71 %",
    "Face Value": "₹ 2.00"
  };

  return (
    <div className="card keystats">
      <h3>Key Points</h3>
      <div className="stats-grid">
        {Object.entries(stats).map(([k,v]) => (
          <div className="stat" key={k}>
            <div className="stat-key">{k}</div>
            <div className="stat-val">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
