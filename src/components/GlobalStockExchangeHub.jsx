import { useState } from "react";

const STOCK_MARKETS = [
  { name: "🇷🇼 RSE Rwanda Basket (BK Group, MTN Rwanda, Bralirwa, I&M)", priceUsd: 50, tag: "Kigali Stock Exchange" },
  { name: "🇺🇸 NASDAQ AI Titans (NVIDIA, Apple, Microsoft, Alphabet)", priceUsd: 150, tag: "Wall Street Tech ETF" },
  { name: "🌍 S&P 500 & Global Dividend Aristocrats Index", priceUsd: 100, tag: "Institutional Equity" },
  { name: "🏛️ Sovereign Treasury Repo & Overnight Liquidity Pool", priceUsd: 250, tag: "17.8% Annualized Yield" },
];

export default function GlobalStockExchangeHub({ rates = {}, theme, panel }) {
  const [stock, setStock] = useState(STOCK_MARKETS);
  const [investorId, setInvestorId] = useState("CSD-RW-884019 · Active");
  const [stockMsg, setStockMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function buyEquityOrder(e) {
    e.preventDefault();
    const ref = "KGT-EQT-" + Math.floor(100000 + Math.random() * 900000);
    setStockMsg(`📈 STOCK & ETF SETTLED [${ref}]: "${stock.name}" credited to ${investorId} · Paid $${stock.priceUsd} USD (${Math.round(stock.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="global-stock-exchange" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📈 Global Stock Exchange (Rwanda RSE, NYSE, NASDAQ) & Sovereign ETFs (250B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Buy fractional shares of BK Group, MTN Rwanda, Bralirwa, NVIDIA, Apple & S&P 500 in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          250,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {STOCK_MARKETS.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setStock(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${stock.name === s.name ? "#10b981" : theme.border}`,
              background: stock.name === s.name ? "rgba(16,185,129,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${s.priceUsd} USD ({Math.round(s.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={buyEquityOrder} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={investorId} onChange={(e) => setInvestorId(e.target.value)} placeholder="CSD Account / Brokerage ID" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          📈 Buy Shares ({Math.round(stock.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {stockMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{stockMsg}</div>}
    </section>
  );
}
