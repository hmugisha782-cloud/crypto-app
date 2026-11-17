import { useTranslation } from "react-i18next";
export default function Navigation({ activeTab, setActiveTab, button }) {
  const { t } = useTranslation();
  const tabs = [
    ["market", `📈 ${t("navigation.market")}`],
    ["orderbook", "📚 Order Book"],
    ["charts", `📊 ${t("navigation.charts")}`],
    ["portfolio", `💼 ${t("navigation.portfolio")}`],
    ["alerts", `🔔 ${t("navigation.alerts")}`],
    ["converter", `💱 ${t("navigation.converter")}`],
    ["news", `📰 ${t("navigation.news")}`],
    ["sentiment", `😨 ${t("navigation.sentiment")}`],
    ["transactions", `🧾 ${t("navigation.transactions")}`],
    ["papertrading", "🧪 Paper Trading"],
    ["dca", `📅 ${t("navigation.dca")}`],
    ["insights", "🚀 Pro Insights"],
    ["accounts", `🔐 ${t("navigation.accounts")}`],
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
