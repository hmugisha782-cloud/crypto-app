import { useEffect, useRef, useState } from "react";

function CandlestickChart({ data, theme, liveDirection }) {
  const width = 900;
  const height = 300;
  const padding = { top: 18, right: 18, bottom: 28, left: 18 };

  if (!data || data.length === 0) {
    return <p style={{ color: theme.muted }}>No candle data available.</p>;
  }

  const minPrice = Math.min(...data.map((c) => c.low));
  const maxPrice = Math.max(...data.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const plotHeight = height - padding.top - padding.bottom;
  const plotWidth = width - padding.left - padding.right;
  const step = plotWidth / data.length;
  const candleWidth = Math.max(2, Math.min(12, step * 0.58));

  const y = (price) =>
    padding.top + ((maxPrice - price) / priceRange) * plotHeight;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Candlestick price chart"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const gy = padding.top + (plotHeight / 4) * i;
        return (
          <line
            key={i}
            x1={padding.left}
            y1={gy}
            x2={width - padding.right}
            y2={gy}
            stroke={theme.border}
            strokeWidth="1"
          />
        );
      })}

      {data.map((candle, i) => {
        const x = padding.left + step * i + step / 2;
        const rising = i === data.length - 1 && liveDirection !== 0
          ? liveDirection > 0
          : candle.close >= candle.open;
        const color = rising ? "#00c087" : "#f04452";
        const top = y(Math.max(candle.open, candle.close));
        const bottom = y(Math.min(candle.open, candle.close));
        const bodyHeight = Math.max(1.5, bottom - top);

        return (
          <g key={`${candle.time}-${i}`}>
            <line
              x1={x}
              y1={y(candle.high)}
              x2={x}
              y2={y(candle.low)}
              stroke={color}
              strokeWidth="1.5"
            />
            <rect
              x={x - candleWidth / 2}
              y={top}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
              stroke={color}
              rx="0.5"
            >
              <title>
                {`Open: ${candle.open} | High: ${candle.high} | Low: ${candle.low} | Close: ${candle.close}`}
              </title>
            </rect>
          </g>
        );
      })}
    </svg>
  );
}

function VolumeChart({ data, theme, liveDirection }) {
  const width = 900;
  const height = 140;
  const padding = { top: 10, right: 18, bottom: 24, left: 18 };
  const plotHeight = height - padding.top - padding.bottom;
  const plotWidth = width - padding.left - padding.right;
  const step = plotWidth / Math.max(data.length, 1);
  const barWidth = Math.max(2, Math.min(12, step * 0.58));
  const maxVolume = Math.max(...data.map((c) => c.volume || 0), 1);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Trading volume chart"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke={theme.border}
      />
      {data.map((candle, i) => {
        const x = padding.left + step * i + step / 2;
        const barHeight =
          ((candle.volume || 0) / maxVolume) * plotHeight;
        const rising = i === data.length - 1 && liveDirection !== 0
          ? liveDirection > 0
          : candle.close >= candle.open;
        const color = rising ? "#00c087" : "#f04452";

        return (
          <rect
            key={`${candle.time}-${i}`}
            x={x - barWidth / 2}
            y={height - padding.bottom - barHeight}
            width={barWidth}
            height={Math.max(1, barHeight)}
            fill={color}
            opacity="0.8"
          >
            <title>{`Volume: ${(candle.volume || 0).toLocaleString()}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

export default function Charts({
  activeTab,
  panel,
  selectedCoinId,
  setSelectedCoinId,
  field,
  coins,
  selectedCoin,
  fmt,
  theme,
  button,
  chartRange,
  setChartRange,
  historyLoading,
  historyError,
  historicalPrices,
  setActiveTab,
}) {
  const latest = historicalPrices[historicalPrices.length - 1];

  const [liveDirection, setLiveDirection] = useState(0);
  const [chartUpdatedAt, setChartUpdatedAt] = useState(null);
  const previousPrice = useRef(Number(selectedCoin?.price) || 0);

  useEffect(() => {
    const price = Number(selectedCoin?.price) || 0;
    if (!price) return;

    const previous = previousPrice.current;
    if (previous > 0 && price !== previous) {
      setLiveDirection(price > previous ? 1 : -1);
    }
    previousPrice.current = price;
  }, [selectedCoin?.price]);

  useEffect(() => {
    if (!historyLoading && historicalPrices.length > 0) {
      setChartUpdatedAt(new Date());
    }
  }, [historicalPrices, historyLoading, selectedCoinId, chartRange]);

  const candleInterval =
    chartRange === "24H"
      ? "1 hour"
      : chartRange === "7D"
        ? "4 hours"
        : "1 day";

  const liveHistoricalPrices = historicalPrices.map((candle, index) => {
    if (index !== historicalPrices.length - 1) return candle;

    const price = Number(selectedCoin?.price) || candle.close;
    return {
      ...candle,
      close: price,
      price,
      high: Math.max(candle.high, price),
      low: Math.min(candle.low, price),
    };
  });

  const latestLiveCandle =
    liveHistoricalPrices[liveHistoricalPrices.length - 1];

  return (
    <>
      {activeTab === "charts" && (
        <section style={{ ...panel, marginBottom: 22 }}>
          <h2 style={{ marginTop: 0 }}>📊 Crypto Price Chart</h2>

          <label
            htmlFor="chart-coin"
            style={{ color: theme.muted, fontSize: 13 }}
          >
            SELECT CRYPTO
          </label>

          <select
            id="chart-coin"
            value={selectedCoinId}
            onChange={(event) => setSelectedCoinId(event.target.value)}
            style={{ ...field, margin: "8px 0 18px" }}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ color: theme.muted, margin: "0 0 7px" }}>
                {selectedCoin.name} · Live price
              </p>
              <h2 style={{ fontSize: 30, margin: 0 }}>
                ${fmt(selectedCoin.price)}
              </h2>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ color: theme.muted, margin: "0 0 7px" }}>
                24h change
              </p>
              <strong
                style={{
                  color: selectedCoin.change >= 0 ? "#00e6a0" : "#ff526c",
                }}
              >
                {selectedCoin.change >= 0 ? "+" : ""}
                {fmt(selectedCoin.change)}%
              </strong>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            {[
              ["24H", "24 Hours"],
              ["7D", "7 Days"],
              ["30D", "30 Days"],
            ].map(([value, label]) => (
              <button
                key={value}
                style={button(chartRange === value)}
                onClick={() => setChartRange(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 18,
              background: theme.input,
              borderRadius: 12,
              padding: 12,
            }}
          >
            {historyLoading ? (
              <div
                style={{
                  minHeight: 220,
                  display: "grid",
                  placeItems: "center",
                  color: theme.muted,
                }}
              >
                Loading historical prices...
              </div>
            ) : historyError ? (
              <div
                role="alert"
                style={{ color: "#ff526c", padding: 20 }}
              >
                {historyError}
              </div>
            ) : historicalPrices.length > 0 ? (
              <>
                <h3 style={{ fontSize: 14, margin: "4px 0 6px" }}>
                  Candlestick · Price (USDT)
                </h3>
                <p style={{ color: theme.muted, fontSize: 12, margin: "0 0 12px" }}>
                  Each candle represents {candleInterval}. The latest candle
                  updates with the selected crypto's live price.
                </p>
                <CandlestickChart data={liveHistoricalPrices} theme={theme} liveDirection={liveDirection} />

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    color: theme.muted,
                    fontSize: 12,
                    margin: "8px 0 18px",
                  }}
                >
                  <span><span style={{ color: "#00c087" }}>■</span> Price up</span>
                  <span><span style={{ color: "#f04452" }}>■</span> Price down</span>
                </div>

                <h3 style={{ fontSize: 14, margin: "8px 0" }}>
                  Trading Volume
                </h3>
                <VolumeChart data={liveHistoricalPrices} theme={theme} liveDirection={liveDirection} />

                {latestLiveCandle && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                      gap: 10,
                      marginTop: 18,
                    }}
                  >
                    {[
                      ["OPEN", latestLiveCandle.open],
                      ["HIGH", latestLiveCandle.high],
                      ["LOW", latestLiveCandle.low],
                      ["CLOSE", latestLiveCandle.close],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          border: `1px solid ${theme.border}`,
                          borderRadius: 8,
                          padding: 12,
                        }}
                      >
                        <div style={{ color: theme.muted, fontSize: 11 }}>
                          {label}
                        </div>
                        <strong>${fmt(value, 4)}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  minHeight: 220,
                  display: "grid",
                  placeItems: "center",
                  color: theme.muted,
                  textAlign: "center",
                }}
              >
                Historical price data is not available yet.
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 12,
              color: theme.muted,
              fontSize: 12,
            }}
          >
            <span>
              {candleInterval} candles · {historicalPrices.length} points
            </span>

            {historicalPrices.length > 0 && (
              <span>
                Candle range:{" "}
                {new Date(historicalPrices[0].time).toLocaleDateString()} –{" "}
                {new Date(
                  historicalPrices[historicalPrices.length - 1].time
                ).toLocaleDateString()}
              </span>
            )}
            {chartUpdatedAt && (
              <span>
                Chart data updated: {chartUpdatedAt.toLocaleTimeString()}
              </span>
            )}
          </div>

          <p
            style={{
              color: theme.muted,
              fontSize: 12,
              lineHeight: 1.7,
            }}
          >
            Historical candlesticks and trading volume come from Binance.
            Green candles indicate a close price at or above the open price;
            red candles indicate a close below the open price.
          </p>

          <button style={button()} onClick={() => setActiveTab("market")}>
            ← Back to market
          </button>
        </section>
      )}
    </>
  );
}
