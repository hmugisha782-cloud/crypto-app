import { useState } from "react";

const QUANTUM_CLUSTERS = [
  { name: "🪐 2-Trillion-Node Quantum AI Super-Compute Cluster", priceUsd: 160, tag: "Exascale Neural Grid" },
  { name: "🤖 Global Autonomous Robotics & Drone Logistics Fleet", priceUsd: 95, tag: "24/7 Smart Automation" },
  { name: "🔐 Zero-Knowledge Biometric Sovereign Digital Passport", priceUsd: 30, tag: "195-Country Instant KYC" },
  { name: "⚡ Intercontinental 0.0001s Multi-Currency Liquidity Pool", priceUsd: 75, tag: "RWF / USD / BTC / Gold" },
];

export default function InterstellarQuantumGridHub({ rates = {}, theme, panel }) {
  const [cluster, setCluster] = useState(QUANTUM_CLUSTERS);
  const [gridOrg, setGridOrg] = useState("KIGALI-2T-QUANTUM · Sovereign");
  const [gridMsg, setGridMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateQuantumGrid(e) {
    e.preventDefault();
    const id = "KGT-2T-" + Math.floor(100000 + Math.random() * 900000);
    setGridMsg(`🪐 2-TRILLION GRID ONLINE [${id}]: "${cluster.name}" provisioned for ${gridOrg} · Paid $${cluster.priceUsd} USD (${Math.round(cluster.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="interstellar-quantum-grid" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🪐 Interstellar Quantum Super-Compute, Autonomous Robotics & ZK-Passport Grid (2T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Launch exascale quantum AI compute, autonomous robotics fleets & zero-knowledge digital passports in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(6,182,212,0.18)", color: "#22d3ee", fontWeight: 800, fontSize: 11 }}>
          2,000,000,000,000+ Active Modules (2 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {QUANTUM_CLUSTERS.map((q) => (
          <button
            key={q.name}
            type="button"
            onClick={() => setCluster(q)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${cluster.name === q.name ? "#06b6d4" : theme.border}`,
              background: cluster.name === q.name ? "rgba(6,182,212,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{q.name}</strong>
            <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 800 }}>${q.priceUsd} USD ({Math.round(q.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{q.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateQuantumGrid} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={gridOrg} onChange={(e) => setGridOrg(e.target.value)} placeholder="Quantum Cluster ID / Organization" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🪐 Launch 2T Grid Node ({Math.round(cluster.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {gridMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{gridMsg}</div>}
    </section>
  );
}
