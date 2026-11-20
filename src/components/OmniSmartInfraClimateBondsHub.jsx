import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const INFRA_PILLARS = [
  "🚄 Kigali–Bugesera–Gatsibo Electric Rail Bond",
  "🌳 Nyungwe & Akagera Climate-Finance Carbon Note",
  "🏗️ Kigali & Gatsibo Smart-Housing Municipal Bond",
  "💧 Clean Hydro-Dam & Smart-Irrigation Canal Share",
  "🌉 EAC Cross-Border Dry-Port & Logistics Highway",
  "☀️ Sovereign Green-Bond & Solar Streetlight Trust",
  "🏙️ Bugesera Aerotropolis & Convention Infra Note",
  "♻️ Circular Zero-Waste & Smart-Recycling Utility"
];

const INFRA_ZONES = ["Kigali–Bugesera Line", "Gatsibo East Corridor", "Nyungwe Carbon Belt", "Akagera Eco-Zone", "Rusumo Power Basin", "Rubavu Lakefront", "Huye University Park", "Musanze North Gate"];

export default function OmniSmartInfraClimateBondsHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [infMsg, setInfMsg] = useState("");

  const TOTAL_NODES = 100000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const bonds = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_NODES) {
      const id = ((idx + scanned - 1) % TOTAL_NODES) + 1;
      scanned++;
      const p = INFRA_PILLARS[id % INFRA_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = INFRA_ZONES[(id * 103) % INFRA_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(36, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const unitUsd = Number((20 + ((id * 211) % 480)).toFixed(2));
      const apyPct = Number((15.4 + ((id * 17) % 95) / 10).toFixed(1));
      out.push({ id, p, zone, title, unitUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function subscribeInfraBond(item) {
    const cert = "INF-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏛️ INFRASTRUCTURE BOND ISSUED [${cert}]: ${item.title} (${item.apyPct}% APY) · Paid $${item.unitUsd} USD (${Math.round(item.unitUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "SmartInfraClimateBonds", title: item.title || "SmartInfraClimateBonds Execution", amountUsd: _usdVal, rwfRate }); setInfMsg(`🏛️ INFRASTRUCTURE BOND ISSUED [${cert}]: ${item.title} (${item.apyPct}% APY) · Paid $${item.unitUsd} USD (${Math.round(item.unitUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-smart-infra-climate-bonds-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏛️ Sovereign Electric Rail, Smart-Housing & Climate-Finance Bonds Hub (100OCD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Invest in Kigali–Gatsibo electric rail, smart housing, hydro dams & Nyungwe carbon bonds in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          100DC+ Infra & Climate Bonds · 100 Octodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search rail, housing & climate bonds (e.g. Kigali, Gatsibo, Rail, Nyungwe, Hydro)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Green Infra & Climate Pillars (100DC+)</option>
          {INFRA_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_NODES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_NODES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_NODES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_NODES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {bonds.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.unitUsd} USD ({Math.round(item.unitUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => subscribeInfraBond(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏛️ Subscribe Bond
            </button>
          </div>
        ))}
      </div>

      {infMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{infMsg}</div>}
    </section>
  );
}
