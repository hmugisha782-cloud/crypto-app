import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignCollateralLoanDesk({ rates = {}, theme, panel }) {
  const [collateral, setCollateral] = useState("₿ 0.10 BTC ($6,542 Value)");
  const [borrowUsd, setBorrowUsd] = useState("1500");
  const [loanMsg, setLoanMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function disburseLoan(e) {
    e.preventDefault();
    const amt = Math.max(50, Number(borrowUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Collateral Credit Desk",
      title: `Instant 4.9% APR Loan backed by ${collateral}`,
      amountUsd: amt,
      rwfRate,
      type: "CREDIT",
    });
    setLoanMsg(`🏦 INSTANT CREDIT DISBURSED [${tx.id}]: +$${amt.toLocaleString()} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) credited to your Wallet at 4.9% APR!`);
  }

  return (
    <section id="sovereign-collateral-loan-desk" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f59e0b", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>🏦 Instant Crypto & Gold-Backed Credit Line (Borrow RWF / USDT @ 4.9% APR)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Unlock instant cash to MTN MoMo, Bank of Kigali or USDT without selling your Bitcoin or Gold</span>
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fbbf24" }}>0-Paperwork · 2-Second Disbursement</span>
      </div>
      <form onSubmit={disburseLoan} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={collateral} onChange={(e) => setCollateral(e.target.value)} style={{ flex: 1, minWidth: 200, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>₿ 0.10 BTC ($6,542 Value · Max Loan $4,500)</option>
          <option>🥇 100g 24K Swiss Gold ($8,800 Value · Max Loan $6,500)</option>
          <option>Ξ 2.00 ETH ($3,685 Value · Max Loan $2,500)</option>
        </select>
        <input type="number" min="50" value={borrowUsd} onChange={(e) => setBorrowUsd(e.target.value)} style={{ width: 120, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🏦 Borrow Now ({Math.round(Number(borrowUsd || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </form>
      {loanMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{loanMsg}</div>}
    </section>
  );
}
