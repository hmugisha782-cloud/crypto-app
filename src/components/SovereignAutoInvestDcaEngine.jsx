import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignAutoInvestDcaEngine({ rates = {}, theme, panel }) {
  const [asset, setAsset] = useState("₿ Bitcoin (BTC) Auto-Accumulate");
  const [freq, setFreq] = useState("Daily (Every 24h)");
  const [amtUsd, setAmtUsd] = useState("25");
  const [plans, setPlans] = useState([
    { id: "DCA-101", asset: "🥇 24K Swiss Gold (PAXG)", freq: "Weekly", amtUsd: 50, apy: "14.8%" },
  ]);
  const [msg, setMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function startDcaPlan(e) {
    e.preventDefault();
    const val = Math.max(5, Number(amtUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Auto-Invest DCA Bot",
      title: `Recurring ${freq}: ${asset}`,
      amountUsd: val,
      rwfRate,
      type: "DEBIT",
    });
    setPlans((prev) => [{ id: tx.id, asset, freq, amtUsd: val, apy: "18.5%" }, ...prev]);
    setMsg(`🤖 AUTO-INVEST DCA BOT STARTED [${tx.id}]: ${asset} · $${val} USD (${Math.round(val * rwfRate).toLocaleString()} RWF) ${freq}!`);
  }

  return (
    <section id="sovereign-auto-invest-dca-engine" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🤖 Automated Dollar-Cost Averaging (DCA) & Recurring Wealth Bots</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Auto-buy Bitcoin, 24K Gold, RSE Stocks & BNR Treasury Bonds automatically in RWF or USDT</span>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.2)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>{plans.length} Active Bots</span>
      </div>

      <form onSubmit={startDcaPlan} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={asset} onChange={(e) => setAsset(e.target.value)} style={{ flex: 1, minWidth: 195, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>₿ Bitcoin (BTC) Auto-Accumulate</option>
          <option>🥇 24K Swiss Gold (PAXG) Vault</option>
          <option>🏛️ BNR Rwanda Treasury Bond (16.5% APY)</option>
          <option>📈 Bank of Kigali & MTN Rwanda Equity</option>
          <option>⚡ Gatsibo Solar Micro-Grid Yield</option>
        </select>
        <select value={freq} onChange={(e) => setFreq(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>Daily (Every 24h)</option>
          <option>Weekly (Every Monday)</option>
          <option>Monthly (Payday Auto-Save)</option>
        </select>
        <input type="number" min="5" value={amtUsd} onChange={(e) => setAmtUsd(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🤖 Launch Auto-Save Bot
        </button>
      </form>

      {msg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}

      <div style={{ display: "grid", gap: 5 }}>
        {plans.map((p) => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "6px 10px", borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}` }}>
            <span><strong>[{p.id}]</strong> {p.asset} · <em>{p.freq}</em></span>
            <strong style={{ color: "#c4b5fd" }}>${p.amtUsd}/cycle ({Math.round(p.amtUsd * rwfRate).toLocaleString()} RWF) · Est. {p.apy}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
