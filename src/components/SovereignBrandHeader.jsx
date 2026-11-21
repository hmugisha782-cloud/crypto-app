export default function SovereignBrandHeader({ theme, panel }) {
  const jumps = [
    { label: "💳 Wallet", id: "sovereign-master-wallet-bar", bg: "#10b981", fg: "#02131d" },
    { label: "👑 Omni-AI v100", id: "sovereign-omni-ai-copilot", bg: "#8b5cf6", fg: "#ffffff" },
    { label: "📹 HD Video Call", id: "sovereign-video-call-hub", bg: "#ec4899", fg: "#ffffff" },
    { label: "🗺️ Rwanda Map", id: "sovereign-rwanda-live-map-hub", bg: "#38bdf8", fg: "#02131d" },
    { label: "⛽ Fuel & EV", id: "sovereign-energy-station-hub", bg: "#f59e0b", fg: "#02131d" },
  ];

  function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header id="sovereign-brand-header" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #10b981", background: "linear-gradient(135deg, rgba(16,185,129,0.16), rgba(56,189,248,0.10), rgba(139,92,246,0.14))", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #10b981, #38bdf8)", display: "grid", placeItems: "center", fontWeight: 950, fontSize: 18, color: "#02131d", boxShadow: "0 6px 18px rgba(16,185,129,0.35)" }}>
          🇷🇼
        </div>
        <div>
          <strong style={{ fontSize: 17.5, letterSpacing: "-0.02em", display: "block" }}>KIGALI GLOBAL TRACKER — SOVEREIGN SUPER-APP</strong>
          <span style={{ fontSize: 11.5, color: theme.muted }}>🟢 LIVE PRODUCTION · 145 Active Engines · RWF/USDT Unified Ledger · 15 Global Languages</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {jumps.map((j) => (
          <button key={j.id} type="button" onClick={() => go(j.id)} style={{ padding: "6px 11px", borderRadius: 999, border: "none", background: j.bg, color: j.fg, fontWeight: 900, fontSize: 11.5, cursor: "pointer" }}>
            {j.label}
          </button>
        ))}
      </div>
    </header>
  );
}
