import { useState } from "react";

export default function SovereignPriceAlertWatchlist({ rates = {}, theme, panel }) {
  const [symbol, setSymbol] = useState("BTC/USDT");
  const [target, setTarget] = useState("70000");
  const [alerts, setAlerts] = useState([
    { id: "AL-1", symbol: "BTC/USDT", target: "$70,000", status: "🟢 Armed (Live Watch)" },
    { id: "AL-2", symbol: "USD/RWF", target: "1,500 RWF", status: "🟢 Armed (BNR FX Watch)" },
    { id: "AL-3", symbol: "GOLD/PAXG", target: "$2,800", status: "🟢 Armed (Bullion Watch)" },
  ]);

  function addAlert(e) {
    e.preventDefault();
    if (!target) return;
    setAlerts((prev) => [
      { id: "AL-" + Math.floor(100 + Math.random() * 900), symbol, target: `$${Number(target).toLocaleString()}`, status: "🟢 Armed & Monitoring" },
      ...prev,
    ]);
    setTarget("");
  }

  return (
    <section id="sovereign-price-alert-watchlist" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f59e0b", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>⏰ Smart Price Target Alerts & Institutional Watchlist (1 USD = {Number(rates?.RWF || 1480).toLocaleString()} RWF)</strong>
        <span style={{ fontSize: 11.5, color: "#fbbf24", fontWeight: 800 }}>{alerts.length} Active Triggers</span>
      </div>

      <form onSubmit={addAlert} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }}>
          <option>BTC/USDT</option>
          <option>ETH/USDT</option>
          <option>SOL/USDT</option>
          <option>GOLD/PAXG</option>
          <option>USD/RWF</option>
        </select>
        <input type="number" step="any" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target Price" style={{ width: 135, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          ⏰ Set Price Alert
        </button>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
        {alerts.map((a) => (
          <div key={a.id} style={{ padding: "6px 10px", borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", fontSize: 11.5 }}>
            <span><strong>{a.symbol}</strong> → {a.target}</span>
            <span style={{ color: "#34d399", fontWeight: 800 }}>{a.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
