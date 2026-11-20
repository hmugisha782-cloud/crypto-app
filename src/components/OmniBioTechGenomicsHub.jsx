import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const BIOTECH_PILLARS = [
  "🧬 Whole-Genome DNA Sequencing & Longevity Plan",
  "💊 Kigali mRNA & Pharma Patent Royalty Share",
  "🧪 AI Drug-Discovery & Clinical Trial Participation",
  "🌱 Bio-Engineered Drought-Resistant Seed Syndicate",
  "🫀 24/7 Wearable Biomarker & Cardiac AI Guard",
  "🔬 Stem-Cell & Regenerative Medicine VIP Pass",
  "🧫 Biobank Cryo-Storage & Sovereign DNA Vault",
  "🌍 Pan-African Bio-Manufacturing Equity Note"
];

const BIO_HUBS = ["Kigali Bio-Park", "Gatsibo Agro-Bio Lab", "Zurich Genomics HQ", "Boston Bio-Cluster", "Nairobi Med-Research", "Singapore Bio-Polis", "London Francis Crick", "Tokyo Longevity Lab"];

export default function OmniBioTechGenomicsHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [bioMsg, setBioMsg] = useState("");

  const TOTAL_NODES = 1000000000000000000000000000000000;
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
      const p = BIOTECH_PILLARS[id % BIOTECH_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = BIO_HUBS[(id * 97) % BIO_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(34, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((15 + ((id * 191) % 785)).toFixed(2));
      out.push({ id, p, hub, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function activateBio(item) {
    const ref = "BIO-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🧬 BIOTECH & GENOMICS ACTIVATED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "BioTechGenomics", title: item.title || "BioTechGenomics Execution", amountUsd: _usdVal, rwfRate }); setBioMsg(`🧬 BIOTECH & GENOMICS ACTIVATED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-biotech-genomics-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🧬 Sovereign BioTech, DNA Genomics, Kigali mRNA Patents & Longevity Hub (1OCD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Order DNA longevity sequencing, invest in Kigali mRNA/pharma patents & bio-engineered seeds in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          1DC+ Bio-Patents & Trials · 1 Octodecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search DNA, mRNA patents & bio-labs (e.g. Kigali, Gatsibo, DNA, mRNA, Seed, Zurich)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign BioTech & Genomics Pillars (1DC+)</option>
          {BIOTECH_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
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
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => activateBio(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🧬 Activate / Invest
            </button>
          </div>
        ))}
      </div>

      {bioMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{bioMsg}</div>}
    </section>
  );
}
