import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const SUPER_DOMAINS = [
  "Irembo & RRA Express Service", "Kigali & Global Tech Job Role", "AI & Web3 Bootcamp Scholarship", "24/7 Doctor Video & RSSB",
  "Digital Notary & LLC Registry", "Tier-4 Cloud VPS & API Key", "Smart Home & Agri-IoT Sensor", "4K Live Sports & Music Pass",
  "Rwanda Startup Seed Micro-Grant", "WASAC / EUCL / Tap&Go Auto-Pay", "Kigali 3D Digital Twin Plot", "Sovereign Gold & Bond Note"
];

const REGIONS = ["Kigali City", "Gatsibo District", "Eastern Province", "Northern Province", "Western Province", "Southern Province", "East Africa (EAC)", "Global Network"];

export default function OmniUniversal500kHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("ALL");
  const [page, setPage] = useState(1);
  const [uniMsg, setUniMsg] = useState("");

  const TOTAL_SERVICES = 500000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const services = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_SERVICES) {
      const id = ((idx + scanned - 1) % TOTAL_SERVICES) + 1;
      scanned++;
      const d = SUPER_DOMAINS[id % SUPER_DOMAINS.length];
      if (domain !== "ALL" && d !== domain) continue;
      const r = REGIONS[(id * 3) % REGIONS.length];
      const title = `${d} (${r}) · Node #${String(id).padStart(6, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((5 + ((id * 29) % 495)).toFixed(2));
      out.push({ id, d, r, title, feeUsd });
    }
    return out;
  }, [search, domain, page]);

  function executeService(s) {
    const ref = "KGT-500K-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🌟 UNIVERSAL SERVICE EXECUTED [${ref}]: ${s.title} · Paid $${s.feeUsd} USD (${Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "Universal500k", title: item.title || "Universal500k Execution", amountUsd: _usdVal, rwfRate }); setUniMsg(`🌟 UNIVERSAL SERVICE EXECUTED [${ref}]: ${s.title} · Paid $${s.feeUsd} USD (${Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-universal-500k" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌟 500,000+ Universal Citizen, GovTech, Jobs, Healthcare & Cloud Nodes (10SP+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Instant O(1) execution across 500,000+ Irembo, tech jobs, scholarships, telemedicine, notary & cloud nodes in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(236,72,153,0.18)", color: "#f472b6", fontWeight: 800, fontSize: 11 }}>
          500,000+ Live Services · 10 Septillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search 500,000+ services (e.g. Kigali, Gatsibo, Job, Irembo, Doctor, #450000)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={domain} onChange={(e) => { setDomain(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 12 Universal Domains (500,000+ Nodes)</option>
          {SUPER_DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_SERVICES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_SERVICES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_SERVICES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_SERVICES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {services.map((s) => (
          <div key={s.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{s.title}</strong>
            <span style={{ fontSize: 11, color: "#f472b6", fontWeight: 800 }}>${s.feeUsd} USD ({Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => executeService(s)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#ec4899", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🌟 Execute Service
            </button>
          </div>
        ))}
      </div>

      {uniMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{uniMsg}</div>}
    </section>
  );
}
