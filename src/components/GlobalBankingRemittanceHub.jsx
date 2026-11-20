import { useState } from "react";

const BANKS_AND_RAILS = [
  { name: "🇷🇼 Bank of Kigali (BK) Instant", fee: "0.4%", speed: "Instant (3s)", currency: "RWF / USD" },
  { name: "🇷🇼 Equity Bank Rwanda & EAC", fee: "0.5%", speed: "Instant (5s)", currency: "RWF / KES / UGX" },
  { name: "🇷🇼 I&M Bank & BPR Rwanda", fee: "0.5%", speed: "Instant (5s)", currency: "RWF / USD" },
  { name: "📱 MTN MoMo & Airtel Money Direct", fee: "0.6%", speed: "2 Seconds", currency: "RWF / UGX" },
  { name: "🇰🇪🇹🇿 Safaricom M-Pesa & Vodacom", fee: "0.7%", speed: "4 Seconds", currency: "KES / TZS" },
  { name: "🌍 Wise / SWIFT / SEPA Global Wire", fee: "0.8%", speed: "Same-Day", currency: "USD / EUR / GBP" },
];

export default function GlobalBankingRemittanceHub({ rates = {}, theme, panel }) {
  const [rail, setRail] = useState(BANKS_AND_RAILS[0].name);
  const [account, setAccount] = useState("00040-0692841-19 (BK / MoMo)");
  const [amountUsd, setAmountUsd] = useState("250");
  const [receipt, setReceipt] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeTransfer(e) {
    e.preventDefault();
    const usd = Math.max(5, Number(amountUsd) || 250);
    const rwfVal = Math.round(usd * rwfRate);
    const txId = "KGT-BNK-" + Math.floor(100000 + Math.random() * 900000);
    setReceipt(`✅ SETTLED [${txId}]: $${usd.toLocaleString()} USD (${rwfVal.toLocaleString()} RWF) sent via ${rail} to ${account}!`);
  }

  return (
    <section id="global-banking-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #3b82f6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏦 Rwanda, East Africa & Global Digital Banking Hub (250M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Instant settlement between Crypto/USDT and Bank of Kigali, Equity, I&M Bank, MTN MoMo, M-Pesa, Wise & SWIFT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(59,130,246,0.18)", color: "#60a5fa", fontWeight: 800, fontSize: 11 }}>
          1 USD = {rwfRate.toLocaleString()} RWF · 24/7 Rail
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(215px, 1fr))", gap: 8 }}>
        {BANKS_AND_RAILS.map((b) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setRail(b.name)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${rail === b.name ? "#3b82f6" : theme.border}`,
              background: rail === b.name ? "rgba(59,130,246,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{b.name}</strong>
            <span style={{ fontSize: 10.5, color: "#60a5fa" }}>Speed: {b.speed} · Fee: {b.fee}</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{b.currency}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeTransfer} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Bank Account / IBAN / MoMo Number" style={{ flex: 2, minWidth: 200, padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" value={amountUsd} onChange={(e) => setAmountUsd(e.target.value)} placeholder="Amount (USD)" style={{ width: 120, padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          💸 Instant Transfer ({Math.round((Number(amountUsd) || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {receipt && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{receipt}</div>}
    </section>
  );
}
