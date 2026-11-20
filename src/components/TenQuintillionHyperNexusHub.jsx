import { useState } from "react";

const TEN_QUINTILLION_SYSTEMS = [
  { name: "👑 10-Quintillion Sovereign Hyper-Nexus Engine (v107.0)", feeUsd: 450, tag: "10 Quintillion Flagship" },
  { name: "🏛️ All-195-Country Instant Sovereign Quantum Treasury", feeUsd: 260, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 10-Quintillion-Node AGI Super-Brain & Alpha Oracle", feeUsd: 340, tag: "Quantum Neural Matrix" },
  { name: "🛡️ Immortal Zero-Downtime Global Fiber & Satellite Mesh", feeUsd: 235, tag: "100% Uptime Guarantee" },
];

export default function TenQuintillionHyperNexusHub({ rates = {}, theme, panel }) {
  const [tenQ, setTenQ] = useState(TEN_QUINTILLION_SYSTEMS);
  const [tenQId, setTenQId] = useState("KGT-10QN-V107-KIGALI · Master");
  const [tenQMsg, setTenQMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageTenQuintillion(e) {
    e.preventDefault();
    const sig = "KGT-10QN-" + Math.floor(100000 + Math.random() * 900000);
    setTenQMsg(`👑 10-QUINTILLION NEXUS ACTIVE [${sig}]: "${tenQ.name}" engaged for ${tenQId} · Paid $${tenQ.feeUsd} USD (${Math.round(tenQ.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="ten-quintillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Enterprise Suite v107.0 — 10-Quintillion Sovereign Hyper-Nexus & Quantum Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 10-quintillion-node AGI intelligence, 195-country sovereign treasuries & immortal global rails in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          10,000,000,000,000,000,000+ Active Modules (10 QUINTILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {TEN_QUINTILLION_SYSTEMS.map((q) => (
          <button
            key={q.name}
            type="button"
            onClick={() => setTenQ(q)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${tenQ.name === q.name ? "#eab308" : theme.border}`,
              background: tenQ.name === q.name ? "rgba(234,179,8,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{q.name}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${q.feeUsd} USD ({Math.round(q.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{q.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageTenQuintillion} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={tenQId} onChange={(e) => setTenQId(e.target.value)} placeholder="10QN Sovereign Command ID / Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 10-Quintillion Nexus ({Math.round(tenQ.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {tenQMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{tenQMsg}</div>}
    </section>
  );
}
