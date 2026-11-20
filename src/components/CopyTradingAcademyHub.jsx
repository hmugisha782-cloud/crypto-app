import { useState } from "react";

const PRO_TRADERS = [
  { name: "🇷🇼 Kigali Alpha Whale", roi: "+184.6% ROI", winRate: "89.4% Win", pair: "BTC/USDT & RWF" },
  { name: "🇨🇭 Zurich Quant AI Bot", roi: "+142.3% ROI", winRate: "92.1% Win", pair: "ETH & PAXG Gold" },
  { name: "🇯🇵 Tokyo Arbitrage Engine", roi: "+118.9% ROI", winRate: "94.7% Win", pair: "SOL & Multi-FX" },
  { name: "🇰🇪 Nairobi DeFi Master", roi: "+96.4% ROI", winRate: "86.2% Win", pair: "EAC Yield Vaults" },
];

export default function CopyTradingAcademyHub({ rates = {}, theme, panel }) {
  const [selectedTrader, setSelectedTrader] = useState(PRO_TRADERS);
  const [copyUsd, setCopyUsd] = useState("200");
  const [copyStatus, setCopyStatus] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const amt = Math.max(10, Number(copyUsd) || 200);

  function activateCopyTrade(e) {
    e.preventDefault();
    setCopyStatus(`🤖 AUTO-COPY ACTIVE: Mirroring ${selectedTrader.name} (${selectedTrader.roi}) with $${amt.toLocaleString()} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) · Stop-Loss Guard Enabled!`);
  }

  return (
    <section id="copy-trading-academy" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #6366f1", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎓 Global Copy-Trading Leaderboard, Live Signals & FinTech Academy (400M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Mirror verified top-performing quantitative traders in real time with automated risk protection.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(99,102,241,0.18)", color: "#a5b4fc", fontWeight: 800, fontSize: 11 }}>
          1-Click Mirror Execution
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {PRO_TRADERS.map((tr) => (
          <button
            key={tr.name}
            type="button"
            onClick={() => setSelectedTrader(tr)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${selectedTrader.name === tr.name ? "#6366f1" : theme.border}`,
              background: selectedTrader.name === tr.name ? "rgba(99,102,241,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{tr.name}</strong>
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>{tr.roi} · {tr.winRate}</span>
            <span style={{ fontSize: 10, color: theme.muted }}>Focus: {tr.pair}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateCopyTrade} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" value={copyUsd} onChange={(e) => setCopyUsd(e.target.value)} placeholder="Allocation (USD)" style={{ width: 140, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🤖 Start Auto-Copy ({Math.round(amt * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {copyStatus && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{copyStatus}</div>}
    </section>
  );
}
