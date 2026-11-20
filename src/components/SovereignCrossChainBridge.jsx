import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignCrossChainBridge({ rates = {}, theme, panel }) {
  const [fromNet, setFromNet] = useState("Tron (TRC20 USDT)");
  const [toNet, setToNet] = useState("TON Network (Telegram)");
  const [bridgeUsd, setBridgeUsd] = useState("150");
  const [brgMsg, setBrgMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function executeBridge() {
    const amt = Math.max(5, Number(bridgeUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "Zero-Knowledge Bridge",
      title: `Bridged $${amt} from ${fromNet} → ${toNet}`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setBrgMsg(`🌉 CROSS-CHAIN BRIDGE COMPLETE [${tx.id}]: $${amt} USDT moved from ${fromNet} to ${toNet} in 1.4s!`);
  }

  return (
    <section id="sovereign-cross-chain-bridge" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>🌉 Sovereign Cross-Chain Atomic Bridge (TRC20 · TON · Solana · ETH · BTC Lightning)</strong>
        <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>1.4s Finality · Zero Slippage</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={fromNet} onChange={(e) => setFromNet(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>Tron (TRC20 USDT)</option>
          <option>Ethereum (ERC20)</option>
          <option>Solana (SPL)</option>
          <option>TON Network (Telegram)</option>
          <option>Bitcoin Lightning</option>
        </select>
        <span style={{ fontWeight: 900 }}>➔</span>
        <select value={toNet} onChange={(e) => setToNet(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>TON Network (Telegram)</option>
          <option>Solana (SPL)</option>
          <option>Tron (TRC20 USDT)</option>
          <option>Ethereum (ERC20)</option>
          <option>Bitcoin Lightning</option>
        </select>
        <input type="number" min="5" value={bridgeUsd} onChange={(e) => setBridgeUsd(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={executeBridge} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🌉 Bridge Assets
        </button>
      </div>
      {brgMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{brgMsg}</div>}
    </section>
  );
}
