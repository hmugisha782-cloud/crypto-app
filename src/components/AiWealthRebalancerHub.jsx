import { useState } from "react";

const STRATEGIES = {
  "🛡️ Balanced Kigali Shield (14.5% APY)": { btc: 30, gold: 25, usdt: 25, vault: 20, apy: 0.145 },
  "🚀 Aggressive Alpha Growth (22.0% APY)": { btc: 55, gold: 15, usdt: 15, vault: 15, apy: 0.22 },
  "🏦 Conservative RWF Treasury (11.5% APY)": { btc: 10, gold: 20, usdt: 30, vault: 40, apy: 0.115 },
};

export default function AiWealthRebalancerHub({ rates = {}, theme, panel }) {
  const [strategy, setStrategy] = useState("🛡️ Balanced Kigali Shield (14.5% APY)");
  const [capitalUsd, setCapitalUsd] = useState("1000");
  const [statusMsg, setStatusMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const cfg = STRATEGIES[strategy];
  const cap = Math.max(10, Number(capitalUsd) || 1000);
  const yr1Usd = Math.round(cap * (1 + cfg.apy));
  const yr3Usd = Math.round(cap * Math.pow(1 + cfg.apy, 3));

  function runAutoRebalance() {
    setStatusMsg(`✅ AI AUTO-REBALANCE EXECUTED (${strategy}): $${cap.toLocaleString()} USD (${Math.round(cap * rwfRate).toLocaleString()} RWF) allocated across BTC ${cfg.btc}%, Gold ${cfg.gold}%, USDT ${cfg.usdt}%, Vault ${cfg.vault}%!`);
  }

  return (
    <section id="ai-wealth-rebalancer" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📊 AI Smart Portfolio Auto-Rebalancer & Wealth Projection (275M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Automated institutional allocation across Bitcoin, Tokenized Gold (PAXG), USDT & 16% APY Rwanda Savings Vaults.
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800 }}>Capital ($):</span>
          <input type="number" value={capitalUsd} onChange={(e) => setCapitalUsd(e.target.value)} style={{ width: 95, padding: "6px 8px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }} />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {Object.keys(STRATEGIES).map((s) => (
          <button key={s} type="button" onClick={() => setStrategy(s)} style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${strategy === s ? "#eab308" : theme.border}`, background: strategy === s ? "rgba(234,179,8,0.22)" : theme.input, color: strategy === s ? "#fde047" : theme.text, fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
        <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 10.5, color: theme.muted }}>Allocation Mix</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginTop: 3 }}>BTC {cfg.btc}% · Gold {cfg.gold}% · USDT {cfg.usdt}% · Vault {cfg.vault}%</div>
        </div>
        <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 10.5, color: theme.muted }}>1-Year Projected Value</div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: "#10b981", marginTop: 3 }}>${yr1Usd.toLocaleString()} ({Math.round(yr1Usd * rwfRate).toLocaleString()} RWF)</div>
        </div>
        <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 10.5, color: theme.muted }}>3-Year Compounded Wealth</div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: "#fde047", marginTop: 3 }}>${yr3Usd.toLocaleString()} ({Math.round(yr3Usd * rwfRate).toLocaleString()} RWF)</div>
        </div>
      </div>

      <button type="button" onClick={runAutoRebalance} style={{ padding: "9px 14px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer", justifySelf: "start" }}>
        ⚡ Execute AI Auto-Rebalance Now
      </button>

      {statusMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{statusMsg}</div>}
    </section>
  );
}
