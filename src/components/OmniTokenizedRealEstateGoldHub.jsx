import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const REALTY_GOLD_PILLARS = [
  "🏙️ Kigali & Global Smart Skyscraper REIT Share",
  "🥇 Certified 24K Refined Gold Bullion Gram Vault",
  "🏡 Gatsibo, Bugesera & Lake Kivu Eco-Villa Fraction",
  "🏛️ Sovereign BNR Treasury Bond & Infra Yield Note",
  "🏢 Kigali Commercial Mall & Tech-Park Rental Unit",
  "💎 Conflict-Free Certified Emerald & Coltan Lot",
  "🌴 Dubai Marina & London Canary Wharf Tokenized Flat",
  "🏗️ Smart-City Affordable Housing Syndicate Share"
];

const ASSET_LOCATIONS = ["Kigali Innovation City", "Gatsibo Smart Estate", "Lake Kivu Waterfront", "Bugesera Airport Zone", "Zurich Gold Vault", "Dubai DIFC Tower", "London Mayfair REIT", "Nairobi Westlands"];

export default function OmniTokenizedRealEstateGoldHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [reMsg, setReMsg] = useState("");

  const TOTAL_ASSETS = 10000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const assets = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_ASSETS) {
      const id = ((idx + scanned - 1) % TOTAL_ASSETS) + 1;
      scanned++;
      const p = REALTY_GOLD_PILLARS[id % REALTY_GOLD_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const loc = ASSET_LOCATIONS[(id * 71) % ASSET_LOCATIONS.length];
      const title = `${p} · ${loc} #${String(id).padStart(29, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const shareUsd = Number((15 + ((id * 167) % 485)).toFixed(2));
      const apyPct = Number((13.8 + ((id * 13) % 115) / 10).toFixed(1));
      out.push({ id, p, loc, title, shareUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function buyFraction(item) {
    const deed = "REIT-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`💎 FRACTIONAL DEED MINTED [${deed}]: ${item.title} (${item.apyPct}% Rental/Gold Yield) · Paid $${item.shareUsd} USD (${Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "TokenizedRealEstateGold", title: item.title || "TokenizedRealEstateGold Execution", amountUsd: _usdVal, rwfRate }); setReMsg(`💎 FRACTIONAL DEED MINTED [${deed}]: ${item.title} (${item.apyPct}% Rental/Gold Yield) · Paid $${item.shareUsd} USD (${Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-tokenized-real-estate-gold-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>💎 Tokenized Real Estate, 24K Gold Bullion, Eco-Villas & Sovereign Bonds Hub (10SXD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Buy fractional Kigali/Gatsibo properties, 24K gold bullion & BNR treasury bonds with monthly rent in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          10OC+ Fractional Deeds · 10 Sexdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search properties, gold & bonds (e.g. Kigali, Gatsibo, Gold, Villa, Dubai, Bond)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Tokenized Real Estate, Gold & Wealth Pillars (10OC+)</option>
          {REALTY_GOLD_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_ASSETS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_ASSETS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_ASSETS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_ASSETS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {assets.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${item.shareUsd} USD ({Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => buyFraction(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              💎 Mint Deed Share
            </button>
          </div>
        ))}
      </div>

      {reMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{reMsg}</div>}
    </section>
  );
}
