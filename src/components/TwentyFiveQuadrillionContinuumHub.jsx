import { useState } from "react";

const CONTINUUM_SYSTEMS = [
  { name: "🌌 25-Quadrillion Sovereign Hyper-Continuum Engine (v103.0)", feeUsd: 320, tag: "25Q Flagship Core" },
  { name: "🏛️ All-195-Country Instant Sovereign Central Reserve Rail", feeUsd: 185, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 25-Quadrillion-Node AGI Super-Brain & Alpha Oracle", feeUsd: 240, tag: "Quantum Neural Grid" },
  { name: "🛡️ Immortal Zero-Downtime Global Fiber & Satellite Backbone", feeUsd: 165, tag: "100% Uptime SLA" },
];

export default function TwentyFiveQuadrillionContinuumHub({ rates = {}, theme, panel }) {
  const [cont, setCont] = useState(CONTINUUM_SYSTEMS);
  const [contId, setContId] = useState("KGT-25Q-V103-KIGALI · Continuum");
  const [contMsg, setContMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageContinuum(e) {
    e.preventDefault();
    const sig = "KGT-25Q-" + Math.floor(100000 + Math.random() * 900000);
    setContMsg(`🌌 25-QUADRILLION CONTINUUM ACTIVE [${sig}]: "${cont.name}" engaged for ${contId} · Paid $${cont.feeUsd} USD (${Math.round(cont.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="twenty-five-quadrillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #a855f7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Enterprise Suite v103.0 — 25-Quadrillion Sovereign Hyper-Continuum & Central Reserve</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 25-quadrillion-node AGI intelligence, 195-country central reserves & immortal global rails in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          25,000,000,000,000,000+ Active Modules (25 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CONTINUUM_SYSTEMS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCont(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${cont.name === c.name ? "#a855f7" : theme.border}`,
              background: cont.name === c.name ? "rgba(168,85,247,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#d8b4fe", fontWeight: 800 }}>${c.feeUsd} USD ({Math.round(c.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageContinuum} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={contId} onChange={(e) => setContId(e.target.value)} placeholder="25Q Continuum ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#a855f7", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Engage 25-Quadrillion Continuum ({Math.round(cont.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {contMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{contMsg}</div>}
    </section>
  );
}
