import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const INSURTECH_PILLARS = [
  "🌦️ Satellite Parametric Crop & Weather Shield",
  "🏥 Instant Family Health & Hospital VIP Policy",
  "🏛️ Sovereign Digital Pension & Retirement Vault",
  "✈️ Auto-Payout Flight Delay & Travel Med Shield",
  "🚗 Pay-As-You-Drive Smart Auto & Moto Cover",
  "🏠 Fire, Flood & Smart-Home Property Guard",
  "💼 SME Business Interruption & Cyber Liability",
  "🛡️ Smart-Contract DeFi & Wallet Asset Insurance"
];

const POLICY_ZONES = ["Gatsibo Agro-Shield", "Kigali Health Guard", "Nyagatare Weather Node", "Bugesera Aviation Cover", "Nairobi EAC InsurTech", "Zurich Re-Insurance", "London Lloyd's Mesh", "Dubai Sovereign Risk"];

export default function OmniParametricInsurancePensionHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [insMsg, setInsMsg] = useState("");

  const TOTAL_POLICIES = 100000000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const policies = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_POLICIES) {
      const id = ((idx + scanned - 1) % TOTAL_POLICIES) + 1;
      scanned++;
      const p = INSURTECH_PILLARS[id % INSURTECH_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = POLICY_ZONES[(id * 167) % POLICY_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(48, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const premUsd = Number((6 + ((id * 271) % 394)).toFixed(2));
      const apyPct = Number((16.5 + ((id * 47) % 95) / 10).toFixed(1));
      out.push({ id, p, zone, title, premUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function bindPolicy(item) {
    const ref = "POL-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🛡️ PARAMETRIC POLICY & PENSION BOUND [${ref}]: ${item.title} (${item.apyPct}% Vault Yield) · Paid $${item.premUsd} USD (${Math.round(item.premUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "ParametricInsurancePension", title: item.title || "ParametricInsurancePension Execution", amountUsd: _usdVal, rwfRate }); setInsMsg(`🛡️ PARAMETRIC POLICY & PENSION BOUND [${ref}]: ${item.title} (${item.apyPct}% Vault Yield) · Paid $${item.premUsd} USD (${Math.round(item.premUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-parametric-insurance-pension-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🛡️ Satellite Parametric Crop Insurance, Family Health & Sovereign Pension Hub (100DVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Bind instant Gatsibo/Kigali weather crop policies, family health cover & sovereign pensions in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          100QND+ Smart Policies · 100 Duovigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search insurance & pensions (e.g. Gatsibo, Kigali, Crop, Health, Pension, Travel)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign InsurTech & Pension Pillars (100QND+)</option>
          {INSURTECH_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_POLICIES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {policies.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${item.premUsd} USD ({Math.round(item.premUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% Yield</span>
            <button type="button" onClick={() => bindPolicy(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🛡️ Bind Policy / Vault
            </button>
          </div>
        ))}
      </div>

      {insMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{insMsg}</div>}
    </section>
  );
}
