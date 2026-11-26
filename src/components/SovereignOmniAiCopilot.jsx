import { GLOBAL_LANGUAGES } from "../utils/universalTranslator.js";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { getActiveLang, setActiveLang } from "../utils/sovereignLedger.js";
import { loadAiHistory, saveAiHistory, clearAiHistory, loadUserFacts } from "../utils/omniAiMemory.js";
import { generateOmniAiResponse } from "../utils/omniAiBrain.js";
import { readImageAsVisionPayload, speakCleanText } from "../utils/omniAiVoiceVision.js";

const AI_LANGS = GLOBAL_LANGUAGES;

const PERSONAS = ["🧠 Universal Genius", "💹 Wall St & Kigali Quant", "💻 Senior Software Architect", "⚖️ Rwanda Tax & RDB Advisor", "🎓 Multilingual Tutor"];
const CHIPS = ["💳 Reba balance ya Wallet", "🚀 Gura $50 ya BTC", "📲 Ohereza $20 kuri +250788111222", "💱 500 USD mu RWF", "🇷🇼 Sobanura u Rwanda & Gatsibo", "💻 Andika code ya Python"];

export default function SovereignOmniAiCopilot({ theme, panel }) {
  const [lang, setLang] = useState(getActiveLang);
  useEffect(() => { const s = () => setLang(getActiveLang()); window.addEventListener("kgt-lang-updated", s); return () => window.removeEventListener("kgt-lang-updated", s); }, []);
  const [persona, setPersona] = useState(PERSONAS.at(0));
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [autoVoice, setAutoVoice] = useState(false);
  const [messages, setMessages] = useState(loadAiHistory);
  const [attachedFile, setAttachedFile] = useState(null);
  const [streamingText, setStreamingText] = useState("");
  const [factsCount, setFactsCount] = useState(() => loadUserFacts().length);
  const fileRef = useRef(null);

  async function ask(custom) {
    const q = (custom ?? prompt).trim();
    if (!q || thinking) return;
    const next1 = [...messages, { role: "user", time: new Date().toLocaleTimeString(), text: attachedFile ? `[📎 ${attachedFile.name}] ${q}` : q }];
    setMessages(next1);
    saveAiHistory(next1);
    if (!custom) setPrompt("");
    setThinking(true);
    try {
      const res = await generateOmniAiResponse(q, lang, persona, attachedFile);
      const full=String(res.text||"");const words=full.split(" ");let acc="";for(let i=0;i<words.length;i+=3){acc+=(i?" ":"")+words.slice(i,i+3).join(" ");setStreamingText(acc+" ▌");await new Promise(r=>setTimeout(r,18));}setStreamingText("");const next2=[...next1,{role:"ai",time:new Date().toLocaleTimeString(),persona,text:full}];setMessages(next2);saveAiHistory(next2);// streamReply
      setFactsCount(loadUserFacts().length);
      setAttachedFile(null);
      if (autoVoice) speakCleanText(res.text, lang);
    } finally {
      setThinking(false);
    }
  }

  async function onFileSelect(e) {
    const f = e.target.files && e.target.files.item(0);
    if (!f) return;
    if (f.type.startsWith("image/")) {
      const imgPayload = await readImageAsVisionPayload(f);
      setAttachedFile(imgPayload);
      return;
    }
    const sizeKb = Math.max(1, Math.round(f.size / 1024));
    const reader = new FileReader();
    reader.onload = () => setAttachedFile({ name: f.name, isImage: false, sizeKb, content: String(reader.result || "") });
    reader.readAsText(f);
  }

  function startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { ask("Reba balance ya Wallet"); return; }
    const rec = new SR();
    const cur = AI_LANGS.find((l) => l.code === lang);
    rec.lang = cur ? cur.speech : "en-US";
    setListening(true);
    rec.onresult = (ev) => { const alt = ev.results?.item(0)?.item(0); if (alt?.transcript) ask(alt.transcript); };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
  }

  return (
    <section id="sovereign-omni-ai-copilot" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", background: "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(16,185,129,0.09))", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 16 }}>👑 KGT Omni-AI v100.0 — Apex Autonomous & Omniscient Super-Brain</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Autonomous Trades/Transfers · Real Image Vision · Auto-Voice · Memory ({factsCount} Facts) · 7 Languages</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <select value={persona} onChange={(e) => setPersona(e.target.value)} style={{ padding: "5px 8px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11.5, fontWeight: 800 }}>
            {PERSONAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button type="button" onClick={() => setAutoVoice((v) => !v)} style={{ padding: "5px 9px", borderRadius: 7, border: `1px solid ${theme.border}`, background: autoVoice ? "#10b981" : theme.input, color: autoVoice ? "#02131d" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
            {autoVoice ? "🔊 Auto-Voice ON" : "🔇 Auto-Voice"}
          </button>
          <button type="button" onClick={() => { clearAiHistory(); setMessages(loadAiHistory()); }} style={{ padding: "5px 9px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: "#f87171", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>🗑️ Reset</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {AI_LANGS.map((l) => <button key={l.code} type="button" onClick={() => { setLang(l.code); setActiveLang(l.code); }} style={{ padding: "4px 8px", borderRadius: 6, border: lang === l.code ? "1px solid #8b5cf6" : `1px solid ${theme.border}`, background: lang === l.code ? "#8b5cf6" : theme.input, color: lang === l.code ? "#fff" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{l.label}</button>)}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CHIPS.map((c) => <button key={c} type="button" onClick={() => ask(c)} style={{ padding: "4px 9px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{c}</button>)}
      </div>
      <div style={{ maxHeight: 265, overflowY: "auto", display: "grid", gap: 8, padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
        {messages.map((m, i) => (
          <div key={i} style={{ fontSize: 12.5, lineHeight: 1.55, padding: "8px 10px", borderRadius: 8, background: m.role === "ai" ? "rgba(139,92,246,0.16)" : "rgba(16,185,129,0.16)", whiteSpace: "pre-line" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <strong>{m.role === "ai" ? `👑 KGT Omni-AI v100.0 (${m.persona || persona})` : "👤 Wowe"}</strong>
              {m.role === "ai" && <button type="button" onClick={() => speakCleanText(m.text, lang)} style={{ padding: "2px 7px", borderRadius: 5, border: `1px solid ${theme.border}`, background: "transparent", color: "#c4b5fd", fontSize: 10.5, cursor: "pointer" }}>🔊 Soma</button>}
            </div>
            <span>{m.text}</span>
          </div>
        ))}
        {streamingText && <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(139,92,246,0.18)",border:"1px solid #8b5cf6",fontSize:13,whiteSpace:"pre-wrap"}}>{streamingText}</div>}
      {thinking && !streamingText && <div style={{ fontSize: 12, color: "#c4b5fd", fontWeight: 800 }}>⏳ KGT Omni-AI v100.0 irimo gukora no gusesengura...</div>}
      </div>
      {attachedFile && (
        <div style={{ fontSize: 11.5, padding: "6px 9px", borderRadius: 7, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {attachedFile.isImage && attachedFile.dataUrl && <img src={attachedFile.dataUrl} alt="preview" style={{ width: 34, height: 34, objectFit: "cover", borderRadius: 6 }} />}
            <span>📎 Ready: <strong>{attachedFile.name}</strong> ({attachedFile.sizeKb} KB)</span>
          </div>
          <button type="button" onClick={() => setAttachedFile(null)} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}>✕</button>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input ref={fileRef} type="file" accept="image/*,.txt,.js,.jsx,.py,.json,.csv,.md" onChange={onFileSelect} style={{ display: "none" }} />
        <button type="button" onClick={() => fileRef.current?.click()} style={{ padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: "#7dd3fc", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>📎 Image/File</button>
        <button type="button" onClick={startMic} style={{ padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: listening ? "#f43f5e" : theme.input, color: listening ? "#fff" : "#34d399", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{listening ? "🔴 Ndumva..." : "🎙️ Vuga"}</button>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Andika, vuga, cyangwa ushyiremo Ifoto/Dosiye..." style={{ flex: 1, minWidth: 200, padding: "9px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12.5 }} />
        <button type="button" onClick={() => ask()} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 900, fontSize: 12.5, cursor: "pointer" }}>👑 Baza Omni-AI</button>
      </div>
    </section>
  );
}
