import { useState } from "react";

const GOV_SERVICES = [
  { name: "🏛️ IremboGov Express (Passport, Criminal Record & Civil Docs)", priceUsd: 20, cat: "Digital Government" },
  { name: "🧾 RRA Instant Tax, Trading License & TIN Clearance", priceUsd: 35, cat: "Revenue & Compliance" },
  { name: "💧⚡ WASAC Water & EUCL CashPower Smart Meter Auto-Pay", priceUsd: 18, cat: "Smart City Utilities" },
  { name: "🚌 Tap&Go Kigali Smart Bus & EV Mobility Card Top-Up", priceUsd: 10, cat: "Urban Smart Transit" },
];

export default function GovTechIremboCityHub({ rates = {}, theme, panel }) {
  const [govService, setGovService] = useState(GOV_SERVICES);
  const [billRef, setBillRef] = useState("IRM-99048217-RW");
  const [govReceipt, setGovReceipt] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function payGovService(e) {
    e.preventDefault();
    const tx = "KGT-GOV-" + Math.floor(100000 + Math.random() * 900000);
    setGovReceipt(`🏛️ GOVTECH RECEIPT [${tx}]: ${govService.name} · Ref: ${billRef} · Paid $${govService.priceUsd} USD (${Math.round(govService.priceUsd * rwfRate).toLocaleString()} RWF) Instantly!`);
  }

  return (
    <section id="govtech-irembo-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏛️ Rwanda & Global GovTech, Irembo Services, RRA Tax & Smart City Hub (1B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Instant digital payments for IremboGov certificates, RRA taxes, WASAC/EUCL utilities & Kigali Tap&Go transit cards.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          1,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {GOV_SERVICES.map((g) => (
          <button
            key={g.name}
            type="button"
            onClick={() => setGovService(g)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${govService.name === g.name ? "#38bdf8" : theme.border}`,
              background: govService.name === g.name ? "rgba(56,189,248,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{g.name}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${g.priceUsd} USD ({Math.round(g.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{g.cat}</span>
          </button>
        ))}
      </div>

      <form onSubmit={payGovService} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={billRef} onChange={(e) => setBillRef(e.target.value)} placeholder="Irembo Billing ID / Meter / TIN / Tap&Go Card" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🏛️ Pay & Get Receipt ({Math.round(govService.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {govReceipt && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{govReceipt}</div>}
    </section>
  );
}
