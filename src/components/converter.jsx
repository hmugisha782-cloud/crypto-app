export default function CurrencyConverter({activeTab, panel, theme, amount, setAmount, field,
  countryId, setCountryId, countries, dark, selectedCountry,
  fmt, converted, selectedRate, ratesLive}) {
  return (
    <>
        {/* CURRENCY CONVERTER */}
        {activeTab === "converter" && (
          <section style={{ ...panel, marginBottom: 22 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>
              ◎ Universal Multi-Currency Converter
            </h2>

            <p
              style={{
                color: theme.muted,
                fontSize: 13,
                marginBottom: 22,
                lineHeight: 1.7,
              }}
            >
              Enter an amount in USD, select a country and convert using
              the available exchange rate.
            </p>

            <div className="twocol">
              <div>
                <label
                  htmlFor="usd-amount"
                  style={{ color: theme.muted, fontSize: 13 }}
                >
                  AMOUNT IN USD ($)
                </label>

                <input
                  id="usd-amount"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  style={{ ...field, marginTop: 9 }}
                  placeholder="Enter amount"
                />

                <label
                  htmlFor="country-select"
                  style={{
                    display: "block",
                    color: theme.muted,
                    fontSize: 13,
                    marginTop: 19,
                  }}
                >
                  SELECT COUNTRY / CURRENCY
                </label>

                <select
                  id="country-select"
                  value={countryId}
                  onChange={(event) => setCountryId(event.target.value)}
                  style={{ ...field, marginTop: 9 }}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.country} ({country.code})
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  background: dark ? "#071b2c" : "#ecfeff",
                  border: "1px solid #087eaa",
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    color: theme.muted,
                    fontSize: 12,
                    margin: "0 0 10px",
                  }}
                >
                  {selectedCountry.flag} {selectedCountry.country} (
                  {selectedCountry.code})
                </p>

                <h2
                  style={{
                    color: "#00e6a0",
                    fontSize: "clamp(24px, 4vw, 32px)",
                    overflowWrap: "anywhere",
                    margin: "0 0 12px",
                  }}
                >
                  {selectedCountry.symbol}
                  {fmt(converted)}
                </h2>

                <p
                  style={{
                    color: theme.muted,
                    fontSize: 12,
                    margin: 0,
                  }}
                >
                  1 USD = {fmt(selectedRate, 4)} {selectedCountry.code}
                </p>

                <p
                  style={{
                    color: ratesLive ? "#22c55e" : "#fbbf24",
                    fontSize: 11,
                    marginBottom: 0,
                  }}
                >
                  ● {ratesLive ? "Live exchange rate" : "Estimated backup rate"}
                </p>
              </div>
            </div>
          </section>
        )}

    </>
  );
}
