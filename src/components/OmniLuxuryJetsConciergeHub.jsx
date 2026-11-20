import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const LUXURY_PILLARS = [
  "🛩️ Private Jet & Kigali–Akagera Helicopter Charter",
  "🏎️ VIP Armored SUV & Electric Supercar Chauffeur",
  "⌚ Certified Swiss Timepiece & Fine Diamond Vault",
  "🥂 24/7 Sovereign Diplomatic & VIP Event Concierge",
  "🛥️ Mediterranean & Lake Kivu Luxury Yacht Charter",
  "🏰 Private Island, Penthouse & Safari Lodge Buyout",
  "🎨 Museum-Grade Fine Art & Sculpture Fractional Share",
  "🛂 Global VIP Airport Tarmac & Security Escort"
];

const LUX_HUBS = ["Kigali VIP Apron", "Gatsibo Helipad", "Akagera Airfield", "Dubai Al Maktoum", "London Farnborough", "Geneva Private Jet", "Paris Le Bourget", "Zurich VIP Terminal"];

export default function OmniLuxuryJetsConciergeHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [luxMsg, setLuxMsg] = useState("");

  const TOTAL_ITEMS = 1000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const items = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_ITEMS) {
      const id = ((idx + scanned - 1) % TOTAL_ITEMS) + 1;
      scanned++;
      const p = LUXURY_PILLARS[id % LUXURY_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = LUX_HUBS[(id * 127) % LUX_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(40, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((45 + ((id * 233) % 955)).toFixed(2));
      out.push({ id, p, hub, title, priceUsd });
    }
    return out;
  }, [search, pillar, page]);

  function reserveLuxury(item) {
    const code = "VIP-JET-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`💎 SOVEREIGN VIP CHARTER & ASSET LOCKED [${code}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "LuxuryJetsConcierge", title: item.title || "LuxuryJetsConcierge Execution", amountUsd: _usdVal, rwfRate }); setLuxMsg(`💎 SOVEREIGN VIP CHARTER & ASSET LOCKED [${code}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-luxury-jets-concierge-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>💎 Private Jets, Helicopters, VIP Chauffeurs & Swiss Luxury Vault Hub (1VG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Charter Kigali/Akagera helicopters & private jets, book VIP SUVs & acquire certified luxury assets in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          1DD+ VIP Charters & Assets · 1 Vigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search private jets, helicopters & luxury (e.g. Kigali, Gatsibo, Helicopter, Yacht, Watch)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Luxury & Private Aviation Pillars (1DD+)</option>
          {LUXURY_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_ITEMS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_ITEMS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_ITEMS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_ITEMS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {items.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => reserveLuxury(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              💎 Charter / Acquire
            </button>
          </div>
        ))}
      </div>

      {luxMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{luxMsg}</div>}
    </section>
  );
}
