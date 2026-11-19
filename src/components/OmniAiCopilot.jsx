import { useEffect, useRef, useState } from "react";

function buildCleanAiReply(prompt, coins = [], rates = {}, langMode = "auto") {
  const raw = String(prompt || "").trim();
  const low = raw.toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  // Language switch request
  if (low.includes("ikinyarwanda") || low.includes("kinyarwanda")) {
    return "Yego rwose! Ubu tugiye kuganira mu Kinyarwanda gusa. Mbwira ikibazo cyangwa ikiganiro wifuza ko tuganiraho.";
  }
  if (low.includes("english") || low.includes("icyongereza")) {
    return "Sure! Let's continue in English. What would you like to ask or discuss?";
  }

  // Natural Kinyarwanda & English greetings
  if (low.includes("waramutse") || low.includes("waramutse ute") || low.includes("mwaramutse")) {
    return "Waramutse neza cyane! Ndi muzima, urakoze kubaza. Wowe waramutse ute? Nakufasha iki uyu munsi?";
  }
  if (low.includes("wiriwe") || low.includes("mwiriwe")) {
    return "Wiriwe neza! Ndi amahoro rwose. Wowe wiriwe ute? Hari icyo nakufasha uyu mugoroba?";
  }
  if (/^(uraho|muraho|bite|amakuru|umeze ute|umezut)\b/.test(low)) {
    return "Muraho neza! Ndi muzima rwose, urakoze. Mbwira ikibazo ufite cyangwa icyo wifuza kumenya ngusubize.";
  }
  if (/^(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(low)) {
    return "Hello! I'm doing great, thank you. How can I help you today?";
  }
  if (low.includes("urakoze") || low.includes("murakoze")) {
    return "Urakoze nawe! Niba hari ikindi wifuza kubaza, mbwira rwose.";
  }
  if (low.includes("thank")) {
    return "You're very welcome! Let me know if you need anything else.";
  }

  // Identity & capabilities
  if (low.includes("witwa nde") || low.includes("uri nde") || low.includes("who are you")) {
    return "Nitwa KGT Omni-AI, umufasha wawe w'ubwenge bwa AI muri Kigali Global Tracker. Nshobora kugusubiza ku bibazo by'ubuzima bwa buri munsi, imibare, ivunjisha ry'amafaranga, ibiciro bya Crypto, umupira w'amaguru, n'andi makuru yose wifuza.";
  }

  // Time & Date
  if (low.includes("isaha") || low.includes("itariki") || low.includes("time") || low.includes("date")) {
    return `Ubu i Kigali ni: ${new Date().toLocaleString("en-RW", { timeZone: "Africa/Kigali" })}.`;
  }

  // Math solver
  if (/^[0-9+\-*/().\s]+$/.test(raw) && /[+\-*/]/.test(raw)) {
    try {
      const ans = Function(`"use strict"; return (${raw})`)();
      if (Number.isFinite(ans)) return `Igisubizo: ${raw} = ${ans.toLocaleString()}`;
    } catch {}
  }

  // Currency conversion
  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt|idorari|amadolari)/);
  if (usdMatch) {
    const v = Number(usdMatch);
    return `$${v.toLocaleString()} USD bingana na ${Math.round(v * rwf).toLocaleString()} RWF (ku gipimo cya 1 USD = ${rwf.toLocaleString()} RWF).`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:rwf|amafaranga)/);
  if (rwfMatch) {
    const v = Number(rwfMatch);
    return `${v.toLocaleString()} RWF bingana na $${(v / rwf).toFixed(2)} USD.`;
  }

  // Crypto prices
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("eth") || low.includes("sol") || low.includes("crypto") || low.includes("igiciro")) {
    return `Ibiciro biriho ubu:\n• Bitcoin (BTC): $${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF)\n• Ethereum (ETH): $${Number(eth.current_price).toLocaleString()} (${Math.round(Number(eth.current_price) * rwf).toLocaleString()} RWF)\n• Solana (SOL): $${Number(sol.current_price).toLocaleString()} (${Math.round(Number(sol.current_price) * rwf).toLocaleString()} RWF)`;
  }

  // Football & Casino
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("umupira") || low.includes("apr") || low.includes("rayon")) {
    return "Mu mikino y'umupira w'amaguru dufite ibihugu 150 na shampiyona 600 (harimo LaLiga, Premier League, Champions League na Rwanda Premier League). Ushobora guhitamo ikipe iyo ari yo yose hejuru ugatega mu RWF cyangwa USDT.";
  }
  if (low.includes("casino") || low.includes("aviator") || low.includes("game")) {
    return "Muri VIP Casino hari imikino nka Aviator Crash, Sweet Bonanza, Gates of Olympus, Lightning Roulette, VIP Blackjack na Poker ikoresha sisitemu yizewe ya SHA-256.";
  }

  // Health & Daily Life
  if (low.includes("ubuzima") || low.includes("health") || low.includes("indwara") || low.includes("amazi")) {
    return "Ku buzima bwiza bwa buri munsi: nywa amazi meza ahagije (litiro 2 kugeza kuri 3 ku munsi), uryame amasaha 7–8, ukore siporo nibura iminota 30, kandi urye indyo yuzuye. Nimero y'ubutabazi bw'ubuzima mu Rwanda ni 114 cyangwa 912.";
  }
  if (low.includes("ubuhinzi") || low.includes("agriculture") || low.includes("ikirere")) {
    return "Mu buhinzi bwiza: koresha ifumbire y'imborera, urwanye isuri ucukura imirwanyasuri, kandi ukurikirane iteganyagihe rya Meteo Rwanda mbere yo gutera imbuto.";
  }
  if (low.includes("ubucuruzi") || low.includes("business") || low.includes("ishoramari") || low.includes("inama")) {
    return "Inama y'ubucuruzi n'ishoramari: zigama nibura 20% by'inyungu zawe, wirinde gushyira amafaranga yose ahantu hamwe, kandi ukoreshe ikoranabuhanga mu gucunga neza ibyo winjiza n'ibyo usohora.";
  }

  // Smart, clean conversational answer without repeating boilerplate
  const isRw = /(iki|kuki|ryari|hehe|nde|ute|ese|nibwo|nonese|mbwira|sobanura|mfasha|rwanda|kigali|amafaranga|umuntu|ikintu)/.test(low);
  if (isRw) {
    return `Ndumva neza ikibazo cyawe kijyanye na "${raw}". Kugira ngo ngusubize mu buryo burambuye kandi bujyanye n'icyo wifuza, sobanura ho gato icyo wifuza kumenya cyangwa umbaze ikibazo kihariye (urugero: ubuzima, ubucuruzi, imibare, ivunjisha, cyangwa imikino) mpita ngusubiza neza.`;
  }
  return `I understand your question about "${raw}". Could you share a bit more detail on what specifically you'd like to know so I can give you a precise, helpful answer?`;
}

const INITIAL_MSG = [
  { role: "ai", text: "Muraho! Mbwira ikibazo cyangwa ikiganiro wifuza ko tuganiraho." },
];

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MSG);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendPrompt(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const reply = buildCleanAiReply(q, coins, rates);
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: reply }]);
    setInput("");
  }

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>KGT Omni-AI Assistant</h2>
        <button type="button" onClick={() => setMessages(INITIAL_MSG)} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.muted, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          Clear Chat
        </button>
      </div>

      <div style={{ maxHeight: 250, overflowY: "auto", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ justifySelf: m.role === "user" ? "end" : "start", maxWidth: "85%", padding: "9px 12px", borderRadius: 10, background: m.role === "user" ? "#8b5cf6" : theme.card, color: m.role === "user" ? "#fff" : theme.text, border: m.role === "user" ? "none" : `1px solid ${theme.border}`, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line" }}>
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendPrompt} style={{ display: "flex", gap: 8 }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Andika ikibazo cyawe hano..." style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "10px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          Ohereza
        </button>
      </form>
    </section>
  );
}
