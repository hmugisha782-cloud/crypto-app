import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const MINING_PILLARS = [
  "⛏️ Rwanda ITSCI-Certified 3Ts (Coltan/Tin/Wolfram)",
  "🥇 Kigali 999.9 Gold Refinery & Bullion Royalty",
  "🔋 EV Battery-Grade Lithium & Cobalt Forward Lot",
  "🛰️ AI Satellite Geological Survey & Mine Share",
  "💎 Certified Conflict-Free Emerald & Sapphire Vault",
  "⚡ Zero-Emission Electric Mining Fleet Syndicate",
  "📜 Blockchain Mineral Origin & Export Passport",
  "🏛️ Sovereign Strategic Mineral Reserve Bond"
];

const MINING_ZONES = ["Gatsibo Mineral Belt", "Rutongo Tin Mines", "Rwinkwavu Wolfram", "Kigali Gold Refinery", "Kamativi Lithium Hub", "Zurich Bullion Desk", "London LME Floor", "Dubai Precious Metals"];

export default function OmniGlobalMiningMineralsHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [minMsg, setMinMsg] = useState("");

  const TOTAL_LOTS = 1000000000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const lots = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_LOTS) {
      const id = ((idx + scanned - 1) % TOTAL_LOTS) + 1;
      scanned++;
      const p = MINING_PILLARS[id % MINING_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = MINING_ZONES[(id * 173) % MINING_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(49, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const lotUsd = Number((15 + ((id * 277) % 485)).toFixed(2));
      const apyPct = Number((17.2 + ((id * 53) % 105) / 10).toFixed(1));
      out.push({ id, p, zone, title, lotUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function acquireMineralLot(item) {
    const ref = "MIN-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`⛏️ ITSCI MINERAL & BULLION LOT LOCKED [${ref}]: ${item.title} (${item.apyPct}% Yield) · Paid $${item.lotUsd} USD (${Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalMiningMinerals", title: item.title || "GlobalMiningMinerals Execution", amountUsd: _usdVal, rwfRate }); setMinMsg(`⛏️ ITSCI MINERAL & BULLION LOT LOCKED [${ref}]: ${item.title} (${item.apyPct}% Yield) · Paid $${item.lotUsd} USD (${Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-mining-minerals-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⛏️ Rwanda 3Ts Critical Minerals, 999.9 Gold Refinery & EV Lithium Exchange (1TVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Invest in ITSCI-certified Gatsibo/Rutongo 3Ts minerals, Kigali 999.9 gold refining & EV lithium in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          1SX+ Certified Lots · 1 Trevigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search 3Ts, gold & lithium (e.g. Gatsibo, Coltan, Gold, Lithium, Rutongo)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Critical Minerals & Gold Pillars (1SX+)</option>
          {MINING_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_LOTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {lots.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${item.lotUsd} USD ({Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% Yield</span>
            <button type="button" onClick={() => acquireMineralLot(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ⛏️ Acquire Mineral Lot
            </button>
          </div>
        ))}
      </div>

      {minMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{minMsg}</div>}
    </section>
  );
}
