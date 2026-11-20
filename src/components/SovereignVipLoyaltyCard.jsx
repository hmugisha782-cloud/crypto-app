import { useState, useEffect } from "react";
import { getWalletState, recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignVipLoyaltyCard({ rates = {}, theme, panel }) {
  const [wallet, setWallet] = useState(getWalletState);
  const [claimed, setClaimed] = useState(false);
  const [vipMsg, setVipMsg] = useState("");

  useEffect(() => {
    const sync = () => setWallet(getWalletState());
    window.addEventListener("kgt-wallet-updated", sync);
    return () => window.removeEventListener("kgt-wallet-updated", sync);
  }, []);

  const rwfRate = Number(rates?.RWF || 1480);
  const tier = wallet.usd >= 20000 ? "👑 SOVEREIGN DIAMOND VIP" : wallet.usd >= 5000 ? "🥇 KIGALI GOLD ELITE" : "🛡️ VERIFIED MEMBER";

  function claimDailyReward() {
    if (claimed) return;
    const bonusUsd = 25.0;
    const { tx } = recordSovereignTx({
      hub: "VIP Loyalty Treasury",
      title: "Daily Sovereign Diamond Cashback Dividend",
      amountUsd: bonusUsd,
      rwfRate,
      type: "CREDIT",
    });
    setClaimed(true);
    setVipMsg(`🎁 VIP DIVIDEND CREDITED [${tx.id}]: +$${bonusUsd.toFixed(2)} USD (${Math.round(bonusUsd * rwfRate).toLocaleString()} RWF) added to your Wallet!`);
  }

  return (
    <section id="sovereign-vip-loyalty-card" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #eab308", background: "linear-gradient(135deg, rgba(234,179,8,0.14), rgba(16,185,129,0.08))", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 900, color: "#fde047", letterSpacing: 1 }}>{tier} · CARD #KGT-250-8888-9999</span>
          <strong style={{ fontSize: 15.5, display: "block", marginTop: 2 }}>💳 Kigali Global Sovereign Black & Gold Virtual Card</strong>
          <span style={{ fontSize: 11.5, color: theme.muted }}>4.5% Instant Cashback on all 55+ Hubs · Zero FX Markup · Global Visa/Mastercard Rail</span>
        </div>
        <button
          type="button"
          onClick={claimDailyReward}
          disabled={claimed}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            background: claimed ? "#475569" : "linear-gradient(90deg, #eab308, #f59e0b)",
            color: claimed ? "#cbd5e1" : "#02131d",
            fontWeight: 900,
            fontSize: 12,
            cursor: claimed ? "default" : "pointer",
          }}
        >
          {claimed ? "✅ Daily Bonus Claimed" : "🎁 Claim $25 VIP Cashback"}
        </button>
      </div>
      {vipMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{vipMsg}</div>}
    </section>
  );
}
