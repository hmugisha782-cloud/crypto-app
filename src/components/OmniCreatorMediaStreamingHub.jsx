import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const MEDIA_PILLARS = [
  "🎵 Afrobeat & Rwandan Music Royalty Share",
  "🎥 4K Live Sports, Cinema & Concert PPV Pass",
  "🎟️ BK Arena & Amahoro VIP Event NFT Ticket",
  "🎙️ Instant Creator Tip, Podcast & Merch Vault",
  "🎬 African Film & Series Production Equity",
  "🎮 Live Esports Tournament & Streamer Sponsor",
  "📸 Licensed 8K Stock Media & AI Beat Marketplace",
  "🌍 Global Radio & Stadium Advertising Slot"
];

const VENUES = ["BK Arena Kigali", "Amahoro National Stadium", "Gatsibo Cultural Hub", "Lagos Afrobeat Stage", "London O2 Arena", "Nairobi Live Dome", "Dubai Coca-Cola Arena", "Paris Accor Stage"];

export default function OmniCreatorMediaStreamingHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [medMsg, setMedMsg] = useState("");

  const TOTAL_ITEMS = 100000000000000000000000000000;
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
      const p = MEDIA_PILLARS[id % MEDIA_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const venue = VENUES[(id * 73) % VENUES.length];
      const title = `${p} · ${venue} #${String(id).padStart(30, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((5 + ((id * 173) % 295)).toFixed(2));
      out.push({ id, p, venue, title, priceUsd });
    }
    return out;
  }, [search, pillar, page]);

  function unlockMedia(item) {
    const pass = "VIP-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🎬 PASS & ROYALTY UNLOCKED [${pass}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "CreatorMediaStreaming", title: item.title || "CreatorMediaStreaming Execution", amountUsd: _usdVal, rwfRate }); setMedMsg(`🎬 PASS & ROYALTY UNLOCKED [${pass}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-creator-media-streaming-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎬 Creator Economy, Afrobeat Streaming Royalties, 4K PPV & BK Arena Tickets (100SXD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Buy Afrobeat music royalties, stream 4K live sports/cinema & mint BK Arena VIP tickets in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(236,72,153,0.18)", color: "#f472b6", fontWeight: 800, fontSize: 11 }}>
          100OC+ Media & Event Passes · 100 Sexdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search music, PPV, tickets & creators (e.g. BK Arena, Amahoro, Afrobeat, Gatsibo)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Creator & Media Pillars (100OC+)</option>
          {MEDIA_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
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
            <span style={{ fontSize: 11, color: "#f472b6", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => unlockMedia(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#ec4899", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🎬 Unlock / Buy Pass
            </button>
          </div>
        ))}
      </div>

      {medMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{medMsg}</div>}
    </section>
  );
}
