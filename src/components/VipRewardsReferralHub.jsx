import { useState } from "react";

export default function VipRewardsReferralHub({ rates = {}, theme, panel }) {
  const [tier, setTier] = useState("💎 Diamond Institutional VIP (2.5% Cashback)");
  const [bonusNote, setBonusNote] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function claimDailyReward() {
    const usdBonus = Number((5 + Math.random() * 45).toFixed(2));
    const rwfBonus = Math.round(usdBonus * rwfRate);
    setBonusNote(`🎁 DAILY VIP BONUS CLAIMED: +$${usdBonus} USD (+${rwfBonus.toLocaleString()} RWF) credited across Crypto, Sports, Casino & Banking wallets!`);
  }

  return (
    <section id="vip-rewards-referral" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f43f5e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎁 Global VIP Rewards, Cashback & 15% Partner Referral Hub (500M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Unified cashback & daily rewards across Crypto, 150 Nations Sports, VIP Casino, Banking, DePIN & Copy-Trading.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(244,63,94,0.18)", color: "#fb7185", fontWeight: 800, fontSize: 11 }}>
          {tier}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        {["🥇 Gold VIP (1.0% Cashback)", "💠 Platinum VIP (1.8% Cashback)", "💎 Diamond Institutional VIP (2.5% Cashback)"].map((t) => (
          <button key={t} type="button" onClick={() => setTier(t)} style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${tier === t ? "#f43f5e" : theme.border}`, background: tier === t ? "rgba(244,63,94,0.2)" : theme.input, color: theme.text, fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>
            {t}
          </button>
        ))}
        <button type="button" onClick={claimDailyReward} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f43f5e", color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
          🎁 Claim Instant RWF / USDT Reward
        </button>
      </div>

      {bonusNote && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{bonusNote}</div>}
    </section>
  );
}
