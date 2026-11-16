import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation();

  return (
    <>
      <section className="grid" style={{ marginBottom: 20 }}>
        <div style={panel}>
          <p style={{ color: theme.muted, margin: "0 0 9px" }}>
            {t("overview.cryptoConnection")}
          </p>
          <strong style={{ color: cryptoLive ? "#22c55e" : "#fbbf24" }}>
            ● {cryptoStatus}
          </strong>
          <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
            {lastCrypto ? t("overview.lastUpdate", { time: lastCrypto }) : t("overview.waitingLiveData")}
          </p>
        </div>

        <div style={panel}>
          <p style={{ color: theme.muted, margin: "0 0 9px" }}>
            {t("overview.exchangeRates")}
          </p>
          <strong style={{ color: ratesLive ? "#22c55e" : "#fbbf24" }}>
            ● {ratesLive ? t("overview.liveRatesConnected") : t("overview.backupRates")}
          </strong>
          <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
            {lastRates ? t("overview.lastUpdate", { time: lastRates }) : t("overview.refreshRates")}
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 19, margin: "0 0 14px" }}>
          {t("overview.marketOverview")}
        </h2>

        <div className="grid">
          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.trackedCoins")}</p>
            <h2 className="overview-number">{pricedCoins.length} / {coins.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.coinsWithLivePrices")}</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.gaining")}</p>
            <h2 className="overview-number" style={{ color: "#00e6a0" }}>{gainers.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.positive24h")}</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.losing")}</p>
            <h2 className="overview-number" style={{ color: "#ff526c" }}>{losers.length}</h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.negative24h")}</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.topMover24h")}</p>
            <h2 className="overview-number" style={{ fontSize: 23 }}>
              {pricedCoins.length ? topMover?.symbol || "—" : "—"}
            </h2>
            <strong style={{ color: (topMover?.change ?? 0) >= 0 ? "#00e6a0" : "#ff526c" }}>
              {pricedCoins.length
                ? `${topMover.change >= 0 ? "+" : ""}${fmt(topMover.change)}%`
                : t("overview.waitingPrices")}
            </strong>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.marketCap")}</p>
            <h2 className="overview-number">
              {statsLoading ? t("overview.loading") : globalStats ? `$${fmt(globalStats.marketCap, 0)}` : t("overview.unavailable")}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.marketCapDescription")}</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.tradingVolume24h")}</p>
            <h2 className="overview-number">
              {statsLoading ? t("overview.loading") : globalStats ? `$${fmt(globalStats.volume, 0)}` : t("overview.unavailable")}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.tradingVolumeDescription")}</p>
          </div>

          <div style={panel}>
            <p style={{ color: theme.muted, margin: 0, fontSize: 12 }}>{t("overview.bitcoinDominance")}</p>
            <h2 className="overview-number">
              {statsLoading ? t("overview.loading") : globalStats ? `${fmt(globalStats.btcDominance)}%` : t("overview.unavailable")}
            </h2>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>{t("overview.bitcoinDominanceDescription")}</p>
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
