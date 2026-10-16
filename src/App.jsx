
import { useEffect, useMemo, useState } from "react";

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
  USD: 1, RWF: 1472.43, CDF: 2800, BIF: 2950, TZS: 2500,
  EUR: 0.86, SGD: 1.29, CAD: 1.4, MXN: 18.5, ZAR: 17.5,
  QAR: 3.64, CHF: 0.8, BRL: 5.4, MAD: 9.3, NOK: 10.1,
  TRY: 41, INR: 88, JPY: 149, KRW: 1400, PYG: 7300,
  SEK: 9.5, EGP: 48, NZD: 1.7, XOF: 600, ARS: 1400,
  COP: 4200, GHS: 15, PAB: 1, CVE: 95,
};

const initialCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", pair: "BTCUSDT", icon: "₿", color: "#f7931a", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", pair: "ETHUSDT", icon: "◆", color: "#818cf8", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "solana", name: "Solana", symbol: "SOL", pair: "SOLUSDT", icon: "◎", color: "#14f195", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "binancecoin", name: "BNB", symbol: "BNB", pair: "BNBUSDT", icon: "◆", color: "#f3ba2f", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "ripple", name: "XRP", symbol: "XRP", pair: "XRPUSDT", icon: "✕", color: "#60a5fa", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", pair: "DOGEUSDT", icon: "Ð", color: "#c2a633", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "cardano", name: "Cardano", symbol: "ADA", pair: "ADAUSDT", icon: "₳", color: "#2563eb", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "tron", name: "TRON", symbol: "TRX", pair: "TRXUSDT", icon: "T", color: "#ef4444", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "chainlink", name: "Chainlink", symbol: "LINK", pair: "LINKUSDT", icon: "⬡", color: "#38bdf8", price: 0, change: 0, direction: "neutral", history: [] },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", pair: "LTCUSDT", icon: "Ł", color: "#94a3b8", price: 0, change: 0, direction: "neutral", history: [] },
];

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
  const [watchlist, setWatchlist] = useState(() => loadSaved("kgt-watchlist", []));
  const [watchOnly, setWatchOnly] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("market");

  const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
  const [chartRange, setChartRange] = useState("ALL");

  const [portfolio, setPortfolio] = useState(() => loadSaved("kgt-portfolio", []));
  const [portfolioCoin, setPortfolioCoin] = useState("bitcoin");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  const [alerts, setAlerts] = useState(() => loadSaved("kgt-alerts", []));
  const [alertCoin, setAlertCoin] = useState("bitcoin");
  const [alertPrice, setAlertPrice] = useState("");
  const [alertDirection, setAlertDirection] = useState("above");
  const [notice, setNotice] = useState("");

  const selectedCountry =
    countries.find((country) => country.id === countryId) || countries[0];
  const selectedRate =
    rates[selectedCountry.code] ?? fallbackRates[selectedCountry.code] ?? 1;
  const converted = Math.max(0, Number(amount) || 0) * selectedRate;

  const selectedCoin = coins.find((coin) => coin.id === selectedCoinId) || coins[0];

  const theme = {
    bg: dark ? "#06101f" : "#eef3f9",
    card: dark ? "#0d1b30" : "#ffffff",
    text: dark ? "#f1f5f9" : "#102033",
    muted: dark ? "#91a4bd" : "#61738a",
    border: dark ? "#233853" : "#d6e0ec",
    input: dark ? "#071427" : "#f8fafc",
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

    const streams = [
      "btcusdt", "ethusdt", "solusdt", "bnbusdt", "xrpusdt",
      "dogeusdt", "adausdt", "trxusdt", "linkusdt", "ltcusdt",
    ].map((pair) => `${pair}@ticker`).join("/");

    function connect() {
      if (stopped) return;

      socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
      );

      socket.onopen = () => {
        setCryptoLive(true);
        setCryptoStatus("Live market connected");
      };

      socket.onmessage = (event) => {
        try {
          const { data: ticker } = JSON.parse(event.data);
          const newPrice = Number(ticker.c);
          const newChange = Number(ticker.P);
          if (!ticker.s || !Number.isFinite(newPrice)) return;

          setCoins((oldCoins) =>
            oldCoins.map((coin) => {
              if (coin.pair !== ticker.s) return coin;

              const direction =
                newPrice > coin.price ? "up" :
                newPrice < coin.price ? "down" : coin.direction;

              return {
                ...coin,
                price: newPrice,
                change: Number.isFinite(newChange) ? newChange : coin.change,
                direction,
                history: [...coin.history.slice(-119), newPrice],
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
    }

    try {
      connect();
    } catch {
      setCryptoStatus("Unable to connect");
    }

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
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("Exchange rates request failed");

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
    if (!cryptoLive) return;

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
        setNotice(`${coin.name} reached $${fmt(coin.price)}!`);

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Kigali Global Tracker", {
            body: `${coin.name} reached $${fmt(coin.price)}.`,
          });
        }

        return { ...alert, triggered: true };
      });

      return changed ? updated : current;
    });
  }, [coins, cryptoLive]);

  const filteredCoins = useMemo(() => {
    const query = search.toLowerCase().trim();

    return coins.filter((coin) => {
      const matches =
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query);

      return matches && (!watchOnly || watchlist.includes(coin.id));
    });
  }, [coins, search, watchOnly, watchlist]);

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

  const portfolioValue = portfolioRows.reduce((sum, item) => sum + item.value, 0);
  const portfolioCost = portfolioRows.reduce((sum, item) => sum + item.cost, 0);
  const portfolioProfit = portfolioValue - portfolioCost;

  const sortedMovers = [...coins].sort((a, b) => b.change - a.change);

  const button = (active = false) => ({
    padding: "10px 14px",
    borderRadius: 9,
    border: `1px solid ${active ? "#0891b2" : theme.border}`,
    background: active ? "#087eaa" : theme.card,
    color: active ? "#fff" : theme.text,
    cursor: "pointer",
    fontWeight: 600,
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
    borderRadius: 14,
    padding: 18,
    minWidth: 0,
    boxShadow: dark ? "0 8px 25px #0003" : "0 5px 20px #1e293b0a",
  };

  function addPortfolioItem(event) {
    event.preventDefault();

    const qty = Number(quantity);
    const cost = Number(buyPrice);

    if (!Number.isFinite(qty) || qty <= 0 || !Number.isFinite(cost) || cost <= 0) {
      setNotice("Enter a valid quantity and purchase price.");
      return;
    }

    setPortfolio((old) => [
      ...old,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        coinId: alertCoin,
        target,
        direction: alertDirection,
        triggered: false,
      },
    ]);

    setAlertPrice("");
    setNotice("Price alert saved.");

    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch {
      
      }
    }
  }

  function removeAlert(id) {
    setAlerts((old) => old.filter((item) => item.id !== id));
  }

  
  const chartValues = selectedCoin?.history || [];
  const chartMin = Math.min(...chartValues, selectedCoin?.price || 0);
  const chartMax = Math.max(...chartValues, selectedCoin?.price || 0);
  const chartRangeValue = chartMax - chartMin || 1;

  const chartPoints = chartValues.map((price, index) => {
    const x = chartValues.length < 2
      ? 0
      : (index / (chartValues.length - 1)) * 100;
    const y = 94 - ((price - chartMin) / chartRangeValue) * 84;
    return `${x},${y}`;
  }).join(" ");

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
        button { transition: .2s ease; }
        button:hover { filter: brightness(1.12); }
        .layout { max-width: 1250px; margin: auto; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
        }
        .twocol {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);
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
        @media (max-width: 760px) {
          .twocol { grid-template-columns: 1fr; }
          .page-header { align-items: flex-start !important; }
          main { padding: 12px !important; }
        }
      `}</style>

      <div className="layout">
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
            <div style={{ color: "#22d3ee", fontWeight: 800, letterSpacing: 2, fontSize: 13 }}>
              ▥ KIGALI GLOBAL TRACKER
            </div>
            <h1 style={{ fontSize: 26, margin: "10px 0 7px" }}>
              Crypto & Currency Dashboard
            </h1>
            <p style={{ color: theme.muted, margin: 0, fontSize: 13, lineHeight: 1.7 }}>
              Live crypto · Global currencies · Portfolio · Price alerts
            </p>
          </div>
          <button style={button()} onClick={() => setDark((old) => !old)}>
            {dark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </header>

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
            <button style={button()} onClick={() => setNotice("")}>Dismiss</button>
          </div>
        )}

        <section className="grid" style={{ marginBottom: 22 }}>
          <div style={panel}>
            <p style={{ color: theme.muted, margin: "0 0 9px" }}>CRYPTO CONNECTION</p>
            <strong style={{ color: cryptoLive ? "#22c55e" : "#fbbf24" }}>
              ● {cryptoStatus}
            </strong>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
              {lastCrypto ? `Last update: ${lastCrypto}` : "Waiting for live data"}
            </p>
          </div>
          <div style={panel}>
            <p style={{ color: theme.muted, margin: "0 0 9px" }}>EXCHANGE RATES</p>
            <strong style={{ color: ratesLive ? "#22c55e" : "#fbbf24" }}>
              ● {ratesLive ? "Live rates connected" : "Using backup rates"}
            </strong>
            <p style={{ color: theme.muted, fontSize: 12, marginBottom: 0 }}>
              {lastRates ? `Last update: ${lastRates}` : "Refreshes every 5 minutes"}
            </p>
          </div>
        </section>

        <nav style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 20 }}>
          {[
            ["market", "📈 Market"],
            ["charts", "📊 Charts"],
            ["portfolio", "💼 Portfolio"],
            ["alerts", "🔔 Price alerts"],
            ["converter", "💱 Converter"],
          ].map(([id, label]) => (
            <button key={id} style={button(activeTab === id)} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "market" && (
          <>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 17 }}>
              <input
                style={{ ...field, flex: "1 1 240px" }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕ Search Bitcoin, ETH, Dogecoin..."
                aria-label="Search cryptocurrencies"
              />
              <button style={button(!watchOnly)} onClick={() => setWatchOnly(false)}>
                All coins ({coins.length})
              </button>
              <button style={button(watchOnly)} onClick={() => setWatchOnly(true)}>
                ★ Watchlist ({watchlist.length})
              </button>
            </div>

            <section className="grid" style={{ marginBottom: 26 }}>
              {filteredCoins.map((coin) => {
                const up = coin.direction === "up";
                const down = coin.direction === "down";
                const priceColor = up ? "#00e6a0" : down ? "#ff526c" : theme.text;
                const positive = coin.change >= 0;
                const min = Math.min(...coin.history, coin.price);
                const max = Math.max(...coin.history, coin.price);
                const range = max - min || 1;

                return (
                  <article
                    key={coin.id}
                    style={{
                      ...panel,
                      borderColor: up ? "#00b981" : down ? "#f05268" : theme.border,
                      transition: "border-color .3s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                        <div style={{
                          width: 43, height: 43, borderRadius: "50%",
                          background: `${coin.color}25`, color: coin.color,
                          display: "grid", placeItems: "center", fontSize: 25,
                        }}>
                          {coin.icon}
                        </div>
                        <div>
                          <strong>{coin.name}</strong>
                          <p style={{ color: theme.muted, margin: "5px 0 0", fontSize: 12 }}>
                            {coin.symbol} / USDT
                          </p>
                        </div>
                      </div>
                      <button
                        title="Toggle watchlist"
                        aria-label={`Toggle ${coin.name} watchlist`}
                        onClick={() => setWatchlist((old) =>
                          old.includes(coin.id)
                            ? old.filter((id) => id !== coin.id)
                            : [...old, coin.id]
                        )}
                        style={{
                          background: "transparent", border: 0,
                          color: watchlist.includes(coin.id) ? "#fbbf24" : theme.muted,
                          cursor: "pointer", fontSize: 24,
                        }}
                      >
                        {watchlist.includes(coin.id) ? "★" : "☆"}
                      </button>
                    </div>

                    <h2 className="coin-price" style={{ color: priceColor, margin: "24px 0 8px" }}>
                      {coin.price ? `$${fmt(coin.price)}` : "Loading price..."}
                      {up ? " ↑" : down ? " ↓" : ""}
                    </h2>

                    <span style={{
                      color: positive ? "#00e6a0" : "#ff526c",
                      background: positive ? "#00e6a018" : "#ff526c18",
                      borderRadius: 6, padding: "6px 9px", fontSize: 12,
                    }}>
                      {positive ? "▲" : "▼"} {fmt(Math.abs(coin.change))}% (24h)
                    </span>

                    <div style={{ height: 46, display: "flex", alignItems: "end", gap: 3, marginTop: 15, overflow: "hidden" }}>
                      {coin.history.length > 1 ? coin.history.slice(-35).map((price, index, arr) => {
                        const low = Math.min(...arr);
                        const high = Math.max(...arr);
                        const diff = high - low || 1;
                        return (
                          <span key={index} style={{
                            flex: 1, minWidth: 2,
                            height: `${7 + ((price - low) / diff) * 37}px`,
                            borderRadius: "3px 3px 0 0",
                            background: priceColor,
                            opacity: 0.45 + (index / arr.length) * 0.55,
                          }} />
                        );
                      }) : <small style={{ color: theme.muted }}>Collecting live price history...</small>}
                    </div>

                    <p style={{ color: priceColor, fontSize: 11, marginBottom: 0 }}>
                      {up ? "▲ Price increased since last update" :
                        down ? "▼ Price decreased since last update" :
                          "● Waiting for price movement"}
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
              <h2 style={{ marginTop: 0, fontSize: 19 }}>↗ Market Movers (24h)</h2>
              {sortedMovers.map((coin, index) => (
                <div key={coin.id} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: 12, padding: "12px 0",
                  borderBottom: `1px solid ${theme.border}`,
                }}>
                  <span style={{ color: theme.muted, minWidth: 22 }}>{index + 1}.</span>
                  <span style={{ flex: 1 }}>{coin.icon} {coin.name} <small style={{ color: theme.muted }}>{coin.symbol}</small></span>
                  <strong style={{ color: coin.change >= 0 ? "#00e6a0" : "#ff526c" }}>
                    {coin.change >= 0 ? "+" : ""}{fmt(coin.change)}%
                  </strong>
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab === "charts" && (
          <section style={{ ...panel, marginBottom: 22 }}>
            <h2 style={{ marginTop: 0 }}>📊 Crypto Price Chart</h2>
            <label htmlFor="chart-coin" style={{ color: theme.muted, fontSize: 13 }}>SELECT CRYPTO</label>
            <select id="chart-coin" value={selectedCoinId} onChange={(event) => setSelectedCoinId(event.target.value)} style={{ ...field, margin: "8px 0 18px" }}>
              {coins.map((coin) => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
            </select>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <p style={{ color: theme.muted, margin: "0 0 7px" }}>{selectedCoin.name} · Live price</p>
                <h2 style={{ fontSize: 30, margin: 0 }}>${fmt(selectedCoin.price)}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: theme.muted, margin: "0 0 7px" }}>24h change</p>
                <strong style={{ color: selectedCoin.change >= 0 ? "#00e6a0" : "#ff526c" }}>
                  {selectedCoin.change >= 0 ? "+" : ""}{fmt(selectedCoin.change)}%
                </strong>
              </div>
            </div>

            <div style={{ marginTop: 20, background: theme.input, borderRadius: 12, padding: 12 }}>
              {chartValues.length > 1 ? (
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 250 }}>
                  <polyline points={chartPoints} fill="none" stroke={selectedCoin.color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>
              ) : (
                <div style={{ height: 250, display: "grid", placeItems: "center", color: theme.muted, textAlign: "center" }}>
                  Waiting for enough live price points to draw the chart...
                </div>
              )}
            </div>
            <p style={{ color: theme.muted, fontSize: 12, lineHeight: 1.7 }}>
              This chart shows price updates collected since you opened this page. It is not historical 1-day or 7-day market data. Older points are not available from this live stream alone.
            </p>
            <button style={button()} onClick={() => setActiveTab("market")}>← Back to market</button>
          </section>
        )}

        {activeTab === "portfolio" && (
          <>
            <section style={{ ...panel, marginBottom: 18 }}>
              <h2 style={{ marginTop: 0 }}>💼 My Crypto Portfolio</h2>
              <p style={{ color: theme.muted, fontSize: 13 }}>
                Add the amount of crypto you own and the price you paid per coin.
              </p>

              <div className="grid" style={{ marginBottom: 18 }}>
                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>CURRENT VALUE</p>
                  <h2 style={{ marginBottom: 0, overflowWrap: "anywhere" }}>${fmt(portfolioValue)}</h2>
                </div>
                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>PURCHASE COST</p>
                  <h2 style={{ marginBottom: 0, overflowWrap: "anywhere" }}>${fmt(portfolioCost)}</h2>
                </div>
                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>PROFIT / LOSS</p>
                  <h2 style={{ color: portfolioProfit >= 0 ? "#00e6a0" : "#ff526c", marginBottom: 0, overflowWrap: "anywhere" }}>
                    {portfolioProfit >= 0 ? "+" : "-"}${fmt(Math.abs(portfolioProfit))}
                  </h2>
                </div>
              </div>

              <form onSubmit={addPortfolioItem} className="twocol">
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>CRYPTO</label>
                  <select style={{ ...field, marginTop: 8 }} value={portfolioCoin} onChange={(event) => setPortfolioCoin(event.target.value)}>
                    {coins.map((coin) => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>QUANTITY OWNED</label>
                  <input style={{ ...field, marginTop: 8 }} type="number" min="0" step="any" required value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="e.g. 0.25" />
                </div>
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>PURCHASE PRICE PER COIN (USD)</label>
                  <input style={{ ...field, marginTop: 8 }} type="number" min="0" step="any" required value={buyPrice} onChange={(event) => setBuyPrice(event.target.value)} placeholder="e.g. 60000" />
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button type="submit" style={{ ...button(true), width: "100%" }}>+ Add to portfolio</button>
                </div>
              </form>
            </section>

            <section style={{ ...panel, marginBottom: 22 }}>
              <h3 style={{ marginTop: 0 }}>Your holdings</h3>
              {portfolioRows.length === 0 ? (
                <p style={{ color: theme.muted }}>No holdings yet. Use the form above to add your first entry.</p>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr><th>Asset</th><th>Quantity</th><th>Buy price</th><th>Current value</th><th>Profit / loss</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {portfolioRows.map((item) => (
                        <tr key={item.id}>
                          <td>{item.coin?.name || item.coinId}</td>
                          <td>{fmt(item.quantity, 6)}</td>
                          <td>${fmt(item.buyPrice)}</td>
                          <td>${fmt(item.value)}</td>
                          <td style={{ color: item.profit >= 0 ? "#00e6a0" : "#ff526c" }}>
                            {item.profit >= 0 ? "+" : "-"}${fmt(Math.abs(item.profit))}
                          </td>
                          <td><button style={button()} onClick={() => setPortfolio((old) => old.filter((entry) => entry.id !== item.id))}>Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p style={{ color: theme.muted, fontSize: 12, lineHeight: 1.7 }}>
                These calculations use the live prices currently available in this dashboard. They exclude transaction fees and taxes.
              </p>
            </section>
          </>
        )}

        {activeTab === "alerts" && (
          <>
            <section style={{ ...panel, marginBottom: 18 }}>
              <h2 style={{ marginTop: 0 }}>🔔 Price Alerts</h2>
              <p style={{ color: theme.muted, fontSize: 13, lineHeight: 1.7 }}>
                Choose a coin and a target price. The dashboard checks the target when live price updates arrive.
              </p>
              <form onSubmit={addPriceAlert} className="twocol">
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>CRYPTO</label>
                  <select style={{ ...field, marginTop: 8 }} value={alertCoin} onChange={(event) => setAlertCoin(event.target.value)}>
                    {coins.map((coin) => <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>TARGET PRICE (USD)</label>
                  <input style={{ ...field, marginTop: 8 }} type="number" min="0" step="any" required value={alertPrice} onChange={(event) => setAlertPrice(event.target.value)} placeholder="e.g. 100000" />
                </div>
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>WHEN SHOULD IT TRIGGER?</label>
                  <select style={{ ...field, marginTop: 8 }} value={alertDirection} onChange={(event) => setAlertDirection(event.target.value)}>
                    <option value="above">When price reaches or goes above</option>
                    <option value="below">When price reaches or goes below</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button type="submit" style={{ ...button(true), width: "100%" }}>+ Create alert</button>
                </div>
              </form>
            </section>

            <section style={{ ...panel, marginBottom: 22 }}>
              <h3 style={{ marginTop: 0 }}>Saved alerts ({alerts.length})</h3>
              {alerts.length === 0 ? (
                <p style={{ color: theme.muted }}>You have no alerts yet.</p>
              ) : alerts.map((alert) => {
                const coin = coins.find((item) => item.id === alert.coinId);
                return (
                  <div key={alert.id} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 12, flexWrap: "wrap",
                    padding: "13px 0", borderBottom: `1px solid ${theme.border}`,
                  }}>
                    <div>
                      <strong>{coin?.name || alert.coinId}</strong>
                      <p style={{ color: theme.muted, fontSize: 13, margin: "5px 0 0" }}>
                        {alert.direction === "above" ? "At or above" : "At or below"} ${fmt(alert.target)}
                      </p>
                    </div>
                    <span style={{ color: alert.triggered ? "#00e6a0" : "#fbbf24", fontSize: 13 }}>
                      {alert.triggered ? "✓ Triggered" : "● Waiting"}
                    </span>
                    <button style={button()} onClick={() => removeAlert(alert.id)}>Delete</button>
                  </div>
                );
              })}
              <p style={{ color: theme.muted, fontSize: 12, lineHeight: 1.7 }}>
                Alerts are checked while this page is open and connected. They do not monitor prices in the background after the page is closed.
              </p>
            </section>
          </>
        )}

        {activeTab === "converter" && (
          <section style={{ ...panel, marginBottom: 22 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>◎ Universal Multi-Currency Converter</h2>
            <p style={{ color: theme.muted, fontSize: 13, marginBottom: 22, lineHeight: 1.7 }}>
              Enter an amount in USD, select a country and convert using the available exchange rate.
            </p>

            <div className="twocol">
              <div>
                <label htmlFor="usd-amount" style={{ color: theme.muted, fontSize: 13 }}>AMOUNT IN USD ($)</label>
                <input id="usd-amount" type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} style={{ ...field, marginTop: 9 }} placeholder="Enter amount" />

                <label htmlFor="country-select" style={{ display: "block", color: theme.muted, fontSize: 13, marginTop: 19 }}>
                  SELECT COUNTRY / CURRENCY
                </label>
                <select id="country-select" value={countryId} onChange={(event) => setCountryId(event.target.value)} style={{ ...field, marginTop: 9 }}>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.country} ({country.code})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                background: dark ? "#071b2c" : "#ecfeff",
                border: "1px solid #087eaa", borderRadius: 12,
                padding: 20, display: "flex", flexDirection: "column",
                justifyContent: "center", minWidth: 0,
              }}>
                <p style={{ color: theme.muted, fontSize: 12, margin: "0 0 10px" }}>
                  {selectedCountry.flag} {selectedCountry.country} ({selectedCountry.code})
                </p>
                <h2 style={{ color: "#00e6a0", fontSize: "clamp(24px, 4vw, 32px)", overflowWrap: "anywhere", margin: "0 0 12px" }}>
                  {selectedCountry.symbol}{fmt(converted)}
                </h2>
                <p style={{ color: theme.muted, fontSize: 12, margin: 0 }}>
                  1 USD = {fmt(selectedRate, 4)} {selectedCountry.code}
                </p>
                <p style={{ color: ratesLive ? "#22c55e" : "#fbbf24", fontSize: 11, marginBottom: 0 }}>
                  ● {ratesLive ? "Live exchange rate" : "Estimated backup rate"}
                </p>
              </div>
            </div>
          </section>
        )}

        <footer style={{ color: theme.muted, fontSize: 12, borderTop: `1px solid ${theme.border}`, paddingTop: 16, lineHeight: 1.8 }}>
          <p>Crypto source: Binance WebSocket · Exchange rates: ExchangeRate-API.</p>
          <p>
            Live prices require internet access. Currency backup rates are estimates.
            Portfolio and watchlist data are stored in this browser. Alerts only run while the page is open.
          </p>
          <p>© {new Date().getFullYear()} Kigali Global Tracker</p>
        </footer>
      </div>
    </main>
  );
}

