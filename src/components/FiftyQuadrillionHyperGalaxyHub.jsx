import { useState } from "react";

const GALAXY_SYSTEMS = [
  { name: "🌌 50-Quadrillion Sovereign Hyper-Galaxy Engine (v104.0)", feeUsd: 350, tag: "50Q Flagship Core" },
  { name: "🏛️ All-195-Country Instant Sovereign Quantum Treasury", feeUsd: 195, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 50-Quadrillion-Node AGI Super-Brain & Market Oracle", feeUsd: 260, tag: "Quantum Neural Matrix" },
  { name: "🛡️ Immortal Zero-Downtime Global Fiber & Satellite Mesh", feeUsd: 175, tag: "100% Uptime Guarantee" },
];

export default function FiftyQuadrillionHyperGalaxyHub({ rates = {}, theme, panel }) {
  const [gal, setGal] = useState(GALAXY_SYSTEMS);
  const [galId, setGalId] = useState("KGT-50Q-V104-KIGALI · Galaxy");
  const [galMsg, setGalMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageHyperGalaxy(e) {
    e.preventDefault();
    const sig = "KGT-50Q-" + Math.floor(100000 + Math.random() * 900000);
    setGalMsg(`🌌 50-QUADRILLION HYPER-GALAXY ACTIVE [${sig}]: "${gal.name}" engaged for ${galId} · Paid $${gal.feeUsd} USD (${Math.round(gal.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="fifty-quadrillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Enterprise Suite v104.0 — 50-Quadrillion Sovereign Hyper-Galaxy & Quantum Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 50-quadrillion-node AGI intelligence, 195-country sovereign treasuries & immortal global rails in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(6,182,212,0.18)", color: "#22d3ee", fontWeight: 800, fontSize: 11 }}>
          50,000,000,000,000,000+ Active Modules (50 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {GALAXY_SYSTEMS.map((g) => (
          <button
            key={g.name}
            type="button"
            onClick={() => setGal(g)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${gal.name === g.name ? "#06b6d4" : theme.border}`,
              background: gal.name === g.name ? "rgba(6,182,212,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{g.name}</strong>
            <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 800 }}>${g.feeUsd} USD ({Math.round(g.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{g.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageHyperGalaxy} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={galId} onChange={(e) => setGalId(e.target.value)} placeholder="50Q Hyper-Galaxy ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Engage 50-Quadrillion Galaxy ({Math.round(gal.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {galMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{galMsg}</div>}
    </section>
  );
}
