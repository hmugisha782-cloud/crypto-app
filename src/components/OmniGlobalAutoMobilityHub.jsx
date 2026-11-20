import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const MOBILITY_PILLARS = [
  "🔋 Kigali & Gatsibo EV Moto Battery-Swap Pass",
  "🚖 Autonomous EV Robo-Taxi Fleet Equity Share",
  "🚛 Electric Heavy-Duty Freight & EAC Corridor Slot",
  "🛡️ GPS Anti-Theft & Smart Auto-Insurance Guard",
  "🏎️ Zero-Emission Corporate EV Leasing & Chauffeur",
  "⚡ Ultra-Fast 350kW EV Highway Charging Credit",
  "🛵 Delivery E-Bike & Rider Micro-Finance Fleet",
  "📡 V2X Smart-Traffic & Connected Vehicle Telemetry"
];

const MOBILITY_HUBS = ["Kigali EV Central", "Gatsibo Highway Hub", "Bugesera Logistics Park", "Nairobi Express Ring", "Dubai Autonomous Zone", "Musanze Eco-Corridor", "Rubavu Border Gate", "London EV Mesh"];

export default function OmniGlobalAutoMobilityHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [mobMsg, setMobMsg] = useState("");

  const TOTAL_FLEET = 1000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const fleet = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_FLEET) {
      const id = ((idx + scanned - 1) % TOTAL_FLEET) + 1;
      scanned++;
      const p = MOBILITY_PILLARS[id % MOBILITY_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = MOBILITY_HUBS[(id * 139) % MOBILITY_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(43, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((10 + ((id * 247) % 490)).toFixed(2));
      const apyPct = Number((17.4 + ((id * 29) % 115) / 10).toFixed(1));
      out.push({ id, p, hub, title, feeUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function activateMobility(item) {
    const ref = "EV-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🚗 EV MOBILITY & FLEET ACTIVATED [${ref}]: ${item.title} (${item.apyPct}% Fleet Yield) · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalAutoMobility", title: item.title || "GlobalAutoMobility Execution", amountUsd: _usdVal, rwfRate }); setMobMsg(`🚗 EV MOBILITY & FLEET ACTIVATED [${ref}]: ${item.title} (${item.apyPct}% Fleet Yield) · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-auto-mobility-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🚗 EV Moto Battery-Swap, Autonomous Robo-Taxis & Electric Freight Hub (1UVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Subscribe to Kigali/Gatsibo EV moto swaps, invest in robo-taxi fleets & book electric freight in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          1TD+ EV & Fleet Nodes · 1 Unvigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search EV swap, robo-taxis & freight (e.g. Kigali, Gatsibo, Moto, Robo-Taxi, Freight)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign EV Mobility & Smart Fleet Pillars (1TD+)</option>
          {MOBILITY_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_FLEET / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {fleet.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => activateMobility(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🚗 Activate / Invest
            </button>
          </div>
        ))}
      </div>

      {mobMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{mobMsg}</div>}
    </section>
  );
}
