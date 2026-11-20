import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const TRADERS = [
  { id: "CT-01", name: "🇷🇼 Kigali Alpha Quant Bot", roi: "+148.4% (90D)", winRate: "91.2%", followers: 4820, minUsd: 50 },
  { id: "CT-02", name: "🥇 Zurich 24K Gold Arbitrage", roi: "+64.8% (90D)", winRate: "94.5%", followers: 3190, minUsd: 100 },
  { id: "CT-03", name: "⚡ Solana & ETH Momentum AI", roi: "+112.0% (90D)", winRate: "87.9%", followers: 2640, minUsd: 25 },
  { id: "CT-04", name: "💱 BNR & EAC FX Yield Hedger", roi: "+38.5% (90D)", winRate: "97.1%", followers: 6150, minUsd: 50 },
];

export default function SovereignCopyTradingHub({ rates = {}, theme, panel }) {
  const [allocUsd, setAllocUsd] = useState("100");
  const [copyMsg, setCopyMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function followTrader(t) {
    const amt = Math.max(t.minUsd, Number(allocUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Copy-Trading Desk",
      title: `Auto-Copy ${t.name} (${t.roi})`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setCopyMsg(`🤖 COPY-TRADING ACTIVE [${tx.id}]: Mirroring ${t.name} with $${amt} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-copy-trading-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🤖 Institutional Copy-Trading & AI Strategy Mirroring</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Automatically mirror top-performing Kigali & Global quant traders in 1 click</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700 }}>Copy Budget (USD):</span>
          <input type="number" min="25" value={allocUsd} onChange={(e) => setAllocUsd(e.target.value)} style={{ width: 95, padding: "5px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {TRADERS.map((t) => (
          <div key={t.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{t.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>{t.roi} · Win Rate: {t.winRate}</span>
            <span style={{ fontSize: 10.5, color: theme.muted }}>Copiers: {t.followers.toLocaleString()} · Min: ${t.minUsd}</span>
            <button type="button" onClick={() => followTrader(t)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ⚡ Mirror Trader
            </button>
          </div>
        ))}
      </div>
      {copyMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{copyMsg}</div>}
    </section>
  );
}
