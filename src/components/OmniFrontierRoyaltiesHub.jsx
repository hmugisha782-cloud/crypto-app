import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const FRONTIER_SECTORS = [
  "🎬 Music, Afrobeat & Film Royalties",
  "🚗 Kigali EV Robo-Taxi & Drone Fleet",
  "🌊 Deep-Sea Minerals & Blue Carbon",
  "🛰️ Orbital Solar & Space Energy Futures",
  "💎 Rare-Earth Coltan & Lithium Vault",
  "🎮 Esports Pro-Team & Arena Equity",
  "🧬 Longevity Bio-Lab IP Patents",
  "⚡ Hydrogen & Geothermal Super-Grid"
];

const REGIONS = ["Kigali Innovation City", "Gatsibo Smart Zone", "Lake Kivu Hub", "Nairobi Tech Hub", "Dubai Future District", "London Sovereign", "Tokyo Orbit", "New York Exchange"];

export default function OmniFrontierRoyaltiesHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("ALL");
  const [page, setPage] = useState(1);
  const [frontMsg, setFrontMsg] = useState("");

  const TOTAL_FRONTIER = 100000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const assets = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_FRONTIER) {
      const id = ((idx + scanned - 1) % TOTAL_FRONTIER) + 1;
      scanned++;
      const s = FRONTIER_SECTORS[id % FRONTIER_SECTORS.length];
      if (sector !== "ALL" && s !== sector) continue;
      const r = REGIONS[(id * 13) % REGIONS.length];
      const title = `${s} · ${r} #${String(id).padStart(15, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const shareUsd = Number((10 + ((id * 83) % 490)).toFixed(2));
      const yieldPct = Number((12.4 + ((id * 7) % 145) / 10).toFixed(1));
      out.push({ id, s, r, title, shareUsd, yieldPct });
    }
    return out;
  }, [search, sector, page]);

  function investFrontier(asset) {
    const ref = "KGT-FRT-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🚀 FRONTIER ASSET LOCKED [${ref}]: ${asset.title} (${asset.yieldPct}% Est. APY) · Paid $${asset.shareUsd} USD (${Math.round(asset.shareUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "FrontierRoyalties", title: item.title || "FrontierRoyalties Execution", amountUsd: _usdVal, rwfRate }); setFrontMsg(`🚀 FRONTIER ASSET LOCKED [${ref}]: ${asset.title} (${asset.yieldPct}% Est. APY) · Paid $${asset.shareUsd} USD (${Math.round(asset.shareUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-frontier-royalties-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f43f5e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🚀 Next-Frontier Royalties, EV Robo-Taxis, Deep-Sea & Space Energy Exchange (100UD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Invest in Afrobeat/film royalties, Kigali EV Robo-Taxis, deep-sea minerals & orbital solar shares in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(244,63,94,0.18)", color: "#fb7185", fontWeight: 800, fontSize: 11 }}>
          100T+ Frontier Shares · 100 Undecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search frontier assets (e.g. Afrobeat, Robo-Taxi, Kigali, Gatsibo, Orbital, Lithium)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={sector} onChange={(e) => { setSector(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Next-Frontier Sectors (100T+ Assets)</option>
          {FRONTIER_SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_FRONTIER / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_FRONTIER / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_FRONTIER / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_FRONTIER / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {assets.map((a) => (
          <div key={a.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{a.title}</strong>
            <span style={{ fontSize: 11, color: "#fb7185", fontWeight: 800 }}>${a.shareUsd} USD ({Math.round(a.shareUsd * rwfRate).toLocaleString()} RWF) · {a.yieldPct}% APY</span>
            <button type="button" onClick={() => investFrontier(a)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🚀 Acquire Share
            </button>
          </div>
        ))}
      </div>

      {frontMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{frontMsg}</div>}
    </section>
  );
}
