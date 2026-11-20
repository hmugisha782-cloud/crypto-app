import { useState } from "react";

const FUSION_SYSTEMS = [
  { name: "⚡ Clean Fusion & East African Rift Geothermal Power Credits", feeUsd: 65, tag: "Zero-Carbon Baseload" },
  { name: "🗄️ 50-Trillion-Node Immutable Sovereign Data & Backup Vault", feeUsd: 90, tag: "1,000-Year Storage SLA" },
  { name: "🌐 Universal Cross-Border AI Liquidity & Instant FX Router", feeUsd: 110, tag: "0.0001s Global Clearing" },
  { name: "🧠 Sovereign Hyper-Intelligence Predictive Market Oracle", feeUsd: 145, tag: "Real-Time Alpha Engine" },
];

export default function FusionEnergyHyperGridHub({ rates = {}, theme, panel }) {
  const [fusion, setFusion] = useState(FUSION_SYSTEMS);
  const [gridCode, setGridCode] = useState("FUSION-50T-KIGALI · HyperGrid");
  const [fusionMsg, setFusionMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateFusionGrid(e) {
    e.preventDefault();
    const id = "KGT-50T-" + Math.floor(100000 + Math.random() * 900000);
    setFusionMsg(`⚡ 50-TRILLION HYPERGRID ACTIVE [${id}]: "${fusion.name}" engaged for ${gridCode} · Paid $${fusion.feeUsd} USD (${Math.round(fusion.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="fusion-energy-hypergrid" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚡ Clean Fusion Energy Grid, Sovereign Data Vault & Hyper-Intelligence (50T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Trade zero-carbon fusion/geothermal energy credits, immutable 50T data vaults & AI market oracles in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          50,000,000,000,000+ Active Modules (50 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {FUSION_SYSTEMS.map((f) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setFusion(f)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${fusion.name === f.name ? "#38bdf8" : theme.border}`,
              background: fusion.name === f.name ? "rgba(56,189,248,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{f.name}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${f.feeUsd} USD ({Math.round(f.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{f.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateFusionGrid} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={gridCode} onChange={(e) => setGridCode(e.target.value)} placeholder="HyperGrid ID / Sovereign Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          ⚡ Activate 50T HyperGrid ({Math.round(fusion.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {fusionMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{fusionMsg}</div>}
    </section>
  );
}
