import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignPnlTaxAuditEngine({ rates = {}, theme, panel }) {
  const [amt, setAmt] = useState("10");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const rwf = Number(rates?.RWF || 1480);
  const exec = () => {
    const v = Math.max(1, Number(amt || 0));
    const lbl = note.trim() ? "📑 Generate Audit: " + note.trim() : "📑 Generate Audit";
    const { tx } = recordSovereignTx({ hub: "📑 Realized PnL, Capital Gains & Annual Tax Audit", title: lbl, amountUsd: v, rwfRate: rwf, type: "DEBIT" });
    setMsg("✅ [" + tx.id + "] " + lbl + " · $" + v + " (" + Math.round(v * rwf).toLocaleString() + " RWF)");
  };
  return (
    <section id="sovereignpnltaxauditengine" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #38bdf8", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div><strong style={{ fontSize: 15 }}>📑 Realized PnL, Capital Gains & Annual Tax Audit</strong><span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>RRA & global compliant profit-and-loss audit report</span></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reference..." style={{ width: 150, padding: "6px 8px", borderRadius: 8, border: "1px solid " + theme.border, background: theme.input, color: theme.text, fontSize: 12 }} />
          <input type="number" min="1" value={amt} onChange={(e) => setAmt(e.target.value)} style={{ width: 85, padding: "6px 8px", borderRadius: 8, border: "1px solid " + theme.border, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
          <button type="button" onClick={exec} style={{ padding: "7px 13px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>📑 Generate Audit</button>
        </div>
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}