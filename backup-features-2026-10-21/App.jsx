import { useEffect, useMemo, useState } from "react";
import CurrencyConverter from "./components/converter.jsx";
import PriceAlerts from "./components/priceAlerts.jsx";
import DashboardOverview from "./components/DashboardOverview";
import Portfolio from "./components/Portfolio.jsx";
import Charts from "./components/Charts.jsx";
import Market from "./components/Market.jsx";
import CryptoNews from "./components/CryptoNews.jsx";

const countries = [
  { id: "RW", flag: "🇷🇼", country: "Rwanda", code: "RWF", symbol: "RWF " },
  { id: "CD", flag: "🇨🇩", country: "Congo", code: "CDF", symbol: "FC " },
  { id: "BI", flag: "🇧🇮", country: "Burundi", code: "BIF", symbol: "FBu " },
  { id: "TZ", flag: "🇹🇿", country: "Tanzania", code: "TZS", symbol: "TSh " },
  { id: "US", flag: "🇺🇸", country: "United States", code: "USD", symbol: "$" },
  { id: "ES", flag: "🇪🇸", country: "Spain", code: "EUR", symbol: "€" },
  { id: "DE", flag: "🇩🇪", country: "Germany", code: "EUR", symbol: "€" },
  { id: "IT", flag: "🇮🇹", country: "Italy", code: "EUR", symbol: "€" },
  { id: "FR", flag: "🇫🇷", country: "France", code: "EUR", symbol: "€" },
  { id: "SG", flag: "🇸🇬", country: "Singapore", code: "SGD", symbol: "S$" },
  { id: "CA", flag: "🇨🇦", country: "Canada", code: "CAD", symbol: "C$" },
  { id: "MX", flag: "🇲🇽", country: "Mexico", code: "MXN", symbol: "MX$" },
  { id: "ZA", flag: "🇿🇦", country: "South Africa", code: "ZAR", symbol: "R " },
  { id: "QA", flag: "🇶🇦", country: "Qatar", code: "QAR", symbol: "QR " },
  { id: "CH", flag: "🇨🇭", country: "Switzerland", code: "CHF", symbol: "CHF " },
  { id: "BR", flag: "🇧🇷", country: "Brazil", code: "BRL", symbol: "R$" },
  { id: "MA", flag: "🇲🇦", country: "Morocco", code: "MAD", symbol: "DH " },
  { id: "NL", flag: "🇳🇱", country: "Netherlands", code: "EUR", symbol: "€" },
  { id: "NO", flag: "🇳🇴", country: "Norway", code: "NOK", symbol: "kr " },
  { id: "TR", flag: "🇹🇷", country: "Türkiye", code: "TRY", symbol: "₺" },
  { id: "IN", flag: "🇮🇳", country: "India", code: "INR", symbol: "₹" },
  { id: "JP", flag: "🇯🇵", country: "Japan", code: "JPY", symbol: "¥" },
  { id: "KR", flag: "🇰🇷", country: "South Korea", code: "KRW", symbol: "₩" },
  { id: "PY", flag: "🇵🇾", country: "Paraguay", code: "PYG", symbol: "₲" },
  { id: "SE", flag: "🇸🇪", country: "Sweden", code: "SEK", symbol: "kr " },
  { id: "EG", flag: "🇪🇬", country: "Egypt", code: "EGP", symbol: "E£" },
  { id: "NZ", flag: "🇳🇿", country: "New Zealand", code: "NZD", symbol: "NZ$" },
  { id: "SN", flag: "🇸🇳", country: "Senegal", code: "XOF", symbol: "CFA " },
  { id: "AR", flag: "🇦🇷", country: "Argentina", code: "ARS", symbol: "AR$" },
  { id: "CO", flag: "🇨🇴", country: "Colombia", code: "COP", symbol: "COL$" },
  { id: "PT", flag: "🇵🇹", country: "Portugal", code: "EUR", symbol: "€" },
  { id: "GH", flag: "🇬🇭", country: "Ghana", code: "GHS", symbol: "GH₵" },
  { id: "PA", flag: "🇵🇦", country: "Panama", code: "PAB", symbol: "B/." },
  { id: "CV", flag: "🇨🇻", country: "Cape Verde", code: "CVE", symbol: "Esc " },
];

const fallbackRates = {
  USD: 1,
  RWF: 1472.43,
  CDF: 2800,
  BIF: 2950,
  TZS: 2500,
  EUR: 0.86,
  SGD: 1.29,
  CAD: 1.4,
  MXN: 18.5,
  ZAR: 17.5,
  QAR: 3.64,
  CHF: 0.8,
  BRL: 5.4,
  MAD: 9.3,
  NOK: 10.1,
  TRY: 41,
  INR: 88,
  JPY: 149,
  KRW: 1400,
  PYG: 7300,
  SEK: 9.5,
  EGP: 48,
  NZD: 1.7,
  XOF: 600,
  ARS: 1400,
  COP: 4200,
  GHS: 15,
  PAB: 1,
  CVE: 95,
};

const initialCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", pair: "BTCUSDT", icon: "₿", color: "#f7931a" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", pair: "ETHUSDT", icon: "◆", color: "#818cf8" },
  { id: "solana", name: "Solana", symbol: "SOL", pair: "SOLUSDT", icon: "◎", color: "#14f195" },
  { id: "binancecoin", name: "BNB", symbol: "BNB", pair: "BNBUSDT", icon: "◆", color: "#f3ba2f" },
  { id: "ripple", name: "XRP", symbol: "XRP", pair: "XRPUSDT", icon: "✕", color: "#60a5fa" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", pair: "DOGEUSDT", icon: "Ð", color: "#c2a633" },
  { id: "cardano", name: "Cardano", symbol: "ADA", pair: "ADAUSDT", icon: "₳", color: "#2563eb" },
  { id: "tron", name: "TRON", symbol: "TRX", pair: "TRXUSDT", icon: "T", color: "#ef4444" },
  { id: "chainlink", name: "Chainlink", symbol: "LINK", pair: "LINKUSDT", icon: "⬡", color: "#38bdf8" },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", pair: "LTCUSDT", icon: "Ł", color: "#94a3b8" },
].map((coin) => ({
  ...coin,
  price: 0,
  change: 0,
  direction: "neutral",
  history: [],
}));

const fmt = (value, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(Number(value) || 0);

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [coins, setCoins] = useState(initialCoins);
  const [rates, setRates] = useState(fallbackRates);
  const [ratesLive, setRatesLive] = useState(false);
  const [cryptoLive, setCryptoLive] = useState(false);
  const [cryptoStatus, setCryptoStatus] = useState("Connecting...");
  const [lastCrypto, setLastCrypto] = useState("");
  const [lastRates, setLastRates] = useState("");

  const [amount, setAmount] = useState("1000");
  const [countryId, setCountryId] = useState("RW");
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(() =>
    loadSaved("kgt-watchlist", [])
  );
  const [watchOnly, setWatchOnly] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("market");

  const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
  const [chartRange, setChartRange] = useState("30D");
  const [sortBy, setSortBy] = useState("market");

  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [globalStats, setGlobalStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const [portfolio, setPortfolio] = useState(() =>
    loadSaved("kgt-portfolio", [])
  );
  const [portfolioCoin, setPortfolioCoin] = useState("bitcoin");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  const [alerts, setAlerts] = useState(() =>
    loadSaved("kgt-alerts", [])
  );
  const [alertCoin, setAlertCoin] = useState("bitcoin");
  const [alertPrice, setAlertPrice] = useState("");
  const [alertDirection, setAlertDirection] = useState("above");
  const [notice, setNotice] = useState("");

  const selectedCountry =
    countries.find((country) => country.id === countryId) || countries[0];

  const selectedRate =
    rates[selectedCountry.code] ??
    fallbackRates[selectedCountry.code] ??
    1;

  const converted = Math.max(0, Number(amount) || 0) * selectedRate;

  const selectedCoin =
    coins.find((coin) => coin.id === selectedCoinId) || coins[0];

  const theme = {
    bg: dark ? "#06101f" : "#eef3f9",
    card: dark ? "#0d1b30" : "#ffffff",
    text: dark ? "#f1f5f9" : "#102033",
    muted: dark ? "#91a4bd" : "#61738a",
    border: dark ? "#233853" : "#d6e0ec",
    input: dark ? "#071427" : "#f8fafc",
  };

  const button = (active = false) => ({
    padding: "10px 14px",
    borderRadius: 9,
    border: `1px solid ${active ? "#0891b2" : theme.border}`,
    background: active ? "#087eaa" : theme.card,
    color: active ? "#fff" : theme.text,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all .2s ease",
  });

  const field = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: 12,
    borderRadius: 9,
    border: `1px solid ${theme.border}`,
    background: theme.input,
    color: theme.text,
    fontSize: 14,
  };

  const panel = {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: 15,
    padding: 18,
    minWidth: 0,
    boxShadow: dark ? "0 8px 25px #0003" : "0 5px 20px #1e293b0a",
  };

  
  useEffect(() => {
    localStorage.setItem("kgt-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("kgt-portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem("kgt-alerts", JSON.stringify(alerts));
  }, [alerts]);


  useEffect(() => {
    let socket;
    let reconnectTimer;
    let stopped = false;

    const streams = initialCoins
      .map((coin) => `${coin.pair.toLowerCase()}@ticker`)
      .join("/");

    function connect() {
      if (stopped) return;

      try {
        socket = new WebSocket(
          `wss://stream.binance.com:9443/stream?streams=${streams}`
        );

        socket.onopen = () => {
          setCryptoLive(true);
          setCryptoStatus("Live market connected");
        };

        socket.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            const ticker = message.data;

            if (!ticker?.s) return;

            const newPrice = Number(ticker.c);
            const newChange = Number(ticker.P);

            if (!Number.isFinite(newPrice) || newPrice <= 0) return;

            setCoins((oldCoins) =>
              oldCoins.map((coin) => {
                if (coin.pair !== ticker.s) return coin;

                const direction =
                  coin.price === 0
                    ? "neutral"
                    : newPrice > coin.price
                      ? "up"
                      : newPrice < coin.price
                        ? "down"
                        : coin.direction;

                return {
                  ...coin,
                  price: newPrice,
                  change: Number.isFinite(newChange)
                    ? newChange
                    : coin.change,
                  direction,
                  history: [...coin.history.slice(-499), newPrice],
                };
              })
            );

            setCryptoLive(true);
            setCryptoStatus("Live market connected");
            setLastCrypto(new Date().toLocaleTimeString());
          } catch (error) {
            console.error("Crypto update error:", error);
          }
        };

        socket.onerror = () => {
          setCryptoLive(false);
          setCryptoStatus("Connection problem");
        };

        socket.onclose = () => {
          if (!stopped) {
            setCryptoLive(false);
            setCryptoStatus("Reconnecting...");
            reconnectTimer = setTimeout(connect, 3000);
          }
        };
      } catch {
        setCryptoLive(false);
        setCryptoStatus("Unable to connect");
        reconnectTimer = setTimeout(connect, 5000);
      }
    }

    connect();

    return () => {
      stopped = true;
      clearTimeout(reconnectTimer);

      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, []);


  useEffect(() => {
    let cancelled = false;

    async function updateRates() {
      try {
        const response = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        if (!response.ok) {
          throw new Error("Exchange rates request failed");
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates) {
          throw new Error("Exchange rates unavailable");
        }

        if (cancelled) return;

        setRates({ ...fallbackRates, ...data.rates, USD: 1 });
        setRatesLive(true);
        setLastRates(new Date().toLocaleTimeString());
      } catch {
        if (!cancelled) setRatesLive(false);
      }
    }

    updateRates();

    const timer = setInterval(updateRates, 300000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  
  useEffect(() => {
    if (activeTab !== "charts" || !selectedCoin) return;

    let cancelled = false;

    const ranges = {
      "24H": { interval: "1h", limit: 24 },
      "7D": { interval: "4h", limit: 42 },
      "30D": { interval: "1d", limit: 30 },
    };

    const range = ranges[chartRange];

    if (!range) return;

    async function loadHistoricalPrices() {
      setHistoryLoading(true);
      setHistoryError("");
      setHistoricalPrices([]);

      try {
        const url =
          `https://api.binance.com/api/v3/klines` +
          `?symbol=${selectedCoin.pair}` +
          `&interval=${range.interval}` +
          `&limit=${range.limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Historical price data is unavailable.");
        }

        const candles = await response.json();

        if (!Array.isArray(candles) || candles.length === 0) {
          throw new Error("No historical prices were returned.");
        }

        const history = candles.map((candle) => ({
          time: Number(candle[0]),
          price: Number(candle[4]),
        }));

        if (!cancelled) {
          setHistoricalPrices(history);
        }
      } catch {
        if (!cancelled) {
          setHistoryError(
            "Could not load historical prices. Check your internet connection and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    }

    loadHistoricalPrices();

    return () => {
      cancelled = true;
    };
  }, [activeTab, selectedCoinId, chartRange]);


  useEffect(() => {
    let cancelled = false;

    async function loadGlobalStats() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/global"
        );

        if (!response.ok) {
          throw new Error("Global market statistics are unavailable.");
        }

        const result = await response.json();
        const data = result.data;

        if (!data) {
          throw new Error("No global market data was returned.");
        }

        if (!cancelled) {
          setGlobalStats({
            marketCap: Number(data.total_market_cap?.usd) || 0,
            volume: Number(data.total_volume?.usd) || 0,
            btcDominance: Number(data.market_cap_percentage?.btc) || 0,
          });

          setStatsError("");
        }
      } catch {
        if (!cancelled) {
          setStatsError(
            "Global statistics are temporarily unavailable."
          );
        }
      } finally {
        if (!cancelled) {
          setStatsLoading(false);
        }
      }
    }

    loadGlobalStats();

    const timer = setInterval(loadGlobalStats, 300000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);


  useEffect(() => {
    if (!cryptoLive) return;

    const triggeredAlerts = [];

    setAlerts((current) => {
      let changed = false;

      const updated = current.map((alert) => {
        if (alert.triggered) return alert;

        const coin = coins.find((item) => item.id === alert.coinId);

        if (!coin || !coin.price) return alert;

        const hit =
          alert.direction === "above"
            ? coin.price >= alert.target
            : coin.price <= alert.target;

        if (!hit) return alert;

        changed = true;
        triggeredAlerts.push({
          coinName: coin.name,
          price: coin.price,
        });

        return { ...alert, triggered: true };
      });

      return changed ? updated : current;
    });

    if (triggeredAlerts.length > 0) {
      const first = triggeredAlerts[0];

      setNotice(`${first.coinName} reached $${fmt(first.price)}!`);

      if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        triggeredAlerts.forEach((item) => {
          new Notification("Kigali Global Tracker", {
            body: `${item.coinName} reached $${fmt(item.price)}.`,
          });
        });
      }
    }
  }, [coins, cryptoLive]);


  const filteredCoins = useMemo(() => {
    const query = search.toLowerCase().trim();

    const result = coins.filter((coin) => {
      const matches =
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query);

      return matches && (!watchOnly || watchlist.includes(coin.id));
    });

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "gainers") {
      result.sort((a, b) => b.change - a.change);
    } else if (sortBy === "losers") {
      result.sort((a, b) => a.change - b.change);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [coins, search, watchOnly, watchlist, sortBy]);

  const portfolioRows = portfolio.map((item) => {
    const coin = coins.find((entry) => entry.id === item.coinId);
    const price = coin?.price || 0;
    const value = price * item.quantity;
    const cost = item.buyPrice * item.quantity;

    return {
      ...item,
      coin,
      value,
      cost,
      profit: value - cost,
    };
  });

  const portfolioValue = portfolioRows.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const portfolioCost = portfolioRows.reduce(
    (sum, item) => sum + item.cost,
    0
  );

  const portfolioProfit = portfolioValue - portfolioCost;

  const pricedCoins = coins.filter((coin) => coin.price > 0);
  const gainers = pricedCoins.filter((coin) => coin.change > 0);
  const losers = pricedCoins.filter((coin) => coin.change < 0);

  const sortedMovers = [...coins].sort(
    (a, b) => b.change - a.change
  );

  const topMover = sortedMovers[0];

  function addPortfolioItem(event) {
    event.preventDefault();

    const qty = Number(quantity);
    const cost = Number(buyPrice);

    if (
      !Number.isFinite(qty) ||
      qty <= 0 ||
      !Number.isFinite(cost) ||
      cost <= 0
    ) {
      setNotice("Enter a valid quantity and purchase price.");
      return;
    }

    setPortfolio((old) => [
      ...old,
      {
        id: makeId(),
        coinId: portfolioCoin,
        quantity: qty,
        buyPrice: cost,
      },
    ]);

    setQuantity("");
    setBuyPrice("");
    setNotice("Portfolio entry added.");
  }

  async function addPriceAlert(event) {
    event.preventDefault();

    const target = Number(alertPrice);

    if (!Number.isFinite(target) || target <= 0) {
      setNotice("Enter a valid alert price.");
      return;
    }

    setAlerts((old) => [
      ...old,
      {
        id: makeId(),
        coinId: alertCoin,
        target,
        direction: alertDirection,
        triggered: false,
      },
    ]);

    setAlertPrice("");
    setNotice("Price alert saved.");

    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      try {
        await Notification.requestPermission();
      } catch {
      
      }
    }
  }

  function removeAlert(id) {
    setAlerts((old) => old.filter((item) => item.id !== id));
  }

  
  const visibleChartValues = historicalPrices.map(
    (item) => item.price
  );

  const chartMin = Math.min(
    ...visibleChartValues,
    selectedCoin?.price || 0
  );

  const chartMax = Math.max(
    ...visibleChartValues,
    selectedCoin?.price || 0
  );

  const chartRangeValue = chartMax - chartMin || 1;

  const chartPoints = visibleChartValues
    .map((price, index) => {
      const x =
        visibleChartValues.length < 2
          ? 0
          : (index / (visibleChartValues.length - 1)) * 100;

      const y = 94 - ((price - chartMin) / chartRangeValue) * 84;

      return `${x},${y}`;
    })
    .join(" ");

  const chartAreaPoints = visibleChartValues.length
    ? `0,100 ${chartPoints} 100,100`
    : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        padding: 22,
        fontFamily: "Arial, sans-serif",
        transition: "background .2s, color .2s",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        button, input, select { font: inherit; }
        button:hover { filter: brightness(1.12); transform: translateY(-1px); }
        button:focus-visible, input:focus-visible, select:focus-visible {
          outline: 2px solid #22d3ee;
          outline-offset: 2px;
        }
        .layout { max-width: 1250px; margin: auto; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
        }
        .twocol {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .coin-price {
          overflow-wrap: anywhere;
          font-size: clamp(22px, 3vw, 29px);
        }
        .table-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 580px; }
        th, td {
          text-align: left;
          padding: 13px 10px;
          border-bottom: 1px solid ${theme.border};
          white-space: nowrap;
        }
        th { color: ${theme.muted}; font-size: 12px; }
        .overview-number {
          font-size: clamp(23px, 3vw, 30px);
          overflow-wrap: anywhere;
          margin: 8px 0;
        }
        .chart-svg { display: block; width: 100%; height: 250px; }
        @media (max-width: 760px) {
          .twocol { grid-template-columns: 1fr; }
          .page-header { align-items: flex-start !important; }
          main { padding: 12px !important; }
        }
        @media (max-width: 420px) {
          .grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>

      <div className="layout">
        {/* HEADER */}
        <header
          className="page-header"
          style={{
            ...panel,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 20,
            padding: 22,
          }}
        >
          <div>
            <div
              style={{
                color: "#22d3ee",
                fontWeight: 800,
                letterSpacing: 2,
                fontSize: 13,
              }}
            >
              ▥ KIGALI GLOBAL TRACKER
            </div>

            <h1 style={{ fontSize: 26, margin: "10px 0 7px" }}>
              Crypto & Currency Dashboard
            </h1>

            <p
              style={{
                color: theme.muted,
                margin: 0,
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              Live crypto · Global currencies · Portfolio · Price alerts
            </p>
          </div>

          <button
            style={button()}
            onClick={() => setDark((old) => !old)}
          >
            {dark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </header>

        {/* NOTIFICATIONS */}
        {notice && (
          <div
            role="status"
            style={{
              ...panel,
              marginBottom: 16,
              borderColor: "#0891b2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span>{notice}</span>
            <button style={button()} onClick={() => setNotice("")}>
              Dismiss
            </button>
          </div>
        )}

        {/* DASHBOARD OVERVIEW */}
        <DashboardOverview
          theme={theme}
          panel={panel}
          cryptoLive={cryptoLive}
          cryptoStatus={cryptoStatus}
          lastCrypto={lastCrypto}
          ratesLive={ratesLive}
          lastRates={lastRates}
          pricedCoins={pricedCoins}
          coins={coins}
          gainers={gainers}
          losers={losers}
          topMover={topMover}
          statsLoading={statsLoading}
          globalStats={globalStats}
          statsError={statsError}
          fmt={fmt}
        />

        {/* NAVIGATION */}
        <nav
          style={{
            display: "flex",
            gap: 9,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {[
            ["market", "📈 Market"],
            ["charts", "📊 Charts"],
            ["portfolio", "💼 Portfolio"],
            ["alerts", "🔔 Price alerts"],
            ["converter", "💱 Converter"],
            ["news", "📰 Crypto News"],
          ].map(([id, label]) => (
            <button
              key={id}
              style={button(activeTab === id)}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* MARKET */}
        {activeTab === "market" && (
          <Market
            coins={coins}
            filteredCoins={filteredCoins}
            sortedMovers={sortedMovers}
            theme={theme}
            panel={panel}
            button={button}
            field={field}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            watchOnly={watchOnly}
            setWatchOnly={setWatchOnly}
            watchlist={watchlist}
            setWatchlist={setWatchlist}
            setSelectedCoinId={setSelectedCoinId}
            setActiveTab={setActiveTab}
            fmt={fmt}
          />
        )}

        {/* HISTORICAL CHARTS */}
        <Charts
          activeTab={activeTab}
          panel={panel}
          selectedCoinId={selectedCoinId}
          setSelectedCoinId={setSelectedCoinId}
          field={field}
          coins={coins}
          selectedCoin={selectedCoin}
          fmt={fmt}
          theme={theme}
          button={button}
          chartRange={chartRange}
          setChartRange={setChartRange}
          historyLoading={historyLoading}
          historyError={historyError}
          visibleChartValues={visibleChartValues}
          chartAreaPoints={chartAreaPoints}
          chartPoints={chartPoints}
          historicalPrices={historicalPrices}
          setActiveTab={setActiveTab}
        />

        {/* PORTFOLIO */}
        <Portfolio
          activeTab={activeTab}
          panel={panel}
          theme={theme}
          portfolioValue={portfolioValue}
          portfolioCost={portfolioCost}
          portfolioProfit={portfolioProfit}
          fmt={fmt}
          coins={coins}
          field={field}
          portfolioCoin={portfolioCoin}
          setPortfolioCoin={setPortfolioCoin}
          quantity={quantity}
          setQuantity={setQuantity}
          buyPrice={buyPrice}
          setBuyPrice={setBuyPrice}
          addPortfolioItem={addPortfolioItem}
          button={button}
          portfolioRows={portfolioRows}
          setPortfolio={setPortfolio}
        />

        {/* PRICE ALERTS */}
        <PriceAlerts
          activeTab={activeTab}
          panel={panel}
          theme={theme}
          addPriceAlert={addPriceAlert}
          alertCoin={alertCoin}
          setAlertCoin={setAlertCoin}
          coins={coins}
          field={field}
          alertPrice={alertPrice}
          setAlertPrice={setAlertPrice}
          alertDirection={alertDirection}
          setAlertDirection={setAlertDirection}
          button={button}
          alerts={alerts}
          fmt={fmt}
          removeAlert={removeAlert}
        />

        {/* CURRENCY CONVERTER */}
        <CurrencyConverter
          activeTab={activeTab}
          panel={panel}
          theme={theme}
          amount={amount}
          setAmount={setAmount}
          field={field}
          countryId={countryId}
          setCountryId={setCountryId}
          countries={countries}
          dark={dark}
          selectedCountry={selectedCountry}
          fmt={fmt}
          converted={converted}
          selectedRate={selectedRate}
          ratesLive={ratesLive}
        />

        {/* CRYPTO NEWS */}
        <CryptoNews
          activeTab={activeTab}
          theme={theme}
          panel={panel}
        />

        {/* FOOTER */}
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
      </div>
    </main>
  );
}