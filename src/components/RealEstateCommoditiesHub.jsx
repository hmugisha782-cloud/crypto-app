import { useState } from "react";

const RWA_ASSETS = [
  { name: "🏢 Kigali Innovation City Tech Tower (REIT)", yieldRate: 0.148, unit: "$50 / Share" },
  { name: "🏡 Nyarutarama Executive Villas Fractional", yieldRate: 0.132, unit: "$25 / Share" },
  { name: "🥇 24K Swiss & Rwanda Refined Gold Vault", yieldRate: 0.118, unit: "$2,745 / oz" },
  { name: "☕ Rwanda Bourbon Coffee & Tea Export Pool", yieldRate: 0.165, unit: "$10 / Lot" },
];

export default function RealEstateCommoditiesHub({ rates = {}, theme, panel }) {
  const [asset, setAsset] = useState(RWA_ASSETS);
  const [investUsd, setInvestUsd] = useState("300");
  const [buyMsg, setBuyMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const usd = Math.max(10, Number(investUsd) || 300);
  const annualRwf = Math.round(usd * asset.yieldRate * rwfRate);

  function buyFraction(e) {
    e.preventDefault();
    setBuyMsg(`🏠 RWA PURCHASED: Invested $${usd.toLocaleString()} USD (${Math.round(usd * rwfRate).toLocaleString()} RWF) in ${asset.name} · Est. Annual Dividend: ${annualRwf.toLocaleString()} RWF/yr!`);
  }

  return (
    <section id="real-estate-commodities" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏠 Kigali Tokenized Real Estate, Gold Vault & Export Commodities (360M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Fractional ownership in Kigali commercial real estate, 24K gold reserves & Rwandan agricultural export pools.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          Est. Dividend: {annualRwf.toLocaleString()} RWF/yr
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {RWA_ASSETS.map((a) => (
          <button
            key={a.name}
            type="button"
            onClick={() => setAsset(a)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${asset.name === a.name ? "#f59e0b" : theme.border}`,
              background: asset.name === a.name ? "rgba(245,158,11,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{a.name}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700 }}>{(a.yieldRate * 100).toFixed(1)}% APY · {a.unit}</span>
          </button>
        ))}
      </div>

      <form onSubmit={buyFraction} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" value={investUsd} onChange={(e) => setInvestUsd(e.target.value)} placeholder="Amount (USD)" style={{ width: 140, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🏠 Buy Fractional Shares ({Math.round(usd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {buyMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{buyMsg}</div>}
    </section>
  );
}
