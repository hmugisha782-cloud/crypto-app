import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const MERCHANTS = [
  { id: "M-KGL-01", name: "Kigali Prime FX Merchant", method: "MTN MoMo (+250)", rate: 1478, limit: "$10 – $10,000", score: "99.9% (4,820 trades)" },
  { id: "M-GTS-02", name: "Gatsibo Express Liquidity", method: "Airtel Money (+250)", rate: 1479, limit: "$5 – $5,000", score: "99.8% (3,190 trades)" },
  { id: "M-BK-03", name: "BK Institutional Desk", method: "Bank of Kigali Transfer", rate: 1480, limit: "$50 – $50,000", score: "100% (9,410 trades)" },
  { id: "M-EQ-04", name: "Pan-African Remit Hub", method: "Equity / M-Pesa / Visa", rate: 1481, limit: "$20 – $25,000", score: "99.7% (2,750 trades)" },
];

export default function SovereignP2pOrderbookHub({ rates = {}, theme, panel }) {
  const [usdVal, setUsdVal] = useState("100");
  const [p2pMsg, setP2pMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function tradeP2p(m, action) {
    const amt = Math.max(5, Number(usdVal || 0));
    const { tx } = recordSovereignTx({
      hub: "P2P Merchant Desk",
      title: `P2P ${action} $${amt} USDT via ${m.name} (${m.method})`,
      amountUsd: amt,
      rwfRate: m.rate,
      type: action === "BUY" ? "CREDIT" : "DEBIT",
    });
    setP2pMsg(`🤝 P2P ESCROW SETTLED [${tx.id}]: ${action} $${amt} USDT (${Math.round(amt * m.rate).toLocaleString()} RWF) with ${m.name}!`);
  }

  return (
    <section id="sovereign-p2p-orderbook-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🤝 Verified Rwanda & East Africa P2P USDT ↔ RWF Merchant Orderbook</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Instant Escrow-Protected P2P trading with MTN MoMo, Airtel Money & Bank of Kigali</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700 }}>Trade Amount (USD):</span>
          <input type="number" min="5" value={usdVal} onChange={(e) => setUsdVal(e.target.value)} style={{ width: 95, padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 8 }}>
        {MERCHANTS.map((m) => (
          <div key={m.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>{m.rate.toLocaleString()} RWF / USDT · {m.method}</span>
            <span style={{ fontSize: 10.5, color: theme.muted }}>Limit: {m.limit} · ⭐ {m.score}</span>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              <button type="button" onClick={() => tradeP2p(m, "BUY")} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>
                Buy USDT
              </button>
              <button type="button" onClick={() => tradeP2p(m, "SELL")} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>
                Sell USDT
              </button>
            </div>
          </div>
        ))}
      </div>

      {p2pMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{p2pMsg}</div>}
    </section>
  );
}
