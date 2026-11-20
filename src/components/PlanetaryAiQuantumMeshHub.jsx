import { useState } from "react";

const PLANETARY_NODES = [
  { name: "🌌 Planetary Neural Super-Compute & Universal AI OS", priceUsd: 120, tag: "1 Trillion-Node Grid" },
  { name: "🌉 Universal Multi-Chain Sovereign Bridge (BTC/ETH/SOL/RWF)", priceUsd: 35, tag: "0.001s Atomic Swap" },
  { name: "🌍 Global Real-Time Climate, Satellite & Seismic Early-Warning", priceUsd: 50, tag: "Planetary Defense AI" },
  { name: "🗣️ Zero-Latency Live AI Voice & Video Translator (195 Languages)", priceUsd: 25, tag: "Kinyarwanda ↔ World" },
];

export default function PlanetaryAiQuantumMeshHub({ rates = {}, theme, panel }) {
  const [node, setNode] = useState(PLANETARY_NODES);
  const [clusterId, setClusterId] = useState("PLANET-KGL-1T · Sovereign");
  const [planetMsg, setPlanetMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activatePlanetaryNode(e) {
    e.preventDefault();
    const id = "KGT-1T-" + Math.floor(100000 + Math.random() * 900000);
    setPlanetMsg(`🌌 PLANETARY 1T MESH ACTIVE [${id}]: "${node.name}" deployed to ${clusterId} · Paid $${node.priceUsd} USD (${Math.round(node.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="planetary-ai-mesh" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #a855f7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Planetary AI Operating System, Sovereign Multi-Chain Bridge & Quantum Mesh (1T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy planetary AI compute, atomic multi-chain swaps & 195-language live AI translation in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          1,000,000,000,000+ Active Modules (1 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {PLANETARY_NODES.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setNode(p)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${node.name === p.name ? "#a855f7" : theme.border}`,
              background: node.name === p.name ? "rgba(168,85,247,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{p.name}</strong>
            <span style={{ fontSize: 11, color: "#d8b4fe", fontWeight: 800 }}>${p.priceUsd} USD ({Math.round(p.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{p.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activatePlanetaryNode} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={clusterId} onChange={(e) => setClusterId(e.target.value)} placeholder="Planetary Cluster ID / Organization" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#a855f7", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Activate 1T Mesh Node ({Math.round(node.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {planetMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{planetMsg}</div>}
    </section>
  );
}
