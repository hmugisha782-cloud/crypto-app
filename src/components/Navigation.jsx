export default function Navigation({ activeTab, setActiveTab, button }) {
  const tabs = [
    ["market", "📈 Market"],
    ["charts", "📊 Charts"],
    ["portfolio", "💼 Portfolio"],
    ["alerts", "🔔 Price alerts"],
    ["converter", "💱 Converter"],
    ["news", "📰 Crypto News"],
    ["sentiment", "😨 Fear & Greed"],
    ["transactions", "🧾 Transactions"],
    ["dca", "📅 DCA Calculator"],
    ["accounts", "🔐 Demo Login"],
  ];

  return (
    <nav style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 20 }}>
      {tabs.map(([id, label]) => (
        <button key={id} style={button(activeTab === id)} onClick={() => setActiveTab(id)}>
          {label}
        </button>
      ))}
    </nav>
  );
}
