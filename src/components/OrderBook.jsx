import { useEffect, useState } from "react";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];

export default function OrderBook({ activeTab, theme, panel, fmt }) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [book, setBook] = useState({ bids: [], asks: [] });
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeTab !== "orderbook") return;

    let cancelled = false;
    let socket;
    let reconnectTimer;

    const connect = () => {
      if (cancelled) return;

      socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth20@100ms`
      );

      socket.onopen = () => {
        if (!cancelled) {
          setStatus("Live");
          setError("");
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (cancelled) return;

          setBook({
            bids: (data.bids || []).map(([price, quantity]) => ({
              price: Number(price),
              quantity: Number(quantity),
            })),
            asks: (data.asks || []).map(([price, quantity]) => ({
              price: Number(price),
              quantity: Number(quantity),
            })),
          });
        } catch {
          if (!cancelled) setError("Could not read market data.");
        }
      };

      socket.onerror = () => {
        if (!cancelled) {
          setStatus("Connection issue");
          setError("Binance market data is temporarily unavailable.");
        }
      };

      socket.onclose = () => {
        if (!cancelled) {
          setStatus("Reconnecting...");
          reconnectTimer = setTimeout(connect, 3000);
        }
      };
    };

    setBook({ bids: [], asks: [] });
    setStatus("Connecting...");
    setError("");
    connect();

    return () => {
      cancelled = true;
      clearTimeout(reconnectTimer);
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, [activeTab, symbol]);

  if (activeTab !== "orderbook") return null;

  const bids = book.bids;
  const asks = [...book.asks].reverse();
  const bidTotal = bids.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const askTotal = book.asks.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = bidTotal + askTotal;
  const bidPercent = total > 0 ? (bidTotal / total) * 100 : 50;
  const askPercent = 100 - bidPercent;
  const money = (value) =>
    Number.isFinite(value)
      ? value.toLocaleString(undefined, { maximumFractionDigits: 4 })
      : "—";

  const heading = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 12,
  };

  const column = { minWidth: 0, flex: "1 1 240px" };
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    padding: "7px 0",
    fontSize: 12,
    borderBottom: `1px solid ${theme.border}`,
  };

  const muted = { color: theme.muted, fontSize: 12 };
  const green = "#16a34a";
  const red = "#dc2626";

  return (
    <section style={{ ...panel, marginBottom: 22 }}>
      <div style={heading}>
        <div>
          <h2 style={{ margin: 0 }}>📚 Order Book & Market Depth</h2>
          <p style={muted}>Live buy and sell orders from Binance</p>
        </div>

        <select
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          style={{
            padding: "9px 12px",
            borderRadius: 8,
            border: `1px solid ${theme.border}`,
            background: theme.card,
            color: theme.text,
          }}
        >
          {SYMBOLS.map((item) => (
            <option key={item} value={item}>
              {item.replace("USDT", "/USDT")}
            </option>
          ))}
        </select>
      </div>

      <p style={{ ...muted, color: status === "Live" ? green : theme.muted }}>
        ● {status}
      </p>

      {error && <p style={{ color: red }}>{error}</p>}

      <div
        style={{
          display: "flex",
          height: 10,
          overflow: "hidden",
          borderRadius: 10,
          background: theme.border,
          margin: "14px 0 8px",
        }}
      >
        <div style={{ width: `${bidPercent}%`, background: green }} />
        <div style={{ width: `${askPercent}%`, background: red }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", ...muted }}>
        <span style={{ color: green }}>Buy depth {bidPercent.toFixed(1)}%</span>
        <span style={{ color: red }}>Sell depth {askPercent.toFixed(1)}%</span>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", margin: "18px 0" }}>
        <div style={column}>
          <strong style={{ color: green }}>Buy Orders (Bids)</strong>
          <p style={muted}>Total: {money(bidTotal)} USDT</p>
          <div style={rowStyle}>
            <strong>Price</strong><strong>Amount</strong><strong>Total</strong>
          </div>
          {bids.length === 0 ? (
            <p style={muted}>Waiting for market data…</p>
          ) : bids.map((item, index) => (
            <div key={`${item.price}-${index}`} style={rowStyle}>
              <span style={{ color: green }}>{money(item.price)}</span>
              <span>{money(item.quantity)}</span>
              <span>{money(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div style={column}>
          <strong style={{ color: red }}>Sell Orders (Asks)</strong>
          <p style={muted}>Total: {money(askTotal)} USDT</p>
          <div style={rowStyle}>
            <strong>Price</strong><strong>Amount</strong><strong>Total</strong>
          </div>
          {asks.length === 0 ? (
            <p style={muted}>Waiting for market data…</p>
          ) : asks.map((item, index) => (
            <div key={`${item.price}-${index}`} style={rowStyle}>
              <span style={{ color: red }}>{money(item.price)}</span>
              <span>{money(item.quantity)}</span>
              <span>{money(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={muted}>
        Depth percentages are calculated from the displayed order levels only,
        not the entire market. This is market information, not financial advice.
      </p>
    </section>
  );
}
