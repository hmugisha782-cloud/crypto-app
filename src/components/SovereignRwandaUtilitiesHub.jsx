import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignRwandaUtilitiesHub({ rates = {}, theme, panel }) {
  const [service, setService] = useState("⚡ EUCL CashPower Prepaid Token");
  const [meterOrPhone, setMeterOrPhone] = useState("04281940211");
  const [rwfAmt, setRwfAmt] = useState("15000");
  const [utilMsg, setUtilMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function payUtility() {
    const rwf = Math.max(500, Number(rwfAmt || 0));
    const usd = Number((rwf / rwfRate).toFixed(2));
    const token20 = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const { tx } = recordSovereignTx({
      hub: "Rwanda Utilities Pay",
      title: `${service} (${meterOrPhone}) · ${rwf.toLocaleString()} RWF`,
      amountUsd: usd,
      rwfRate,
      type: "DEBIT",
    });
    setUtilMsg(`⚡ UTILITY PAID [${tx.id}]: ${service} for ${meterOrPhone} · ${rwf.toLocaleString()} RWF ($${usd}) · Token: ${token20}`);
  }

  return (
    <section id="sovereign-rwanda-utilities-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>⚡ Rwanda Instant Bills: EUCL CashPower, WASAC Water, Canal+, StarTimes & Airtime</strong>
        <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>0 RWF Fee · Instant 20-Digit Token</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={service} onChange={(e) => setService(e.target.value)} style={{ flex: 1, minWidth: 195, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>⚡ EUCL CashPower Prepaid Token</option>
          <option>💧 WASAC Clean Water Bill</option>
          <option>📺 Canal+ / StarTimes TV Bouquet</option>
          <option>📱 MTN Rwanda / Airtel Instant Airtime & Fiber</option>
          <option>🏛️ IremboGov Service Fee Payment</option>
        </select>
        <input type="text" value={meterOrPhone} onChange={(e) => setMeterOrPhone(e.target.value)} placeholder="Meter / Decoder / Phone" style={{ width: 165, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" min="500" step="500" value={rwfAmt} onChange={(e) => setRwfAmt(e.target.value)} placeholder="Amount (RWF)" style={{ width: 120, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={payUtility} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          ⚡ Pay Bill Now
        </button>
      </div>
      {utilMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{utilMsg}</div>}
    </section>
  );
}
