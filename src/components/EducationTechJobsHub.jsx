import { useState } from "react";

const TRACKS = [
  { name: "🤖 Full-Stack AI, React & Node.js Engineering Certificate", payOrFee: "Free Scholarship / $1,800/mo Job", tag: "EdTech & Engineering" },
  { name: "🛡️ Web3 Cybersecurity & Smart Contract Auditing Pro", payOrFee: "Free Bootcamp / $2,400/mo Job", tag: "Security & Audit" },
  { name: "📈 Institutional FinTech & Algorithmic Quant Trading", payOrFee: "Free Course / $2,100/mo Job", tag: "Finance & Quant" },
  { name: "🌍 Kigali Innovation City & Global Remote Tech Jobs Board", payOrFee: "480+ Open Roles (USD / RWF)", tag: "Verified Careers" },
];

export default function EducationTechJobsHub({ rates = {}, theme, panel }) {
  const [track, setTrack] = useState(TRACKS);
  const [applicant, setApplicant] = useState("Kigali_Builder_Pro");
  const [edMsg, setEdMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function enrollOrApply(e) {
    e.preventDefault();
    const id = "KGT-EDU-" + Math.floor(100000 + Math.random() * 900000);
    setEdMsg(`🎓 ENROLLED & VERIFIED [${id}]: ${applicant} registered for "${track.name}" (${track.payOrFee} · ≈ ${Math.round(2000 * rwfRate).toLocaleString()} RWF/mo Avg)!`);
  }

  return (
    <section id="education-tech-jobs" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎓 Global Tech Academy, AI Certifications & Remote Jobs Board (1.25B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Earn verified software, AI & FinTech certifications or apply directly to Kigali & global remote tech jobs.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          1,250,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {TRACKS.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setTrack(t)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${track.name === t.name ? "#8b5cf6" : theme.border}`,
              background: track.name === t.name ? "rgba(139,92,246,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{t.name}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>{t.payOrFee}</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{t.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={enrollOrApply} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={applicant} onChange={(e) => setApplicant(e.target.value)} placeholder="Your Full Name / GitHub / Portfolio Handle" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🎓 Enroll / Apply Instantly
        </button>
      </form>

      {edMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{edMsg}</div>}
    </section>
  );
}
