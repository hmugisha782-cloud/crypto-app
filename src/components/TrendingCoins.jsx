
export default function TrendingCoins({
  activeTab,
  coins = [],
  theme,
  panel,
  fmt,
  setSelectedCoinId,
  setActiveTab,
}) {
  if (activeTab !== "market") return null;

  const pricedCoins = coins.filter(
    (coin) => Number(coin.price) > 0
  );

  const gainers = [...pricedCoins]
    .filter((coin) => Number(coin.change) > 0)
    .sort((a, b) => Number(b.change) - Number(a.change))
    .slice(0, 5);

  const losers = [...pricedCoins]
    .filter((coin) => Number(coin.change) < 0)
    .sort((a, b) => Number(a.change) - Number(b.change))
    .slice(0, 5);

  const renderList = (title, items, positive) => (
    <section style={{ ...panel, minWidth: 0 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      {items.length === 0 ? (
        <p style={{ color: theme.muted, fontSize: 13 }}>
          Waiting for live market prices...
        </p>
      ) : (
        items.map((coin) => (
          <button
            key={coin.id}
            type="button"
            onClick={() => {
              setSelectedCoinId(coin.id);
              setActiveTab("charts");
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "12px 0",
              border: "none",
              borderBottom: `1px solid ${theme.border || "#334155"}`,
              background: "transparent",
              color: theme.text,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>
              <strong>{coin.icon} {coin.symbol}</strong>
              <span
                style={{
                  display: "block",
                  color: theme.muted,
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                {coin.name}
              </span>
            </span>

            <span style={{ textAlign: "right" }}>
              <strong style={{ color: positive ? "#22c55e" : "#ef4444" }}>
                {positive ? "+" : ""}{fmt(coin.change)}%
              </strong>
              <span
                style={{
                  display: "block",
                  color: theme.muted,
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                ${fmt(coin.price, 2)}
              </span>
            </span>
          </button>
        ))
      )}
    </section>
  );

  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: 19, marginBottom: 14 }}>
        Top Gainers &amp; Losers
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: 16,
        }}
      >
        {renderList("🚀 Top Gainers (24H)", gainers, true)}
        {renderList("📉 Top Losers (24H)", losers, false)}
      </div>
    </section>
  );
}
