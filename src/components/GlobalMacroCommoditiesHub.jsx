import { useState } from "react";

export default function GlobalMacroCommoditiesHub({ rates = {}, theme, panel }) {
  const [goldOz, setGoldOz] = useState("1");
  const rwfRate = Number(rates?.RWF || 1480);

  const assets = [
    { icon: "🥇", name: "Tokenized Gold (PAXG / 1 oz)", usd: 2745.50, chg: "+1.18%", pos: true },
    { icon: "🛢️", name: "Brent Crude Oil Index", usd: 76.40, chg: "+0.85%", pos: true },
    { icon: "🏛️", name: "US Treasury Bill (USDY 5.28% APY)", usd: 1.06, chg: "+0.02%", pos: true },
    { icon: "💶", name: "Euro Benchmark (EUR / RWF)", usd: 1.08, chg: "+0.31%", pos: true },
    { icon: "💷", name: "British Pound (GBP / RWF)", usd: 1.29, chg: "+0.44%", pos: true },
  ];

  const oz = Math.max(0, Number(goldOz) || 0);
  const goldTotalUsd = oz * 2745.5;
  const goldTotalRwf = Math.round(goldTotalUsd * rwfRate);

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>🌍 Global Macro, Tokenized Gold (PAXG), Commodities & Sovereign Yields</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Hedge inflation with 1:1 physical gold (PAXG), sovereign T-Bills, and major global currencies priced in RWF.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(234, 179, 8, 0.18)", color: "#facc15", fontWeight: 800, fontSize: 11 }}>
          🏆 Milestone: 215,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))", gap: 10 }}>
        {assets.map((a) => (
          <div key={a.name} style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800 }}>
              <span>{a.icon} {a.name}</span>
              <span style={{ color: "#10b981" }}>{a.chg}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 4 }}>{"$"}{a.usd.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: theme.muted }}>≈ {Math.round(a.usd * rwfRate).toLocaleString()} RWF</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 12 }}>
        <strong>🥇 Gold Inflation Hedge Calculator (PAXG oz):</strong>
        <input
          type="number"
          step="0.1"
          value={goldOz}
          onChange={(e) => setGoldOz(e.target.value)}
          style={{ width: 90, padding: "6px 9px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text }}
        />
        <span>
          = <strong style={{ color: "#facc15" }}>{"$"}{goldTotalUsd.toLocaleString()}</strong> (<strong>{goldTotalRwf.toLocaleString()} RWF</strong>)
        </span>
      </div>
    </section>
  );
}
