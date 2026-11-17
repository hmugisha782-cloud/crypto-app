import { useEffect, useState } from "react";

export default function LiveTickerHeatmap({ coins = [], rates = {}, theme, panel, setActiveTab }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const quickRoutes = [
    { id: "market", label: "📈 Live Crypto Market & Watchlist" },
    { id: "orderbook", label: "📚 Real-Time Order Book Depth" },
    { id: "charts", label: "📊 Interactive Price Charts" },
    { id: "portfolio", label: "💼 SQLite Cloud Portfolio" },
    { id: "alerts", label: "🔔 Custom Price Alerts" },
    { id: "converter", label: "💱 RWF & Global Currency Converter" },
    { id: "news", label: "📰 Live Crypto & Market News" },
    { id: "sentiment", label: "😨 Fear & Greed Sentiment Index" },
    { id: "transactions", label: "🧾 Transaction History Ledger" },
    { id: "papertrading", label: "🧪 Paper Trading Simulator" },
    { id: "dca", label: "📅 DCA Investment Calculator" },
    { id: "growth", label: "💎 Growth Hub, MoMo & AI Bots" },
    { id: "institutional", label: "🏛️ Institutional Quant & DeFi Suite" },
    { id: "insights", label: "🚀 Pro Quant, Regional FX & Goals" },
    { id: "accounts", label: "🔐 Account Security & SQLite Backup" },
  ];

  const filteredRoutes = quickRoutes.filter((r) =>
    r.label.toLowerCase().includes(cmdQuery.trim().toLowerCase())
  );

  const rwfRate = rates?.RWF || 1380;

  return (
    <>
      {/* 1. LIVE SCROLLING TICKER TAPE & CTRL+K TRIGGER */}
      <div
        style={{
          ...panel,
          padding: "10px 14px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          borderLeft: "4px solid #06b6d4",
        }}
      >
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", fontSize: 12 }}>
          <span style={{ fontWeight: 800, color: "#06b6d4" }}>● LIVE TAPE</span>
          <span><strong>USD/RWF:</strong> {Number(rwfRate).toLocaleString()} RWF</span>
          {coins.slice(0, 6).map((c) => {
            const chg = Number(c.change24h || c.price_change_percentage_24h || 0);
            const up = chg >= 0;
            return (
              <span key={c.id || c.symbol}>
                <strong>{String(c.symbol || "").toUpperCase()}:</strong> ${Number(c.price || c.current_price || 0).toLocaleString()}{" "}
                <span style={{ color: up ? "#10b981" : "#ef4444", fontWeight: 700 }}>
                  ({up ? "+" : ""}{chg.toFixed(2)}%)
                </span>
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: `1px solid ${theme.border}`,
            background: theme.input,
            color: theme.text,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ⌘ Quick Jump (Ctrl + K)
        </button>
      </div>

      {/* 2. INTERACTIVE 24H MARKET HEATMAP */}
      {coins.length > 0 && (
        <div style={{ ...panel, marginBottom: 18, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong style={{ fontSize: 13 }}>🗺️ 24h Live Crypto Market Heatmap</strong>
            <span style={{ fontSize: 11, color: theme.muted }}>Color intensity reflects 24h momentum</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8 }}>
            {coins.slice(0, 10).map((c) => {
              const chg = Number(c.change24h || c.price_change_percentage_24h || 0);
              const up = chg >= 0;
              const bg = up
                ? chg > 3 ? "rgba(16, 185, 129, 0.35)" : "rgba(16, 185, 129, 0.18)"
                : chg < -3 ? "rgba(239, 68, 68, 0.35)" : "rgba(239, 68, 68, 0.18)";
              return (
                <div
                  key={c.id || c.symbol}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 9,
                    background: bg,
                    border: `1px solid ${up ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{String(c.symbol || "").toUpperCase()}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: up ? "#10b981" : "#ef4444" }}>
                    {up ? "+" : ""}{chg.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CTRL + K COMMAND PALETTE MODAL */}
      {paletteOpen && (
        <div
          onClick={() => setPaletteOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.78)",
            zIndex: 9999,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 80,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...panel,
              width: "min(92vw, 480px)",
              padding: 18,
              border: "1px solid #06b6d4",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <strong>⚡ Quick Navigation Command Palette</strong>
              <button type="button" onClick={() => setPaletteOpen(false)} style={{ background: "transparent", border: "none", color: theme.muted, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <input
              type="search"
              autoFocus
              value={cmdQuery}
              onChange={(e) => setCmdQuery(e.target.value)}
              placeholder="Type a tool name (e.g. MoMo, Portfolio, News, Institutional)..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 9,
                border: `1px solid ${theme.border}`,
                background: theme.input,
                color: theme.text,
                fontSize: 14,
                marginBottom: 12,
              }}
            />
            <div style={{ display: "grid", gap: 6, maxHeight: 280, overflowY: "auto" }}>
              {filteredRoutes.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    if (setActiveTab) setActiveTab(r.id);
                    setPaletteOpen(false);
                    setCmdQuery("");
                  }}
                  style={{
                    textAlign: "left",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    background: theme.input,
                    color: theme.text,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
