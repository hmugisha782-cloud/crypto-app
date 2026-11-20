import { useState } from "react";

const BIOMETRIC_SYSTEMS = [
  { name: "👁️ Iris & Palm-Vein Quantum Sovereign Bank Vault", feeUsd: 75, tag: "Biometric Zero-PIN" },
  { name: "🌐 250-Trillion-Node Cross-Continental Settlement Engine", feeUsd: 165, tag: "250T Master Network" },
  { name: "🥽 Holographic 3D Trading Floor & Executive War-Room", feeUsd: 130, tag: "Spatial FinTech OS" },
  { name: "💎 Sovereign Multi-Currency 21.5% APY Treasury Reserve", feeUsd: 210, tag: "RWF / USD / Gold" },
];

export default function QuantumBiometricBankingHub({ rates = {}, theme, panel }) {
  const [bioSys, setBioSys] = useState(BIOMETRIC_SYSTEMS);
  const [vaultHandle, setVaultHandle] = useState("QBIO-250T-KIGALI · Sovereign");
  const [bioBankMsg, setBioBankMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateBioBanking(e) {
    e.preventDefault();
    const sig = "KGT-250T-" + Math.floor(100000 + Math.random() * 900000);
    setBioBankMsg(`🌌 250-TRILLION BIOMETRIC BANKING ACTIVE [${sig}]: "${bioSys.name}" linked to ${vaultHandle} · Paid $${bioSys.feeUsd} USD (${Math.round(bioSys.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="quantum-biometric-banking" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌌 Quantum Biometric Banking, Holographic Trading Floor & 250T Hyper-Cluster</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Unlock palm-vein quantum vaults, holographic trading rooms & 250-trillion settlement in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          250,000,000,000,000+ Active Modules (250 TRILLION)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {BIOMETRIC_SYSTEMS.map((b) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setBioSys(b)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${bioSys.name === b.name ? "#8b5cf6" : theme.border}`,
              background: bioSys.name === b.name ? "rgba(139,92,246,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{b.name}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${b.feeUsd} USD ({Math.round(b.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{b.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateBioBanking} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={vaultHandle} onChange={(e) => setVaultHandle(e.target.value)} placeholder="Biometric Vault ID / Sovereign Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌌 Activate 250T Biometric Vault ({Math.round(bioSys.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {bioBankMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{bioBankMsg}</div>}
    </section>
  );
}
