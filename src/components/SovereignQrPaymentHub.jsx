import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignQrPaymentHub({ rates = {}, theme, panel }) {
  const [merchantName, setMerchantName] = useState("Kigali & Gatsibo Smart Merchant");
  const [billUsd, setBillUsd] = useState("15");
  const [qrMsg, setQrMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function payQrInvoice(e) {
    e.preventDefault();
    const amt = Math.max(1, Number(billUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "QR SoftPOS Pay",
      title: `QR Tap-to-Pay to ${merchantName}`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setQrMsg(`📲 QR INVOICE PAID [${tx.id}]: Sent $${amt.toFixed(2)} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) to ${merchantName}!`);
  }

  return (
    <section id="sovereign-qr-payment-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <strong style={{ fontSize: 15 }}>📲 Sovereign QR SoftPOS & Instant Merchant Scan-to-Pay</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Generate or pay instant RWF / USDT QR invoices with 4.5% automatic cashback</span>
        </div>
        <svg width="46" height="46" viewBox="0 0 36 36" style={{ background: "#fff", padding: 4, borderRadius: 8 }}>
          <rect x="2" y="2" width="10" height="10" fill="#020617" />
          <rect x="24" y="2" width="10" height="10" fill="#020617" />
          <rect x="2" y="24" width="10" height="10" fill="#020617" />
          <rect x="15" y="15" width="6" height="6" fill="#10b981" />
          <rect x="24" y="24" width="4" height="4" fill="#020617" />
          <rect x="30" y="30" width="4" height="4" fill="#020617" />
        </svg>
      </div>

      <form onSubmit={payQrInvoice} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={merchantName} onChange={(e) => setMerchantName(e.target.value)} placeholder="Merchant / Shop Name" style={{ flex: 1, minWidth: 190, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" min="1" step="any" value={billUsd} onChange={(e) => setBillUsd(e.target.value)} placeholder="USD" style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          📲 Pay QR ({Math.round(Number(billUsd || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </form>
      {qrMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{qrMsg}</div>}
    </section>
  );
}
