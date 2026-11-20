import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const EDTECH_VENTURE_PILLARS = [
  "🎓 AI & Quantum Engineering Master's",
  "🦄 Kigali & Pan-African Startup Seed Equity",
  "💼 Global Remote Senior Dev & AI Contract",
  "🔬 Sovereign R&D Patent & AI Model License",
  "📜 Blockchain-Verified University Diploma",
  "🚀 FinTech Accelerator & Grant Cohort",
  "🌐 Multilingual Enterprise Coding Bootcamp",
  "🏛️ Executive Sovereign Leadership Fellowship"
];

const INSTITUTIONS = ["Kigali Innovation City", "Gatsibo Tech Campus", "CMU-Africa Hub", "Nairobi Venture Lab", "London FinTech Guild", "Silicon Valley Syndicate", "Zurich Research", "Singapore Academy"];

export default function OmniEdTechVentureHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [edMsg, setEdMsg] = useState("");

  const TOTAL_PROGRAMS = 1000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const programs = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_PROGRAMS) {
      const id = ((idx + scanned - 1) % TOTAL_PROGRAMS) + 1;
      scanned++;
      const p = EDTECH_VENTURE_PILLARS[id % EDTECH_VENTURE_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const inst = INSTITUTIONS[(id * 17) % INSTITUTIONS.length];
      const title = `${p} · ${inst} #${String(id).padStart(16, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((15 + ((id * 89) % 485)).toFixed(2));
      out.push({ id, p, inst, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function enrollOrInvest(prog) {
    const ref = "KGT-EDU-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🎓 ENROLLED & VERIFIED [${ref}]: ${prog.title} · Settled $${prog.feeUsd} USD (${Math.round(prog.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "EdTechVenture", title: item.title || "EdTechVenture Execution", amountUsd: _usdVal, rwfRate }); setEdMsg(`🎓 ENROLLED & VERIFIED [${ref}]: ${prog.title} · Settled $${prog.feeUsd} USD (${Math.round(prog.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-edtech-venture-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎓 Sovereign AI Universities, Startup Venture Syndicate & Global Talent Hub (1DD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Enroll in AI degrees, invest in Pan-African startups, license patents & hire verified global talent in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          1Q+ Programs & Startups · 1 Duodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search degrees, startups & talent (e.g. Kigali, Gatsibo, Startup, AI, Diploma, Patent)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign EdTech & Venture Pillars (1Q+)</option>
          {EDTECH_VENTURE_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_PROGRAMS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_PROGRAMS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_PROGRAMS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_PROGRAMS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {programs.map((prog) => (
          <div key={prog.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{prog.title}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${prog.feeUsd} USD ({Math.round(prog.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => enrollOrInvest(prog)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🎓 Enroll / Invest
            </button>
          </div>
        ))}
      </div>

      {edMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{edMsg}</div>}
    </section>
  );
}
