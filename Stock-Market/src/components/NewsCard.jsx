import React from "react";

export default function NewsList({ news = [] }) {
  if (!news.length) return null;

  return (
    <div className="card mb-3">
      <div className="card-header">Related News</div>
      <ul className="list-group list-group-flush">
        {news.map((n, i) => (
          <li key={i} className="list-group-item">
            <a href={n.url || "#"} target="_blank" rel="noreferrer" className="fw-bold">{n.title}</a>
            {n.source && <div className="small text-muted">{n.source} • {n.date ? new Date(n.date).toLocaleDateString() : ""}</div>}
            {n.summary && <div className="mt-1">{n.summary}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
