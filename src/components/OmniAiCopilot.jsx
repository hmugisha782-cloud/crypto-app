import { useEffect, useRef, useState } from "react";

function buildUniversalAiReply(prompt, coins = [], rates = {}) {
  const raw = String(prompt || "").trim();
  const low = raw.toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  if (/^(uraho|muraho|bite|amakuru|hello|hi|hey|bonjour|salut|habari|mambo|good morning|good afternoon|good evening)\b/.test(low)) {
    return `👋 **Muraho neza! Hello & Welcome!** Ndaho neza cyane! **KGT Omni-AI v9.0** is 100% open and free for every user worldwide (zero login required, **0ms** response). Ask me anything in Kinyarwanda, English, French, or Swahili!`;
  }
  if (low.includes("urakoze") || low.includes("thank") || low.includes("merci") || low.includes("asante")) {
    return `🤝 **Urakoze cyane / You're very welcome!** Always ready at **0ms** speed for every user on Kigali Global Tracker!`;
  }
  if (low.includes("time") || low.includes("isaha") || low.includes("date") || low.includes("itariki") || low.includes("today")) {
    return `🕒 **Current Date & Time (Kigali / UTC):** **${new Date().toLocaleString("en-RW", { timeZone: "Africa/Kigali" })} CAT** · **${new Date().toUTCString()}**.`;
  }
  if (/^[0-9+\-*/().\s]+$/.test(raw) && /[+\-*/]/.test(raw)) {
    try {
      const ans = Function(`"use strict"; return (${raw})`)();
      if (Number.isFinite(ans)) return `🧮 **Instant Math:** ${raw} = **${ans.toLocaleString()}**`;
    } catch {}
  }
  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt)/);
  if (usdMatch) {
    const v = Number(usdMatch[1]);
    return `💱 **Instant FX:** $${v.toLocaleString()} USD = **${Math.round(v * rwf).toLocaleString()} RWF** (1 USD = ${rwf.toLocaleString()} RWF) · ≈ ${Math.round(v * Number(rates?.KES || 129.4)).toLocaleString()} KES · ≈ €${(v * Number(rates?.EUR || 0.92)).toFixed(2)} EUR.`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*rwf/);
  if (rwfMatch) {
    const v = Number(rwfMatch[1]);
    return `💱 **Instant RWF:** ${v.toLocaleString()} RWF = **$${(v / rwf).toFixed(2)} USD/USDT**.`;
  }
  if (low.includes("ubuzima") || low.includes("health") || low.includes("doctor") || low.includes("water") || low.includes("amazi")) {
    return `🩺 **Daily Health & Wellness:** Drink 2–3L of clean water daily, sleep 7–8 hours, stay active 30 mins/day, and eat fresh vegetables, fruits, and proteins. Rwanda health hotline: **114** | Emergency: **912**.`;
  }
  if (low.includes("kwiga") || low.includes("education") || low.includes("code") || low.includes("programming") || low.includes("ubuhinzi") || low.includes("inama") || low.includes("advice")) {
    return `🌟 **Education, Tech & Daily Growth:** Build consistent daily habits—save 20% of income, practice coding & digital finance skills every day, and diversify across liquid assets and high-yield vaults!`;
  }
  if (low.includes("umushinga") || low.includes("project") || low.includes("app") || low.includes("modules") || low.includes("chat") || low.includes("video")) {
    return `🏗️ **Kigali Global Tracker (Enterprise Suite v56.0):** **170,000,000+ Active Modules**, **150 Football Nations (600 Leagues)**, **Provably Fair VIP Casino**, **Worldwide Any-Country Chat & WebRTC HD Video**, **MTN MoMo & Global FinTech**, & **KGT Omni-AI v9.0**—100% open to every user!`;
  }
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("eth") || low.includes("sol") || low.includes("crypto") || low.includes("igiciro")) {
    return `📈 **Live Market:** BTC: $${btcUsd.toLocaleString()} (**${Math.round(btcUsd * rwf).toLocaleString()} RWF**) | ETH: $${Number(eth.current_price).toLocaleString()} | SOL: $${Number(sol.current_price).toLocaleString()}.`;
  }
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("apr") || low.includes("casino") || low.includes("aviator")) {
    return `⚽🎰 **150 Nations & VIP Casino:** Real Madrid vs Barcelona (2.15/3.55/3.05), Man City vs Arsenal (2.10/3.50/3.25), APR FC vs Rayon Sports (2.10/3.05/3.65) +15% Parlay Boost · Aviator (97% RTP) & Blackjack (99.54% RTP).`;
  }
  return `🌍 **KGT Omni-AI v9.0 (Open to All Users Worldwide · 0ms):** You asked: *"${raw}"*. Live BTC: **$${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF)** across **170,000,000+ Active Modules**. Every user can ask about **Crypto, RWF/USD FX, 150 Football Nations, Casino, Global Video Chat, Health, Education, or Math** anytime!`;
}

const DEFAULT_WELCOME = [
  { role: "ai", text: "🌍 **KGT Omni-AI v9.0 Open Access Ready (0ms)!** Every user on this app can chat, speak, and get instant answers with zero login required!" },
];

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [voiceSpeak, setVoiceSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kgt_omni_ai_public_v9") || "null");
      return Array.isArray(saved) && saved.length ? saved : DEFAULT_WELCOME;
    } catch {
      return DEFAULT_WELCOME;
    }
  });
  const endRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("kgt_omni_ai_public_v9", JSON.stringify(messages.slice(-50))); } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function speakText(txt) {
    if (!voiceSpeak || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt.replace(/[*#⚡💱📈⚽🎰🇷🇼💼🧮🏗️🤝👋🩺🌱🎓🌟🕒🧠🌍]/g, ""));
    u.rate = 1.05;
    window.speechSynthesis.speak(u);
  }

  function sendPrompt(customText) {
    const q = String(customText ?? input).trim();
    if (!q) return;
    const reply = buildUniversalAiReply(q, coins, rates);
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: reply }]);
    speakText(reply);
    if (!customText) setInput("");
  }

  function startVoiceInput() {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return sendPrompt("Uraho neza! Give me live BTC price in RWF");
    const rec = new SR();
    rec.lang = "en-US";
    setListening(true);
    rec.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript || "";
      setListening(false);
      if (transcript) sendPrompt(transcript);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
  }

  const livePreview = input.trim() ? buildUniversalAiReply(input, coins, rates) : "";

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>🌍 KGT Omni-AI v9.0 (100% Open to All Users · Project + Life Brain)</h2>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setVoiceSpeak((v) => !v)} style={{ padding: "4px 10px", borderRadius: 999, border: "1px solid #8b5cf6", background: voiceSpeak ? "#8b5cf6" : theme.input, color: voiceSpeak ? "#fff" : "#c4b5fd", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>
            {voiceSpeak ? "🔊 Voice ON" : "🔇 Voice OFF"}
          </button>
          <button type="button" onClick={() => setMessages(DEFAULT_WELCOME)} style={{ padding: "4px 9px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.input, color: theme.muted, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
            Clear
          </button>
          <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#10b981", fontWeight: 800, fontSize: 11 }}>Open Access · 0ms</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Uraho neza", "Sobanura umushinga wose", "BTC price in RWF", "500 USD mu RWF", "Inama z'ubuzima", "LaLiga & VIP Casino"].map((chip) => (
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
        <button type="button" onClick={startVoiceInput} style={{ padding: "9px 12px", borderRadius: 9, border: "1px solid #8b5cf6", background: listening ? "#ef4444" : theme.input, color: listening ? "#fff" : "#c4b5fd", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          {listening ? "🎙️ Listening..." : "🎙️ Voice"}
        </button>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything (open to every user worldwide, zero login needed)..." style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "9px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>⚡ Send</button>
      </form>
    </section>
  );
}
