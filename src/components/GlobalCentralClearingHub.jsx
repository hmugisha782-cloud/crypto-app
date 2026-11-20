import { useState } from "react";

const CLEARING_RAILS = [
  { name: "🏛️ Real-Time Gross Settlement (RTGS) Interbank Wire", feeUsd: 25, tag: "Central Bank Rail" },
  { name: "💱 Sovereign eRWF / eUSD / eEUR Instant Stablecoin Mint", feeUsd: 10, tag: "1:1 Reserve Backed" },
  { name: "🚢 Automated International Trade Letter of Credit (LC)", feeUsd: 90, tag: "Global Import/Export" },
  { name: "🧠 Universal AI Super-Grid & Sovereign Data Sovereign Node", feeUsd: 60, tag: "Zero-Latency Compute" },
];

export default function GlobalCentralClearingHub({ rates = {}, theme, panel }) {
  const [rail, setRail] = useState(CLEARING_RAILS);
  const [bicCode, setBicCode] = useState("BKIGRWRW · Global RTGS");
  const [clearMsg, setClearMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeClearing(e) {
    e.preventDefault();
    const ref = "KGT-RTGS-" + Math.floor(100000 + Math.random() * 900000);
    setClearMsg(`🏛️ CENTRAL CLEARING SETTLED [${ref}]: "${rail.name}" cleared for ${bicCode} · $${rail.feeUsd} USD (${Math.round(rail.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="global-central-clearing" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏛️ Global Central Bank RTGS Clearing, eRWF Stablecoin & Trade LC Hub (100B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Execute instant RTGS interbank settlements, mint 1:1 eRWF/eUSD & issue global trade Letters of Credit.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          100,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CLEARING_RAILS.map((r) => (
          <button
            key={r.name}
            type="button"
            onClick={() => setRail(r)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${rail.name === r.name ? "#f59e0b" : theme.border}`,
              background: rail.name === r.name ? "rgba(245,158,11,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{r.name}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${r.feeUsd} USD ({Math.round(r.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{r.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeClearing} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={bicCode} onChange={(e) => setBicCode(e.target.value)} placeholder="SWIFT / BIC Code / Sovereign Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🏛️ Settle RTGS Clearing ({Math.round(rail.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {clearMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{clearMsg}</div>}
    </section>
  );
}
