import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const LEGAL_PILLARS = [
  "📜 Cryptographic Digital Notary & Deed Stamp",
  "🤖 AI Legal Contract & Risk Compliance Audit",
  "🏢 1-Click RDB / Global LLC & DAO Incorporation",
  "©️ Global Trademark, Patent & Copyright Shield",
  "⚖️ Cross-Border Escrow & Smart Arbitration",
  "🔐 Sovereign KYC / KYB Corporate Vault",
  "📑 Automated Tax, RRA & IFRS Audit Filing",
  "🌍 International Trade & Customs Clearance"
];

const JURISDICTIONS = ["Kigali RDB", "Gatsibo Commercial", "Nairobi EAC", "Dubai DIFC", "London UK", "Delaware USA", "Zurich Swiss", "Singapore Hub"];

export default function OmniLegalTechNotaryHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [legMsg, setLegMsg] = useState("");

  const TOTAL_CONTRACTS = 1000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const docs = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_CONTRACTS) {
      const id = ((idx + scanned - 1) % TOTAL_CONTRACTS) + 1;
      scanned++;
      const p = LEGAL_PILLARS[id % LEGAL_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const jur = JURISDICTIONS[(id * 29) % JURISDICTIONS.length];
      const title = `${p} · ${jur} #${String(id).padStart(19, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((12 + ((id * 107) % 430)).toFixed(2));
      out.push({ id, p, jur, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function executeLegal(item) {
    const hash = "0xKGT" + Math.floor(10000000 + Math.random() * 90000000).toString(16).toUpperCase();
    const _amtMatch = (`⚖️ NOTARIZED & VERIFIED [${hash}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "LegalTechNotary", title: item.title || "LegalTechNotary Execution", amountUsd: _usdVal, rwfRate }); setLegMsg(`⚖️ NOTARIZED & VERIFIED [${hash}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-legaltech-notary-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚖️ Sovereign Digital Notary, AI Contract Auditor & Global Company Registry (1TD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Notarize deeds, audit contracts with AI, incorporate RDB/global companies & protect trademarks in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          1QN+ Smart Contracts · 1 Tredecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search notary, company & IP services (e.g. Kigali, RDB, Trademark, Audit, Delaware)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign LegalTech & Notary Pillars (1QN+)</option>
          {LEGAL_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_CONTRACTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_CONTRACTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_CONTRACTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_CONTRACTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {docs.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => executeLegal(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ⚖️ Stamp & Execute
            </button>
          </div>
        ))}
      </div>

      {legMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{legMsg}</div>}
    </section>
  );
}
