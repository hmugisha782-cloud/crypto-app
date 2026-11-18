export default function LiveAiSignalsBoard({ coins = [], rates = {}, theme, panel }) {
  const rwfRate = Number(rates?.RWF || 1480);

  const fallbackCoins = [
    { symbol: "BTC", name: "Bitcoin", current_price: 64972, price_change_percentage_24h: 1.45 },
    { symbol: "ETH", name: "Ethereum", current_price: 1815, price_change_percentage_24h: -0.82 },
    { symbol: "SOL", name: "Solana", current_price: 73.82, price_change_percentage_24h: 3.18 },
    { symbol: "BNB", name: "BNB", current_price: 591.67, price_change_percentage_24h: 0.94 },
  ];

  const list = (coins && coins.length ? coins : fallbackCoins).slice(0, 4);

  return (
    <section style={{ ...panel, marginBottom: 20, borderLeft: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>📡 KGT Omni-AI Live Trading Signals & Risk Management Targets</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Algorithmic entry zones, Take-Profit (+8%) targets, and Stop-Loss (-4%) protection levels calculated in real time.
          </p>
        </div>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: "rgba(139, 92, 246, 0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          AI Quant Engine Active
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
        {list.map((c) => {
          const sym = String(c.symbol || "").toUpperCase();
          const px = Number(c.current_price || c.price || 0);
          const chg = Number(c.price_change_percentage_24h || 0);
          const signal = chg >= 1.5 ? "STRONG BUY" : chg >= 0 ? "ACCUMULATE" : "WATCH DIP";
          const sigColor = chg >= 1.5 ? "#10b981" : chg >= 0 ? "#06b6d4" : "#f59e0b";
          const tp = px * 1.08;
          const sl = px * 0.96;

          return (
            <div key={sym} style={{ padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: 14 }}>{c.name} ({sym})</strong>
                <span style={{ padding: "2px 8px", borderRadius: 6, background: `${sigColor}22`, color: sigColor, fontSize: 10, fontWeight: 800 }}>
                  {signal}
                </span>
              </div>
              <div style={{ fontSize: 12 }}>
                Entry: <strong>{"$"}{px.toLocaleString()}</strong> <span style={{ color: theme.muted }}>({Math.round(px * rwfRate).toLocaleString()} RWF)</span>
              </div>
              <div style={{ fontSize: 11, color: "#10b981" }}>
                🎯 Take-Profit (+8%): <strong>{"$"}{tp.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ fontSize: 11, color: "#ef4444" }}>
                🛡️ Stop-Loss (-4%): <strong>{"$"}{sl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
