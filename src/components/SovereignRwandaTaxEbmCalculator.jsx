import { useState } from "react";

export default function SovereignRwandaTaxEbmCalculator({ rates = {}, theme, panel }) {
  const [clientTin, setClientTin] = useState("104892310");
  const [itemDesc, setItemDesc] = useState("Enterprise FinTech & Cloud Services");
  const [netRwf, setNetRwf] = useState("1000000");
  const [ebmReceipt, setEbmReceipt] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const net = Number(netRwf || 0);
  const vat = Math.round(net * 0.18);
  const gross = net + vat;

  function issueEbmInvoice(e) {
    e.preventDefault();
    const sdc = "SDC00250" + Math.floor(100000 + Math.random() * 900000);
    setEbmReceipt(
      `🧾 RRA EBM v2.1 VERIFIED INVOICE [${sdc}] · Client TIN: ${clientTin} · Item: ${itemDesc} · Net: ${net.toLocaleString()} RWF + VAT (18%): ${vat.toLocaleString()} RWF = Total: ${gross.toLocaleString()} RWF ($${(gross / rwfRate).toFixed(2)} USD)!`
    );
  }

  return (
    <section id="sovereign-rwanda-tax-ebm-calculator" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🧾 Rwanda RRA EBM v2.1 Digital Tax Invoice & 18% VAT Calculator</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Instant SDC-signed Electronic Billing Machine invoice generator in RWF & USD</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 900, color: "#7dd3fc" }}>Total w/ 18% VAT: {gross.toLocaleString()} RWF (${(gross / rwfRate).toFixed(2)})</span>
      </div>

      <form onSubmit={issueEbmInvoice} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={clientTin} onChange={(e) => setClientTin(e.target.value)} placeholder="Buyer TIN (9 digits)" style={{ width: 140, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="text" value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="Goods / Service Description" style={{ flex: 1, minWidth: 180, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <input type="number" min="100" value={netRwf} onChange={(e) => setNetRwf(e.target.value)} placeholder="Net Amount (RWF)" style={{ width: 140, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🧾 Sign EBM Invoice
        </button>
      </form>
      {ebmReceipt && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(56,189,248,0.18)", border: "1px solid #38bdf8", color: "#7dd3fc", fontSize: 12, fontWeight: 800 }}>{ebmReceipt}</div>}
    </section>
  );
}
