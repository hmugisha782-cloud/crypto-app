import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignSystemBackupRestore({ rates = {}, theme, panel }) {
  const [amt, setAmt] = useState("5");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const rwf = Number(rates?.RWF || 1480);
  const exec = () => {
    const v = Math.max(1, Number(amt || 0));
    const lbl = note.trim() ? "💾 Backup Now: " + note.trim() : "💾 Backup Now";
    const { tx } = recordSovereignTx({ hub: "💾 Encrypted Sovereign Wallet & Ledger Cloud Snapshot", title: lbl, amountUsd: v, rwfRate: rwf, type: "DEBIT" });
    setMsg("✅ [" + tx.id + "] " + lbl + " · $" + v + " (" + Math.round(v * rwf).toLocaleString() + " RWF)");
  };
  return (
    <section id="sovereignsystembackuprestore" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #10b981", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div><strong style={{ fontSize: 15 }}>💾 Encrypted Sovereign Wallet & Ledger Cloud Snapshot</strong><span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Encrypted disaster-recovery snapshot of all receipts</span></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reference..." style={{ width: 150, padding: "6px 8px", borderRadius: 8, border: "1px solid " + theme.border, background: theme.input, color: theme.text, fontSize: 12 }} />
          <input type="number" min="1" value={amt} onChange={(e) => setAmt(e.target.value)} style={{ width: 85, padding: "6px 8px", borderRadius: 8, border: "1px solid " + theme.border, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
          <button type="button" onClick={exec} style={{ padding: "7px 13px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>💾 Backup Now</button>
        </div>
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}