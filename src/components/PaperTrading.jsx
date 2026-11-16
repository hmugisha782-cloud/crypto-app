import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kgt-paper-trading-v1";
const STARTING_BALANCE = 10000;

function loadAccount() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const account = JSON.parse(saved);

      if (
        typeof account.cash === "number" &&
        account.holdings &&
        typeof account.holdings === "object"
      ) {
        return {
          cash: account.cash,
          holdings: account.holdings,
          trades: Array.isArray(account.trades) ? account.trades : [],
          realizedPnl: Number(account.realizedPnl) || 0,
        };
      }
    }
  } catch (error) {
    console.error("Could not load paper trading account:", error);
  }

  return {
    cash: STARTING_BALANCE,
    holdings: {},
    trades: [],
    realizedPnl: 0,
  };
}

export default function PaperTrading({
  activeTab,
  coins = [],
  theme = {},
  panel = {},
  fmt = (value) => Number(value || 0).toFixed(2),
}) {
  const [account, setAccount] = useState(loadAccount);
  const [selectedCoinId, setSelectedCoinId] = useState(
    () => coins[0]?.id || ""
  );
  const [tradeType, setTradeType] = useState("BUY");
  const [amount, setAmount] = useState("100");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } catch (error) {
      console.error("Could not save paper trading account:", error);
    }
  }, [account]);

  useEffect(() => {
    if (!coins.some((coin) => coin.id === selectedCoinId) && coins[0]) {
      setSelectedCoinId(coins[0].id);
    }
  }, [coins, selectedCoinId]);

  const selectedCoin = coins.find(
    (coin) => coin.id === selectedCoinId
  );

  const holdingsList = useMemo(() => {
    return coins
      .map((coin) => {
        const holding = account.holdings[coin.id];
        const quantity = Number(holding?.quantity) || 0;
        const costBasis = Number(holding?.costBasis) || 0;
        const price = Number(coin.price) || 0;
        const value = quantity * price;

        return {
          ...coin,
          quantity,
          costBasis,
          value,
          profit: value - costBasis,
        };
      })
      .filter((coin) => coin.quantity > 0);
  }, [coins, account.holdings]);

  const holdingsValue = holdingsList.reduce(
    (total, coin) => total + coin.value,
    0
  );

  const totalCost = holdingsList.reduce(
    (total, coin) => total + coin.costBasis,
    0
  );

  const totalEquity = account.cash + holdingsValue;
  const unrealizedPnl = holdingsValue - totalCost;
  const totalPnl = account.realizedPnl + unrealizedPnl;

  const colors = {
    text: theme.text || "#e2e8f0",
    muted: theme.muted || "#94a3b8",
    border: theme.border || "#334155",
    background: theme.background || "#0f172a",
    card: panel.background || panel.backgroundColor || "#111827",
    green: "#22c55e",
    red: "#ef4444",
    blue: "#3b82f6",
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: 16,
    minWidth: 0,
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    background: colors.background,
    color: colors.text,
    marginTop: 6,
  };

  const money = (value) =>
    `$${fmt(Number(value) || 0, 2)}`;

  function executeTrade(event) {
    event.preventDefault();
    setMessage("");

    if (!selectedCoin) {
      setMessage("Select a cryptocurrency to trade.");
      return;
    }

    const price = Number(selectedCoin.price);
    const enteredAmount = Number(amount);

    if (!Number.isFinite(price) || price <= 0) {
      setMessage("Wait for the crypto price to load from the market.");
      return;
    }

    if (!Number.isFinite(enteredAmount) || enteredAmount <= 0) {
      setMessage(
        tradeType === "BUY"
          ? "Enter an amount greater than zero."
          : "Enter a quantity greater than zero."
      );
      return;
    }

    const oldHolding = account.holdings[selectedCoin.id] || {
      quantity: 0,
      costBasis: 0,
    };

    const oldQuantity = Number(oldHolding.quantity) || 0;
    const oldCostBasis = Number(oldHolding.costBasis) || 0;

    if (tradeType === "BUY") {
      const dollars = enteredAmount;

      if (dollars > account.cash) {
        setMessage("Insufficient demo cash balance.");
        return;
      }

      const quantityBought = dollars / price;

      setAccount((previous) => {
        const current = previous.holdings[selectedCoin.id] || {
          quantity: 0,
          costBasis: 0,
        };

        return {
          ...previous,
          cash: previous.cash - dollars,
          holdings: {
            ...previous.holdings,
            [selectedCoin.id]: {
              quantity:
                (Number(current.quantity) || 0) + quantityBought,
              costBasis:
                (Number(current.costBasis) || 0) + dollars,
            },
          },
          trades: [
            {
              id: `${Date.now()}-${Math.random()}`,
              type: "BUY",
              coinName: selectedCoin.name,
              symbol: selectedCoin.symbol,
              quantity: quantityBought,
              price,
              total: dollars,
              date: new Date().toISOString(),
            },
            ...previous.trades,
          ].slice(0, 100),
        };
      });

      setMessage(
        `You bought ${fmt(quantityBought, 8)} ${selectedCoin.symbol} using ${money(dollars)} in demo funds.`
      );
      setAmount("100");
      return;
    }

    const quantityToSell = enteredAmount;

    if (quantityToSell > oldQuantity) {
      setMessage("You don't have enough crypto to sell.");
      return;
    }

    const proceeds = quantityToSell * price;
    const averageCost =
      oldQuantity > 0 ? oldCostBasis / oldQuantity : 0;
    const costOfSoldCoins = averageCost * quantityToSell;
    const tradeProfit = proceeds - costOfSoldCoins;
    const remainingQuantity = Math.max(
      0,
      oldQuantity - quantityToSell
    );
    const remainingCost = Math.max(
      0,
      oldCostBasis - costOfSoldCoins
    );

    setAccount((previous) => {
      const holdings = { ...previous.holdings };

      if (remainingQuantity < 0.0000000001) {
        delete holdings[selectedCoin.id];
      } else {
        holdings[selectedCoin.id] = {
          quantity: remainingQuantity,
          costBasis: remainingCost,
        };
      }

      return {
        ...previous,
        cash: previous.cash + proceeds,
        holdings,
        realizedPnl: previous.realizedPnl + tradeProfit,
        trades: [
          {
            id: `${Date.now()}-${Math.random()}`,
            type: "SELL",
            coinName: selectedCoin.name,
            symbol: selectedCoin.symbol,
            quantity: quantityToSell,
            price,
            total: proceeds,
            profit: tradeProfit,
            date: new Date().toISOString(),
          },
          ...previous.trades,
        ].slice(0, 100),
      };
    });

    setMessage(
      `Wagurishije ${fmt(quantityToSell, 8)} ${selectedCoin.symbol} kuri ${money(proceeds)}.`
    );
    setAmount("");
  }

  function resetAccount() {
    const confirmed = window.confirm(
      "Reset your account to $10,000? Your saved Paper Trading data will be replaced."
    );

    if (!confirmed) return;

    setAccount({
      cash: STARTING_BALANCE,
      holdings: {},
      trades: [],
      realizedPnl: 0,
    });
    setAmount("100");
    setMessage("Konti yasubijwe kuri $10,000.");
  }

  if (activeTab !== "papertrading") return null;

  return (
    <section style={{ color: colors.text, marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px" }}>🧪 Paper Trading</h2>
          <p style={{ color: colors.muted, margin: 0 }}>
            Practice buying and selling crypto using demo funds.
            No real money is used.
          </p>
        </div>

        <button
          type="button"
          onClick={resetAccount}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            background: "transparent",
            color: colors.text,
            cursor: "pointer",
          }}
        >
          ↻ Reset account
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          ["Demo Cash", money(account.cash), colors.text],
          ["Crypto Value", money(holdingsValue), colors.text],
          ["Total Equity", money(totalEquity), colors.blue],
          [
            "Total Profit / Loss",
            `${totalPnl >= 0 ? "+" : ""}${money(totalPnl)}`,
            totalPnl >= 0 ? colors.green : colors.red,
          ],
        ].map(([label, value, color]) => (
          <div key={label} style={cardStyle}>
            <div style={{ color: colors.muted, fontSize: 13 }}>
              {label}
            </div>
            <strong
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 22,
                color,
                overflowWrap: "anywhere",
              }}
            >
              {value}
            </strong>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <form onSubmit={executeTrade} style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Place Demo Trade</h3>

          <label>
            Crypto
            <select
              value={selectedCoinId}
              onChange={(event) => setSelectedCoinId(event.target.value)}
              style={inputStyle}
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </label>

          <div style={{ marginTop: 14 }}>
            <label>
              Trade type
              <select
                value={tradeType}
                onChange={(event) => {
                  setTradeType(event.target.value);
                  setAmount(event.target.value === "BUY" ? "100" : "");
                  setMessage("");
                }}
                style={inputStyle}
              >
                <option value="BUY">Buy — spend USD</option>
                <option value="SELL">Sell — enter crypto quantity</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: 14 }}>
            <label>
              {tradeType === "BUY"
                ? "Amount in USD ($)"
                : `Quantity of ${selectedCoin?.symbol || "crypto"}`}
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={tradeType === "BUY" ? "100" : "0.01"}
                style={inputStyle}
              />
            </label>
          </div>

          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: colors.background,
              borderRadius: 8,
              color: colors.muted,
              fontSize: 14,
            }}
          >
            <div>
              Market price:{" "}
              <strong style={{ color: colors.text }}>
                {selectedCoin && Number(selectedCoin.price) > 0
                  ? money(selectedCoin.price)
                  : "Waiting for live price..."}
              </strong>
            </div>
            {tradeType === "BUY" && Number(amount) > 0 && selectedCoin?.price > 0 && (
              <div style={{ marginTop: 6 }}>
                Estimated quantity:{" "}
                {fmt(Number(amount) / Number(selectedCoin.price), 8)}{" "}
                {selectedCoin.symbol}
              </div>
            )}
            {tradeType === "SELL" && (
              <div style={{ marginTop: 6 }}>
                You own: {fmt(
                  account.holdings[selectedCoinId]?.quantity || 0,
                  8
                )}{" "}
                {selectedCoin?.symbol}
              </div>
            )}
          </div>

          {message && (
            <p
              role="status"
              style={{
                color:
                  message.toLowerCase().includes("insufficient") ||
                  message.toLowerCase().includes("not enough") ||
                  message.toLowerCase().includes("wait") ||
                  message.toLowerCase().includes("enter")
                    ? colors.red
                    : colors.green,
                overflowWrap: "anywhere",
                lineHeight: 1.5,
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: 16,
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: tradeType === "BUY" ? colors.green : colors.red,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {tradeType === "BUY" ? "Buy with Demo Money" : "Sell Crypto"}
          </button>
        </form>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Portfolio Summary</h3>
          {[
            ["Starting Balance", money(STARTING_BALANCE)],
            ["Cash Remaining", money(account.cash)],
            ["Current Crypto Value", money(holdingsValue)],
            ["Unrealized P/L", `${unrealizedPnl >= 0 ? "+" : ""}${money(unrealizedPnl)}`],
            ["Realized P/L", `${account.realizedPnl >= 0 ? "+" : ""}${money(account.realizedPnl)}`],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ color: colors.muted }}>{label}</span>
              <strong style={{ textAlign: "right", overflowWrap: "anywhere" }}>
                {value}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle, marginBottom: 20, overflowX: "auto" }}>
        <h3 style={{ marginTop: 0 }}>My Demo Holdings</h3>

        {holdingsList.length === 0 ? (
          <p style={{ color: colors.muted }}>
            You don't own any crypto yet. Use Buy to get started.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 580,
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", color: colors.muted }}>
                <th style={{ padding: 10 }}>Asset</th>
                <th style={{ padding: 10 }}>Quantity</th>
                <th style={{ padding: 10 }}>Market Value</th>
                <th style={{ padding: 10 }}>Cost</th>
                <th style={{ padding: 10 }}>Unrealized P/L</th>
              </tr>
            </thead>
            <tbody>
              {holdingsList.map((coin) => (
                <tr
                  key={coin.id}
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <td style={{ padding: 10 }}>
                    <strong>{coin.name}</strong>
                    <div style={{ color: colors.muted, fontSize: 12 }}>
                      {coin.symbol}
                    </div>
                  </td>
                  <td style={{ padding: 10 }}>
                    {fmt(coin.quantity, 8)}
                  </td>
                  <td style={{ padding: 10 }}>{money(coin.value)}</td>
                  <td style={{ padding: 10 }}>{money(coin.costBasis)}</td>
                  <td
                    style={{
                      padding: 10,
                      color: coin.profit >= 0 ? colors.green : colors.red,
                    }}
                  >
                    {coin.profit >= 0 ? "+" : ""}
                    {money(coin.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ ...cardStyle, overflowX: "auto" }}>
        <h3 style={{ marginTop: 0 }}>Demo Trade History</h3>

        {account.trades.length === 0 ? (
          <p style={{ color: colors.muted }}>
            You haven't made any trades yet. Your trades will appear here.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 600,
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", color: colors.muted }}>
                <th style={{ padding: 10 }}>Date</th>
                <th style={{ padding: 10 }}>Type</th>
                <th style={{ padding: 10 }}>Asset</th>
                <th style={{ padding: 10 }}>Quantity</th>
                <th style={{ padding: 10 }}>Price</th>
                <th style={{ padding: 10 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {account.trades.map((trade) => (
                <tr
                  key={trade.id}
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <td style={{ padding: 10, whiteSpace: "nowrap" }}>
                    {new Date(trade.date).toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: 10,
                      color: trade.type === "BUY" ? colors.green : colors.red,
                      fontWeight: 700,
                    }}
                  >
                    {trade.type}
                  </td>
                  <td style={{ padding: 10 }}>
                    {trade.symbol}
                  </td>
                  <td style={{ padding: 10 }}>
                    {fmt(trade.quantity, 8)}
                  </td>
                  <td style={{ padding: 10 }}>{money(trade.price)}</td>
                  <td style={{ padding: 10 }}>{money(trade.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
