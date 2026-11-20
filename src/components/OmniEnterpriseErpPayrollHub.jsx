import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const ERP_PILLARS = [
  "💸 1-Click Multi-Currency Payroll (MoMo / BK / USDT)",
  "🧾 Instant RRA EBM v2.1 Smart Invoice & VAT Auto-File",
  "📦 B2B Invoice Factoring & Working-Capital Credit",
  "📊 AI CFO Audit, IFRS Ledger & Multi-Branch Sync",
  "🏦 Corporate Treasury Sweep (20.8% Overnight Yield)",
  "🤝 Cross-Border Supplier Escrow & Letter of Credit",
  "🪪 RSSB Pension, CBHI & Employee Benefits Auto-Pay",
  "🔐 Enterprise Role-Based Multi-Sig Approval Vault"
];

const ENTERPRISE_HUBS = ["Kigali Corporate HQ", "Gatsibo Industrial Park", "Nairobi Regional Office", "Dubai Trade Desk", "London FinTech Ops", "Bugesera SEZ Hub", "Musanze Agro-Corp", "Singapore Treasury"];

export default function OmniEnterpriseErpPayrollHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [erpMsg, setErpMsg] = useState("");

  const TOTAL_OPS = 10000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const ops = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_OPS) {
      const id = ((idx + scanned - 1) % TOTAL_OPS) + 1;
      scanned++;
      const p = ERP_PILLARS[id % ERP_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = ENTERPRISE_HUBS[(id * 43) % ENTERPRISE_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(23, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const batchUsd = Number((35 + ((id * 131) % 965)).toFixed(2));
      out.push({ id, p, hub, title, batchUsd });
    }
    return out;
  }, [search, pillar, page]);

  function runErpOp(item) {
    const ref = "KGT-ERP-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏢 ERP BATCH EXECUTED [${ref}]: ${item.title} · Settled $${item.batchUsd} USD (${Math.round(item.batchUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "EnterpriseErpPayroll", title: item.title || "EnterpriseErpPayroll Execution", amountUsd: _usdVal, rwfRate }); setErpMsg(`🏢 ERP BATCH EXECUTED [${ref}]: ${item.title} · Settled $${item.batchUsd} USD (${Math.round(item.batchUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-enterprise-erp-payroll-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #a855f7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏢 Enterprise ERP, Automated B2B Payroll, RRA EBM Invoicing & AI CFO Hub (10QD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Run 1-click MoMo/BK/USDT payroll, issue RRA EBM invoices, unlock working capital & audit IFRS ledgers instantly.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          10SX+ ERP Operations · 10 Quattuordecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search payroll, EBM invoices & credit (e.g. Kigali, Gatsibo, Payroll, EBM, RSSB)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Enterprise ERP & Payroll Pillars (10SX+)</option>
          {ERP_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_OPS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_OPS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_OPS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_OPS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {ops.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#d8b4fe", fontWeight: 800 }}>${item.batchUsd} USD ({Math.round(item.batchUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => runErpOp(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#a855f7", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏢 Execute ERP Batch
            </button>
          </div>
        ))}
      </div>

      {erpMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{erpMsg}</div>}
    </section>
  );
}
