import React from "react";

export default function SovereignAiChatFeed({ history = [] }) {
  return React.createElement(
    "div",
    { style: { display: "grid", gap: 8, maxHeight: 240, overflowY: "auto" } },
    history.map((item, idx) =>
      React.createElement(
        "div",
        {
          key: idx,
          style: {
            padding: "9px 12px",
            borderRadius: 11,
            whiteSpace: "pre-line",
            background: item.role === "AI" ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)",
            border: "1px solid " + (item.role === "AI" ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.14)"),
            color: "#f8fafc",
            fontSize: 12.4,
            lineHeight: 1.55,
            fontWeight: item.role === "AI" ? 700 : 600
          }
        },
        (item.role === "AI" ? "🤖 " : "👤 ") + item.text
      )
    )
  );
}
