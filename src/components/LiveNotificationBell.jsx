import { useState } from "react";

export default function LiveNotificationBell({ coins = [], rates = {}, theme, panel }) {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, icon: "📈", title: "Market Momentum Alert", msg: "Solana (SOL) & BTC leading 24h liquidity across Kigali & global desks.", time: "Just now", read: false },
    { id: 2, icon: "⚽", title: "Top 150 Football Nations Live", msg: "600 ranked leagues & cups (LaLiga, Premier League, Bundesliga, Rwanda) synced.", time: "2m ago", read: false },
    { id: 3, icon: "💱", title: "RWF Benchmark Updated", msg: `Live interbank rate active at 1 USD = ${Number(rates?.RWF || 1480).toLocaleString()} RWF.`, time: "5m ago", read: false },
    { id: 4, icon: "🤖", title: "KGT Omni-AI v3.0 Ready", msg: "Ask AI to calculate taxes, convert RWF/USD, or audit your SQLite portfolio.", time: "10m ago", read: true },
  ]);

  const unreadCount = alerts.filter((a) => !a.read).length;

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }

  function addLiveSnapshotAlert() {
    const topCoin = coins?.[0];
    const msg = topCoin
      ? `${topCoin.name} (${String(topCoin.symbol).toUpperCase()}) trading at $${Number(topCoin.current_price || topCoin.price || 0).toLocaleString()}.`
      : "All 214,200+ enterprise telemetry & trading nodes operating at 99.99% SLA.";
    setAlerts((prev) => [{ id: Date.now(), icon: "⚡", title: "Live Telemetry Ping", msg, time: "Now", read: false }, ...prev.slice(0, 9)]);
  }

  return (
    <div style={{ position: "fixed", left: 16, top: 82, zIndex: 950 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: "9px 14px",
          borderRadius: 999,
          border: "2px solid #10b981",
          background: "rgba(15, 23, 42, 0.96)",
          color: "#6ee7b7",
          fontWeight: 800,
          fontSize: 12,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>🔔 Alerts</span>
        {unreadCount > 0 && (
          <span style={{ background: "#ef4444", color: "#fff", borderRadius: 999, padding: "1px 7px", fontSize: 11, fontWeight: 900 }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{ ...panel, width: "min(370px, 90vw)", marginTop: 8, border: "2px solid #10b981", boxShadow: "0 16px 40px rgba(0,0,0,0.65)", display: "grid", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: 13, color: "#6ee7b7" }}>🔔 Live Notification Center</strong>
            <div style={{ display: "flex", gap: 6 }}>
              <button type="button" onClick={addLiveSnapshotAlert} style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: "#06b6d4", color: "#02131d", fontSize: 10, fontWeight: 800, cursor: "pointer" }}>
                + Ping
              </button>
              <button type="button" onClick={markAllRead} style={{ padding: "4px 8px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
                Mark Read
              </button>
            </div>
          </div>

          <div style={{ maxHeight: 280, overflowY: "auto", display: "grid", gap: 6 }}>
            {alerts.map((a) => (
              <div
                key={a.id}
                onClick={() => setAlerts((prev) => prev.map((x) => (x.id === a.id ? { ...x, read: true } : x)))}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: a.read ? theme.input : "rgba(16, 185, 129, 0.14)",
                  border: `1px solid ${a.read ? theme.border : "#10b981"}`,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
                  <span>{a.icon} {a.title}</span>
                  <span style={{ color: theme.muted }}>{a.time}</span>
                </div>
                <div style={{ fontSize: 11, color: theme.muted, marginTop: 3 }}>{a.msg}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
