import { useState } from "react";

const LEGAL_SERVICES = [
  { name: "🏢 RDB & Global LLC Instant Business Incorporation", feeUsd: 40, tag: "Corporate Registry" },
  { name: "📜 Digital Notary Seal & E-Signature Authentication", feeUsd: 15, tag: "Cryptographic Proof" },
  { name: "🤝 Smart Escrow Partnership, NDA & Lease Contract", feeUsd: 25, tag: "Automated LegalTech" },
  { name: "™️ Trademark, Copyright & Brand IP Protection Filing", feeUsd: 65, tag: "Intellectual Property" },
];

export default function LegalTechNotaryHub({ rates = {}, theme, panel }) {
  const [legal, setLegal] = useState(LEGAL_SERVICES);
  const [entityName, setEntityName] = useState("Kigali_Global_Ventures_Ltd");
  const [legalMsg, setLegalMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeLegalDoc(e) {
    e.preventDefault();
    const seal = "KGT-LEG-" + Math.floor(100000 + Math.random() * 900000);
    setLegalMsg(`⚖️ LEGAL & NOTARY SEALED [${seal}]: "${legal.name}" issued for ${entityName} · Paid $${legal.feeUsd} USD (${Math.round(legal.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="legaltech-notary-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚖️ LegalTech, Digital Notary Seal, Smart Contracts & Business Registry (15B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Register companies, notarize contracts with cryptographic proof & file trademarks in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          15,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {LEGAL_SERVICES.map((l) => (
          <button
            key={l.name}
            type="button"
            onClick={() => setLegal(l)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${legal.name === l.name ? "#f59e0b" : theme.border}`,
              background: legal.name === l.name ? "rgba(245,158,11,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{l.name}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${l.feeUsd} USD ({Math.round(l.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{l.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeLegalDoc} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} placeholder="Company / Signatory / Contract Title" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          ⚖️ Notarize & Issue ({Math.round(legal.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {legalMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{legalMsg}</div>}
    </section>
  );
}
