export default function Charts({activeTab, panel, selectedCoinId, setSelectedCoinId,
  field, coins, selectedCoin, fmt, theme, button, chartRange,
  setChartRange, historyLoading, historyError, visibleChartValues,
  chartAreaPoints, chartPoints, historicalPrices, setActiveTab}) {
  return (
    <>
        {/* HISTORICAL CHARTS */}
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

            {/* HISTORICAL RANGE BUTTONS */}
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

            {/* CHART */}
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
                    height: 250,
                    display: "grid",
                    placeItems: "center",
                    color: theme.muted,
                    textAlign: "center",
                  }}
                >
                  Loading historical prices...
                </div>
              ) : historyError ? (
                <div
                  role="alert"
                  style={{
                    minHeight: 250,
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                    color: "#ff526c",
                    padding: 20,
                  }}
                >
                  {historyError}
                </div>
              ) : visibleChartValues.length > 1 ? (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="chart-svg"
                  role="img"
                  aria-label={`${selectedCoin.name} historical price chart`}
                >
                  <defs>
                    <linearGradient
                      id="chartFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={selectedCoin.color}
                        stopOpacity=".35"
                      />
                      <stop
                        offset="100%"
                        stopColor={selectedCoin.color}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {[20, 40, 60, 80].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke={theme.border}
                      strokeWidth=".3"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  <polygon
                    points={chartAreaPoints}
                    fill="url(#chartFill)"
                  />

                  <polyline
                    points={chartPoints}
                    fill="none"
                    stroke={selectedCoin.color}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              ) : (
                <div
                  style={{
                    height: 250,
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
                {chartRange === "24H"
                  ? "Hourly prices · 24 points"
                  : chartRange === "7D"
                    ? "4-hour prices · Up to 42 points"
                    : "Daily prices · Up to 30 points"}
              </span>

              {historicalPrices.length > 0 && (
                <span>
                  {new Date(
                    historicalPrices[0].time
                  ).toLocaleDateString()}{" "}
                  –{" "}
                  {new Date(
                    historicalPrices[historicalPrices.length - 1].time
                  ).toLocaleDateString()}
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
              Historical prices come from Binance. The 24H view uses hourly
              candles, the 7D view uses 4-hour candles, and the 30D view uses
              daily candles. The current live price is shown separately above.
            </p>

            <button style={button()} onClick={() => setActiveTab("market")}>
              ← Back to market
            </button>
          </section>
        )}

    </>
  );
}
