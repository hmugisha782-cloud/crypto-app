import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignReferralPartnerEngine({ rates = {}, theme, panel }) {
  const [code] = useState("KIGALI-VIP-250");
  const [referrals, setReferrals] = useState(14);
  const [earnedUsd, setEarnedUsd] = useState(350.0);
  const [refMsg, setRefMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function copyAndClaim() {
    if (navigator.clipboard) navigator.clipboard.writeText(`https://kigaliglobal.rw{code}`).catch(() => {});
    const bonus = 15.0;
    const { tx } = recordSovereignTx({
      hub: "Partner Referral Desk",
      title: `25% Partner Commission Payout (${code})`,
      amountUsd: bonus,
      rwfRate,
      type: "CREDIT",
    });
    setReferrals((r) => r + 1);
    setEarnedUsd((e) => Number((e + bonus).toFixed(2)));
    setRefMsg(`🤝 REFERRAL LINK COPIED & +$${bonus} COMMISSION CREDITED [${tx.id}]! Total Partner Earnings: $${(earnedUsd + bonus).toFixed(2)} USD!`);
  }

  return (
    <section id="sovereign-referral-partner-engine" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>🤝 Global Ambassador & Partner Referral Program (25% Lifetime Commission)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Partner Code: <strong>{code}</strong> · Active Referrals: {referrals} · Total Earned: ${earnedUsd.toFixed(2)} ({Math.round(earnedUsd * rwfRate).toLocaleString()} RWF)</span>
        </div>
        <button type="button" onClick={copyAndClaim} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🔗 Copy Invite Link & Claim Bonus
        </button>
      </div>
      {refMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{refMsg}</div>}
    </section>
  );
}
