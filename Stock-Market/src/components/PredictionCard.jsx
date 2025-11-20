import React from "react";

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;
  const { prediction: predLabel, confidence } = prediction || {};
  const up = predLabel && (predLabel.toLowerCase().includes("up") || predLabel.toLowerCase().includes("rise") || predLabel.toLowerCase().includes("buy"));
  const color = up ? "success" : "danger";

  return (
    <div className={`card border-${color} mb-3`}>
      <div className={`card-header bg-${color} text-white`}>
        Prediction
      </div>
      <div className="card-body">
        <h5 className="card-title">{predLabel || "-"}</h5>
        <p className="card-text">Confidence: {Math.round((confidence || 0) * 100)}%</p>
      </div>
    </div>
  );
}
