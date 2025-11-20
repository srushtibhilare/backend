import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, disabled }) {
  const [sym, setSym] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (sym.trim()) {
      onSearch(sym.trim().toUpperCase());
      setSym("");
    }
  };

  return (
    <form className="searchbar-container" onSubmit={submit}>
      <div className="input-group">
        <input
          className="search-input"
          placeholder=" "
          value={sym}
          onChange={(e) => setSym(e.target.value)}
          disabled={disabled}
        />
        <label className="floating-label">
          Enter ticker (e.g., SBIN, AAPL, MSFT)
        </label>
      </div>

      <button className="search-btn" disabled={disabled}>
        Analyze
      </button>
    </form>
  );
}
