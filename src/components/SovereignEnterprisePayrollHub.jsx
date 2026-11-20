import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignEnterprisePayrollHub({ rates = {}, theme, panel }) {
  const [staffCount, setStaffCount] = useState("12");
  const [totalPayrollUsd, setTotalPayrollUsd] = useState("1200");
  const [payRail, setPayRail] = useState("Bulk MTN MoMo & Bank of Kigali");
  const [payMsg, setPayMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function runPayroll() {
    const usd = Math.max(20, Number(totalPayrollUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Enterprise Payroll",
      title: `Disbursed Salaries to ${staffCount} Staff via ${payRail}`,
      amountUsd: usd,
      rwfRate,
      type: "DEBIT",
    });
    setPayMsg(`💼 MASS PAYROLL EXECUTED [${tx.id}]: Paid ${staffCount} employees $${usd.toLocaleString()} USD (${Math.round(usd * rwfRate).toLocaleString()} RWF) via ${payRail}!`);
  }

  return (
    <section id="sovereign-enterprise-payroll-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>💼 One-Click Enterprise & Cooperative Mass Salary Payroll (MoMo · BK · USDT)</strong>
        <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>Automated RSSB & PAYE Payslips</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" min="1" value={staffCount} onChange={(e) => setStaffCount(e.target.value)} placeholder="Staff Count" style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <select value={payRail} onChange={(e) => setPayRail(e.target.value)} style={{ flex: 1, minWidth: 195, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>Bulk MTN MoMo & Bank of Kigali</option>
          <option>Equity Bank & Airtel Money Rwanda</option>
          <option>Global Remote Team (USDT / USDC)</option>
        </select>
        <input type="number" min="20" value={totalPayrollUsd} onChange={(e) => setTotalPayrollUsd(e.target.value)} placeholder="Total USD" style={{ width: 115, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={runPayroll} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          💼 Run Payroll ({Math.round(Number(totalPayrollUsd || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </div>
      {payMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{payMsg}</div>}
    </section>
  );
}
