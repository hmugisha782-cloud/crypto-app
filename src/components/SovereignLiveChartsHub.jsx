import { useState, useEffect } from "react";
import { getLiveMarketSnapshot, startLiveMarketEngine } from "../utils/liveMarketStore.js";

const HISTORY_SEEDS = {
  "BTC/USDT": [63800, 64250, 64100, 64680, 64950, 64820, 65190],
  "ETH/USDT": [1790, 1805, 1798, 1816, 1824, 1819, 1835],
  "PAXG/USDT": [2715, 2722, 2719, 2730, 2736, 2733, 2742],
  "SOL/USDT": [72.1, 73.0, 72.6, 74.2, 74.9, 74.5, 75.8],
};

export default function SovereignLiveChartsHub({ theme, panel }) {
  const [snap, setSnap] = useState(getLiveMarketSnapshot);
  const [activeSym, setActiveSym] = useState("BTC/USDT");
  const [timeframe, setTimeframe] = useState("24H");

  useEffect(() => {
    startLiveMarketEngine();
    const sync = () => setSnap(getLiveMarketSnapshot());
    window.addEventListener("kgt-market-tick", sync);
    return () => window.removeEventListener("kgt-market-tick", sync);
  }, []);

  const keys = ["BTC/USDT", "ETH/USDT", "PAXG/USDT", "SOL/USDT"];
  const asset = snap.prices[activeSym] || snap.prices["BTC/USDT"];
  const pts = [...(HISTORY_SEEDS[activeSym] || []), asset.price];
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = Math.max(0.01, max - min);

  const svgPoints = pts
    .map((val, i) => {
      const x = 16 + (i * 568) / (pts.length - 1);
      const y = 115 - ((val - min) / span) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section id="sovereign-live-charts-hub" style={{ ...panel, marginBottom: 18, borderTop: `4px solid ${asset.color}`, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>📊 Live Institutional Market Telemetry & Real-Time Price Charts</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>
            Streaming live ticks every 3s · Benchmark: 1 USD = {snap.rwfRate.toLocaleString()} RWF
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["1H", "24H", "7D", "1M", "1Y"].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              style={{
                padding: "4px 9px",
                borderRadius: 6,
                border: timeframe === tf ? `1px solid ${asset.color}` : `1px solid ${theme.border}`,
                background: timeframe === tf ? asset.color : theme.input,
                color: timeframe === tf ? "#02131d" : theme.text,
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {keys.map((k) => {
          const a = snap.prices[k];
          const up = a.chg >= 0;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActiveSym(k)}
              style={{
                flex: 1,
                minWidth: 140,
                padding: "8px 10px",
                borderRadius: 10,
                border: activeSym === k ? `2px solid ${a.color}` : `1px solid ${theme.border}`,
                background: theme.input,
                color: theme.text,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 11, color: theme.muted, display: "block" }}>{a.name} ({k})</span>
              <strong style={{ fontSize: 13 }}>${a.price.toLocaleString()}</strong>
              <span style={{ fontSize: 11, color: up ? "#34d399" : "#f87171", fontWeight: 800, marginLeft: 6 }}>
                {up ? `+${a.chg}%` : `${a.chg}%`}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: 10, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
          <strong>{asset.name} ({timeframe} Live Feed)</strong>
          <strong style={{ color: asset.color }}>${asset.price.toLocaleString()} ({Math.round(asset.price * snap.rwfRate).toLocaleString()} RWF)</strong>
        </div>
        <svg viewBox="0 0 600 130" style={{ width: "100%", height: 130, display: "block" }}>
          <defs>
            <linearGradient id="kgtChartFillLive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={asset.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={asset.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <polygon points={`16,122 ${svgPoints} 584,122`} fill="url(#kgtChartFillLive)" />
          <polyline fill="none" stroke={asset.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={svgPoints} />
        </svg>
      </div>
    </section>
  );
}
