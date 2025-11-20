import React, { useState } from "react";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");

  return (
    <header className="nav">
      <div className="nav-left">
        <div className="logo">ScreenerLogo</div>
        <nav className="nav-links">
          <a>Home</a>
          <a>Screens</a>
          <a>Tools</a>
        </nav>
      </div>

      <div className="nav-center">
        <input
          placeholder="Search for a company"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) onSearch(q.trim().toUpperCase()); }}
        />
        <button onClick={() => q.trim() && onSearch(q.trim().toUpperCase())}>Search</button>
      </div>

      <div className="nav-right">
        <button className="btn ghost">Login</button>
        <button className="btn primary">Get free account</button>
      </div>
    </header>
  );
}
