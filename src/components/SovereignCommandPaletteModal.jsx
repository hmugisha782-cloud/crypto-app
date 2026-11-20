import { useState, useEffect } from "react";

const QUICK_TARGETS = [
  { label: "💳 Unified Sovereign Wallet (Deposit / Withdraw / P2P)", id: "sovereign-master-wallet-bar" },
  { label: "📈 Institutional Spot & Futures Trading Desk", id: "sovereign-spot-futures-engine" },
  { label: "📊 Live Interactive BTC / Gold / RWF Charts", id: "sovereign-live-charts-hub" },
  { label: "🤝 Rwanda & EAC P2P MoMo/BK Orderbook", id: "sovereign-p2p-orderbook-hub" },
  { label: "⚽ 150 Football Nations Sportsbook & Multi-Bet Slip", id: "sovereign-quick-bet-slip" },
  { label: "🤖 KGT Omni-AI v4.0 Kinyarwanda/English Copilot", id: "sovereign-omni-ai-copilot" },
  { label: "🪪 Digital National ID / Passport KYC Passport", id: "sovereign-kyc-identity-passport" },
  { label: "🧾 Rwanda RRA EBM v2.1 Tax Invoice Generator", id: "sovereign-rwanda-tax-ebm-calculator" },
  { label: "⛏️ Rwanda 3Ts Minerals & 999.9 Gold Refinery", id: "omni-global-mining-minerals-hub" },
  { label: "🔐 Sovereign Biometric PIN Lock & 2FA Vault", id: "sovereign-security-pin-vault" },
];

export default function SovereignCommandPaletteModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const filtered = QUICK_TARGETS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase()));

  function go(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(2,6,23,0.78)", zIndex: 9999, display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 540, background: "#0f172a", border: "1px solid #10b981", borderRadius: 14, padding: 16, display: "grid", gap: 10, color: "#f8fafc" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: 14 }}>⚡ Kigali Global Spotlight Command Palette (Ctrl + K)</strong>
          <button type="button" onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: 16, cursor: "pointer" }}>✕</button>
        </div>
        <input
          autoFocus
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to jump anywhere (Wallet, Gold, EBM, KYC, Sports, AI)..."
          style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #334155", background: "#020617", color: "#f8fafc", fontSize: 13 }}
        />
        <div style={{ display: "grid", gap: 6, maxHeight: 260, overflowY: "auto" }}>
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              style={{ textAlign: "left", padding: "8px 10px", borderRadius: 8, border: "1px solid #1e293b", background: "#1e293b", color: "#f8fafc", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
