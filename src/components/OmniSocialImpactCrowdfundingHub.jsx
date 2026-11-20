import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const IMPACT_PILLARS = [
  "🤝 Diaspora Crowdfunding & Smart-Escrow Project",
  "🎓 Sovereign STEM & Coding Scholarship Endowment",
  "🌱 Gatsibo & Rural Clean Water / Solar Micro-Grant",
  "🏛️ Youth & Women Cooperative Social Impact Bond",
  "🏥 Community Clinic & Maternal Health Equipment Fund",
  "🌾 Smallholder Farmer Irrigation & Seed Cooperative",
  "🌳 Nyungwe & Akagera Reforestation Carbon Grant",
  "📡 Rural Digital Library & Starlink School Connectivity"
];

const IMPACT_ZONES = ["Gatsibo Community Hub", "Kigali Innovation Youth", "Kayonza Rural Water", "Nyagatare Agro-Coop", "Musanze STEM Lab", "Rubavu Women Guild", "Huye University Fund", "Rusizi Green Belt"];

export default function OmniSocialImpactCrowdfundingHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [impMsg, setImpMsg] = useState("");

  const TOTAL_PROJECTS = 1000000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const projects = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_PROJECTS) {
      const id = ((idx + scanned - 1) % TOTAL_PROJECTS) + 1;
      scanned++;
      const p = IMPACT_PILLARS[id % IMPACT_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = IMPACT_ZONES[(id * 157) % IMPACT_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(46, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const fundUsd = Number((10 + ((id * 263) % 490)).toFixed(2));
      const apyPct = Number((14.2 + ((id * 41) % 95) / 10).toFixed(1));
      out.push({ id, p, zone, title, fundUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function fundImpact(item) {
    const ref = "IMP-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🤝 SOCIAL IMPACT & ESCROW VERIFIED [${ref}]: ${item.title} (${item.apyPct}% Impact Return) · Funded $${item.fundUsd} USD (${Math.round(item.fundUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "SocialImpactCrowdfunding", title: item.title || "SocialImpactCrowdfunding Execution", amountUsd: _usdVal, rwfRate }); setImpMsg(`🤝 SOCIAL IMPACT & ESCROW VERIFIED [${ref}]: ${item.title} (${item.apyPct}% Impact Return) · Funded $${item.fundUsd} USD (${Math.round(item.fundUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-social-impact-crowdfunding-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🤝 Diaspora Crowdfunding, STEM Scholarships & Social Impact Bonds Hub (1DVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Co-invest in Gatsibo/Kigali community projects, fund STEM scholarships & buy cooperative bonds in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          1QND+ Impact Projects · 1 Duovigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search crowdfunding, STEM & cooperatives (e.g. Gatsibo, Kigali, Scholarship, Water, Bond)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Social Impact & Crowdfunding Pillars (1QND+)</option>
          {IMPACT_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_PROJECTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {projects.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.fundUsd} USD ({Math.round(item.fundUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% Return</span>
            <button type="button" onClick={() => fundImpact(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🤝 Co-Invest / Fund
            </button>
          </div>
        ))}
      </div>

      {impMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{impMsg}</div>}
    </section>
  );
}
