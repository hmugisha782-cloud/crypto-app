import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const MARITIME_PILLARS = [
  "🚢 Autonomous Green-Hydrogen Cargo Ship Slot",
  "🌐 Subsea Fiber-Optic Cable & Bandwidth Share",
  "🐟 Lake Kivu & Ocean Sustainable Aquaculture Lot",
  "⚓ Smart-Port Customs Fast-Track & Marine Guard",
  "🌊 Tidal Wave & Offshore Wind Turbine Yield Bond",
  "🧊 Liquefied Clean-Energy Tanker Charter Fraction",
  "🛰️ Global AIS Maritime Vessel Telemetry API",
  "🌿 Verified Blue-Carbon Mangrove & Coral Credit"
];

const PORT_HUBS = ["Mombasa Port Berth", "Dar-es-Salaam Hub", "Lake Kivu Marina", "Rotterdam Europort", "Singapore Strait", "Dubai Jebel Ali", "Djibouti Red Sea", "Shanghai Deepwater"];

export default function OmniMaritimeBlueEconomyHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [marMsg, setMarMsg] = useState("");

  const TOTAL_NODES = 100000000000000000000000000000000;
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
      const p = MARITIME_PILLARS[id % MARITIME_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const port = PORT_HUBS[(id * 89) % PORT_HUBS.length];
      const title = `${p} · ${port} #${String(id).padStart(33, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((18 + ((id * 187) % 880)).toFixed(2));
      out.push({ id, p, port, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function bookMaritime(item) {
    const bol = "BOL-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🌊 MARITIME & BLUE-ECONOMY BILL ISSUED [${bol}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "MaritimeBlueEconomy", title: item.title || "MaritimeBlueEconomy Execution", amountUsd: _usdVal, rwfRate }); setMarMsg(`🌊 MARITIME & BLUE-ECONOMY BILL ISSUED [${bol}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-maritime-blue-economy-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #0ea5e9", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌊 Maritime Shipping, Subsea Fiber Cables, Lake Kivu Aquaculture & Blue-Carbon Hub (100SPD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book Mombasa/Dar-es-Salaam cargo vessels, invest in subsea cables & Lake Kivu fisheries in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(14,165,233,0.18)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          100NO+ Maritime & Ocean Nodes · 100 Septendecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search ships, ports & subsea cables (e.g. Mombasa, Kivu, Fiber, Singapore, Blue-Carbon)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Maritime & Blue-Economy Pillars (100NO+)</option>
          {MARITIME_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
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
            <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => bookMaritime(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#0ea5e9", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🌊 Book / Invest
            </button>
          </div>
        ))}
      </div>

      {marMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{marMsg}</div>}
    </section>
  );
}
