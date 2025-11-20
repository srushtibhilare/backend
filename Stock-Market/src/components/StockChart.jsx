import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./StockChart.css";

export default function StockChart({ data, height = 320 }) {
  if (!data || !data.length)
    return (
      <div className="chart-card p-3 mb-3">
        <div className="chart-shine"></div>
        <div className="text-muted">No chart data available</div>
      </div>
    );

  const formatted = data.map((d) => ({
    ...d,
    dateLabel: (d.date || d.dt || d.day || "").slice(0, 10),
  }));

  return (
    <div className="chart-card mb-3">
      <div className="chart-shine"></div>

      <h6 className="chart-title">Closing Price</h6>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateLabel" minTickGap={20} />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#4f46e5"     // modern indigo shade
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
