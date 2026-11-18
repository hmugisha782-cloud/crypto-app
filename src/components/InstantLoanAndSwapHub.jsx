import { useState } from "react";

export default function InstantLoanAndSwapHub({ rates = {}, theme, panel }) {
  const [collateralUsd, setCollateralUsd] = useState("500");
  const [swapUsd, setSwapUsd] = useState("100");
  const [targetCur, setTargetCur] = useState("RWF");
  const [statusMsg, setStatusMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const fxMap = {
    RWF: rwfRate,
    KES: Number(rates?.KES || 129.4),
    UGX: Number(rates?.UGX || 3685),
    TZS: Number(rates?.TZS || 2640),
  };

  const col = Math.max(0, Number(collateralUsd) || 0);
  const maxLoanUsd = col * 0.6;
  const maxLoanRwf = Math.round(maxLoanUsd * rwfRate);
  const monthlyInterestRwf = Math.round(maxLoanRwf * 0.015);

  const sw = Math.max(0, Number(swapUsd) || 0);
  const receivedLocal = Math.round(sw * (fxMap[targetCur] || rwfRate));

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #06b6d4", display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>💸 Instant Crypto-Backed RWF Credit Line & East Africa Quick-Swap</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Unlock 60% LTV liquidity directly to MTN MoMo / Airtel Money without selling your crypto, or swap USDT to EAC currencies instantly.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(6, 182, 212, 0.16)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          0.0% Swap Slippage · 7s Settlement
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {/* CRYPTO-BACKED RWF LOAN */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#10b981" }}>🏦 1. Instant Crypto-Backed RWF Loan (60% LTV)</strong>
          <label style={{ fontSize: 11, color: theme.muted }}>USDT / BTC Collateral Value (USD)</label>
          <input type="number" value={collateralUsd} onChange={(e) => setCollateralUsd(e.target.value)} style={inp} />
          <div style={{ fontSize: 12 }}>
            Max Instant Loan: <strong style={{ color: "#10b981" }}>{maxLoanRwf.toLocaleString()} RWF</strong> ({"$"}{maxLoanUsd.toFixed(2)})
          </div>
          <div style={{ fontSize: 11, color: theme.muted }}>Monthly Interest (1.5%): {monthlyInterestRwf.toLocaleString()} RWF / mo</div>
          <button
            type="button"
            onClick={() => setStatusMsg(`✓ Instant Loan Request Logged: ${maxLoanRwf.toLocaleString()} RWF queued for MTN MoMo disbursement!`)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
          >
            Request {maxLoanRwf.toLocaleString()} RWF to MoMo
          </button>
        </div>

        {/* EAST AFRICA INSTANT QUICK-SWAP */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#38bdf8" }}>💱 2. USDT → East Africa Mobile Money Quick-Swap</strong>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
            <input type="number" value={swapUsd} onChange={(e) => setSwapUsd(e.target.value)} style={inp} />
            <select value={targetCur} onChange={(e) => setTargetCur(e.target.value)} style={inp}>
              <option value="RWF">RWF</option>
              <option value="KES">KES</option>
              <option value="UGX">UGX</option>
              <option value="TZS">TZS</option>
            </select>
          </div>
          <div style={{ fontSize: 12 }}>
            You Receive Instantly: <strong style={{ color: "#38bdf8" }}>{receivedLocal.toLocaleString()} {targetCur}</strong>
          </div>
          <div style={{ fontSize: 11, color: theme.muted }}>Interbank Parity Rate: 1 USDT = {(fxMap[targetCur] || rwfRate).toLocaleString()} {targetCur}</div>
          <button
            type="button"
            onClick={() => setStatusMsg(`✓ Quick-Swap Executed: ${sw} USDT converted to ${receivedLocal.toLocaleString()} ${targetCur}!`)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
          >
            Instant Swap to {targetCur}
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16, 185, 129, 0.16)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 700 }}>
          {statusMsg}
        </div>
      )}
    </section>
  );
}
