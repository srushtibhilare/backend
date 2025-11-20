import React from "react";

export default function PeerTable({ rows = [] }) {
  return (
    <div className="peer-table">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>CMP Rs.</th>
            <th>P/E</th>
            <th>Mar Cap Rs.Cr.</th>
            <th>Div Yld %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{r.name}</td>
              <td>{r.cmp}</td>
              <td>{r.pe}</td>
              <td>{r.mcap}</td>
              <td>{r.div}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
