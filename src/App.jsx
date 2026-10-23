import { loadSaved, makeId } from "./utils/storage.js";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { countries, fallbackRates, initialCoins, fmt } from "./data/marketData.js";
import { useEffect, useMemo, useState } from "react";
import CurrencyConverter from "./components/converter.jsx";
import PriceAlerts from "./components/priceAlerts.jsx";
import DashboardOverview from "./components/DashboardOverview";
import Portfolio from "./components/Portfolio.jsx";
import Charts from "./components/Charts.jsx";
import Market from "./components/Market.jsx";
import TrendingCoins from "./components/TrendingCoins.jsx";
import CryptoNews from "./components/CryptoNews.jsx";
import Accounts from "./components/Accounts.jsx";
import Navigation from "./components/Navigation.jsx";
import Header from "./components/Header.jsx";
import NoticeBanner from "./components/Notification.jsx";
import FearGreedIndex from "./components/FearGreedIndex.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";
import DCACalculator from "./components/DCACalculator.jsx";


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
    let firstLoad = true;

    const ranges = {
      "24H": { interval: "1h", limit: 24 },
      "7D": { interval: "4h", limit: 42 },
      "30D": { interval: "1d", limit: 30 },
    };

    const range = ranges[chartRange];
    if (!range) return;

    async function loadHistoricalPrices() {
      if (firstLoad) setHistoryLoading(true);

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
          open: Number(candle[1]),
          high: Number(candle[2]),
          low: Number(candle[3]),
          close: Number(candle[4]),
          price: Number(candle[4]),
          volume: Number(candle[5]),
        }));

        if (!cancelled) {
          setHistoricalPrices(history);
          setHistoryError("");
        }
      } catch {
        if (!cancelled) {
          setHistoryError(
            "Could not refresh historical prices. Check your internet connection."
          );
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
          firstLoad = false;
        }
      }
    }

    loadHistoricalPrices();
    const timer = setInterval(loadHistoricalPrices, 5000);

    return () => {
      cancelled = true;
      clearInterval(timer);
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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        "--table-border": theme.border,
        "--table-muted": theme.muted,
        padding: 22,
        fontFamily: "Arial, sans-serif",
        transition: "background .2s, color .2s",
      }}
    >

      <div className="layout">
        {/* HEADER */}
        <Header theme={theme} panel={panel} button={button} dark={dark} setDark={setDark} />

        {/* NOTIFICATIONS */}
        <NoticeBanner notice={notice} setNotice={setNotice} panel={panel} button={button} />

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
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} button={button} />
      <FearGreedIndex activeTab={activeTab} theme={theme} panel={panel} />
      <TransactionHistory
        activeTab={activeTab}
        coins={coins}
        theme={theme}
        panel={panel}
        field={field}
        button={button}
        fmt={fmt}
      />

      <DCACalculator
        activeTab={activeTab}
        coins={coins}
        theme={theme}
        panel={panel}
        field={field}
        fmt={fmt}
      />

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

        {/* TOP GAINERS AND LOSERS */}
        <TrendingCoins
          activeTab={activeTab}
          coins={coins}
          theme={theme}
          panel={panel}
          fmt={fmt}
          setSelectedCoinId={setSelectedCoinId}
          setActiveTab={setActiveTab}
        />

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
        <Accounts
          activeTab={activeTab}
          theme={theme}
          panel={panel}
        />

        <CryptoNews
          activeTab={activeTab}
          theme={theme}
          panel={panel}
        />

        {/* FOOTER */}
        <Footer theme={theme} />
      </div>
    </main>
  );
}