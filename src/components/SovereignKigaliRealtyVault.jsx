import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignKigaliRealtyVault({ rates = {}, theme, panel }) {
  const [val, setVal] = useState("150");
  const [msg, setMsg] = useState("");
  const rwf = Number(rates?.RWF || 1480);
  function run() {
    const amt = Math.max(5, Number(val || 0));
    const { tx } = recordSovereignTx({ hub: "🏙️ Fractional Kigali, Bugesera & Gatsibo Real Estate Deeds (18.5% Yield)", title: "🏙️ Buy Property Share ($" + amt + ")", amountUsd: amt, rwfRate: rwf, type: "DEBIT" });
    setMsg("✅ CONFIRMED [" + tx.id + "]: 🏙️ Fractional Kigali, Bugesera & Gatsibo Real Estate Deeds (18.5% Yield) · $" + amt + " USD (" + Math.round(amt * rwf).toLocaleString() + " RWF)!");
  }
  return (
    <section id="sovereignkigalirealtyvault" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #f59e0b", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>🏙️ Fractional Kigali, Bugesera & Gatsibo Real Estate Deeds (18.5% Yield)</strong>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input type="number" min="5" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: 95, padding: "6px 8px", borderRadius: 8, border: "1px solid " + theme.border, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
          <button type="button" onClick={run} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>🏙️ Buy Property Share</button>
        </div>
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}