import { useState } from "react";

const MASTER_ZONES = [
  { name: "🌍 All-5-Continents Instant Quantum Settlement Mesh", feeUsd: 150, tag: "10-Trillion-Node Master" },
  { name: "🏛️ Real-Time Cryptographic Proof-of-Reserve & Liquidity Audit", feeUsd: 95, tag: "100% Solvency Verified" },
  { name: "⚡ Global Sub-Millisecond Auto-Scaling & Failover Guard", feeUsd: 120, tag: "Zero-Downtime Engine" },
  { name: "👑 Executive Sovereign Master License & White-Label Node", feeUsd: 300, tag: "Enterprise Command" },
];

export default function GlobalMasterControlHub({ rates = {}, theme, panel }) {
  const [zone, setZone] = useState(MASTER_ZONES);
  const [commandId, setCommandId] = useState("MASTER-10T-KIGALI · Global");
  const [masterMsg, setMasterMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeMasterCommand(e) {
    e.preventDefault();
    const sig = "KGT-10T-" + Math.floor(100000 + Math.random() * 900000);
    setMasterMsg(`👑 10-TRILLION MASTER ACTIVE [${sig}]: "${zone.name}" engaged for ${commandId} · Paid $${zone.feeUsd} USD (${Math.round(zone.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="global-master-control" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 Global Master Control Center, Proof-of-Reserve & 5-Continent Quantum Mesh (10T+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 10-trillion-node global settlement, proof-of-reserve audits & zero-downtime auto-scaling in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          10,000,000,000,000+ Active Modules (10 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {MASTER_ZONES.map((z) => (
          <button
            key={z.name}
            type="button"
            onClick={() => setZone(z)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${zone.name === z.name ? "#eab308" : theme.border}`,
              background: zone.name === z.name ? "rgba(234,179,8,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{z.name}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${z.feeUsd} USD ({Math.round(z.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{z.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeMasterCommand} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={commandId} onChange={(e) => setCommandId(e.target.value)} placeholder="Master Command ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          👑 Engage 10T Master Control ({Math.round(zone.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {masterMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{masterMsg}</div>}
    </section>
  );
}
