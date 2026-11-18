export default function LiveGlobalTickerStrip({ rates = {}, theme }) {
  const rwf = Number(rates?.RWF || 1480);
  const items = [
    `₿ BTC $64,972 (+1.45%)`,
    `Ξ ETH $1,815 (-0.82%)`,
    `◎ SOL $73.82 (+3.18%)`,
    `🇷🇼 1 USD = ${rwf.toLocaleString()} RWF`,
    `🥇 Gold PAXG $2,745.50 (+1.18%)`,
    `🇪🇸 LaLiga: Real Madrid vs Barcelona (2.15 / 3.55 / 3.05)`,
    `🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL: Man City vs Arsenal (2.10 / 3.50 / 3.25)`,
    `🇷🇼 Rwanda PL: APR FC vs Rayon Sports (2.10 / 3.05 / 3.65)`,
    `⚡ 120,000,000+ Active Modules · 99.99% SLA`,
  ];

  return (
    <div style={{
      padding: "7px 12px",
      marginBottom: 14,
      borderRadius: 10,
      background: "linear-gradient(90deg, rgba(6,182,212,0.14), rgba(16,185,129,0.14), rgba(245,158,11,0.14))",
      border: `1px solid ${theme.border}`,
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 800,
    }}>
      {items.map((it) => (
        <span key={it} style={{ whiteSpace: "nowrap" }}>{it}</span>
      ))}
    </div>
  );
}
