import { useState } from "react";

const CIV_SYSTEMS = [
  { name: "🌌 500-Trillion Autonomous Sovereign Civilization Grid", feeUsd: 240, tag: "500T Hyper-Architecture" },
  { name: "🧠 Quantum Neural Brain Predictive Alpha & Risk Engine", feeUsd: 175, tag: "Sub-Microsecond AI" },
  { name: "🌍 195-Country Instant Sovereign Remittance & FX Highway", feeUsd: 95, tag: "Zero-Fee Global Rail" },
  { name: "🏛️ Multi-Sovereign Gold, Platinum & Digital RWF Vault", feeUsd: 210, tag: "100% Audited Reserve" },
];

export default function FiveHundredTrillionCivilizationHub({ rates = {}, theme, panel }) {
  const [civ, setCiv] = useState(CIV_SYSTEMS);
  const [civCode, setCivCode] = useState("CIV-500T-KIGALI · Sovereign");
  const [civMsg, setCivMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function engageCivilizationGrid(e) {
    e.preventDefault();
    const sig = "KGT-500T-" + Math.floor(100000 + Math.random() * 900000);
    setCivMsg(`🌌 500-TRILLION GRID ENGAGED [${sig}]: "${civ.name}" active on ${civCode} · Paid $${civ.feeUsd} USD (${Math.round(civ.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="five-hundred-trillion-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 500-Trillion Sovereign Civilization Grid, Quantum Neural Brain & FX Highway</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Command 500-trillion-node quantum prediction, 195-country FX rails & sovereign gold vaults in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(236,72,153,0.18)", color: "#f472b6", fontWeight: 800, fontSize: 11 }}>
          500,000,000,000,000+ Active Modules (500 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CIV_SYSTEMS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCiv(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${civ.name === c.name ? "#ec4899" : theme.border}`,
              background: civ.name === c.name ? "rgba(236,72,153,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#f472b6", fontWeight: 800 }}>${c.feeUsd} USD ({Math.round(c.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={engageCivilizationGrid} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={civCode} onChange={(e) => setCivCode(e.target.value)} placeholder="Civilization Grid ID / Sovereign Org" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#ec4899", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Engage 500T Grid ({Math.round(civ.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {civMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{civMsg}</div>}
    </section>
  );
}
