import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const METAVERSE_PILLARS = [
  "🏙️ Kigali & Gatsibo 3D Digital Twin Land Parcel",
  "🏟️ VR Amahoro & BK Arena Front-Row VIP Suite",
  "🏬 3D Virtual Shopping Mall & Flagship Showroom",
  "🎨 Rwandan Cultural Museum & 3D Art Gallery Booth",
  "🏛️ Sovereign Virtual Embassy & Global Summit Hall",
  "🎮 Spatial Web3 Gaming Arena & Avatar Studio",
  "🏭 Industrial 3D Factory Twin & IoT Simulation",
  "🌍 World Expo 2030 Virtual Trade Pavilion"
];

const VIRTUAL_ZONES = ["Kigali 3D Cyber-Core", "Gatsibo Spatial Hub", "Amahoro VR Dome", "BK Arena Holo-Deck", "Lake Kivu Virtual Isle", "Dubai Meta-Tower", "London Spatial Square", "Tokyo Cyber-Shibuya"];

export default function OmniMetaverseDigitalTwinHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [metaMsg, setMetaMsg] = useState("");

  const TOTAL_PARCELS = 1000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const parcels = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_PARCELS) {
      const id = ((idx + scanned - 1) % TOTAL_PARCELS) + 1;
      scanned++;
      const p = METAVERSE_PILLARS[id % METAVERSE_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = VIRTUAL_ZONES[(id * 107) % VIRTUAL_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(37, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((12 + ((id * 223) % 488)).toFixed(2));
      out.push({ id, p, zone, title, priceUsd });
    }
    return out;
  }, [search, pillar, page]);

  function claimParcel(item) {
    const nft = "META-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🌐 SPATIAL PARCEL & VR PASS MINTED [${nft}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "MetaverseDigitalTwin", title: item.title || "MetaverseDigitalTwin Execution", amountUsd: _usdVal, rwfRate }); setMetaMsg(`🌐 SPATIAL PARCEL & VR PASS MINTED [${nft}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-metaverse-digital-twin-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #a855f7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌐 Kigali & Gatsibo 3D Digital Twin Cities, VR Stadiums & Spatial Metaverse Hub (1NVD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Mint 3D Kigali/Gatsibo digital twin land parcels, VR Amahoro VIP suites & virtual showrooms in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          1UD+ 3D Twin Parcels · 1 Novemdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search 3D cities, VR suites & malls (e.g. Kigali, Gatsibo, Amahoro, Museum, Mall)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Metaverse & 3D Digital Twin Pillars (1UD+)</option>
          {METAVERSE_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_PARCELS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_PARCELS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_PARCELS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_PARCELS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {parcels.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#d8b4fe", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => claimParcel(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#a855f7", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🌐 Mint 3D Parcel
            </button>
          </div>
        ))}
      </div>

      {metaMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{metaMsg}</div>}
    </section>
  );
}
