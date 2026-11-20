import { useState } from "react";

const ERP_MODULES = [
  { name: "💼 Bulk Staff Payroll (MTN MoMo, BK & USDT Multi-Send)", costUsd: 1200, info: "Instant 500+ Staff Payout" },
  { name: "🧾 Automated RRA EBM / VAT Digital Invoice Generator", costUsd: 45, info: "18% VAT Auto-Calculated" },
  { name: "📦 Smart Retail & Warehouse Barcode Inventory Sync", costUsd: 85, info: "Real-Time Stock Alerts" },
  { name: "📊 B2B Supplier Escrows & Cross-Border Trade Ledger", costUsd: 320, info: "EAC / Global Compliance" },
];

export default function EnterpriseErpPayrollHub({ rates = {}, theme, panel }) {
  const [erp, setErp] = useState(ERP_MODULES);
  const [companyName, setCompanyName] = useState("Kigali_Tech_Enterprises_Ltd");
  const [erpMsg, setErpMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeErpAction(e) {
    e.preventDefault();
    const ref = "KGT-ERP-" + Math.floor(100000 + Math.random() * 900000);
    setErpMsg(`🏢 ERP & PAYROLL EXECUTED [${ref}]: ${companyName} processed "${erp.name}" · $${erp.costUsd.toLocaleString()} USD (${Math.round(erp.costUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="enterprise-erp-payroll" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #6366f1", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏢 Enterprise ERP, Bulk Staff Payroll, Inventory & EBM Invoicing (6.5B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Disburse multi-staff salaries via MoMo/BK/USDT, issue VAT invoices & manage live business inventory.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(99,102,241,0.18)", color: "#a5b4fc", fontWeight: 800, fontSize: 11 }}>
          6,500,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {ERP_MODULES.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setErp(m)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${erp.name === m.name ? "#6366f1" : theme.border}`,
              background: erp.name === m.name ? "rgba(99,102,241,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#a5b4fc", fontWeight: 800 }}>${m.costUsd.toLocaleString()} USD ({Math.round(m.costUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{m.info}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeErpAction} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company / Cooperative Name / TIN" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🏢 Run ERP / Payroll ({Math.round(erp.costUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {erpMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{erpMsg}</div>}
    </section>
  );
}
