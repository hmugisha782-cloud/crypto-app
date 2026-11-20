import { useState, useEffect } from "react";
import { getWalletState, getLedgerTxs } from "../utils/sovereignLedger.js";
import { getLiveMarketSnapshot } from "../utils/liveMarketStore.js";

export default function SovereignPortfolioAnalytics({ theme, panel }) {
  const [wallet, setWallet] = useState(getWalletState);
  const [snap, setSnap] = useState(getLiveMarketSnapshot);
  const [txCount, setTxCount] = useState(() => getLedgerTxs().length);

  useEffect(() => {
    const syncWallet = () => {
      setWallet(getWalletState());
      setTxCount(getLedgerTxs().length);
    };
    const syncMarket = () => setSnap(getLiveMarketSnapshot());
    window.addEventListener("kgt-wallet-updated", syncWallet);
    window.addEventListener("kgt-market-tick", syncMarket);
    return () => {
      window.removeEventListener("kgt-wallet-updated", syncWallet);
      window.removeEventListener("kgt-market-tick", syncMarket);
    };
  }, []);

  const btcUsd = wallet.btc * (snap.prices["BTC/USDT"]?.price || 65420);
  const ethUsd = wallet.eth * (snap.prices["ETH/USDT"]?.price || 1842);
  const solUsd = (wallet.sol || 0) * (snap.prices["SOL/USDT"]?.price || 76.4);
  const goldUsd = (wallet.paxg || 0) * (snap.prices["PAXG/USDT"]?.price || 2748.9);
  const cryptoAndGoldUsd = Number((btcUsd + ethUsd + solUsd + goldUsd).toFixed(2));
  const totalNetWorthUsd = Number((wallet.usd + cryptoAndGoldUsd + wallet.totalYieldEarnedUsd).toFixed(2));

  const cashPct = Math.max(5, Math.round((wallet.usd / Math.max(1, totalNetWorthUsd)) * 100));
  const assetPct = Math.max(5, Math.round((cryptoAndGoldUsd / Math.max(1, totalNetWorthUsd)) * 100));
  const yieldPct = Math.max(2, 100 - cashPct - assetPct);

  const slices = [
    { label: "💵 Liquid USDT & RWF Cash", pct: cashPct, color: "#10b981", val: `$${wallet.usd.toLocaleString()}` },
    { label: `₿ Crypto & 24K Gold (${wallet.btc} BTC · ${(wallet.paxg || 0).toFixed(2)} PAXG)`, pct: assetPct, color: "#f59e0b", val: `$${cryptoAndGoldUsd.toLocaleString()}` },
    { label: "📈 Automated Staking & Cashback", pct: yieldPct, color: "#38bdf8", val: `+$${wallet.totalYieldEarnedUsd.toLocaleString()}` },
  ];

  return (
    <section id="sovereign-portfolio-analytics" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>💎 Live Multi-Asset Net-Worth & Portfolio Valuation</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>
            Live mark-to-market across {wallet.btc} BTC, {wallet.eth} ETH, {wallet.sol || 0} SOL & {(wallet.paxg || 0).toFixed(2)} PAXG Gold ({txCount} receipts)
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <strong style={{ fontSize: 16, color: "#34d399", display: "block" }}>${totalNetWorthUsd.toLocaleString()} USD</strong>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#7dd3fc" }}>≈ {Math.round(totalNetWorthUsd * snap.rwfRate).toLocaleString()} RWF</span>
        </div>
      </div>

      <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", background: theme.input }}>
        {slices.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color, transition: "width 0.35s ease" }} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {slices.map((s) => (
          <div key={s.label} style={{ padding: 8, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5 }}>
            <span><span style={{ color: s.color, fontWeight: 900 }}>●</span> {s.label}</span>
            <strong>{s.val} ({s.pct}%)</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
