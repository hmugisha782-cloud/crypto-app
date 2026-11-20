export default function Portfolio({activeTab, panel, theme, portfolioValue, portfolioCost,
  portfolioProfit, fmt, coins, field, portfolioCoin, setPortfolioCoin,
  quantity, setQuantity, buyPrice, setBuyPrice, addPortfolioItem,
  button, portfolioRows, setPortfolio}) {
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
