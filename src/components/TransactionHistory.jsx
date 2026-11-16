import { useEffect, useState } from "react";

const STORAGE_KEY = "kgt-transactions";

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"' && insideQuotes && line[i + 1] === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(value);
      value = "";
    } else {
      value += char;
    }
  }

  values.push(value);
  return values;
}

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
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      setError("Could not save transactions in this browser.");
    }
  }, [transactions]);

  const totalBought = transactions
    .filter((item) => item.type === "BUY")
    .reduce((sum, item) => sum + item.total, 0);

  const totalSold = transactions
    .filter((item) => item.type === "SELL")
    .reduce((sum, item) => sum + item.total, 0);

  const netCashFlow = totalSold - totalBought;

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

  function exportTransactions() {
    const headers = ["Date", "Coin", "Symbol", "Type", "Quantity", "Unit Price USD", "Total USD"];

    const rows = transactions.map((item) => [
      item.date,
      item.coinName,
      item.symbol,
      item.type,
      item.quantity,
      item.price,
      item.total,
    ]);

    const escapeCsv = (value) =>
      '"' + String(value ?? "").replace(/"/g, '""') + '"';

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kgt-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importTransactions(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const text = (await file.text()).replace(/^\uFEFF/, "");
      const lines = text.split(/\r?\n/).filter((line) => line.trim());

      if (lines.length < 2) {
        setError("CSV file has no transaction rows.");
        return;
      }

      const headers = parseCsvLine(lines[0]).map((value) =>
        value.trim().toLowerCase()
      );
      const required = [
        "date", "coin", "symbol", "type",
        "quantity", "unit price usd", "total usd",
      ];

      if (!required.every((header) => headers.includes(header))) {
        setError("CSV columns do not match the exported transaction format.");
        return;
      }

      const index = Object.fromEntries(
        required.map((header) => [header, headers.indexOf(header)])
      );

      const imported = [];
      for (const line of lines.slice(1)) {
        const row = parseCsvLine(line);
        const coinName = row[index.coin]?.trim();
        const symbol = row[index.symbol]?.trim();
        const transactionType = row[index.type]?.trim().toUpperCase();
        const transactionDate = row[index.date]?.trim();
        const amount = Number(row[index.quantity]);
        const unitPrice = Number(row[index["unit price usd"]]);
        const total = Number(row[index["total usd"]]);

        if (
          !coinName || !symbol ||
          !["BUY", "SELL"].includes(transactionType) ||
          !/^\d{4}-\d{2}-\d{2}$/.test(transactionDate) ||
          !Number.isFinite(amount) || amount <= 0 ||
          !Number.isFinite(unitPrice) || unitPrice < 0 ||
          !Number.isFinite(total) || total < 0
        ) {
          setError("Import cancelled: CSV contains invalid transaction data.");
          return;
        }

        const coin = coins.find(
          (item) =>
            item.symbol?.toLowerCase() === symbol.toLowerCase() ||
            item.name?.toLowerCase() === coinName.toLowerCase()
        );

        imported.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${imported.length}`,
          coinId: coin?.id ?? symbol.toLowerCase(),
          coinName,
          symbol,
          type: transactionType,
          quantity: amount,
          price: unitPrice,
          date: transactionDate,
          total: amount * unitPrice,
        });
      }

      setTransactions((current) => {
        const existingKeys = new Set(
          current.map((item) =>
            [item.date, item.symbol, item.type, item.quantity, item.price].join("|")
          )
        );
        const uniqueImported = imported.filter((item) => {
          const key = [item.date, item.symbol, item.type, item.quantity, item.price].join("|");
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        });

        setError(`Imported ${uniqueImported.length} new transaction(s).`);
        return [...uniqueImported, ...current];
      });
    } catch {
      setError("Could not read this CSV file.");
    }
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

      <div
        className="twocol"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {[
          ["Total Bought", totalBought, "#ef4444"],
          ["Total Sold", totalSold, "#00b887"],
          ["Net Cash Flow", netCashFlow, theme.text],
        ].map(([label, value, color]) => (
          <div
            key={label}
            style={{
              ...panel,
              padding: 16,
              border: `1px solid ${theme.border}`,
            }}
          >
            <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>
              {label}
            </p>
            <h3 style={{ color, marginBottom: 0 }}>
              ${fmt(value)}
            </h3>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <h3>Saved transactions ({transactions.length})</h3>
        <input aria-label="Search transactions" style={{ ...field, maxWidth: 220 }} type="search" placeholder="Search coin or symbol..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <select aria-label="Filter transactions by type" style={{ ...field, maxWidth: 220 }} value={filterType} onChange={(event) => setFilterType(event.target.value)}>
          <option value="ALL">All transactions</option>
          <option value="BUY">BUY only</option>
          <option value="SELL">SELL only</option>
        </select>
        <button
          type="button"
          style={button(false)}
          onClick={exportTransactions}
          title="Download all transactions as CSV"
        >
          Export CSV
        </button>
        <label style={{ ...button(false), cursor: "pointer" }}>
          Import CSV
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={importTransactions}
            style={{ display: "none" }}
          />
        </label>
      </div>

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
              {transactions.filter((item) => (filterType === "ALL" || item.type === filterType) && `${item.coinName} ${item.symbol}`.toLowerCase().includes(searchTerm.trim().toLowerCase())).map((item) => (
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
