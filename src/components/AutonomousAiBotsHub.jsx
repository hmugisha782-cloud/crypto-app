import { useState } from "react";

const AI_BOTS = [
  { name: "🤖 Kigali Cross-Exchange Arbitrage Neural Bot", apy: "32.4% APY", minUsd: 50 },
  { name: "📈 BTC / ETH / SOL Momentum Quant AI Agent", apy: "28.9% APY", minUsd: 100 },
  { name: "💱 RWF / USD / KES Automated FX Liquidity Maker", apy: "21.5% APY", minUsd: 75 },
  { name: "🏛️ Sovereign Gold & Treasury Reserve AI Shield", apy: "18.2% APY", minUsd: 150 },
];

export default function AutonomousAiBotsHub({ rates = {}, theme, panel }) {
  const [bot, setBot] = useState(AI_BOTS);
  const [allocUsd, setAllocUsd] = useState("250");
  const [botMsg, setBotMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function deployAiBot(e) {
    e.preventDefault();
    const usd = Math.max(10, Number(allocUsd) || 250);
    const id = "KGT-BOT-" + Math.floor(100000 + Math.random() * 900000);
    setBotMsg(`🤖 AUTONOMOUS AI BOT DEPLOYED [${id}]: "${bot.name}" (${bot.apy}) running 24/7 with $${usd.toLocaleString()} USD (${Math.round(usd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="autonomous-ai-bots" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🤖 Autonomous AI Trading Agents, Quant Bots & Sovereign Reserve (10B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy 24/7 self-optimizing AI arbitrage & liquidity agents across Crypto, Gold & East African FX pairs.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          10,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {AI_BOTS.map((b) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setBot(b)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${bot.name === b.name ? "#10b981" : theme.border}`,
              background: bot.name === b.name ? "rgba(16,185,129,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{b.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>Target Yield: {b.apy}</span>
            <span style={{ fontSize: 10, color: theme.muted }}>Min Capital: ${b.minUsd} ({Math.round(b.minUsd * rwfRate).toLocaleString()} RWF)</span>
          </button>
        ))}
      </div>

      <form onSubmit={deployAiBot} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" value={allocUsd} onChange={(e) => setAllocUsd(e.target.value)} placeholder="Bot Capital (USD)" style={{ width: 150, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🤖 Launch 24/7 AI Bot ({Math.round((Number(allocUsd) || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {botMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{botMsg}</div>}
    </section>
  );
}
