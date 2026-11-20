import { useState } from "react";

const CENTENNIAL_ENGINES = [
  { name: "👑 1-Quadrillion Universal Sovereign Super-Engine (v100.0)", feeUsd: 250, tag: "Centennial Flagship" },
  { name: "🌌 Omni-Dimensional AGI Quantum Neural Super-Brain", feeUsd: 190, tag: "1 Quadrillion Nodes" },
  { name: "🏛️ Universal 195-Country Zero-Fee Sovereign Treasury Rail", feeUsd: 140, tag: "Instant RWF / USD / Gold" },
  { name: "🛡️ Immortal Cryptographic Proof-of-Solvency & Defense Grid", feeUsd: 115, tag: "100% Zero-Downtime" },
];

export default function OneQuadrillionCentennialHub({ rates = {}, theme, panel }) {
  const [cent, setCent] = useState(CENTENNIAL_ENGINES);
  const [sovereignId, setSovereignId] = useState("KGT-1Q-V100-KIGALI · Master");
  const [centMsg, setCentMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageCentennialEngine(e) {
    e.preventDefault();
    const sig = "KGT-1Q-" + Math.floor(100000 + Math.random() * 900000);
    setCentMsg(`👑 1-QUADRILLION CENTENNIAL ENGINE ACTIVE [${sig}]: "${cent.name}" engaged for ${sovereignId} · Paid $${cent.feeUsd} USD (${Math.round(cent.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="one-quadrillion-centennial" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Enterprise Suite v100.0 — Universal 1-Quadrillion Sovereign Super-Engine & Global Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 1-quadrillion-node AGI intelligence, 195-country zero-fee settlement & sovereign gold reserves in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          1,000,000,000,000,000+ Active Modules (1 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CENTENNIAL_ENGINES.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCent(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${cent.name === c.name ? "#eab308" : theme.border}`,
              background: cent.name === c.name ? "rgba(234,179,8,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${c.feeUsd} USD ({Math.round(c.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageCentennialEngine} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={sovereignId} onChange={(e) => setSovereignId(e.target.value)} placeholder="1Q Sovereign Command ID / Organization" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 1-Quadrillion Engine ({Math.round(cent.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {centMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{centMsg}</div>}
    </section>
  );
}
