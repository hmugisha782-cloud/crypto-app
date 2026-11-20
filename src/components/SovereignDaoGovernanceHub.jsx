import { useState } from "react";

export default function SovereignDaoGovernanceHub({ theme, panel }) {
  const [proposals, setProposals] = useState([
    { id: "KIP-01", title: "Expand Gatsibo & Kigali EV Moto Swap Stations by +500 Hubs", yes: 94.2, voted: false },
    { id: "KIP-02", title: "Increase RWF Sovereign Savings Vault APY from 18.5% to 19.5%", yes: 97.8, voted: false },
  ]);

  function voteYes(id) {
    setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, yes: Number(Math.min(99.9, p.yes + 0.3).toFixed(1)), voted: true } : p)));
  }

  return (
    <section id="sovereign-dao-governance-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>🗳️ Kigali Global Sovereign DAO Governance & Ecosystem Voting</strong>
        <span style={{ fontSize: 11.5, color: "#c4b5fd", fontWeight: 800 }}>On-Chain Quadratic Voting</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {proposals.map((p) => (
          <div key={p.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <strong style={{ fontSize: 12 }}>[{p.id}] {p.title}</strong>
              <span style={{ display: "block", fontSize: 11, color: "#34d399", fontWeight: 800 }}>Approval: {p.yes}% YES</span>
            </div>
            <button type="button" onClick={() => voteYes(p.id)} disabled={p.voted} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: p.voted ? "#475569" : "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11.5, cursor: p.voted ? "default" : "pointer" }}>
              {p.voted ? "✅ Vote Recorded" : "🗳️ Vote YES"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
