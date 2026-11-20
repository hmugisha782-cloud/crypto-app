import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const PUBLISHING_PILLARS = [
  "📚 Kinyarwanda & Global Digital E-Book Vault",
  "🎧 Sovereign AI Audiobook & Oral History Stream",
  "🔬 Peer-Reviewed Scientific & AI Research Paper",
  "💡 Licensed AI Dataset & Enterprise Code Repo",
  "🏛️ Rwandan Cultural Heritage & Royal Archive Pass",
  "✍️ 95%-Royalty Instant Author Publishing Contract",
  "📰 Global FinTech & Sovereign Intelligence Digest",
  "🎓 University Textbook & Exam Prep Bundle NFT"
];

const KNOWLEDGE_HUBS = ["Kigali National Library", "Gatsibo Digital Archive", "UR Huye Research", "CMU-Africa AI Lab", "Oxford Bodleian Link", "MIT Open-Knowledge", "Nairobi Pan-African Press", "Geneva UN-Research"];

export default function OmniGlobalPublishingResearchHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pubMsg, setPubMsg] = useState("");

  const TOTAL_WORKS = 10000000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const works = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_WORKS) {
      const id = ((idx + scanned - 1) % TOTAL_WORKS) + 1;
      scanned++;
      const p = PUBLISHING_PILLARS[id % PUBLISHING_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = KNOWLEDGE_HUBS[(id * 163) % KNOWLEDGE_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(47, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((4 + ((id * 269) % 296)).toFixed(2));
      const royPct = Number((85.0 + ((id * 43) % 145) / 10).toFixed(1));
      out.push({ id, p, hub, title, priceUsd, royPct });
    }
    return out;
  }, [search, pillar, page]);

  function unlockPublication(item) {
    const ref = "PUB-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`📚 PUBLICATION & LICENSE UNLOCKED [${ref}]: ${item.title} (${item.royPct}% Author Share) · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalPublishingResearch", title: item.title || "GlobalPublishingResearch Execution", amountUsd: _usdVal, rwfRate }); setPubMsg(`📚 PUBLICATION & LICENSE UNLOCKED [${ref}]: ${item.title} (${item.royPct}% Author Share) · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-publishing-research-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📚 Kinyarwanda AI Audiobooks, Digital Books, Research Journals & Datasets Hub (10DVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Read digital books, listen to Kinyarwanda AI audiobooks & license scientific datasets in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          10QND+ Works & Datasets · 10 Duovigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search books, audiobooks & research (e.g. Kinyarwanda, Kigali, Gatsibo, Dataset, MIT)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Publishing, Audiobooks & Research Pillars (10QND+)</option>
          {PUBLISHING_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_WORKS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {works.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF) · {item.royPct}% Royalty</span>
            <button type="button" onClick={() => unlockPublication(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              📚 Read / License
            </button>
          </div>
        ))}
      </div>

      {pubMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{pubMsg}</div>}
    </section>
  );
}
