import { useEffect, useRef, useState } from "react";

function buildUniversalAiReply(prompt, coins = [], rates = {}) {
  const raw = String(prompt || "").trim();
  const low = raw.toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  if (/^[0-9+\-*/().\s]+$/.test(raw) && /[+\-*/]/.test(raw)) {
    try {
      const ans = Function(`"use strict"; return (${raw})`)();
      if (Number.isFinite(ans)) return `🧮 **Instant Math Solver:** ${raw} = **${ans.toLocaleString()}**`;
    } catch {}
  }
  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt)/);
  if (usdMatch) {
    const v = Number(usdMatch);
    return `💱 **Live FX:** $${v.toLocaleString()} USD = **${Math.round(v * rwf).toLocaleString()} RWF** (1 USD = ${rwf.toLocaleString()} RWF).`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*rwf/);
  if (rwfMatch) {
    const v = Number(rwfMatch);
    return `💱 **Live RWF:** ${v.toLocaleString()} RWF = **$${(v / rwf).toFixed(2)} USD/USDT**.`;
  }
  if (low.includes("umushinga") || low.includes("project") || low.includes("app") || low.includes("modules") || low.includes("github") || low.includes("vercel")) {
    return `🏗️ **Kigali Global Tracker (Enterprise Suite v44.0):** 90,000,000+ Active Modules, 150 Football Nations (600 Leagues & All Clubs), VIP Casino (SHA-256 Fair), MTN MoMo & Airtel 7s Escrow, Virtual USD Visa, EUCL CashPower, 16% APY Vaults, 60% LTV RWF Loans, & WebRTC HD Video Chat.`;
  }
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("eth") || low.includes("sol") || low.includes("crypto") || low.includes("igiciro")) {
    return `📈 **Live Market:** BTC: $${btcUsd.toLocaleString()} (**${Math.round(btcUsd * rwf).toLocaleString()} RWF**) | ETH: $${Number(eth.current_price).toLocaleString()} | SOL: $${Number(sol.current_price).toLocaleString()}.`;
  }
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("apr") || low.includes("casino") || low.includes("aviator")) {
    return `⚽🎰 **150 Nations & VIP Casino:** Real Madrid vs Barcelona (2.15/3.55/3.05), Man City vs Arsenal (2.10/3.50/3.25), APR FC vs Rayon Sports (2.10/3.05/3.65) +15% Parlay Boost · Aviator (97% RTP) & Blackjack (99.54% RTP).`;
  }
  if (low.includes("rwanda") || low.includes("kigali") || low.includes("business") || low.includes("ubucuruzi") || low.includes("ai")) {
    return `🇷🇼💼 **Rwanda FinTech & AI Strategy:** Kigali is East Africa's premier digital finance hub. Diversify across USDT/BTC, Tokenized Gold (PAXG $2,745.50/oz), and 16% APY Savings Vaults!`;
  }
  return `🧠 **KGT Omni-AI v5.0 (0ms Universal Brain):** Nabonye ikibazo cyawe: *"${raw}"*. Live BTC: $${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF). Baza *"Sobanura umushinga wose"*, *"500 USD mu RWF"*, *"2500 * 1480"*, *"LaLiga"*, cyangwa *"Rwanda FinTech"*!`;
}

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "🧠 **KGT Omni-AI v5.0 Universal Copilot (0ms Response)!** Nzi amakuru yose y'umushinga wacu (90M+ modules) n'ubumenyi rusange bwo hanze. Baza ikibazo icyo ari cyo cyose!" },
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

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>🧠 KGT Omni-AI v5.0 Universal Copilot (Project + World + 0ms)</h2>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.2)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>⚡ 0ms · Full App & World Brain</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Sobanura umushinga wose", "Igiciro cya BTC mu RWF", "500 USD mu RWF", "2500 * 1480", "Rwanda FinTech", "LaLiga & Aviator"].map((chip) => (
          <button key={chip} type="button" onClick={() => sendPrompt(chip)} style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.45)", background: theme.input, color: "#c4b5fd", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>⚡ {chip}</button>
        ))}
      </div>

      <div style={{ maxHeight: 230, overflowY: "auto", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 7 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ justifySelf: m.role === "user" ? "end" : "start", maxWidth: "88%", padding: "8px 11px", borderRadius: 10, background: m.role === "user" ? "#8b5cf6" : theme.card, color: m.role === "user" ? "#fff" : theme.text, border: m.role === "user" ? "none" : `1px solid ${theme.border}`, fontSize: 12.5, whiteSpace: "pre-line" }}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendPrompt(); }} style={{ display: "flex", gap: 8 }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Baza ikibazo icyo ari cyo cyose (ku mushinga cyangwa hanze yawo)..." style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "9px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>⚡ Baza AI</button>
      </form>
    </section>
  );
}
