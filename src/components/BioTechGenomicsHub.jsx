import { useState } from "react";

const BIOTECH_PLANS = [
  { name: "🧬 Full-Genome DNA Health & Wellness Sequencing Kit", feeUsd: 95, tag: "Precision Genomics" },
  { name: "🩺 AI Multi-Organ Lab & Blood Biomarker Diagnostic", feeUsd: 35, tag: "Predictive Health AI" },
  { name: "⌚ 24/7 Biometric Smartwatch & ECG Heart Telemetry Sync", feeUsd: 18, tag: "Live Vital Signs" },
  { name: "🧪 Authenticated Bio-Pharma & Vaccine Cold-Chain Scan", feeUsd: 25, tag: "Hospital Supply Guard" },
];

export default function BioTechGenomicsHub({ rates = {}, theme, panel }) {
  const [bio, setBio] = useState(BIOTECH_PLANS);
  const [patientRef, setPatientRef] = useState("BIO-KGL-773190 · Verified");
  const [bioMsg, setBioMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateBioService(e) {
    e.preventDefault();
    const id = "KGT-BIO-" + Math.floor(100000 + Math.random() * 900000);
    setBioMsg(`🧬 BIOTECH & DIAGNOSTICS ACTIVE [${id}]: "${bio.name}" linked to ${patientRef} · Paid $${bio.feeUsd} USD (${Math.round(bio.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="biotech-genomics-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #14b8a6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🧬 BioTech, Personalized Genomics, AI Medical Diagnostics & Longevity Hub (35B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book AI biomarker screenings, DNA wellness kits & live biometric health sync in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(20,184,166,0.18)", color: "#2dd4bf", fontWeight: 800, fontSize: 11 }}>
          35,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {BIOTECH_PLANS.map((b) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setBio(b)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${bio.name === b.name ? "#14b8a6" : theme.border}`,
              background: bio.name === b.name ? "rgba(20,184,166,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{b.name}</strong>
            <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 800 }}>${b.feeUsd} USD ({Math.round(b.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{b.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateBioService} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={patientRef} onChange={(e) => setPatientRef(e.target.value)} placeholder="Health ID / Wearable Serial / Clinic Ref" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#14b8a6", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🧬 Activate BioTech Scan ({Math.round(bio.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {bioMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{bioMsg}</div>}
    </section>
  );
}
