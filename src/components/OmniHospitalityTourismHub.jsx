import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const HOSPITALITY_PILLARS = [
  "🦍 Volcanoes Gorilla Trek & Akagera VIP Safari",
  "🏨 5-Star Kigali & Global Luxury Hotel Suite",
  "🍽️ Smart Restaurant Table & Gourmet Delivery",
  "🎟️ VIP World Cup, UEFA & Concert NFT Pass",
  "✈️ Private Helicopter & Lake Kivu Yacht Charter",
  "🏛️ Kigali Convention Centre Executive Booth",
  "🌴 Zanzibar, Maldives & Dubai Resort Package",
  "Spa & Wellness Sovereign Retreat Pass"
];

const DESTINATIONS = ["Volcanoes Musanze", "Akagera Kayonza", "Kigali Convention Hub", "Lake Kivu Rubavu", "Nyungwe Forest", "Dubai Marina", "London Mayfair", "Paris Champs-Elysees"];

export default function OmniHospitalityTourismHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [hospMsg, setHospMsg] = useState("");

  const TOTAL_BOOKINGS = 10000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const listings = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_BOOKINGS) {
      const id = ((idx + scanned - 1) % TOTAL_BOOKINGS) + 1;
      scanned++;
      const p = HOSPITALITY_PILLARS[id % HOSPITALITY_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const dest = DESTINATIONS[(id * 19) % DESTINATIONS.length];
      const title = `${p} · ${dest} #${String(id).padStart(17, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((25 + ((id * 97) % 475)).toFixed(2));
      out.push({ id, p, dest, title, priceUsd });
    }
    return out;
  }, [search, pillar, page]);

  function bookExperience(item) {
    const ref = "KGT-VIP-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏨 VIP BOOKING CONFIRMED [${ref}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "HospitalityTourism", title: item.title || "HospitalityTourism Execution", amountUsd: _usdVal, rwfRate }); setHospMsg(`🏨 VIP BOOKING CONFIRMED [${ref}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-hospitality-tourism-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏨 Visit Rwanda Safari, 5-Star Hotels, Smart Dining & VIP Event Concierge (10DD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book Volcanoes gorilla treks, Akagera safaris, 5-star suites, gourmet dining & VIP stadium passes in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(236,72,153,0.18)", color: "#f472b6", fontWeight: 800, fontSize: 11 }}>
          10Q+ VIP Experiences · 10 Duodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search safaris, hotels & VIP passes (e.g. Gorilla, Akagera, Kigali, Yacht, World Cup)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Luxury Hospitality & Tourism Pillars (10Q+)</option>
          {HOSPITALITY_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_BOOKINGS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_BOOKINGS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_BOOKINGS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_BOOKINGS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {listings.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#f472b6", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => bookExperience(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#ec4899", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏨 Book VIP Pass
            </button>
          </div>
        ))}
      </div>

      {hospMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{hospMsg}</div>}
    </section>
  );
}
