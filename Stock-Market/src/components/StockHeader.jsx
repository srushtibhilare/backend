import React from "react";

export default function StockHeader({ data, sentiment }) {
  const changePct = data && data.previousClose ? ((data.currentPrice - data.previousClose) / data.previousClose * 100).toFixed(2) : "0.00";
  return (
    <div className="stock-header card">
      <div className="stock-left">
        <h2>{data.companyName || data.symbol}</h2>
        <div className="ticker-line">
          <div className="price">₹ {Number(data.currentPrice).toFixed(2)}</div>
          <div className={`change ${changePct >= 0 ? "up":"down"}`}>{changePct}%</div>
          <div className="small">18 Nov - close price</div>
        </div>
        <div className="meta">
          <span>BSE: 501831</span> • <span>NSE: {data.symbol}</span> • <a href="#" className="link">coastalcorp.co.in</a>
        </div>
      </div>

      <div className="stock-right">
        <button className="btn">Export to Excel</button>
        <button className="btn ghost">Follow</button>
      </div>
    </div>
  );
}
