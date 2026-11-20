import { useState } from "react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar ($)", rateFromUsd: 1 },
  { code: "RWF", name: "Rwandan Franc (RWF)", rateFromUsd: 1480 },
  { code: "EUR", name: "Euro (€)", rateFromUsd: 0.92 },
  { code: "GBP", name: "British Pound (£)", rateFromUsd: 0.79 },
  { code: "KES", name: "Kenyan Shilling (KES)", rateFromUsd: 129.5 },
  { code: "UGX", name: "Ugandan Shilling (UGX)", rateFromUsd: 3680 },
  { code: "TZS", name: "Tanzanian Shilling (TZS)", rateFromUsd: 2690 },
  { code: "AED", name: "UAE Dirham (AED)", rateFromUsd: 3.67 },
];

export default function SovereignFxConverterBar({ rates = {}, theme, panel }) {
  const [amt, setAmt] = useState("100");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("RWF");

  const liveRwf = Number(rates?.RWF || 1480);
  const getRate = (c) => (c === "RWF" ? liveRwf : CURRENCIES.find((x) => x.code === c)?.rateFromUsd || 1);

  const usdVal = Number(amt || 0) / getRate(fromCur);
  const converted = usdVal * getRate(toCur);

  function swapCurs() {
    setFromCur(toCur);
    setToCur(fromCur);
  }

  return (
    <section id="sovereign-fx-converter-bar" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #06b6d4", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>💱 Instant BNR & Global Multi-Currency FX Converter (USD · RWF · EUR · GBP · EAC · AED)</strong>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#22d3ee" }}>Live Benchmark: 1 USD = {liveRwf.toLocaleString()} RWF</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="number"
          min="0"
          step="any"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          style={{ width: 130, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13, fontWeight: 800 }}
        />
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
        </select>
        <button type="button" onClick={swapCurs} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 900 }}>⇄ Swap</button>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
        </select>
        <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(6,182,212,0.18)", border: "1px solid #06b6d4", color: "#22d3ee", fontWeight: 900, fontSize: 13.5 }}>
          = {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCur}
        </div>
      </div>
    </section>
  );
}
