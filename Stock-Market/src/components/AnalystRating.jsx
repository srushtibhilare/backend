import React from "react";

const AnalystRating = ({ buy, hold, sell }) => {
  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-3">⭐ Analyst Ratings</h2>

      <div className="space-y-2">
        <p>Buy: <span className="font-bold text-green-600">{buy}</span></p>
        <p>Hold: <span className="font-bold text-yellow-600">{hold}</span></p>
        <p>Sell: <span className="font-bold text-red-600">{sell}</span></p>
      </div>
    </div>
  );
};

export default AnalystRating;
