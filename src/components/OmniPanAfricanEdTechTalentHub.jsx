import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const PAN_EDTECH_PILLARS = [
  "🎓 Kigali & Global AI/Quantum Engineering Degree",
  "🦄 Pan-African Startup Seed & Series-A Syndicate",
  "💼 Global Remote Tech & AI Executive Contract",
  "🔬 Sovereign R&D Patent & AI Model License",
  "📜 Blockchain-Verified University Diploma NFT",
  "🚀 FinTech Accelerator & Sovereign Grant Cohort",
  "🌐 Multilingual Enterprise Coding Bootcamp",
  "🏛️ Executive Sovereign Leadership Fellowship"
];

const CAMPUSES = ["Kigali Innovation City", "Gatsibo Tech Campus", "CMU-Africa Hub", "Nairobi Venture Lab", "London FinTech Guild", "Silicon Valley Syndicate", "Zurich Research", "Singapore Academy"];

export default function OmniPanAfricanEdTechTalentHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [panMsg, setPanMsg] = useState("");

  const TOTAL_NODES = 10000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const programs = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_NODES) {
      const id = ((idx + scanned - 1) % TOTAL_NODES) + 1;
      scanned++;
      const p = PAN_EDTECH_PILLARS[id % PAN_EDTECH_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const inst = CAMPUSES[(id * 101) % CAMPUSES.length];
      const title = `${p} · ${inst} #${String(id).padStart(35, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((15 + ((id * 197) % 485)).toFixed(2));
      out.push({ id, p, inst, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function enrollPanAfrican(item) {
    const ref = "PAN-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🎓 PAN-AFRICAN ENROLLED & VERIFIED [${ref}]: ${item.title} · Settled $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "PanAfricanEdTechTalent", title: item.title || "PanAfricanEdTechTalent Execution", amountUsd: _usdVal, rwfRate }); setPanMsg(`🎓 PAN-AFRICAN ENROLLED & VERIFIED [${ref}]: ${item.title} · Settled $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-pan-african-edtech-talent-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎓 Pan-African AI Universities, Startup Venture Syndicate & Talent Hub (10OCD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Enroll in AI degrees, invest in Kigali/Pan-African startups, license patents & hire verified talent in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          10DC+ Programs & Startups · 10 Octodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search Pan-African degrees & startups (e.g. Kigali, Gatsibo, Startup, AI, Diploma)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Pan-African EdTech & Venture Pillars (10DC+)</option>
          {PAN_EDTECH_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_NODES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_NODES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_NODES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_NODES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {programs.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => enrollPanAfrican(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🎓 Enroll / Invest
            </button>
          </div>
        ))}
      </div>

      {panMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{panMsg}</div>}
    </section>
  );
}
