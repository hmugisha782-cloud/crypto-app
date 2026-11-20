import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const VAULTS = [
  { id: "V-RWF", name: "🇷🇼 Sovereign RWF Treasury Yield Pool", term: "90 Days", apy: "18.8% APY" },
  { id: "V-USDT", name: "💵 Institutional USDT Liquidity Vault", term: "30 Days", apy: "16.4% APY" },
  { id: "V-ETH", name: "Ξ Ethereum 2.0 Validator Restaking", term: "180 Days", apy: "14.2% APY" },
  { id: "V-GOLD", name: "🥇 24K Gold Bullion Lease Yield", term: "365 Days", apy: "15.5% APY" },
];

export default function SovereignStakingYieldAggregator({ rates = {}, theme, panel }) {
  const [stakeUsd, setStakeUsd] = useState("200");
  const [stkMsg, setStkMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function lockStake(v) {
    const amt = Math.max(10, Number(stakeUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Sovereign Staking Vault",
      title: `Staked $${amt} in ${v.name} (${v.apy})`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setStkMsg(`🔒 STAKING VAULT LOCKED [${tx.id}]: $${amt} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF) in ${v.name} earning ${v.apy}!`);
  }

  return (
    <section id="sovereign-staking-yield-aggregator" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>🔒 High-Yield Sovereign Staking & Fixed-Term Vault Aggregator</strong>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700 }}>Stake Amount (USD):</span>
          <input type="number" min="10" value={stakeUsd} onChange={(e) => setStakeUsd(e.target.value)} style={{ width: 95, padding: "5px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {VAULTS.map((v) => (
          <div key={v.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{v.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>{v.apy} · Term: {v.term}</span>
            <button type="button" onClick={() => lockStake(v)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🔒 Stake Now
            </button>
          </div>
        ))}
      </div>
      {stkMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{stkMsg}</div>}
    </section>
  );
}
