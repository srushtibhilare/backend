import React from "react";

// Minimal bar-line dual simplified chart using divs.
// Replace with recharts for interactivity.
export default function ChartSimple({ chartData = [] }) {
  if (!chartData.length) return <div>No chart data</div>;

  // convert chartData if it's object keyed or array
  const arr = Array.isArray(chartData) ? chartData : Object.values(chartData);
  const max = Math.max(...arr.map(d => d.close || 0));
  const scale = max > 0 ? 160 / max : 1;

  return (
    <div>
      <h3>Price Trend (last {arr.length} days)</h3>
      <div className="chartArea small">
        {arr.map((d, i) => (
          <div key={i} className="barGroup">
            <div className="bar" style={{ height: `${(d.close || 0) * scale}px` }} title={`${d.date} - ${d.close}`}></div>
            <small className="barLabel">{d.date.slice(5)}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
