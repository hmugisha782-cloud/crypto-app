import { useState, useEffect } from "react";
import { getWalletState } from "../utils/sovereignLedger.js";
import { getLiveMarketSnapshot } from "../utils/liveMarketStore.js";

export default function SovereignAnalyticsChartHub({ rates = {}, theme, panel }) {
  const [w, setW] = useState(getWalletState);
  const [snap, setSnap] = useState(getLiveMarketSnapshot);
  const rwf = Number(rates?.RWF || snap.rwfRate || 1480);

  useEffect(() => {
    const syncW = () => setW(getWalletState());
    const syncM = () => setSnap(getLiveMarketSnapshot());
    window.addEventListener("kgt-wallet-updated", syncW);
    window.addEventListener("kgt-market-tick", syncM);
    return () => {
      window.removeEventListener("kgt-wallet-updated", syncW);
      window.removeEventListener("kgt-market-tick", syncM);
    };
  }, []);

  const btcUsd = (w.btc || 0) * (snap.prices["BTC/USDT"]?.price || 65420);
  const ethUsd = (w.eth || 0) * (snap.prices["ETH/USDT"]?.price || 3480);
  const goldUsd = (w.paxg || 0) * (snap.prices["PAXG/USDT"]?.price || 2685);
  const cashUsd = Number(w.usd || 0);
  const totalUsd = Math.max(1, cashUsd + btcUsd + ethUsd + goldUsd);

  const slices = [
    { label: "💵 Cash (USDT/RWF)", val: cashUsd, color: "#10b981" },
    { label: "₿ Bitcoin (BTC)", val: btcUsd, color: "#f59e0b" },
    { label: "Ξ Ethereum (ETH)", val: ethUsd, color: "#38bdf8" },
    { label: "🥇 24K Gold (PAXG)", val: goldUsd, color: "#eab308" },
  ];

  const months = [
    { m: "Jun", h: 38 }, { m: "Jul", h: 52 }, { m: "Aug", h: 61 },
    { m: "Sep", h: 74 }, { m: "Oct", h: 86 }, { m: "Nov", h: 100 },
  ];

  return (
    <section id="sovereign-analytics-chart-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>📈 Visual Portfolio Allocation & 6-Month Wealth Growth Analytics</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>
            Net Worth: <strong>${totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</strong> ({Math.round(totalUsd * rwf).toLocaleString()} RWF)
          </span>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.2)", color: "#7dd3fc", fontWeight: 900, fontSize: 11 }}>+24.8% ROI</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
        <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 12 }}>🥧 Asset Breakdown (Live Valuation)</strong>
          {slices.map((s) => {
            const pct = Math.min(100, Math.round((s.val / totalUsd) * 100));
            return (
              <div key={s.label} style={{ display: "grid", gap: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5 }}>
                  <span>{s.label}</span>
                  <strong>${s.val.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({pct}%)</strong>
                </div>
                <div style={{ height: 7, borderRadius: 999, background: "rgba(148,163,184,0.2)", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: s.color }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 12 }}>📊 6-Month Sovereign Treasury Growth</strong>
          <div style={{ height: 115, display: "flex", alignItems: "flex-end", gap: 10, paddingTop: 10 }}>
            {months.map((item) => (
              <div key={item.m} style={{ flex: 1, display: "grid", justifyItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: `${item.h}px`, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg, #10b981, #8b5cf6)" }} />
                <span style={{ fontSize: 10.5, color: theme.muted, fontWeight: 700 }}>{item.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
