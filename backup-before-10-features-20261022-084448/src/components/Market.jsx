
export default function Market({
  coins,
  filteredCoins,
  sortedMovers,
  theme,
  panel,
  button,
  field,
  search,
  setSearch,
  sortBy,
  setSortBy,
  watchOnly,
  setWatchOnly,
  watchlist,
  setWatchlist,
  setSelectedCoinId,
  setActiveTab,
  fmt,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 17,
        }}
      >
        <input
          style={{ ...field, flex: "1 1 240px" }}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="⌕ Search Bitcoin, ETH, Dogecoin..."
          aria-label="Search cryptocurrencies"
        />

        <select
          style={{ ...field, flex: "0 1 220px" }}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort cryptocurrencies"
        >
          <option value="market">Default order</option>
          <option value="name">Name: A to Z</option>
          <option value="price-high">Price: High to low</option>
          <option value="price-low">Price: Low to high</option>
          <option value="gainers">Biggest gainers</option>
          <option value="losers">Biggest losers</option>
        </select>

        <button
          style={button(!watchOnly)}
          onClick={() => setWatchOnly(false)}
        >
          All coins ({coins.length})
        </button>

        <button
          style={button(watchOnly)}
          onClick={() => setWatchOnly(true)}
        >
          ★ Watchlist ({watchlist.length})
        </button>
      </div>

      <section className="grid" style={{ marginBottom: 26 }}>
        {filteredCoins.map((coin) => {
          const up = coin.direction === "up";
          const down = coin.direction === "down";

          const priceColor = up
            ? "#00e6a0"
            : down
              ? "#ff526c"
              : theme.text;

          const positive = coin.change >= 0;
          const recent = coin.history.slice(-35);
          const low = Math.min(...recent, coin.price);
          const high = Math.max(...recent, coin.price);
          const range = high - low || 1;

          return (
            <article
              key={coin.id}
              style={{
                ...panel,
                borderColor: up
                  ? "#00b981"
                  : down
                    ? "#f05268"
                    : theme.border,
                transition: "border-color .3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 11,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 43,
                      height: 43,
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: `${coin.color}25`,
                      color: coin.color,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 25,
                    }}
                  >
                    {coin.icon}
                  </div>

                  <div>
                    <strong>{coin.name}</strong>
                    <p
                      style={{
                        color: theme.muted,
                        margin: "5px 0 0",
                        fontSize: 12,
                      }}
                    >
                      {coin.symbol} / USDT
                    </p>
                  </div>
                </div>

                <button
                  title="Toggle watchlist"
                  aria-label={`Toggle ${coin.name} watchlist`}
                  onClick={() =>
                    setWatchlist((old) =>
                      old.includes(coin.id)
                        ? old.filter((id) => id !== coin.id)
                        : [...old, coin.id]
                    )
                  }
                  style={{
                    background: "transparent",
                    border: 0,
                    color: watchlist.includes(coin.id)
                      ? "#fbbf24"
                      : theme.muted,
                    cursor: "pointer",
                    fontSize: 24,
                  }}
                >
                  {watchlist.includes(coin.id) ? "★" : "☆"}
                </button>
              </div>

              <h2
                className="coin-price"
                style={{
                  color: priceColor,
                  margin: "24px 0 8px",
                }}
              >
                {coin.price ? `$${fmt(coin.price)}` : "Loading price..."}
                {up ? " ↑" : down ? " ↓" : ""}
              </h2>

              <span
                style={{
                  color: positive ? "#00e6a0" : "#ff526c",
                  background: positive ? "#00e6a018" : "#ff526c18",
                  borderRadius: 6,
                  padding: "6px 9px",
                  fontSize: 12,
                }}
              >
                {positive ? "▲" : "▼"} {fmt(Math.abs(coin.change))}% (24h)
              </span>

              <div
                style={{
                  height: 46,
                  display: "flex",
                  alignItems: "end",
                  gap: 3,
                  marginTop: 15,
                  overflow: "hidden",
                }}
              >
                {recent.length > 1 ? (
                  recent.map((price, index) => (
                    <span
                      key={index}
                      style={{
                        flex: 1,
                        minWidth: 2,
                        height: `${7 + ((price - low) / range) * 37}px`,
                        borderRadius: "3px 3px 0 0",
                        background: priceColor,
                        opacity: 0.45 + (index / recent.length) * 0.55,
                      }}
                    />
                  ))
                ) : (
                  <small style={{ color: theme.muted }}>
                    Collecting live price history...
                  </small>
                )}
              </div>

              <p
                style={{
                  color: priceColor,
                  fontSize: 11,
                  marginBottom: 0,
                }}
              >
                {up
                  ? "▲ Price increased since last update"
                  : down
                    ? "▼ Price decreased since last update"
                    : "● Waiting for price movement"}
              </p>

              <button
                style={{ ...button(), width: "100%", marginTop: 13 }}
                onClick={() => {
                  setSelectedCoinId(coin.id);
                  setActiveTab("charts");
                }}
              >
                View chart
              </button>
            </article>
          );
        })}
      </section>

      {filteredCoins.length === 0 && (
        <p style={{ color: theme.muted, marginBottom: 26 }}>
          No coins found. Try another search or choose All coins.
        </p>
      )}

      <section style={{ ...panel, marginBottom: 22 }}>
        <h2 style={{ marginTop: 0, fontSize: 19 }}>
          ↗ Market Movers (24h)
        </h2>

        {sortedMovers.map((coin, index) => (
          <div
            key={coin.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <span style={{ color: theme.muted, minWidth: 22 }}>
              {index + 1}.
            </span>

            <span style={{ flex: 1 }}>
              {coin.icon} {coin.name}{" "}
              <small style={{ color: theme.muted }}>
                {coin.symbol}
              </small>
            </span>

            <strong
              style={{
                color: coin.change >= 0 ? "#00e6a0" : "#ff526c",
              }}
            >
              {coin.change >= 0 ? "+" : ""}
              {fmt(coin.change)}%
            </strong>
          </div>
        ))}
      </section>
    </>
  );
}
