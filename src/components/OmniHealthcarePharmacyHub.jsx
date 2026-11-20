import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const HEALTH_PILLARS = [
  "🩺 24/7 Specialist Video Consultation",
  "💊 Digital Pharmacy & 30-Min Drone Delivery",
  "🛡️ Instant Health, Auto & Travel Insurance",
  "🧬 Full-Body Lab & Genomic Screening Pass",
  "🚑 Emergency Ambulance & Air-Evac Dispatch",
  "🦷 Dental, Optical & Maternity VIP Care",
  "🏥 King Faisal & Global Hospital Fast-Track",
  "🌿 Wellness, Nutrition & Mental Health Coach"
];

const CLINICS = ["King Faisal Kigali", "Gatsibo Smart Clinic", "Legacy Clinics", "CHUK Specialist", "Nairobi Hospital", "London Harley St", "Dubai Healthcare", "Zurich MedTech"];

export default function OmniHealthcarePharmacyHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [medMsg, setMedMsg] = useState("");

  const TOTAL_HEALTH = 100000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const services = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_HEALTH) {
      const id = ((idx + scanned - 1) % TOTAL_HEALTH) + 1;
      scanned++;
      const p = HEALTH_PILLARS[id % HEALTH_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const cl = CLINICS[(id * 23) % CLINICS.length];
      const title = `${p} · ${cl} #${String(id).padStart(18, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((8 + ((id * 101) % 390)).toFixed(2));
      out.push({ id, p, cl, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function bookCare(item) {
    const ref = "KGT-MED-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏥 CARE & POLICY ACTIVE [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "HealthcarePharmacy", title: item.title || "HealthcarePharmacy Execution", amountUsd: _usdVal, rwfRate }); setMedMsg(`🏥 CARE & POLICY ACTIVE [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-healthcare-pharmacy-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏥 24/7 Telemedicine, Drone Pharmacy & Sovereign Insurance Exchange (100DD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book 24/7 doctors, order drone pharmacy delivery & activate health/auto insurance in RWF, RSSB or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          100Q+ Health & Policy Nodes · 100 Duodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search doctors, pharmacy & insurance (e.g. King Faisal, Gatsibo, Drone, Dental, Auto)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Healthcare, Pharmacy & Insurance Pillars (100Q+)</option>
          {HEALTH_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_HEALTH / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_HEALTH / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_HEALTH / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_HEALTH / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {services.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => bookCare(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏥 Book / Activate
            </button>
          </div>
        ))}
      </div>

      {medMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{medMsg}</div>}
    </section>
  );
}
