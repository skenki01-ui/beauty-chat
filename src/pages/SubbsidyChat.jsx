import React from "react";

export default function Subsidy({ setPage }) {
  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2>補助金サポート</h2>

      <p style={{ marginTop: 20 }}>
        補助金について気になることがあれば相談できます
      </p>

      <button
        onClick={() => setPage("subsidyChat")}
        style={{
          marginTop: 30,
          padding: "12px 20px",
          fontSize: 16,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        相談する
      </button>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={() => setPage("home")}
          style={{
            padding: "8px 14px",
            fontSize: 14,
          }}
        >
          戻る
        </button>
      </div>
    </div>
  );
}