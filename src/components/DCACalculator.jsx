
import { useMemo, useState } from "react";

export default function DCACalculator({
  activeTab,
  coins = [],
  theme = {},
  panel = {},
  field = {},
  fmt = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 6,
    }),
}) {
  const [coinId, setCoinId] = useState("BTC");
  const [amount, setAmount] = useState("50");
  const [frequency, setFrequency] = useState("weekly");
  const [periods, setPeriods] = useState("12");
  const [priceChange, setPriceChange] = useState("0");

  const coin = coins.find(
    (item) =>
      String(item.symbol || item.id || "").toUpperCase() ===
      coinId.toUpperCase()
  );

  const currentPrice = Number(
    coin?.price ?? coin?.current_price ?? coin?.lastPrice ?? 0
  );

  const result = useMemo(() => {
    const investment = Math.max(0, Number(amount) || 0);
    const count = Math.max(0, Math.floor(Number(periods) || 0));
    const change = (Number(priceChange) || 0) / 100;
    const totalInvested = investment * count;
    let totalCoins = 0;

    for (let i = 0; i < count; i += 1) {
      const price =
        currentPrice > 0
          ? currentPrice * (1 + change * (i / Math.max(count - 1, 1)))
          : 0;

      if (price > 0) {
        totalCoins += investment / price;
      }
    }

    const averagePrice =
      totalCoins > 0 ? totalInvested / totalCoins : 0;
    const currentValue = totalCoins * currentPrice;

    return {
      totalInvested,
      totalCoins,
      averagePrice,
      currentValue,
      profitLoss:
        currentPrice > 0 && totalCoins > 0
          ? currentValue - totalInvested
          : null,
    };
  }, [amount, periods, priceChange, currentPrice]);

  if (activeTab !== "dca") return null;

  const money = (value) => "$" + fmt(value);

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
    border: "1px solid #64748b",
    background: theme.input || "transparent",
    color: theme.text || "inherit",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 14,
    color: theme.text || "inherit",
    fontSize: 13,
  };

  const results = [
    ["Total Invested", money(result.totalInvested)],
    ["Estimated Crypto", `${fmt(result.totalCoins)} ${coinId}`],
    ["Average Buy Price", money(result.averagePrice)],
    ["Current Estimated Value", money(result.currentValue)],
  ];

  return (
    <section
      style={{
        ...panel,
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>📅 DCA Calculator</h2>
      <p style={{ color: theme.muted || "#94a3b8" }}>
        Calculate how regularly investing a fixed amount in cryptocurrency
        may affect your holdings. This is an estimate, not a prediction.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16,
        }}
      >
        <label style={labelStyle}>
          Cryptocurrency
          <select
            style={inputStyle}
            value={coinId}
            onChange={(event) => setCoinId(event.target.value)}
          >
            {coins.length > 0 ? (
              coins.map((item) => {
                const symbol = String(
                  item.symbol || item.id || "COIN"
                ).toUpperCase();

                return (
                  <option key={symbol} value={symbol}>
                    {item.name || symbol} ({symbol})
                  </option>
                );
              })
            ) : (
              <>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
              </>
            )}
          </select>
        </label>

        <label style={labelStyle}>
          Amount per investment (USD)
          <input
            style={inputStyle}
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label style={labelStyle}>
          Investment frequency
          <select
            style={inputStyle}
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <label style={labelStyle}>
          Number of investments
          <input
            style={inputStyle}
            type="number"
            min="1"
            step="1"
            value={periods}
            onChange={(event) => setPeriods(event.target.value)}
          />
        </label>

        <label style={labelStyle}>
          Assumed total price change (%)
          <input
            style={inputStyle}
            type="number"
            value={priceChange}
            onChange={(event) => setPriceChange(event.target.value)}
          />
        </label>
      </div>

      <p style={{ color: theme.muted || "#94a3b8", fontSize: 13 }}>
        Frequency: {frequency}. The assumed price change models a gradual
        price movement across investments. Real market prices fluctuate.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginTop: 18,
        }}
      >
        {results.map(([label, value]) => (
          <div
            key={label}
            style={{
              ...panel,
              padding: 15,
              borderRadius: 12,
              minWidth: 0,
            }}
          >
            <div
              style={{
                color: theme.muted || "#94a3b8",
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {label}
            </div>
            <strong style={{ overflowWrap: "anywhere" }}>{value}</strong>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <span style={{ color: theme.muted || "#94a3b8" }}>
          Estimated Profit / Loss:{" "}
        </span>
        {result.profitLoss === null ? (
          <strong style={{ color: "#f59e0b" }}>
            Waiting for live price
          </strong>
        ) : (
          <strong
            style={{
              color: result.profitLoss >= 0 ? "#22c55e" : "#ef4444",
            }}
          >
            {money(result.profitLoss)}
          </strong>
        )}
      </div>

      {currentPrice <= 0 && (
        <p style={{ color: "#f59e0b", fontSize: 13 }}>
          Current coin price is unavailable. The value and profit/loss
          estimates may be inaccurate until live price data is available.
        </p>
      )}
    </section>
  );
}
