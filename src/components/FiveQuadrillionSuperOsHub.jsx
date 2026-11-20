import { useState } from "react";

const SUPER_OS_MODULES = [
  { name: "🌌 5-Quadrillion Omni-Sector Autonomous Super-OS (v101.0)", feeUsd: 280, tag: "5Q Master Core" },
  { name: "🏛️ All-195-Country Instant Sovereign Central Clearing Rail", feeUsd: 160, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 5-Quadrillion-Node AGI Predictive Market & Risk Super-Brain", feeUsd: 210, tag: "Quantum Neural Engine" },
  { name: "🛡️ Immortal Zero-Downtime Satellite & Fiber Global Backbone", feeUsd: 135, tag: "100% Uptime Guarantee" },
];

export default function FiveQuadrillionSuperOsHub({ rates = {}, theme, panel }) {
  const [osMod, setOsMod] = useState(SUPER_OS_MODULES);
  const [osId, setOsId] = useState("KGT-5Q-V101-KIGALI · SuperOS");
  const [osMsg, setOsMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageSuperOs(e) {
    e.preventDefault();
    const sig = "KGT-5Q-" + Math.floor(100000 + Math.random() * 900000);
    setOsMsg(`🌌 5-QUADRILLION SUPER-OS ACTIVE [${sig}]: "${osMod.name}" engaged for ${osId} · Paid $${osMod.feeUsd} USD (${Math.round(osMod.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="five-quadrillion-superos" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Enterprise Suite v101.0 — 5-Quadrillion Omni-Sector Autonomous Super-OS & Clearing Grid</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 5-quadrillion-node AGI intelligence, 195-country central clearing & immortal global infrastructure in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          5,000,000,000,000,000+ Active Modules (5 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {SUPER_OS_MODULES.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setOsMod(m)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${osMod.name === m.name ? "#38bdf8" : theme.border}`,
              background: osMod.name === m.name ? "rgba(56,189,248,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${m.feeUsd} USD ({Math.round(m.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{m.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageSuperOs} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={osId} onChange={(e) => setOsId(e.target.value)} placeholder="5Q SuperOS ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Engage 5-Quadrillion SuperOS ({Math.round(osMod.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {osMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{osMsg}</div>}
    </section>
  );
}
