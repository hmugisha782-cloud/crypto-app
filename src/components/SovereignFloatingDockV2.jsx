export default function SovereignFloatingDockV2() {
  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 9000, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", padding: "7px 12px", borderRadius: 999, background: "rgba(2, 6, 23, 0.88)", border: "1px solid rgba(16, 185, 129, 0.45)", backdropFilter: "blur(12px)", boxShadow: "0 12px 30px rgba(0,0,0,0.55)" }}>
      {[
        { lbl: "💳 Wallet", id: "sovereign-master-wallet-bar" },
        { lbl: "📈 Trade", id: "sovereign-spot-futures-engine" },
        { lbl: "🤝 P2P", id: "sovereign-p2p-orderbook-hub" },
        { lbl: "⚽ Sports", id: "sovereign-quick-bet-slip" },
        { lbl: "🤖 AI", id: "sovereign-omni-ai-copilot" },
        { lbl: "🧭 Hubs", id: "sovereign-super-app-directory" },
        { lbl: "↑ Top", id: "top" },
      ].map((b) => (
        <button
          key={b.lbl}
          type="button"
          onClick={() => jump(b.id)}
          style={{ padding: "5px 10px", borderRadius: 999, border: "none", background: "rgba(16,185,129,0.16)", color: "#e2e8f0", fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}
        >
          {b.lbl}
        </button>
      ))}
    </div>
  );
}
