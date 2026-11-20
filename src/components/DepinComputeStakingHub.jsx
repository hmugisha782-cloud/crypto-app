import { useState } from "react";

const DEPIN_NODES = [
  { name: "☀️ Kigali Solar Micro-Grid Node #RW-01", apy: 0.185, tier: "Green Energy · 18.5% APY" },
  { name: "🖥️ NVIDIA H100 AI GPU Compute Cluster", apy: 0.24, tier: "AI Cloud · 24.0% APY" },
  { name: "📡 East Africa 5G / LoRaWAN Relay", apy: 0.152, tier: "Telecom DePIN · 15.2% APY" },
  { name: "🛰️ LEO Satellite Edge Validator", apy: 0.198, tier: "Space Mesh · 19.8% APY" },
];

export default function DepinComputeStakingHub({ rates = {}, theme, panel }) {
  const [selectedNode, setSelectedNode] = useState(DEPIN_NODES[0]);
  const [stakeUsd, setStakeUsd] = useState("500");
  const [stakeFeedback, setStakeFeedback] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const amt = Math.max(10, Number(stakeUsd) || 500);
  const yearlyUsd = (amt * selectedNode.apy).toFixed(2);
  const monthlyRwf = Math.round(((amt * selectedNode.apy) / 12) * rwfRate);

  function activateNodeStake(e) {
    e.preventDefault();
    setStakeFeedback(`⚡ NODE ACTIVATED: Staked $${amt.toLocaleString()} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) on ${selectedNode.name} · Est. Monthly Yield: ${monthlyRwf.toLocaleString()} RWF/mo!`);
  }

  return (
    <section id="depin-compute-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #14b8a6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚡ DePIN AI GPU Compute, Kigali Solar Grid & Satellite Staking (330M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy capital into decentralized physical infrastructure nodes with daily RWF & USDT yield payouts.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(20,184,166,0.18)", color: "#2dd4bf", fontWeight: 800, fontSize: 11 }}>
          Est. Return: ${yearlyUsd}/yr ({monthlyRwf.toLocaleString()} RWF/mo)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {DEPIN_NODES.map((n) => (
          <button
            key={n.name}
            type="button"
            onClick={() => setSelectedNode(n)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${selectedNode.name === n.name ? "#14b8a6" : theme.border}`,
              background: selectedNode.name === n.name ? "rgba(20,184,166,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{n.name}</strong>
            <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>{n.tier}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateNodeStake} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" value={stakeUsd} onChange={(e) => setStakeUsd(e.target.value)} placeholder="Stake Amount (USD)" style={{ width: 140, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#14b8a6", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          ⚡ Activate DePIN Node Stake
        </button>
      </form>

      {stakeFeedback && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{stakeFeedback}</div>}
    </section>
  );
}
