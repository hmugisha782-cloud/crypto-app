import { useState } from "react";

const SOVEREIGN_INSTRUMENTS = [
  { name: "⚛️ Post-Quantum Lattice-Encrypted Institutional Vault", minUsd: 100, tag: "Quantum-Safe Security" },
  { name: "🏛️ Sovereign Gold-Backed Digital Treasury Bond (19.4% APY)", minUsd: 250, tag: "Central Bank Grade" },
  { name: "💱 Intercontinental FX Liquidity Pool (RWF / USD / EUR / JPY)", minUsd: 150, tag: "0.01% Institutional Spread" },
  { name: "🚀 Deep-Space Satellite & Rare-Earth Resource Index", minUsd: 80, tag: "Future Frontier ETF" },
];

export default function QuantumSovereignHub({ rates = {}, theme, panel }) {
  const [inst, setInst] = useState(SOVEREIGN_INSTRUMENTS);
  const [vaultCode, setVaultCode] = useState("QNT-KGL-992041 · Sovereign");
  const [qMsg, setQMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeSovereignOrder(e) {
    e.preventDefault();
    const sig = "QSEAL-" + Math.random().toString(36).substring(2, 11).toUpperCase();
    setQMsg(`⚛️ QUANTUM SOVEREIGN EXECUTED [${sig}]: "${inst.name}" locked for ${vaultCode} · $${inst.minUsd} USD (${Math.round(inst.minUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="quantum-sovereign-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚛️ Quantum Cryptography, Sovereign Treasury Bonds & Intercontinental FX (25B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Quantum-resistant vaults, gold-backed sovereign bonds & central-bank FX pools in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          25,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {SOVEREIGN_INSTRUMENTS.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setInst(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${inst.name === s.name ? "#8b5cf6" : theme.border}`,
              background: inst.name === s.name ? "rgba(139,92,246,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${s.minUsd} USD ({Math.round(s.minUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeSovereignOrder} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={vaultCode} onChange={(e) => setVaultCode(e.target.value)} placeholder="Sovereign Vault ID / Institutional Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          ⚛️ Execute Quantum Order ({Math.round(inst.minUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {qMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{qMsg}</div>}
    </section>
  );
}
