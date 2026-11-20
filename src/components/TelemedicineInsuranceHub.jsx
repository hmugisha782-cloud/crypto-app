import { useState } from "react";

const HEALTH_SERVICES = [
  { name: "🩺 24/7 Doctor HD Video Consultation (CHUK / King Faisal)", priceUsd: 12, cat: "Telemedicine" },
  { name: "🛡️ RSSB / Mutuelle de Santé & MMI Instant Top-Up", priceUsd: 15, cat: "National Health Insurance" },
  { name: "💊 Kigali 30-Min Express E-Pharmacy Delivery", priceUsd: 22, cat: "Pharmacy & Labs" },
  { name: "🚑 Comprehensive Motor, Travel & Family Protection", priceUsd: 45, cat: "Radiant / Sanlam Cover" },
];

export default function TelemedicineInsuranceHub({ rates = {}, theme, panel }) {
  const [service, setService] = useState(HEALTH_SERVICES);
  const [memberId, setMemberId] = useState("RW-NID-1199880012345");
  const [healthMsg, setHealthMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateHealthService(e) {
    e.preventDefault();
    const code = "KGT-MED-" + Math.floor(100000 + Math.random() * 900000);
    setHealthMsg(`🏥 HEALTH & INSURANCE ACTIVE [${code}]: ${service.name} for ID ${memberId} · Paid $${service.priceUsd} USD (${Math.round(service.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="telemedicine-insurance" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #22c55e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏥 Telemedicine 24/7, E-Pharmacy & RSSB / Insurance Hub (850M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book instant video doctor visits, express pharmacy delivery & RSSB / MMI / Radiant insurance payments in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(34,197,94,0.18)", color: "#4ade80", fontWeight: 800, fontSize: 11 }}>
          Emergency: 114 / 912 · 24/7 Care
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {HEALTH_SERVICES.map((h) => (
          <button
            key={h.name}
            type="button"
            onClick={() => setService(h)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${service.name === h.name ? "#22c55e" : theme.border}`,
              background: service.name === h.name ? "rgba(34,197,94,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{h.name}</strong>
            <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 800 }}>${h.priceUsd} USD ({Math.round(h.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{h.cat}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateHealthService} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} placeholder="Member ID / Phone / Policy Number" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#22c55e", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🏥 Pay & Activate ({Math.round(service.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {healthMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{healthMsg}</div>}
    </section>
  );
}
