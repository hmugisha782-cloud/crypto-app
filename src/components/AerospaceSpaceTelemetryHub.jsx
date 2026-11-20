import { useState } from "react";

const SPACE_SERVICES = [
  { name: "🛰️ High-Res Satellite Earth Mapping (Rwanda & EAC Agri/Mining)", feeUsd: 85, tag: "0.3m Orbital Imaging" },
  { name: "🚀 Commercial Orbital Spaceflight & Zero-G VIP Seat Pass", feeUsd: 500, tag: "Aerospace Reservation" },
  { name: "📡 Dedicated LEO Constellation Maritime & Aviation Link", feeUsd: 140, tag: "Global Sky Telemetry" },
  { name: "🔭 Deep-Space Weather & Solar Flare Grid Early-Warning API", feeUsd: 45, tag: "Infrastructure Shield" },
];

export default function AerospaceSpaceTelemetryHub({ rates = {}, theme, panel }) {
  const [space, setSpace] = useState(SPACE_SERVICES);
  const [missionCode, setMissionCode] = useState("ORB-KGL-500192 · LEO-Sync");
  const [spaceMsg, setSpaceMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeSpaceMission(e) {
    e.preventDefault();
    const id = "KGT-SPC-" + Math.floor(100000 + Math.random() * 900000);
    setSpaceMsg(`🚀 AEROSPACE TELEMETRY LOCKED [${id}]: "${space.name}" assigned to ${missionCode} · Paid $${space.feeUsd} USD (${Math.round(space.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="aerospace-space-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🚀 Global Aerospace, Orbital Satellite Imaging & Space Telemetry Hub (50B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Order high-resolution satellite land mapping, orbital flight reservations & aviation telemetry in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          50,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {SPACE_SERVICES.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setSpace(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${space.name === s.name ? "#38bdf8" : theme.border}`,
              background: space.name === s.name ? "rgba(56,189,248,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${s.feeUsd} USD ({Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeSpaceMission} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={missionCode} onChange={(e) => setMissionCode(e.target.value)} placeholder="Coordinates / Mission Callsign / Org ID" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🚀 Launch Aerospace Order ({Math.round(space.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {spaceMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{spaceMsg}</div>}
    </section>
  );
}
