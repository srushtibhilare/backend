import React from "react";

export default function Loader({ size = 40 }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <div className="spinner-border" role="status" style={{ width: size, height: size }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
