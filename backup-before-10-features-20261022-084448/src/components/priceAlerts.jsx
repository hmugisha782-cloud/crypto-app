export default function PriceAlerts({activeTab, panel, theme, addPriceAlert, alertCoin,
  setAlertCoin, coins, field, alertPrice, setAlertPrice,
  alertDirection, setAlertDirection, button, alerts, fmt, removeAlert}) {
  return (
    <>
        {/* PRICE ALERTS */}
        {activeTab === "alerts" && (
          <>
            <section style={{ ...panel, marginBottom: 18 }}>
              <h2 style={{ marginTop: 0 }}>🔔 Price Alerts</h2>

              <p
                style={{
                  color: theme.muted,
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                Choose a coin and a target price. The dashboard checks the
                target when live price updates arrive.
              </p>

              <form onSubmit={addPriceAlert} className="twocol">
                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>
                    CRYPTO
                  </label>
                  <select
                    style={{ ...field, marginTop: 8 }}
                    value={alertCoin}
                    onChange={(event) => setAlertCoin(event.target.value)}
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
                    TARGET PRICE (USD)
                  </label>
                  <input
                    style={{ ...field, marginTop: 8 }}
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={alertPrice}
                    onChange={(event) => setAlertPrice(event.target.value)}
                    placeholder="e.g. 100000"
                  />
                </div>

                <div>
                  <label style={{ color: theme.muted, fontSize: 13 }}>
                    WHEN SHOULD IT TRIGGER?
                  </label>
                  <select
                    style={{ ...field, marginTop: 8 }}
                    value={alertDirection}
                    onChange={(event) => setAlertDirection(event.target.value)}
                  >
                    <option value="above">When price reaches or goes above</option>
                    <option value="below">When price reaches or goes below</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "end" }}>
                  <button
                    type="submit"
                    style={{ ...button(true), width: "100%" }}
                  >
                    + Create alert
                  </button>
                </div>
              </form>
            </section>

            <section style={{ ...panel, marginBottom: 22 }}>
              <h3 style={{ marginTop: 0 }}>Saved alerts ({alerts.length})</h3>

              {alerts.length === 0 ? (
                <p style={{ color: theme.muted }}>You have no alerts yet.</p>
              ) : (
                alerts.map((alert) => {
                  const coin = coins.find((item) => item.id === alert.coinId);

                  return (
                    <div
                      key={alert.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                        padding: "13px 0",
                        borderBottom: `1px solid ${theme.border}`,
                      }}
                    >
                      <div>
                        <strong>{coin?.name || alert.coinId}</strong>
                        <p
                          style={{
                            color: theme.muted,
                            fontSize: 13,
                            margin: "5px 0 0",
                          }}
                        >
                          {alert.direction === "above"
                            ? "At or above"
                            : "At or below"}{" "}
                          ${fmt(alert.target)}
                        </p>
                      </div>

                      <span
                        style={{
                          color: alert.triggered ? "#00e6a0" : "#fbbf24",
                          fontSize: 13,
                        }}
                      >
                        {alert.triggered ? "✓ Triggered" : "● Waiting"}
                      </span>

                      <button
                        style={button()}
                        onClick={() => removeAlert(alert.id)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              )}

              <p
                style={{
                  color: theme.muted,
                  fontSize: 12,
                  lineHeight: 1.7,
                }}
              >
                Alerts run while this page is open and connected. They do not
                monitor prices in the background after the page is closed.
              </p>
            </section>
          </>
        )}

    </>
  );
}
