import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignVirtualCardIssuer({ rates = {}, theme, panel }) {
  const [label, setLabel] = useState("Netflix / AWS / Alibaba Virtual Card");
  const [limitUsd, setLimitUsd] = useState("50");
  const [cards, setCards] = useState([
    { id: "VC-8841", label: "Kigali Cloud & AI Subscription Card", pan: "4532 •••• •••• 8841", exp: "11/29", cvv: "842", limitUsd: 200 },
  ]);
  const [cardMsg, setCardMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function createVirtualCard() {
    const amt = Math.max(5, Number(limitUsd || 0));
    const last4 = String(Math.floor(1000 + Math.random() * 9000));
    const { tx } = recordSovereignTx({
      hub: "Virtual Visa Issuer",
      title: `Issued Virtual Card ****${last4} (${label})`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setCards((prev) => [
      { id: tx.id, label, pan: `4532 •••• •••• ${last4}`, exp: "11/30", cvv: String(Math.floor(100 + Math.random() * 899)), limitUsd: amt },
      ...prev,
    ]);
    setCardMsg(`💳 VIRTUAL VISA ISSUED [${tx.id}]: 4532 •••• •••• ${last4} funded with $${amt} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-virtual-card-issuer" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>💳 Instant Disposable Virtual Visa & Mastercard Issuer (Online Global Pay)</strong>
        <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>3D-Secure · Apple Pay & Google Pay Ready</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Card Purpose" style={{ flex: 1, minWidth: 190, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" min="5" value={limitUsd} onChange={(e) => setLimitUsd(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={createVirtualCard} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          💳 Issue Virtual Card
        </button>
      </div>
      {cardMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{cardMsg}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 8 }}>
        {cards.map((c) => (
          <div key={c.id} style={{ padding: 10, borderRadius: 10, background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(56,189,248,0.18))", border: `1px solid ${theme.border}`, fontSize: 11.5 }}>
            <strong style={{ display: "block" }}>{c.label}</strong>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#7dd3fc", display: "block", margin: "4px 0" }}>{c.pan}</span>
            <span>EXP: {c.exp} · CVV: {c.cvv} · Limit: <strong>${c.limitUsd}</strong></span>
          </div>
        ))}
      </div>
    </section>
  );
}
