import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignReferralPartnerHub({ rates = {}, theme, panel }) {
  const [invites, setInvites] = useState(4);
  const [msg, setMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);
  const refLink = "https://vercel.app";

  function claimBonus() {
    const usd = 5;
    const { tx } = recordSovereignTx({ hub: "Affiliate Partner Bonus", title: "Referral Commission Payout ($5 USD)", amountUsd: usd, rwfRate, type: "CREDIT" });
    setInvites((n) => n + 1);
    setMsg(`🎁 BONUS CREDITED [${tx.id}]: +$5.00 USD (+${Math.round(usd * rwfRate).toLocaleString()} RWF) added to your Wallet!`);
  }

  return (
    <section id="sovereign-referral-partner-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>📣 Global Partner & Referral Rewards Program ($5 / 7,400 RWF per Invite)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Active Referrals: <strong>{invites} Partners</strong> · Share your link on WhatsApp & earn instant USDT/RWF</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(refLink).catch(() => {}); setMsg(`🔗 Copied Referral Link: ${refLink}`); }} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: "#7dd3fc", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>🔗 Copy Invite Link</button>
          <button type="button" onClick={claimBonus} style={{ padding: "7px 13px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>🎁 Claim $5 Referral Bonus</button>
        </div>
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}
