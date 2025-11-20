import React from "react";

export default function FinancialTable({ rows = [] }) {
  // For demo, map chartData to quarterly sample columns
  const quarters = rows.slice(-12).map(r => r.date);
  const sales = rows.slice(-12).map(r => (r.close || 0).toFixed(2));

  return (
    <div className="financial-scroll">
      <table className="financial-table">
        <thead>
          <tr>
            <th>Quarter</th>
            {quarters.map((q, i) => <th key={i}>{q}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sales</td>
            {sales.map((s,i) => <td key={i}>{s}</td>)}
          </tr>
          <tr>
            <td>Expenses</td>
            {sales.map((s,i) => <td key={i}>{(s*0.85).toFixed(2)}</td>)}
          </tr>
          <tr>
            <td>Net Profit</td>
            {sales.map((s,i) => <td key={i}>{(s*0.07).toFixed(2)}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
