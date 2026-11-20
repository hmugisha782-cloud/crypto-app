export default function SovereignRealTimeOrderBookDepth({ rates = {}, theme, panel }) {
  const rwfRate = Number(rates?.RWF || 1480);
  const asks = [
    { px: 65432.0, qty: 1.42, total: "$92,913" },
    { px: 65428.5, qty: 0.85, total: "$55,614" },
    { px: 65424.0, qty: 2.15, total: "$140,661" },
  ];
  const bids = [
    { px: 65420.5, qty: 3.10, total: "$202,803" },
    { px: 65416.0, qty: 1.75, total: "$114,478" },
    { px: 65411.5, qty: 4.20, total: "$274,728" },
  ];

  return (
    <section id="sovereign-realtime-orderbook-depth" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>📚 Institutional Level-2 Liquidity Order Book (BTC/USDT & USDT/RWF @ {rwfRate.toLocaleString()})</strong>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>Spread: $3.50 (0.005%) · Deep Liquidity</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        <div style={{ padding: 8, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}` }}>
          <strong style={{ fontSize: 11.5, color: "#34d399", display: "block", marginBottom: 4 }}>🟢 BIDS (Buy Orders)</strong>
          {bids.map((b) => (
            <div key={b.px} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "3px 0" }}>
              <span style={{ color: "#34d399", fontWeight: 800 }}>${b.px.toLocaleString()}</span>
              <span>{b.qty} BTC</span>
              <span style={{ color: theme.muted }}>{b.total}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 8, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}` }}>
          <strong style={{ fontSize: 11.5, color: "#f87171", display: "block", marginBottom: 4 }}>🔴 ASKS (Sell Orders)</strong>
          {asks.map((a) => (
            <div key={a.px} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "3px 0" }}>
              <span style={{ color: "#f87171", fontWeight: 800 }}>${a.px.toLocaleString()}</span>
              <span>{a.qty} BTC</span>
              <span style={{ color: theme.muted }}>{a.total}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
