import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState } from "react";

const OMNIVERSE_ENGINES = [
  { name: "🌌 Omniverse AGI Enterprise Decision & Quant Super-Brain", priceUsd: 220, tag: "5-Trillion-Node Matrix" },
  { name: "🛡️ Planetary Zero-Latency Anti-Fraud & Cyber Defense Shield", priceUsd: 110, tag: "99.9999% Threat Block" },
  { name: "📡 Deep-Space & Global Submarine Fiber Optic Backbone", priceUsd: 145, tag: "Sub-Millisecond Routing" },
  { name: "💎 Universal Multi-Asset Sovereign Treasury & Gold Ledger", priceUsd: 185, tag: "Instant RWF / USD / BTC" },
];

export default function OmniverseSuperIntelligenceHub({ rates = {}, theme, panel }) {
  const [engine, setEngine] = useState(OMNIVERSE_ENGINES[0]);
  const [matrixId, setMatrixId] = useState("OMNI-5T-KIGALI · Sovereign");
  const [omniMsg, setOmniMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateOmniverseEngine(e) {
    e.preventDefault();
    const sig = "KGT-5T-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🌌 5-TRILLION OMNIVERSE ACTIVE [${sig}]: "${engine.name}" locked to ${matrixId} · Paid $${engine.priceUsd} USD (${Math.round(engine.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "verseSuperIntelligence", title: item.title || "verseSuperIntelligence Execution", amountUsd: _usdVal, rwfRate }); setOmniMsg(`🌌 5-TRILLION OMNIVERSE ACTIVE [${sig}]: "${engine.name}" locked to ${matrixId} · Paid $${engine.priceUsd} USD (${Math.round(engine.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omniverse-super-intelligence" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f43f5e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Omniverse AGI Super-Intelligence, Cyber Defense & Sovereign Treasury Matrix (5T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy 5-trillion-node AGI analytics, cyber defense shields & sovereign gold/FX ledgers in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(244,63,94,0.18)", color: "#fb7185", fontWeight: 800, fontSize: 11 }}>
          5,000,000,000,000+ Active Modules (5 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {OMNIVERSE_ENGINES.map((o) => (
          <button
            key={o.name}
            type="button"
            onClick={() => setEngine(o)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${engine.name === o.name ? "#f43f5e" : theme.border}`,
              background: engine.name === o.name ? "rgba(244,63,94,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{o.name}</strong>
            <span style={{ fontSize: 11, color: "#fb7185", fontWeight: 800 }}>${o.priceUsd} USD ({Math.round(o.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{o.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateOmniverseEngine} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={matrixId} onChange={(e) => setMatrixId(e.target.value)} placeholder="Omniverse Matrix ID / Organization" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Activate 5T Matrix ({Math.round(engine.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {omniMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{omniMsg}</div>}
    </section>
  );
}
