import { useState } from "react";

const MOBILITY_OPTIONS = [
  { name: "⚡ Kigali & Gatsibo EV Fast-Charging Station Pass", priceUsd: 8, info: "100% Green Hydro/Solar Grid" },
  { name: "🚕 Kigali VIP Electric Taxi & Moto Ride Wallet", priceUsd: 15, info: "Instant QR Ride Credits" },
  { name: "🚙 Rwanda Executive 4x4 Safari & Business Rental", priceUsd: 95, info: "24h Insured Chauffeur/Self" },
  { name: "🚛 EAC Cross-Border EV & Heavy Fleet GPS Tracking", priceUsd: 60, info: "Live Telemetry & Fuel Pay" },
];

export default function SmartMobilityEvHub({ rates = {}, theme, panel }) {
  const [option, setOption] = useState(MOBILITY_OPTIONS);
  const [plateOrRoute, setPlateOrRoute] = useState("RAE 842 K · Kigali – Gatsibo");
  const [mobMsg, setMobMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateMobility(e) {
    e.preventDefault();
    const ref = "KGT-MOB-" + Math.floor(100000 + Math.random() * 900000);
    setMobMsg(`🚗 MOBILITY PASS ACTIVE [${ref}]: ${option.name} (${plateOrRoute}) · Paid $${option.priceUsd} USD (${Math.round(option.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="smart-mobility-ev" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🚗 Smart Mobility, EV Fast-Charging, Ride-Hailing & Fleet Hub (2.5B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book electric rides, charge EVs, rent 4x4 vehicles & track commercial fleets across Rwanda and East Africa.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(6,182,212,0.18)", color: "#22d3ee", fontWeight: 800, fontSize: 11 }}>
          2,500,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {MOBILITY_OPTIONS.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setOption(m)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${option.name === m.name ? "#06b6d4" : theme.border}`,
              background: option.name === m.name ? "rgba(6,182,212,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 800 }}>${m.priceUsd} USD ({Math.round(m.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{m.info}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateMobility} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={plateOrRoute} onChange={(e) => setPlateOrRoute(e.target.value)} placeholder="Vehicle Plate / Route / Rider ID" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🚗 Activate Mobility Pass ({Math.round(option.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {mobMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{mobMsg}</div>}
    </section>
  );
}
