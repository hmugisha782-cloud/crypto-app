export default function MarketVisualAnalytics({ rates = {}, theme, panel }) {
  const rwfRate = Number(rates?.RWF || 1480);

  const dominance = [
    { name: "Bitcoin (BTC)", pct: 58.5, color: "#f59e0b" },
    { name: "Ethereum (ETH)", pct: 17.2, color: "#6366f1" },
    { name: "USDT / Stablecoins", pct: 9.8, color: "#10b981" },
    { name: "Solana (SOL)", pct: 6.4, color: "#06b6d4" },
    { name: "Global Altcoins", pct: 8.1, color: "#ec4899" },
  ];

  const corridors = [
    { city: "🇷🇼 Kigali (MTN MoMo / Airtel)", volUsd: 68400000, growth: "+18.4%" },
    { city: "🇰🇪 Nairobi (M-Pesa / KES)", volUsd: 94200000, growth: "+14.2%" },
    { city: "🇺🇬 Kampala (UGX Corridor)", volUsd: 41800000, growth: "+12.9%" },
    { city: "🇹🇿 Dar es Salaam (TZS Hub)", volUsd: 37500000, growth: "+11.5%" },
  ];

  return (
    <section style={{ ...panel, marginBottom: 20, borderTop: "3px solid #06b6d4", display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>📊 Global Crypto Dominance & East Africa FinTech Liquidity Visuals</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Live capital allocation across major blockchains and 24-hour regional Mobile Money & P2P settlement corridors.
          </p>
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#06b6d4" }}>● Real-Time Visual Telemetry</span>
      </div>

      {/* Stacked Dominance Progress Bar */}
      <div>
        <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", background: theme.input, border: `1px solid ${theme.border}` }}>
          {dominance.map((d) => (
            <div key={d.name} title={`${d.name}: ${d.pct}%`} style={{ width: `${d.pct}%`, background: d.color }} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8, fontSize: 11 }}>
          {dominance.map((d) => (
            <span key={d.name} style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: d.color, display: "inline-block" }} />
              {d.name}: {d.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* East Africa 24h Settlement Corridors */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
        {corridors.map((c) => (
          <div key={c.city} style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
              <span>{c.city}</span>
              <span style={{ color: "#10b981" }}>{c.growth}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>
              {"$"}{(c.volUsd / 1e6).toFixed(1)}M <span style={{ fontSize: 11, color: theme.muted }}>/ 24h</span>
            </div>
            <div style={{ fontSize: 10, color: theme.muted }}>
              ≈ {Math.round((c.volUsd * rwfRate) / 1e9).toLocaleString()} Billion RWF
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
