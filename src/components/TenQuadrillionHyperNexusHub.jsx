import { useState } from "react";

const HYPER_NEXUS_SYSTEMS = [
  { name: "👑 10-Quadrillion Sovereign Omni-Sector Hyper-Nexus (v102.0)", feeUsd: 300, tag: "10Q Flagship Engine" },
  { name: "🌐 Universal 195-Country Instant FX, Gold & Crypto Settlement", feeUsd: 175, tag: "0.0001s Zero-Fee Rail" },
  { name: "🧠 10-Quadrillion-Node AGI Super-Intelligence & Risk Oracle", feeUsd: 225, tag: "Quantum Neural Matrix" },
  { name: "🛡️ Immortal Cryptographic Proof-of-Reserve & Cyber Defense", feeUsd: 150, tag: "100% Solvency Verified" },
];

export default function TenQuadrillionHyperNexusHub({ rates = {}, theme, panel }) {
  const [nexus, setNexus] = useState(HYPER_NEXUS_SYSTEMS);
  const [nexusId, setNexusId] = useState("KGT-10Q-V102-KIGALI · Nexus");
  const [nexusMsg, setNexusMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageHyperNexus(e) {
    e.preventDefault();
    const sig = "KGT-10Q-" + Math.floor(100000 + Math.random() * 900000);
    setNexusMsg(`👑 10-QUADRILLION HYPER-NEXUS ACTIVE [${sig}]: "${nexus.name}" engaged for ${nexusId} · Paid $${nexus.feeUsd} USD (${Math.round(nexus.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="ten-quadrillion-nexus" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Enterprise Suite v102.0 — 10-Quadrillion Sovereign Hyper-Nexus & Omni-Chain Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 10-quadrillion-node AGI intelligence, 195-country zero-fee clearing & sovereign reserves in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          10,000,000,000,000,000+ Active Modules (10 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {HYPER_NEXUS_SYSTEMS.map((n) => (
          <button
            key={n.name}
            type="button"
            onClick={() => setNexus(n)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${nexus.name === n.name ? "#eab308" : theme.border}`,
              background: nexus.name === n.name ? "rgba(234,179,8,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{n.name}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${n.feeUsd} USD ({Math.round(n.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{n.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageHyperNexus} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={nexusId} onChange={(e) => setNexusId(e.target.value)} placeholder="10Q Hyper-Nexus ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 10-Quadrillion Nexus ({Math.round(nexus.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {nexusMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{nexusMsg}</div>}
    </section>
  );
}
