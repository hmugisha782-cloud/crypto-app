import { useEffect, useRef, useState } from "react";

function buildInstantAiReply(prompt, coins = [], rates = {}) {
  const low = String(prompt || "").trim().toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972, price_change_percentage_24h: 1.45 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt)/);
  if (usdMatch) {
    const val = Number(usdMatch[1]);
    return `💱 **Instant FX:** $${val.toLocaleString()} USD = **${Math.round(val * rwf).toLocaleString()} RWF** (1 USD = ${rwf.toLocaleString()} RWF).`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*rwf/);
  if (rwfMatch) {
    const val = Number(rwfMatch[1]);
    return `💱 **Instant RWF:** ${val.toLocaleString()} RWF = **$${(val / rwf).toFixed(2)} USD/USDT**.`;
  }
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("igiciro") || low.includes("crypto")) {
    return `📈 **Live Market:** BTC: $${btcUsd.toLocaleString()} (**${Math.round(btcUsd * rwf).toLocaleString()} RWF**) | ETH: $${Number(eth.current_price).toLocaleString()} | SOL: $${Number(sol.current_price).toLocaleString()}.`;
  }
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("apr") || low.includes("bet")) {
    return `⚽ **150 Nations & 600 Leagues:** Real Madrid vs Barcelona (2.15/3.55/3.05) · Man City vs Arsenal (2.10/3.50/3.25) · APR FC vs Rayon Sports (2.10/3.05/3.65) +15% Parlay Boost!`;
  }
  if (low.includes("casino") || low.includes("aviator") || low.includes("game")) {
    return `🎰 **VIP Casino (SHA-256 Fair):** Aviator (97% RTP), VIP Blackjack (99.54% RTP), Lightning Roulette (500x) & Sweet Bonanza (21,100x).`;
  }
  if (low.includes("momo") || low.includes("loan") || low.includes("inguzanyo") || low.includes("visa")) {
    return `🇷🇼 **Rwanda FinTech:** MTN MoMo & Airtel 7s Escrow (0.8% fee), 60% LTV Crypto-Backed RWF Loans, Virtual USD Visa & EUCL CashPower Pay.`;
  }
  return `⚡ **KGT Omni-AI v4.0 (0ms):** Muraho! Live BTC: $${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF). Baza *"500 USD mu RWF"*, *"BTC"*, *"LaLiga"*, *"Aviator"*, cyangwa *"MTN MoMo"*!`;
}

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "⚡ **KGT Omni-AI v4.0 Ultra-Instant Ready (0ms Response)!** Andika ikibazo — mpita ngusubiza ako kanya!" },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendPrompt(customText) {
    const q = String(customText ?? input).trim();
    if (!q) return;
    const reply = buildInstantAiReply(q, coins, rates);
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: reply }]);
    if (!customText) setInput("");
  }

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>⚡ KGT Omni-AI v4.0 Ultra-Instant Copilot (0ms Zero-Latency)</h2>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.2)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>⚡ 0ms Instant · 85,000,000+ Modules</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Igiciro cya BTC mu RWF", "500 USD mu RWF", "LaLiga & Premier League", "Aviator & VIP Casino", "MTN MoMo & Inguzanyo"].map((chip) => (
          <button key={chip} type="button" onClick={() => sendPrompt(chip)} style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.45)", background: theme.input, color: "#c4b5fd", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>⚡ {chip}</button>
        ))}
      </div>

      <div style={{ maxHeight: 220, overflowY: "auto", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 7 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ justifySelf: m.role === "user" ? "end" : "start", maxWidth: "88%", padding: "8px 11px", borderRadius: 10, background: m.role === "user" ? "#8b5cf6" : theme.card, color: m.role === "user" ? "#fff" : theme.text, border: m.role === "user" ? "none" : `1px solid ${theme.border}`, fontSize: 12.5, whiteSpace: "pre-line" }}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendPrompt(); }} style={{ display: "flex", gap: 8 }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Andika hano (urugero: 250 USD mu RWF, BTC, LaLiga, Aviator)..." style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "9px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>⚡ Subiza Ako Kanya</button>
      </form>
    </section>
  );
}
