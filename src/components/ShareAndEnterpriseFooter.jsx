import { useState } from "react";

export default function ShareAndEnterpriseFooter({ setActiveTab, theme, panel }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://vercel.app";

  function copyInvite() {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <footer style={{ ...panel, marginTop: 28, borderTop: "3px solid #06b6d4", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <strong style={{ fontSize: 16, color: "#06b6d4" }}>🚀 Share Kigali Global Tracker & Earn 15% VIP Commission</strong>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: theme.muted }}>
            Invite friends across Rwanda, East Africa & worldwide to trade Crypto, bet on 150 Football Nations, or join Live Video Chat.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={copyInvite}
            style={{ padding: "9px 14px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
          >
            {copied ? "✓ Invite Link Copied!" : "🔗 Copy Invite Link"}
          </button>
          <a
            href={`https://wa.me${encodeURIComponent("Join me on Kigali Global Tracker — Crypto, 150 Football Nations, VIP Casino & Omni-AI: " + shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            style={{ padding: "9px 14px", borderRadius: 8, background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, textDecoration: "none" }}
          >
            📲 Share on WhatsApp
          </a>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}>
        {[
          ["📈 Live Crypto Market", "market"],
          ["🌍 150 Football Nations", "earnbet"],
          ["💬 Live Chat & Video", "chatvideo"],
          ["🤖 KGT Omni-AI v3.0", "omnichat_ai"],
          ["🛡️ Admin & Treasury", "admin"],
          ["💼 Cloud Portfolio", "portfolio"],
        ].map(([label, tab]) => (
          <button
            key={tab}
            type="button"
            onClick={() => { setActiveTab(tab); window.scrollTo({ top: 180, behavior: "smooth" }); }}
            style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            {label}
          </button>
        ))}
      </div>
    </footer>
  );
}
