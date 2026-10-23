import { useEffect, useState } from "react";

const STORAGE_KEY = "kgt-transactions";

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function TransactionHistory({
  activeTab,
  coins,
  theme,
  panel,
  field,
  button,
  fmt,
}) {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [coinId, setCoinId] = useState(coins[0]?.id ?? "");
  const [type, setType] = useState("BUY");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      setError("Could not save transactions in this browser.");
    }
  }, [transactions]);

  if (activeTab !== "transactions") return null;

  function addTransaction(event) {
    event.preventDefault();

    const amount = Number(quantity);
    const unitPrice = Number(price);

    if (
      !coinId ||
      !date ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !Number.isFinite(unitPrice) ||
      unitPrice < 0
    ) {
      setError("Enter a valid coin, date, quantity and price.");
      return;
    }

    const coin = coins.find((item) => item.id === coinId);

    setTransactions((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        coinId,
        coinName: coin?.name ?? coinId,
        symbol: coin?.symbol ?? coinId,
        type,
        quantity: amount,
        price: unitPrice,
        date,
        total: amount * unitPrice,
      },
      ...current,
    ]);

    setQuantity("");
    setPrice("");
    setError("");
  }

  function removeTransaction(id) {
    setTransactions((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section style={{ ...panel, marginBottom: 22 }}>
      <h2 style={{ marginTop: 0 }}>🧾 Transaction History</h2>
      <p style={{ color: theme.muted, fontSize: 13, lineHeight: 1.6 }}>
        Record your crypto purchases and sales. These records are saved in
        this browser and are separate from your portfolio holdings.
      </p>

      <form onSubmit={addTransaction} className="twocol">
        <div>
          <label style={{ color: theme.muted, fontSize: 13 }}>CRYPTO</label>
          <select
            style={{ ...field, marginTop: 8 }}
            value={coinId}
            onChange={(event) => setCoinId(event.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: theme.muted, fontSize: 13 }}>TYPE</label>
          <select
            style={{ ...field, marginTop: 8 }}
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="BUY">BUY — Purchase</option>
            <option value="SELL">SELL — Sale</option>
          </select>
        </div>

        <div>
          <label style={{ color: theme.muted, fontSize: 13 }}>QUANTITY</label>
          <input
            style={{ ...field, marginTop: 8 }}
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="e.g. 0.25"
            required
          />
        </div>

        <div>
          <label style={{ color: theme.muted, fontSize: 13 }}>
            PRICE PER COIN (USD)
          </label>
          <input
            style={{ ...field, marginTop: 8 }}
            type="number"
            min="0"
            step="any"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="e.g. 65000"
            required
          />
        </div>

        <div>
          <label style={{ color: theme.muted, fontSize: 13 }}>DATE</label>
          <input
            style={{ ...field, marginTop: 8 }}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div style={{ display: "flex", alignItems: "end" }}>
          <button type="submit" style={button(false)}>
            Add transaction
          </button>
        </div>
      </form>

      {error && (
        <p role="alert" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      <h3>Saved transactions ({transactions.length})</h3>

      {transactions.length === 0 ? (
        <p style={{ color: theme.muted }}>No transactions recorded yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr>
                {["Date", "Coin", "Type", "Quantity", "Unit price", "Total", "Action"].map((label) => (
                  <th
                    key={label}
                    style={{
                      padding: 10,
                      borderBottom: `1px solid ${theme.border}`,
                      color: theme.muted,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: 10 }}>{item.date}</td>
                  <td style={{ padding: 10 }}>
                    {item.coinName} ({item.symbol})
                  </td>
                  <td
                    style={{
                      padding: 10,
                      color: item.type === "BUY" ? "#00b887" : "#ef4444",
                    }}
                  >
                    {item.type}
                  </td>
                  <td style={{ padding: 10 }}>{item.quantity}</td>
                  <td style={{ padding: 10 }}>${fmt(item.price)}</td>
                  <td style={{ padding: 10 }}>${fmt(item.total)}</td>
                  <td style={{ padding: 10 }}>
                    <button
                      type="button"
                      style={button(false)}
                      onClick={() => removeTransaction(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
