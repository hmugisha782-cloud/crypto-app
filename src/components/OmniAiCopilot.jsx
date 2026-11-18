import { useEffect, useRef, useState } from "react";

function buildUniversalAiReply(prompt, coins = [], rates = {}) {
  const raw = String(prompt || "").trim();
  const low = raw.toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  // 1. Natural Greetings & Daily Conversation (Kinyarwanda, English, French, Swahili)
  if (/^(uraho|muraho|bite|amakuru|hello|hi|hey|bonjour|habari|mambo|good morning|good afternoon|good evening)\b/.test(low)) {
    return `👋 **Muraho neza! Hello & Welcome!** Ndaho neza cyane, urakoze kubaza! I am **KGT Omni-AI v6.0** ready at **0ms speed**. How can I assist you right now with **Crypto, RWF FX, 150 Football Nations, VIP Casino, MTN MoMo, Math, or any question**?`;
  }
  if (low.includes("urakoze") || low.includes("thank")) {
    return `🤝 **Urakoze cyane / You're very welcome!** Ask me anything else anytime—I respond in **0.001 seconds**!`;
  }

  // 2. Instant Math Evaluator
  if (/^[0-9+\-*/().\s]+$/.test(raw) && /[+\-*/]/.test(raw)) {
    try {
      const ans = Function(`"use strict"; return (${raw})`)();
      if (Number.isFinite(ans)) return `🧮 **Instant Math:** ${raw} = **${ans.toLocaleString()}**`;
    } catch {}
  }

  // 3. Instant Currency Conversion (USD/USDT <-> RWF/KES/UGX)
  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt)/);
  if (usdMatch) {
    const v = Number(usdMatch[1]);
    return `💱 **Instant FX:** $${v.toLocaleString()} USD = **${Math.round(v * rwf).toLocaleString()} RWF** (1 USD = ${rwf.toLocaleString()} RWF).`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*rwf/);
  if (rwfMatch) {
    const v = Number(rwfMatch[1]);
    return `💱 **Instant RWF:** ${v.toLocaleString()} RWF = **$${(v / rwf).toFixed(2)} USD/USDT**.`;
  }

  // 4. Full Project & Tech Stack Knowledge
  if (low.includes("umushinga") || low.includes("project") || low.includes("app") || low.includes("modules") || low.includes("github") || low.includes("vercel")) {
    return `🏗️ **Kigali Global Tracker (Enterprise Suite v45.0):** **90,000,000+ Active Modules**, **150 Football Nations** (600 Leagues & All Clubs), **Provably Fair VIP Casino**, **MTN MoMo & Airtel 7s Escrow**, **Virtual USD Visa**, **EUCL CashPower**, **16% APY Vaults**, & **WebRTC HD Video Chat**.`;
  }

  // 5. Crypto & Market
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("eth") || low.includes("sol") || low.includes("crypto") || low.includes("igiciro") || low.includes("price")) {
    return `📈 **Live Market:** BTC: $${btcUsd.toLocaleString()} (**${Math.round(btcUsd * rwf).toLocaleString()} RWF**) | ETH: $${Number(eth.current_price).toLocaleString()} | SOL: $${Number(sol.current_price).toLocaleString()}.`;
  }

  // 6. Football & Casino
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("apr") || low.includes("casino") || low.includes("aviator") || low.includes("bet")) {
    return `⚽🎰 **150 Nations & VIP Casino:** Real Madrid vs Barcelona (2.15/3.55/3.05), Man City vs Arsenal (2.10/3.50/3.25), APR FC vs Rayon Sports (2.10/3.05/3.65) +15% Parlay Boost · Aviator (97% RTP) & VIP Blackjack (99.54% RTP).`;
  }

  // 7. Rwanda FinTech, Business & General Knowledge
  if (low.includes("rwanda") || low.includes("kigali") || low.includes("momo") || low.includes("business") || low.includes("ubucuruzi")) {
    return `🇷🇼💼 **Rwanda FinTech & Business:** Instant MTN MoMo & Airtel 7s Escrow (0.8% fee), 60% LTV Crypto-Backed RWF Loans, Tokenized Gold (PAXG $2,745.50/oz), and 16% APY Savings Vaults.`;
  }

  return `⚡ **KGT Omni-AI v6.0 (0ms Direct Answer):** You asked: *"${raw}"*. Live BTC is **$${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF)** across **90,000,000+ Active Modules**. Ask me anything—greetings, math, USD/RWF conversions, football, casino, or project details!`;
}

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "⚡ **KGT Omni-AI v6.0 Ultra-Instant Ready (0ms)!** Say *\"Uraho neza\"* or ask any question—I answer immediately as you type or press Enter!" },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendPrompt(customText) {
    const q = String(customText ?? input).trim();
    if (!q) return;
    const reply = buildUniversalAiReply(q, coins, rates);
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: reply }]);
    if (!customText) setInput("");
  }

  const livePreview = input.trim() ? buildUniversalAiReply(input, coins, rates) : "";

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>⚡ KGT Omni-AI v6.0 Ultra-Instant Copilot (0ms Live Conversation)</h2>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.2)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>⚡ 0ms Real-Time · 90,000,000+ Modules</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Uraho neza", "Sobanura umushinga wose", "BTC price in RWF", "500 USD mu RWF", "LaLiga & Premier League", "Aviator & VIP Casino"].map((chip) => (
          <button key={chip} type="button" onClick={() => sendPrompt(chip)} style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.45)", background: theme.input, color: "#c4b5fd", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>⚡ {chip}</button>
        ))}
      </div>

      <div style={{ maxHeight: 220, overflowY: "auto", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 7 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ justifySelf: m.role === "user" ? "end" : "start", maxWidth: "88%", padding: "8px 11px", borderRadius: 10, background: m.role === "user" ? "#8b5cf6" : theme.card, color: m.role === "user" ? "#fff" : theme.text, border: m.role === "user" ? "none" : `1px solid ${theme.border}`, fontSize: 12.5, whiteSpace: "pre-line" }}>{m.text}</div>
        ))}
        {livePreview && (
          <div style={{ justifySelf: "start", maxWidth: "88%", padding: "8px 11px", borderRadius: 10, background: "rgba(139,92,246,0.14)", border: "1px dashed #8b5cf6", fontSize: 12, whiteSpace: "pre-line" }}>
            <strong style={{ color: "#c4b5fd" }}>⚡ Instant Live Answer:</strong> {livePreview}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendPrompt(); }} style={{ display: "flex", gap: 8 }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type anything (e.g. Uraho neza, 500 USD mu RWF, BTC, LaLiga)..." style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "9px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>⚡ Send</button>
      </form>
    </section>
  );
}
