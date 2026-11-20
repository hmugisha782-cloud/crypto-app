import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignEnergyStationHub({ rates = {}, theme, panel }) {
  const [fuelType, setFuelType] = useState("⛽ Petrol (1,640 RWF/L) — SP / Engen Kigali & Gatsibo");
  const [rwfAmt, setRwfAmt] = useState("20000");
  const [msg, setMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function payFuel() {
    const rwf = Math.max(1000, Number(rwfAmt || 0));
    const usd = Number((rwf / rwfRate).toFixed(2));
    const { tx } = recordSovereignTx({ hub: "Rwanda Fuel & EV Pay", title: fuelType + " (" + rwf.toLocaleString() + " RWF)", amountUsd: usd, rwfRate, type: "DEBIT" });
    setMsg(`⛽ VOUCHER ISSUED [${tx.id}]: ${fuelType} · ${rwf.toLocaleString()} RWF ($${usd} USD)!`);
  }

  return (
    <section id="sovereign-energy-station-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f59e0b", display: "grid", gap: 8 }}>
      <strong style={{ fontSize: 15 }}>⛽ Rwanda Live Fuel, Cooking Gas (LPG) & EV Charging Instant Voucher</strong>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} style={{ flex: 1, minWidth: 220, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>⛽ Petrol (1,640 RWF/L) — SP / Engen Kigali & Gatsibo</option>
          <option>🚛 Diesel (1,615 RWF/L) — Mount Meru / Rubis</option>
          <option>🔥 Cooking Gas LPG 12kg (18,500 RWF) — SafeGas / Hashi</option>
          <option>⚡ Ampersand / Spiro EV Moto Battery Swap (1,500 RWF)</option>
        </select>
        <input type="number" min="1000" step="500" value={rwfAmt} onChange={(e) => setRwfAmt(e.target.value)} style={{ width: 110, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={payFuel} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>⛽ Pay Fuel / Gas</button>
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}
