import { useState } from "react";

const SUPERCORE_SYSTEMS = [
  { name: "👑 100-Trillion Autonomous Omni-Sector AI Super-Core", feeUsd: 180, tag: "100T Master Architecture" },
  { name: "🌐 Intercontinental Sub-Microsecond FX & Crypto Liquidity Mesh", feeUsd: 125, tag: "Zero-Slippage Global Pool" },
  { name: "🛡️ Sovereign Quantum-Proof Multi-Signature Treasury Guard", feeUsd: 95, tag: "100% Asset Protection" },
  { name: "🚀 Universal Citizen & Enterprise Super-App API License", feeUsd: 140, tag: "All-195-Country Ready" },
];

export default function HundredTrillionSuperCoreHub({ rates = {}, theme, panel }) {
  const [core, setCore] = useState(SUPERCORE_SYSTEMS);
  const [coreId, setCoreId] = useState("CORE-100T-KIGALI · Master");
  const [coreMsg, setCoreMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageSuperCore(e) {
    e.preventDefault();
    const sig = "KGT-100T-" + Math.floor(100000 + Math.random() * 900000);
    setCoreMsg(`👑 100-TRILLION SUPERCORE ENGAGED [${sig}]: "${core.name}" active on ${coreId} · Paid $${core.feeUsd} USD (${Math.round(core.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="hundred-trillion-supercore" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 100-Trillion Autonomous AI Super-Core & Universal Liquidity Mesh (100T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Engage 100-trillion-node autonomous AI execution, zero-slippage liquidity & sovereign treasury guard in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          100,000,000,000,000+ Active Modules (100 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {SUPERCORE_SYSTEMS.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setCore(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${core.name === s.name ? "#f59e0b" : theme.border}`,
              background: core.name === s.name ? "rgba(245,158,11,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${s.feeUsd} USD ({Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageSuperCore} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={coreId} onChange={(e) => setCoreId(e.target.value)} placeholder="SuperCore ID / Sovereign Entity" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 100T SuperCore ({Math.round(core.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {coreMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{coreMsg}</div>}
    </section>
  );
}
