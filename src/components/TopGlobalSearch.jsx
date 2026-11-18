import { useMemo, useState } from "react";

const SEARCH_INDEX = [
  { keywords: ["chat", "video", "call", "message", "lounge", "talk", "support"], title: "💬 Live Chat & HD Video Call Hub", desc: "Message traders worldwide or start an instant video call", tab: "chatvideo", target: "chat-video-section" },
  { keywords: ["150", "football", "nations", "countries", "soccer", "spain", "laliga", "england", "premier", "championship", "germany", "bundesliga", "france", "argentina", "brazil", "rwanda"], title: "🌍 Top 150 World Football Nations & Divisions 1, 2, 3", desc: "Ranked #1 to #150 with 1st, 2nd & 3rd divisions and live odds", tab: "earnbet", target: "world-football-150" },
  { keywords: ["bet", "betting", "casino", "aviator", "crash", "roulette", "blackjack", "poker", "slots", "sweet bonanza", "ufc", "nba", "nfl", "f1", "esports", "lottery", "jackpot"], title: "🎰 All Betting, Casino & World Sports Hub", desc: "Sports, Esports, Crash Aviator, Roulette, Blackjack, Slots & Jackpots", tab: "earnbet", target: "" },
  { keywords: ["momo", "airtel", "mobile money", "p2p", "buy", "sell", "bot", "ai bot", "growth"], title: "💎 Growth Hub, MTN MoMo & AI Trading Bots", desc: "Buy/sell crypto with MoMo, referrals & automated bots", tab: "growth", target: "" },
  { keywords: ["margin", "defi", "institutional", "quant", "staking", "vault", "loan"], title: "🏛️ Institutional Quant, Margin & DeFi Suite", desc: "Pro leverage, staking vaults & institutional analytics", tab: "institutional", target: "" },
  { keywords: ["market", "crypto", "bitcoin", "btc", "ethereum", "eth", "solana", "sol", "price", "coins"], title: "📈 Live Crypto Market & Watchlist", desc: "Real-time prices, 24h movers & market heatmap", tab: "market", target: "" },
  { keywords: ["portfolio", "wallet", "balance", "holdings", "net worth"], title: "💼 SQLite Cloud Portfolio", desc: "Track your crypto assets, profit/loss & valuation", tab: "portfolio", target: "" },
  { keywords: ["convert", "converter", "rwf", "usd", "kes", "ugx", "eur", "fx", "currency"], title: "💱 RWF & Global Currency Converter", desc: "Convert between RWF, USD, KES, UGX, EUR & Crypto", tab: "converter", target: "" },
  { keywords: ["news", "articles", "headlines", "media"], title: "📰 Live Crypto & Market News", desc: "Latest breaking financial & blockchain headlines", tab: "news", target: "" },
  { keywords: ["account", "accounts", "login", "register", "security", "password", "backup"], title: "🔐 Account Security & SQLite Backup", desc: "Sign in, register, 2FA security & database backup", tab: "accounts", target: "" },
];

export default function TopGlobalSearch({ setActiveTab, theme, panel }) {
  const [query, setQuery] = useState("");
  const shortcuts = [
    { label: "🤖 Ask KGT Omni-AI", tab: "omnichat_ai", target: "" },
    { label: "🛡️ Admin & Treasury", tab: "admin", target: "" },
    { label: "💬 Live Chat & Video", tab: "chatvideo", target: "chat-video-section" },
    { label: "🌍 150 Football Nations", tab: "earnbet", target: "world-football-150" },
    { label: "🎰 Casino & Crash Games", tab: "earnbet", target: "casino-arcade-section" },
    { label: "📈 Live Crypto Market", tab: "market", target: "" },
    { label: "📱 MoMo Buy / Sell", tab: "growth", target: "" },
    { label: "🏛️ Margin & DeFi", tab: "institutional", target: "" },
    { label: "💼 Cloud Portfolio", tab: "portfolio", target: "" },
  ];

  const matches = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return SEARCH_INDEX.filter((item) =>
      words.some(
        (w) =>
          item.title.toLowerCase().includes(w) ||
          item.desc.toLowerCase().includes(w) ||
          item.keywords.some((k) => k.includes(w) || w.includes(k))
      )
    );
  }, [query]);

  function activateResult(item) {
    if (typeof setActiveTab === "function") setActiveTab(item.tab);
    setQuery("");
    setTimeout(() => {
      if (item.target) {
        const el = document.getElementById(item.target);
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      }
      window.scrollTo({ top: 220, behavior: "smooth" });
    }, 120);
  }

  return (
    <div style={{ ...panel, padding: "14px 18px", marginBottom: 16, border: "2px solid #06b6d4", boxShadow: "0 8px 24px rgba(6, 182, 212, 0.18)", display: "grid", gap: 10, position: "relative", zIndex: 50 }}>
      <form onSubmit={(e) => { e.preventDefault(); if (matches.length > 0) activateResult(matches[0]); }} style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#06b6d4" }}>🔍 INSTANT SEARCH:</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type anything to jump immediately (e.g. chat video, Spain, England, Aviator, MoMo, Portfolio)..."
          style={{ flex: "1 1 320px", padding: "11px 14px", borderRadius: 10, border: "1px solid #06b6d4", background: theme.input, color: theme.text, fontSize: 14, fontWeight: 600 }}
        />
        <button type="submit" style={{ padding: "11px 18px", borderRadius: 10, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          Open First Match
        </button>
      </form>

      {query.trim() && (
        <div style={{ display: "grid", gap: 6, padding: 10, borderRadius: 10, background: theme.input, border: "1px solid #06b6d4" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#06b6d4" }}>
            {matches.length > 0 ? `⚡ ${matches.length} Instant Match(es) Found — Click to open:` : "No exact match — try: chat video, Spain, England, Aviator, MoMo, Portfolio"}
          </div>
          {matches.map((item) => (
            <button key={item.title} type="button" onClick={() => activateResult(item)} style={{ textAlign: "left", padding: "9px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>{item.desc}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#10b981" }}>OPEN →</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: theme.muted, fontWeight: 700 }}>Quick Jump:</span>
        {shortcuts.map((s) => (
          <button key={s.label} type="button" onClick={() => activateResult({ tab: s.tab, target: s.target })} style={{ padding: "5px 10px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
