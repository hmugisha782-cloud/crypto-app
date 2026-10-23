export default function Footer({ theme }) {
  return (
    <footer
      style={{
        color: theme.muted,
        fontSize: 12,
        borderTop: `1px solid ${theme.border}`,
        paddingTop: 16,
        lineHeight: 1.8,
      }}
    >
      <p>
        Crypto live prices and historical charts: Binance.
        Global market statistics: CoinGecko.
        Exchange rates: ExchangeRate-API.
      </p>

      <p>
        Live data requires internet access. If a provider is unavailable,
        some statistics or charts may not load. Currency backup rates are
        estimates. Portfolio, watchlist and alerts are stored in this
        browser. Alerts only run while the page is open.
      </p>

      <p>© {new Date().getFullYear()} Kigali Global Tracker</p>
    </footer>
  );
}
