import { useState } from "react";

export default function VirtualCardAndBillPayHub({ rates = {}, theme, panel }) {
  const [cardFrozen, setCardFrozen] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [meterOrPhone, setMeterOrPhone] = useState("04218894321");
  const [billAmountRwf, setBillAmountRwf] = useState("10000");
  const [billReceipt, setBillReceipt] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const usdtCost = ((Number(billAmountRwf) || 0) / rwfRate).toFixed(2);

  function payBillNow() {
    const token = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000)).join("-");
    setBillReceipt(`✓ Paid ${Number(billAmountRwf).toLocaleString()} RWF (${usdtCost} USDT) for ${meterOrPhone} · Token: ${token}`);
  }

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #f59e0b", display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>💳 Virtual USD Visa Card & Instant EUCL CashPower / Airtime Crypto Pay</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Spend crypto globally with your instant 3D-Secure USD Visa card or pay Rwanda electricity & mobile bills in 5 seconds.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(245, 158, 11, 0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          Zero FX Markup · Instant Token
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {/* VIRTUAL USD VISA CARD */}
        <div style={{ padding: 15, borderRadius: 14, background: "linear-gradient(135deg, #0f172a, #1e1b4b)", border: "1px solid rgba(251,191,36,0.45)", color: "#f8fafc", display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
            <span style={{ color: "#fbbf24" }}>KGT PLATINUM VIRTUAL VISA</span>
            <span style={{ color: cardFrozen ? "#ef4444" : "#10b981" }}>{cardFrozen ? "● FROZEN" : "● ACTIVE"}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.12em", fontFamily: "monospace" }}>
            4532 •••• •••• 8890
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#cbd5e1" }}>
            <span>EXP: 09/29</span>
            <span>CVV: <strong>{showCvv ? "842" : "•••"}</strong></span>
            <span>BAL: <strong>$250.00</strong></span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setShowCvv((v) => !v)} style={{ flex: 1, padding: "7px 10px", borderRadius: 7, border: "1px solid #38bdf8", background: "rgba(56,189,248,0.15)", color: "#38bdf8", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
              {showCvv ? "Hide CVV" : "Reveal CVV"}
            </button>
            <button type="button" onClick={() => setCardFrozen((f) => !f)} style={{ flex: 1, padding: "7px 10px", borderRadius: 7, border: "none", background: cardFrozen ? "#10b981" : "#ef4444", color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
              {cardFrozen ? "Unfreeze Card" : "Freeze Card"}
            </button>
          </div>
        </div>

        {/* EUCL CASHPOWER & AIRTIME PAY */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#fbbf24" }}>⚡ Instant EUCL CashPower & MTN/Airtel Top-Up</strong>
          <input type="text" value={meterOrPhone} onChange={(e) => setMeterOrPhone(e.target.value)} placeholder="CashPower Meter or 078/073 Phone" style={inp} />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, alignItems: "center" }}>
            <input type="number" value={billAmountRwf} onChange={(e) => setBillAmountRwf(e.target.value)} placeholder="Amount (RWF)" style={inp} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#10b981" }}>≈ {usdtCost} USDT</span>
          </div>
          <button type="button" onClick={payBillNow} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
            Pay {Number(billAmountRwf || 0).toLocaleString()} RWF with USDT
          </button>
        </div>
      </div>

      {billReceipt && (
        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(245, 158, 11, 0.16)", border: "1px solid #f59e0b", color: "#fbbf24", fontSize: 12, fontWeight: 700 }}>
          {billReceipt}
        </div>
      )}
    </section>
  );
}
