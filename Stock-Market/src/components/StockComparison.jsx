import React, { useState } from "react";

const StockComparison = () => {
  const [stock1, setStock1] = useState("");
  const [stock2, setStock2] = useState("");

  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">📈 Compare Two Stocks</h2>

      <div className="flex gap-4">
        <input
          className="p-3 border rounded w-full"
          placeholder="Enter first ticker"
          onChange={(e) => setStock1(e.target.value)}
        />

        <input
          className="p-3 border rounded w-full"
          placeholder="Enter second ticker"
          onChange={(e) => setStock2(e.target.value)}
        />
      </div>

      {stock1 && stock2 && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="font-semibold">Comparing:</p>
          <p>{stock1} vs {stock2}</p>
        </div>
      )}
    </div>
  );
};

export default StockComparison;
