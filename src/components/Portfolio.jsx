export default function Portfolio({activeTab, panel, theme, portfolioValue, portfolioCost,
  portfolioProfit, fmt, coins, field, portfolioCoin, setPortfolioCoin,
  quantity, setQuantity, buyPrice, setBuyPrice, addPortfolioItem,
  button, portfolioRows, setPortfolio}) {
  const allocationRows = Object.values(
    portfolioRows.reduce((groups, item) => {
      const id = item.coinId || item.coin?.id || item.coin?.name;
      if (!groups[id]) {
        groups[id] = {
          id,
          name: item.coin?.name || item.coinId || "Crypto",
          color: item.coin?.color || "#06b6d4",
          value: 0,
        };
      }
      groups[id].value += Number(item.value) || 0;
      return groups;
    }, {})
  ).sort((a, b) => b.value - a.value);

  const allocationTotal = allocationRows.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <>
        {/* PORTFOLIO */}
        {activeTab === "portfolio" && (
          <>
            <section style={{ ...panel, marginBottom: 18 }}>
              <h2 style={{ marginTop: 0 }}>💼 My Crypto Portfolio</h2>

              <p style={{ color: theme.muted, fontSize: 13 }}>
                Add the amount of crypto you own and the price you paid per coin.
              </p>

              <div className="grid" style={{ marginBottom: 18 }}>
                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>
                    CURRENT VALUE
                  </p>
                  <h2 style={{ marginBottom: 0, overflowWrap: "anywhere" }}>
                    ${fmt(portfolioValue)}
                  </h2>
                </div>

                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>
                    PURCHASE COST
                  </p>
                  <h2 style={{ marginBottom: 0, overflowWrap: "anywhere" }}>
                    ${fmt(portfolioCost)}
                  </h2>
                </div>

                <div style={panel}>
                  <p style={{ color: theme.muted, marginTop: 0 }}>
                    PROFIT / LOSS
                  </p>
                  <h2
                    style={{
                      color: portfolioProfit >= 0 ? "#00e6a0" : "#ff526c",
                      marginBottom: 0,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {portfolioProfit >= 0 ? "+" : "-"}$
                    {fmt(Math.abs(portfolioProfit))}
                  </h2>
                </div>
              </div>

              <form onSubmit={addPortfolioItem} className="twocol">
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>
                    CRYPTO
                  </label>
                  <select
                    style={{ ...field, marginTop: 8 }}
                    value={portfolioCoin}
                    onChange={(event) => setPortfolioCoin(event.target.value)}
                  >
                    {coins.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>
                    QUANTITY OWNED
                  </label>
                  <input
                    style={{ ...field, marginTop: 8 }}
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    placeholder="e.g. 0.25"
                  />
                </div>

                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>
                    PURCHASE PRICE PER COIN (USD)
                  </label>
                  <input
                    style={{ ...field, marginTop: 8 }}
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={buyPrice}
                    onChange={(event) => setBuyPrice(event.target.value)}
                    placeholder="e.g. 60000"
                  />
                </div>

                <div style={{ display: "flex", alignItems: "end" }}>
                  <button
                    type="submit"
                    style={{ ...button(true), width: "100%" }}
                  >
                    + Add to portfolio
                  </button>
                </div>
              </form>
            </section>

            <section style={{ ...panel, marginBottom: 18 }}>
              <h3 style={{ marginTop: 0 }}>📊 Portfolio Allocation</h3>
              <p style={{ color: theme.muted, fontSize: 13 }}>
                See how your current portfolio value is distributed across your crypto assets.
              </p>

              {allocationRows.length === 0 || allocationTotal <= 0 ? (
                <p style={{ color: theme.muted }}>
                  Add crypto holdings to see your portfolio allocation graph.
                </p>
              ) : (
                <>
                  <div
                    role="img"
                    aria-label="Portfolio allocation graph"
                    style={{
                      display: "flex",
                      width: "100%",
                      height: 24,
                      overflow: "hidden",
                      borderRadius: 8,
                      background: theme.input,
                      margin: "18px 0",
                    }}
                  >
                    {allocationRows.map((item) => (
                      <div
                        key={item.id}
                        title={`${item.name}: ${((item.value / allocationTotal) * 100).toFixed(1)}%`}
                        style={{
                          width: `${(item.value / allocationTotal) * 100}%`,
                          minWidth: item.value > 0 ? 2 : 0,
                          background: item.color,
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: "grid", gap: 14 }}>
                    {allocationRows.map((item) => {
                      const percentage = (item.value / allocationTotal) * 100;

                      return (
                        <div key={item.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 12,
                              flexWrap: "wrap",
                              fontSize: 13,
                              marginBottom: 6,
                            }}
                          >
                            <span>
                              <span style={{ color: item.color }}>● </span>
                              {item.name}
                            </span>
                            <strong>
                              ${fmt(item.value)} · {percentage.toFixed(1)}%
                            </strong>
                          </div>
                          <div
                            style={{
                              height: 8,
                              borderRadius: 6,
                              background: theme.input,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${percentage}%`,
                                background: item.color,
                                borderRadius: 6,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            <section style={{ ...panel, marginBottom: 22 }}>
              <h3 style={{ marginTop: 0 }}>Your holdings</h3>

              {portfolioRows.length === 0 ? (
                <p style={{ color: theme.muted }}>
                  No holdings yet. Use the form above to add your first entry.
                </p>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Quantity</th>
                        <th>Buy price</th>
                        <th>Current value</th>
                        <th>Profit / loss</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {portfolioRows.map((item) => (
                        <tr key={item.id}>
                          <td>{item.coin?.name || item.coinId}</td>
                          <td>{fmt(item.quantity, 6)}</td>
                          <td>${fmt(item.buyPrice)}</td>
                          <td>${fmt(item.value)}</td>
                          <td
                            style={{
                              color: item.profit >= 0 ? "#00e6a0" : "#ff526c",
                            }}
                          >
                            {item.profit >= 0 ? "+" : "-"}$
                            {fmt(Math.abs(item.profit))}
                          </td>
                          <td>
                            <button
                              style={button()}
                              onClick={() =>
                                setPortfolio((old) =>
                                  old.filter((entry) => entry.id !== item.id)
                                )
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <p
                style={{
                  color: theme.muted,
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                Calculations use the current prices available in this dashboard.
                Transaction fees and taxes are excluded.
              </p>
            </section>
          </>
        )}

    </>
  );
}
