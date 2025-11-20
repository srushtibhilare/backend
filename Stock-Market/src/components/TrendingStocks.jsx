import React from "react";

const TrendingStocks = () => {
  const trending = ["AAPL", "TSLA", "MSFT", "SBIN", "TCS", "RELIANCE"];

  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-3">🔥 Trending Stocks</h2>
      <div className="flex flex-wrap gap-3">
        {trending.map((item) => (
          <span
            key={item}
            className="px-4 py-2 bg-purple-100 rounded-lg text-purple-700 font-semibold cursor-pointer hover:bg-purple-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;
