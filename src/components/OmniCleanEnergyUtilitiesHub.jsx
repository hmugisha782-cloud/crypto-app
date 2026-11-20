import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const ENERGY_PILLARS = [
  "☀️ Gatsibo & Kigali Solar Micro-Grid Share",
  "🔌 EV Fast-Charger & Electric Moto Swap Pass",
  "🌍 Lake Kivu Methane & Carbon Credit Vault",
  "💧 Instant EUCL CashPower & WASAC Auto-Pay",
  "⚡ Rusumo & Nyabarongo Hydro Power Bond",
  "🔋 Industrial Lithium-Ion Grid Storage Node",
  "🌿 Clean Cookstove & Reforestation Offset",
  "📡 Smart Metering & Zero-Downtime UPS Grid"
];

const ENERGY_HUBS = ["Gatsibo Solar Field", "Kigali EV Corridor", "Lake Kivu KivuWatt", "Rusumo Hydro Hub", "Bugesera Green Park", "Musanze Eco-Grid", "Nairobi CleanTech", "Zurich Carbon Desk"];

export default function OmniCleanEnergyUtilitiesHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [nrgMsg, setNrgMsg] = useState("");

  const TOTAL_NODES = 100000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const nodes = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_NODES) {
      const id = ((idx + scanned - 1) % TOTAL_NODES) + 1;
      scanned++;
      const p = ENERGY_PILLARS[id % ENERGY_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = ENERGY_HUBS[(id * 37) % ENERGY_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(21, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const costUsd = Number((10 + ((id * 119) % 490)).toFixed(2));
      const apyPct = Number((14.2 + ((id * 11) % 125) / 10).toFixed(1));
      out.push({ id, p, hub, title, costUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function activateEnergy(item) {
    const ref = "KGT-NRG-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`⚡ CLEAN ENERGY & UTILITY ACTIVE [${ref}]: ${item.title} (${item.apyPct}% Yield) · Paid $${item.costUsd} USD (${Math.round(item.costUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "CleanEnergyUtilities", title: item.title || "CleanEnergyUtilities Execution", amountUsd: _usdVal, rwfRate }); setNrgMsg(`⚡ CLEAN ENERGY & UTILITY ACTIVE [${ref}]: ${item.title} (${item.apyPct}% Yield) · Paid $${item.costUsd} USD (${Math.round(item.costUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-clean-energy-utilities-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚡ Smart Solar Micro-Grids, EV Charging, Carbon Credits & CashPower Hub (100TD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Invest in Gatsibo solar grids, EV moto swap stations, Lake Kivu carbon credits & EUCL/WASAC utilities in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          100QN+ Energy Nodes · 100 Tredecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search solar, EV chargers, carbon & utilities (e.g. Gatsibo, Kivu, EV, CashPower, Hydro)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Clean Energy & Utilities Pillars (100QN+)</option>
          {ENERGY_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_NODES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_NODES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_NODES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_NODES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {nodes.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${item.costUsd} USD ({Math.round(item.costUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => activateEnergy(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ⚡ Activate Grid
            </button>
          </div>
        ))}
      </div>

      {nrgMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{nrgMsg}</div>}
    </section>
  );
}
