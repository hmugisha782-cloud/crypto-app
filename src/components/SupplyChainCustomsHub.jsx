import { useState } from "react";

const LOGISTICS_SERVICES = [
  { name: "🚢 Mombasa / Dar es Salaam → Kigali Container Express", feeUsd: 450, tag: "Northern & Central Corridor" },
  { name: "🛃 RRA & EAC Single Customs Territory Duty Clearance", feeUsd: 120, tag: "Instant Electronic Release" },
  { name: "📦 Kigali Dry Port (DPW) Bonded Warehouse Storage", feeUsd: 75, tag: "Smart RFID Inventory" },
  { name: "🛡️ All-Risk International Marine & Cargo Insurance", feeUsd: 60, tag: "100% Shipment Cover" },
];

export default function SupplyChainCustomsHub({ rates = {}, theme, panel }) {
  const [svc, setSvc] = useState(LOGISTICS_SERVICES);
  const [containerId, setContainerId] = useState("MSKU-9048217 · Kigali DPW");
  const [logMsg, setLogMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function processShipment(e) {
    e.preventDefault();
    const ref = "KGT-LOG-" + Math.floor(100000 + Math.random() * 900000);
    setLogMsg(`🚢 CUSTOMS & LOGISTICS CLEARED [${ref}]: ${svc.name} (${containerId}) · Paid $${svc.feeUsd} USD (${Math.round(svc.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="supply-chain-customs" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #0284c7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🚢 Global Supply Chain, Mombasa/Dar Port Tracking & RRA Customs Hub (12.5B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Track sea containers, clear EAC customs duties & book Kigali Dry Port storage in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(2,132,199,0.18)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          12,500,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {LOGISTICS_SERVICES.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setSvc(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${svc.name === s.name ? "#0284c7" : theme.border}`,
              background: svc.name === s.name ? "rgba(2,132,199,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>${s.feeUsd} USD ({Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={processShipment} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={containerId} onChange={(e) => setContainerId(e.target.value)} placeholder="Container Number / Bill of Lading / TIN" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🚢 Clear & Track Shipment ({Math.round(svc.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {logMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{logMsg}</div>}
    </section>
  );
}
