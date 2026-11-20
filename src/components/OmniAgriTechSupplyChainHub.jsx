import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const AGRI_PILLARS = [
  "☕ Rwanda Bourbon Coffee & Mountain Tea Lot",
  "🚜 Satellite IoT & Drone Precision Farm Share",
  "❄️ Solar Cold-Storage & EAC Reefer Logistics",
  "🐄 Modern Dairy, Poultry & Lake Kivu Fishery",
  "🥑 Hass Avocado & Macadamia Export Contract",
  "🌱 Organic Fertilizer & Greenhouse Hydroponics",
  "📦 Blockchain Farm-to-Fork Export Traceability",
  "🌾 Sovereign Grain Reserve & Crop Insurance"
];

const FARM_ZONES = ["Gatsibo Agro-Hub", "Nyamasheke Coffee", "Musanze Potato Hub", "Kayonza Ranch", "Lake Kivu Fishery", "Bugesera Export Park", "Ruhango Cassava", "Nyanza Dairy"];

export default function OmniAgriTechSupplyChainHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [agriMsg, setAgriMsg] = useState("");

  const TOTAL_LOTS = 10000000000000000000;
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
      const p = AGRI_PILLARS[id % AGRI_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = FARM_ZONES[(id * 31) % FARM_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(20, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const lotUsd = Number((15 + ((id * 113) % 485)).toFixed(2));
      const roiPct = Number((16.5 + ((id * 9) % 135) / 10).toFixed(1));
      out.push({ id, p, zone, title, lotUsd, roiPct });
    }
    return out;
  }, [search, pillar, page]);

  function fundAgriLot(item) {
    const ref = "KGT-AGR-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🌾 AGRI-EXPORT LOT FUNDED [${ref}]: ${item.title} (${item.roiPct}% Harvest ROI) · Paid $${item.lotUsd} USD (${Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "AgriTechSupplyChain", title: item.title || "AgriTechSupplyChain Execution", amountUsd: _usdVal, rwfRate }); setAgriMsg(`🌾 AGRI-EXPORT LOT FUNDED [${ref}]: ${item.title} (${item.roiPct}% Harvest ROI) · Paid $${item.lotUsd} USD (${Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-agritech-supply-chain-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌾 Smart AgriTech, Coffee/Tea Export, Cold-Chain & Livestock Exchange (10TD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Fund Gatsibo & Rwanda coffee/tea exports, drone farms, solar cold-storage & dairy syndicates in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          10QN+ Agro Lots · 10 Tredecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search coffee, tea, farms & cold-chain (e.g. Gatsibo, Coffee, Avocado, Dairy, Kivu)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign AgriTech & Supply-Chain Pillars (10QN+)</option>
          {AGRI_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_LOTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_LOTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_LOTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_LOTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {lots.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.lotUsd} USD ({Math.round(item.lotUsd * rwfRate).toLocaleString()} RWF) · {item.roiPct}% ROI</span>
            <button type="button" onClick={() => fundAgriLot(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🌾 Fund Agro Lot
            </button>
          </div>
        ))}
      </div>

      {agriMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{agriMsg}</div>}
    </section>
  );
}
