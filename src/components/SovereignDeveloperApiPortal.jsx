import { useState } from "react";

export default function SovereignDeveloperApiPortal({ theme, panel }) {
  const [apiKey, setApiKey] = useState("kgt_live_rwf_98a7b6c5d4e3f2a10099");
  const [copied, setCopied] = useState(false);

  function rotateKey() {
    const next = "kgt_live_rwf_" + Math.random().toString(16).slice(2, 18);
    setApiKey(next);
    setCopied(false);
  }

  function copyKey() {
    if (navigator.clipboard) navigator.clipboard.writeText(apiKey).catch(() => {});
    setCopied(true);
  }

  return (
    <section id="sovereign-developer-api-portal" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>⚡ Enterprise Developer REST & WebSocket API Gateway</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Connect external apps, MoMo/BK webhooks & algorithmic bots to Kigali Global Tracker</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#7dd3fc" }}>Rate Limit: 100,000 req/sec</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <code style={{ flex: 1, minWidth: 220, padding: "8px 10px", borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 12, color: "#34d399" }}>{apiKey}</code>
        <button type="button" onClick={copyKey} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontWeight: 800, fontSize: 11.5, cursor: "pointer" }}>
          {copied ? "✅ Copied!" : "📋 Copy Key"}
        </button>
        <button type="button" onClick={rotateKey} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 11.5, cursor: "pointer" }}>
          🔄 Rotate Secret Key
        </button>
      </div>
    </section>
  );
}
