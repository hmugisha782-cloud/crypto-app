import { useState } from "react";

const CBDC_SYSTEMS = [
  { name: "🏦 Universal CBDC Instant Bridge (eRWF ↔ Digital USD / EUR / KES)", feeUsd: 40, tag: "Central Bank Interop" },
  { name: "🌐 Global Quantum Optical Fiber Backbone & Edge Mesh", feeUsd: 135, tag: "25-Trillion-Node Grid" },
  { name: "🥇 Multi-Sovereign Gold, Lithium & Coltan Commodity Vault", feeUsd: 190, tag: "Audited Physical Reserve" },
  { name: "🧠 Hyper-Scale Sovereign AI & Big-Data Analytics Cluster", feeUsd: 160, tag: "Exabyte Neural Cloud" },
];

export default function UniversalCbdcQuantumHub({ rates = {}, theme, panel }) {
  const [cbdc, setCbdc] = useState(CBDC_SYSTEMS);
  const [nodeRef, setNodeRef] = useState("CBDC-25T-KIGALI · Sovereign");
  const [cbdcMsg, setCbdcMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeCbdcBridge(e) {
    e.preventDefault();
    const id = "KGT-25T-" + Math.floor(100000 + Math.random() * 900000);
    setCbdcMsg(`🌐 25-TRILLION CBDC & QUANTUM ACTIVE [${id}]: "${cbdc.name}" settled for ${nodeRef} · Paid $${cbdc.feeUsd} USD (${Math.round(cbdc.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="universal-cbdc-quantum" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌐 Universal CBDC Bridge (eRWF/USD/EUR), Quantum Optical Backbone & Neural Cloud (25T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Bridge sovereign CBDCs, deploy quantum optical nodes & trade audited mineral reserves in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          25,000,000,000,000+ Active Modules (25 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CBDC_SYSTEMS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCbdc(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${cbdc.name === c.name ? "#10b981" : theme.border}`,
              background: cbdc.name === c.name ? "rgba(16,185,129,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${c.feeUsd} USD ({Math.round(c.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeCbdcBridge} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={nodeRef} onChange={(e) => setNodeRef(e.target.value)} placeholder="CBDC Node ID / Sovereign Treasury Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌐 Execute 25T CBDC Bridge ({Math.round(cbdc.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {cbdcMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{cbdcMsg}</div>}
    </section>
  );
}
