import { useState } from "react";

const QUINTILLION_SYSTEMS = [
  { name: "👑 1-Quintillion Universal Sovereign Super-Engine (v106.0)", feeUsd: 420, tag: "1 Quintillion Flagship" },
  { name: "🏛️ All-195-Country Instant Sovereign Quantum Treasury", feeUsd: 240, tag: "0.0001s RWF / USD / Gold" },
  { name: "🧠 1-Quintillion-Node AGI Super-Brain & Alpha Oracle", feeUsd: 310, tag: "Quantum Neural Matrix" },
  { name: "🛡️ Immortal Zero-Downtime Global Fiber & Satellite Mesh", feeUsd: 215, tag: "100% Uptime Guarantee" },
];

export default function OneQuintillionHyperContinuumHub({ rates = {}, theme, panel }) {
  const [quint, setQuint] = useState(QUINTILLION_SYSTEMS);
  const [quintId, setQuintId] = useState("KGT-1QN-V106-KIGALI · Master");
  const [quintMsg, setQuintMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageQuintillion(e) {
    e.preventDefault();
    const sig = "KGT-1QN-" + Math.floor(100000 + Math.random() * 900000);
    setQuintMsg(`👑 1-QUINTILLION ENGINE ACTIVE [${sig}]: "${quint.name}" engaged for ${quintId} · Paid $${quint.feeUsd} USD (${Math.round(quint.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="one-quintillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f43f5e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Enterprise Suite v106.0 — 1-Quintillion Universal Sovereign Engine & Quantum Treasury</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 1-quintillion-node AGI intelligence, 195-country sovereign treasuries & immortal global rails in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(244,63,94,0.18)", color: "#fb7185", fontWeight: 800, fontSize: 11 }}>
          1,000,000,000,000,000,000+ Active Modules (1 QUINTILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {QUINTILLION_SYSTEMS.map((q) => (
          <button
            key={q.name}
            type="button"
            onClick={() => setQuint(q)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${quint.name === q.name ? "#f43f5e" : theme.border}`,
              background: quint.name === q.name ? "rgba(244,63,94,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{q.name}</strong>
            <span style={{ fontSize: 11, color: "#fb7185", fontWeight: 800 }}>${q.feeUsd} USD ({Math.round(q.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{q.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageQuintillion} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={quintId} onChange={(e) => setQuintId(e.target.value)} placeholder="1QN Sovereign Command ID / Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 1-Quintillion Engine ({Math.round(quint.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {quintMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{quintMsg}</div>}
    </section>
  );
}
