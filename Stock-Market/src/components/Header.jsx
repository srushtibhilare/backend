import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  const loc = useLocation();

  return (
    <header className="header-wrapper">
      <nav className="nav-container">

        {/* Logo Section */}
        <Link className="nav-logo" to="/">
          <FaChartLine className="nav-logo-icon" />
          <span>Stock Sentiment</span>
        </Link>

        {/* Nav Links */}
        <ul className="nav-links">
          <li className={`nav-item ${loc.pathname === "/" ? "active" : ""}`}>
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className={`nav-item ${loc.pathname === "/about" ? "active" : ""}`}>
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
