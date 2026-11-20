import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const AVIATION_PILLARS = [
  "✈️ RwandAir & Global Direct Flight Ticket",
  "🚌 Tap&Go Smart Bus & Intercity Express Pass",
  "🚢 Mombasa / Dar-es-Salaam Cargo Container",
  "🏙️ Bugesera & Kigali Airport VIP Fast-Track",
  "🚁 Kigali–Musanze Executive Air-Taxi Shuttle",
  "📦 Cross-Border Customs & Bonded Warehouse",
  "🅿️ Smart-City IoT Parking & Toll Auto-Pass",
  "🌍 Global Aviation Carbon-Neutral Offset"
];

const CORRIDORS = ["Kigali–London LHR", "Kigali–Dubai DXB", "Gatsibo–Kigali Express", "Kigali–Nairobi NBO", "Bugesera Int'l Hub", "Mombasa–Kigali Corridor", "Kigali–New York JFK", "Kigali–Doha DOH"];

export default function OmniAviationSmartCityHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [aviMsg, setAviMsg] = useState("");

  const TOTAL_ROUTES = 1000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const routes = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_ROUTES) {
      const id = ((idx + scanned - 1) % TOTAL_ROUTES) + 1;
      scanned++;
      const p = AVIATION_PILLARS[id % AVIATION_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const cor = CORRIDORS[(id * 41) % CORRIDORS.length];
      const title = `${p} · ${cor} #${String(id).padStart(22, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const fareUsd = Number((15 + ((id * 127) % 485)).toFixed(2));
      out.push({ id, p, cor, title, fareUsd });
    }
    return out;
  }, [search, pillar, page]);

  function bookMobility(item) {
    const pnr = "KGT-FLY-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`✈️ BOARDING & TRANSIT PASS ISSUED [${pnr}]: ${item.title} · Paid $${item.fareUsd} USD (${Math.round(item.fareUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "AviationSmartCity", title: item.title || "AviationSmartCity Execution", amountUsd: _usdVal, rwfRate }); setAviMsg(`✈️ BOARDING & TRANSIT PASS ISSUED [${pnr}]: ${item.title} · Paid $${item.fareUsd} USD (${Math.round(item.fareUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-aviation-smart-city-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #0ea5e9", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>✈️ RwandAir Flights, Tap&Go Smart Transit, Cargo & Airport VIP Hub (1QD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book RwandAir flights, top up Tap&Go transit cards, clear cargo containers & reserve Bugesera VIP passes in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(14,165,233,0.18)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          1SX+ Transit & Flight Routes · 1 Quattuordecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search flights, Tap&Go, cargo & VIP passes (e.g. RwandAir, Gatsibo, Dubai, Bugesera)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Aviation & Smart-City Pillars (1SX+)</option>
          {AVIATION_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_ROUTES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_ROUTES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_ROUTES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_ROUTES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {routes.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>${item.fareUsd} USD ({Math.round(item.fareUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => bookMobility(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#0ea5e9", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ✈️ Issue Pass / Book
            </button>
          </div>
        ))}
      </div>

      {aviMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{aviMsg}</div>}
    </section>
  );
}
