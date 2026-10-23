
export default function DashboardOverview({
  theme,
  panel,
  cryptoLive,
  cryptoStatus,
  lastCrypto,
  ratesLive,
  lastRates,
  pricedCoins,
  coins,
  gainers,
  losers,
  topMover,
  statsLoading,
  globalStats,
  statsError,
  fmt,
}) {
  return (
    <>
      <section className="grid" style={{ marginBottom: 20 }}>
        <div style={panel}>
          <p style={{ color: theme.muted, margin: "0 0 9px" }}>
            CRYPTO CONNECTION
          </p>
          <strong style={{ color: cryptoLive ? "#22c55e" : "#fbbf24" }}>
            ● {cryptoStatus}
          </strong>
          <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
            {lastCrypto ? `Last update: ${lastCrypto}` : "Waiting for live data"}
          </p>
        </div>

        <div style={panel}>
          <p style={{ color: theme.muted, margin: "0 0 9px" }}>
            EXCHANGE RATES
          </p>
          <strong style={{ color: ratesLive ? "#22c55e" : "#fbbf24" }}>
            ● {ratesLive ? "Live rates connected" : "Using backup rates"}
          </strong>
          <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
            {lastRates ? `Last update: ${lastRates}` : "Refreshes every 5 minutes"}
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 19, margin: "0 0 14px" }}>
          Market Overview
        </h2>

        <div className="grid">
          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>TRACKED COINS</p>
            <h2 className="overview-number">{pricedCoins.length} / {coins.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Coins with live prices</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>GAINING</p>
            <h2 className="overview-number" style={{ color: "#00e6a0" }}>{gainers.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Coins positive over 24 hours</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>LOSING</p>
            <h2 className="overview-number" style={{ color: "#ff526c" }}>{losers.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Coins negative over 24 hours</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>TOP MOVER (24H)</p>
            <h2 className="overview-number" style={{ fontSize: 23 }}>
              {pricedCoins.length ? topMover?.symbol || "—" : "—"}
            </h2>
            <strong style={{ color: (topMover?.change ?? 0) >= 0 ? "#00e6a0" : "#ff526c" }}>
              {pricedCoins.length
                ? `${topMover.change >= 0 ? "+" : ""}${fmt(topMover.change)}%`
                : "Waiting for prices"}
            </strong>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>TOTAL CRYPTO MARKET CAP</p>
            <h2 className="overview-number">
              {statsLoading ? "Loading..." : globalStats ? `$${fmt(globalStats.marketCap, 0)}` : "Unavailable"}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Total value of the crypto market</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>24H TRADING VOLUME</p>
            <h2 className="overview-number">
              {statsLoading ? "Loading..." : globalStats ? `$${fmt(globalStats.volume, 0)}` : "Unavailable"}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Trading volume over the last 24 hours</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>BITCOIN DOMINANCE</p>
            <h2 className="overview-number">
              {statsLoading ? "Loading..." : globalStats ? `${fmt(globalStats.btcDominance)}%` : "Unavailable"}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>Bitcoin's share of total crypto market value</p>
          </div>
        </div>

        {statsError && (
          <p style={{ color: theme.muted, fontSize: 12, marginTop: 10 }}>
            {statsError}
          </p>
        )}
      </section>
    </>
  );
}
