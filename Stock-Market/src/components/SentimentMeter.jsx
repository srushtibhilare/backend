import React from "react";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";

export default function SentimentCard({ sentiment }) {
  if (!sentiment) return null;

  const { label, score, summary } = sentiment;
  const color = label === "Positive" ? "success" : label === "Negative" ? "danger" : "warning";
  const Icon = label === "Positive" ? FaSmile : label === "Negative" ? FaFrown : FaMeh;

  return (
    <div className={`card border-${color} mb-3`}>
      <div className={`card-header bg-${color} text-white d-flex align-items-center`}>
        <Icon className="me-2" /> Sentiment — {label}
      </div>
      <div className="card-body">
        <h6>Score: {typeof score === "number" ? score.toFixed(3) : score}</h6>
        {summary && <p className="mb-0">{summary}</p>}
      </div>
    </div>
  );
}
