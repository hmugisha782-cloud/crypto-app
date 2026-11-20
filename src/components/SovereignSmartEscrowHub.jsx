import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignSmartEscrowHub({ rates = {}, theme, panel }) {
  const [dealTitle, setDealTitle] = useState("Kigali Apartment Rent / Land Deposit Escrow");
  const [counterparty, setCounterparty] = useState("+250 788 123 456");
  const [escrowUsd, setEscrowUsd] = useState("300");
  const [escMsg, setEscMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function lockEscrow() {
    const amt = Math.max(10, Number(escrowUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Smart Contract Escrow",
      title: `Escrow Locked: ${dealTitle} (${counterparty})`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setEscMsg(`🔐 ESCROW VAULT FUNDED [${tx.id}]: $${amt} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) locked safely for ${counterparty}!`);
  }

  return (
    <section id="sovereign-smart-escrow-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f59e0b", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>🔐 Trustless Smart-Contract Escrow (Land, Vehicles, Rent & Freelance)</strong>
        <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>Zero-Fraud Milestone Release</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={dealTitle} onChange={(e) => setDealTitle(e.target.value)} placeholder="Agreement Description" style={{ flex: 1, minWidth: 190, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="text" value={counterparty} onChange={(e) => setCounterparty(e.target.value)} placeholder="Seller / Landlord Phone or Wallet" style={{ width: 175, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" min="10" value={escrowUsd} onChange={(e) => setEscrowUsd(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={lockEscrow} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🔐 Lock Escrow Funds
        </button>
      </div>
      {escMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{escMsg}</div>}
    </section>
  );
}
