export default function ExecutiveHeroBanner({ setActiveTab, rates = {} }) {
  const rwf = Number(rates?.RWF || 1480).toLocaleString();

  const cards = [
    { icon: "⚽", title: "150 Football Nations", sub: "600 Ranked Leagues & Cups", color: "#06b6d4", tab: "earnbet", target: "world-football-150" },
    { icon: "🎰", title: "VIP Casino & Aviator", sub: "Provably Fair · RWF & USDT", color: "#f59e0b", tab: "earnbet", target: "casino-arcade-section" },
    { icon: "💬", title: "Live Chat & HD Video", sub: "Global Traders & Screen Share", color: "#10b981", tab: "chatvideo", target: "chat-video-section" },
    { icon: "🤖", title: "KGT Omni-AI v3.0", sub: "Full App & Portfolio Copilot", color: "#a855f7", tab: "omnichat_ai", target: "" },
  ];

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "18px 20px",
        marginBottom: 16,
        background: "linear-gradient(135deg, #091326 0%, #0f172a 55%, #162447 100%)",
        border: "1px solid rgba(6, 182, 212, 0.38)",
        boxShadow: "0 14px 34px rgba(2, 6, 23, 0.45)",
        color: "#f8fafc",
        display: "grid",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "#38bdf8", textTransform: "uppercase" }}>
            🇷🇼 Kigali Global FinTech · Crypto · Sportsbook & AI Super-App
          </div>
          <h2 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 900, background: "linear-gradient(90deg, #ffffff, #38bdf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Enterprise Suite v22.0 — 214,850+ Live Telemetry & Trading Modules
          </h2>
        </div>
        <div style={{ padding: "7px 13px", borderRadius: 999, background: "rgba(16, 185, 129, 0.16)", border: "1px solid rgba(16, 185, 129, 0.4)", fontSize: 12, fontWeight: 800, color: "#34d399" }}>
          💱 Live Benchmark: 1 USD = {rwf} RWF
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
        {cards.map((c) => (
          <button
            key={c.title}
            type="button"
            onClick={() => {
              setActiveTab(c.tab);
              if (c.target) {
                setTimeout(() => document.getElementById(c.target)?.scrollIntoView({ behavior: "smooth" }), 120);
              }
            }}
            style={{
              textAlign: "left",
              padding: "12px 14px",
              borderRadius: 12,
              background: "rgba(15, 23, 42, 0.78)",
              border: `1px solid ${c.color}55`,
              color: "#f8fafc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }}>{c.icon}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: c.color }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 2 }}>{c.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
