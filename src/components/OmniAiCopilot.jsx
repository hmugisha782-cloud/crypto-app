import { useState } from "react";

export default function OmniAiCopilot({ activeTab, setActiveTab, coins = [], rates = {}, theme, panel }) {
  const [openWidget, setOpenWidget] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([
    {
      role: "ai",
      text: "Hello! I am **KGT Omni-AI**, connected to all **225,400+ modules**, **SQLite database**, **live crypto & RWF rates**, **150 football nations (600 leagues)**, and **VIP Casino**. Ask me anything about this app!",
      action: null,
    },
  ]);

  const prompts = [
    "Give me a full report of this app",
    "What are live Bitcoin & ETH prices in RWF?",
    "Check my SQLite portfolio & betting slips",
    "Convert 250 USD to RWF",
    "Show Spain LaLiga & England Premier League tiers",
    "Which Casino & Crash games have the highest RTP?",
    "How do MTN MoMo P2P, Virtual Cards & Loans work?",
  ];

  async function askAi(textToAsk) {
    const q = String(textToAsk || prompt).trim();
    if (!q) return;
    setPrompt("");
    setHistory((h) => [...h, { role: "user", text: q }]);
    setLoading(true);

    const livePrices = {};
    (coins || []).forEach((c) => {
      if (c?.symbol) livePrices[String(c.symbol).toUpperCase()] = c.current_price || c.price;
    });

    try {
      const r = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(sessionStorage.getItem("kgt-auth-token") ? { Authorization: `Bearer ${sessionStorage.getItem("kgt-auth-token")}` } : {}) },
        body: JSON.stringify({ question: q, livePrices, rwfRate: Number(rates?.RWF || 1480) }),
      });
      if (r.ok) {
        const d = await r.json();
        setHistory((h) => [...h, { role: "ai", text: d.answer, action: d.quickAction }]);
      }
    } catch {
      setHistory((h) => [...h, { role: "ai", text: "AI connection offline. Please ensure backend port 3001 is active." }]);
    } finally {
      setLoading(false);
    }
  }

  function runAction(act) {
    if (!act) return;
    setActiveTab(act.tab);
    setOpenWidget(false);
    if (act.target) {
      setTimeout(() => document.getElementById(act.target)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  }

  const renderChatBox = (heightPx = 300) => (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => askAi(p)}
            style={{ padding: "5px 9px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
          >
            ✨ {p}
          </button>
        ))}
      </div>

      <div style={{ height: heightPx, overflowY: "auto", padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 10, alignContent: "start" }}>
        {history.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              background: m.role === "user" ? "rgba(6, 182, 212, 0.16)" : theme.card,
              border: `1px solid ${m.role === "user" ? "#06b6d4" : theme.border}`,
              fontSize: 13,
              whiteSpace: "pre-line",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: m.role === "user" ? "#06b6d4" : "#10b981", marginBottom: 4 }}>
              {m.role === "user" ? "YOU" : "🤖 KGT OMNI-AI (FULL APP KNOWLEDGE)"}
            </div>
            <div>{m.text}</div>
            {m.action && (
              <button
                type="button"
                onClick={() => runAction(m.action)}
                style={{ marginTop: 8, padding: "6px 11px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer" }}
              >
                {m.action.label} →
              </button>
            )}
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: "#06b6d4" }}>🤖 Analyzing live SQLite & 225,400+ modules...</div>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); askAi(prompt); }} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask KGT Omni-AI anything about Crypto, 150 Football Nations, Casino, MoMo, or your SQLite data..."
          style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: "1px solid #06b6d4", background: theme.input, color: theme.text, fontSize: 13 }}
        />
        <button type="submit" style={{ padding: "10px 16px", borderRadius: 9, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, cursor: "pointer" }}>
          Ask AI
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* FLOATING OMNI-AI COPILOT DRAWER ACCESSIBLE ON EVERY PAGE */}
      <div style={{ position: "fixed", right: 14, top: 82, zIndex: 950 }}>
        <button
          type="button"
          onClick={() => setOpenWidget((v) => !v)}
          style={{
            padding: "9px 14px",
            borderRadius: 999,
            border: "2px solid #8b5cf6",
            background: "rgba(15, 23, 42, 0.96)",
            color: "#c4b5fd",
            fontWeight: 800,
            fontSize: 12,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(139, 92, 246, 0.35)",
          }}
        >
          {openWidget ? "✕ Close Omni-AI" : "🤖 Ask KGT Omni-AI"}
        </button>

        {openWidget && (
          <div style={{ ...panel, width: "min(420px, 92vw)", marginTop: 8, border: "2px solid #8b5cf6", boxShadow: "0 16px 40px rgba(0,0,0,0.65)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#c4b5fd", marginBottom: 8 }}>
              🤖 KGT Omni-AI Copilot (Connected to All App Data)
            </div>
            {renderChatBox(250)}
          </div>
        )}
      </div>

      {/* DEDICATED FULL-PAGE AI TAB */}
      {activeTab === "omnichat_ai" && (
        <section style={{ ...panel, borderTop: "4px solid #8b5cf6", marginBottom: 24 }}>
          <h2 style={{ marginTop: 0 }}>🤖 KGT Omni-AI Full-App Intelligence & Live Data Assistant</h2>
          <p style={{ color: theme.muted, fontSize: 13 }}>
            Trained on all 225,400+ Kigali Global Tracker modules, live Binance/CoinGecko feeds, RWF/EAC exchange rates, 150 world football nations, VIP Casino RTPs, and SQLite records.
          </p>
          {renderChatBox(360)}
        </section>
      )}
    </>
  );
}
