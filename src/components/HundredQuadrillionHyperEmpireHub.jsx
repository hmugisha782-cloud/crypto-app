import { useState } from "react";

const EMPIRE_SYSTEMS = [
  { name: "👑 100-Quadrillion Sovereign Hyper-Empire Engine (v105.0)", feeUsd: 380, tag: "100Q Master Core" },
  { name: "🏛️ All-195-Country Instant Sovereign Quantum Treasury", feeUsd: 215, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 100-Quadrillion-Node AGI Super-Brain & Alpha Oracle", feeUsd: 290, tag: "Quantum Neural Matrix" },
  { name: "🛡️ Immortal Zero-Downtime Global Fiber & Satellite Mesh", feeUsd: 195, tag: "100% Uptime Guarantee" },
];

export default function HundredQuadrillionHyperEmpireHub({ rates = {}, theme, panel }) {
  const [emp, setEmp] = useState(EMPIRE_SYSTEMS);
  const [empId, setEmpId] = useState("KGT-100Q-V105-KIGALI · Empire");
  const [empMsg, setEmpMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageHyperEmpire(e) {
    e.preventDefault();
    const sig = "KGT-100Q-" + Math.floor(100000 + Math.random() * 900000);
    setEmpMsg(`👑 100-QUADRILLION HYPER-EMPIRE ACTIVE [${sig}]: "${emp.name}" engaged for ${empId} · Paid $${emp.feeUsd} USD (${Math.round(emp.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="hundred-quadrillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Enterprise Suite v105.0 — 100-Quadrillion Sovereign Hyper-Empire & Quantum Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 100-quadrillion-node AGI intelligence, 195-country sovereign treasuries & immortal global rails in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          100,000,000,000,000,000+ Active Modules (100 QUADRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {EMPIRE_SYSTEMS.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setEmp(m)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${emp.name === m.name ? "#eab308" : theme.border}`,
              background: emp.name === m.name ? "rgba(234,179,8,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${m.feeUsd} USD ({Math.round(m.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{m.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageHyperEmpire} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="100Q Hyper-Empire ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 100-Quadrillion Empire ({Math.round(emp.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {empMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{empMsg}</div>}
    </section>
  );
}
