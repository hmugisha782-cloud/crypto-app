import { getWalletState, getLedgerTxs } from "./sovereignLedger.js";
import { getLiveMarketSnapshot } from "./liveMarketStore.js";
import { loadUserFacts, rememberUserFact, loadAiHistory } from "./omniAiMemory.js";
import { DEEP_ENCYCLOPEDIA } from "./omniAiKnowledgePack.js";
import { tryExecuteAutonomousTool } from "./omniAiAutonomousTools.js";

function solveMathAndFx(q, rwfRate) {
  const rwfToUsd = q.match(/(\d+(?:[.,]\d+)?)\s*(?:rwf|frw|amafaranga)\s*(?:to|in|mu|muri|=|ni\s*angahe)\s*(?:usd|\$|idorari|amadolari)/i);
  if (rwfToUsd) {
    const rwf = Number(rwfToUsd.at(1).replace(/,/g, ""));
    return `💱 **Ivunjisha (Live FX):** **${rwf.toLocaleString()} RWF** = **$${(rwf / rwfRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD** *(1 USD = ${rwfRate.toLocaleString()} RWF)*.`;
  }
  const usdToRwf = q.match(/\$?(\d+(?:[.,]\d+)?)\s*(?:usd|\$|dollars?|idorari|amadolari)\s*(?:to|in|mu|muri|=|ni\s*angahe)\s*(?:rwf|frw|amafaranga)/i);
  if (usdToRwf) {
    const usd = Number(usdToRwf.at(1).replace(/,/g, ""));
    return `💱 **Ivunjisha (Live FX):** **$${usd.toLocaleString()} USD** = **${Math.round(usd * rwfRate).toLocaleString()} RWF** *(1 USD = ${rwfRate.toLocaleString()} RWF)*.`;
  }
  const mathExpr = q.replace(/[^0-9+\-*/().%\s^]/g, "").trim();
  if (mathExpr && /[0-9]/.test(mathExpr) && /[+\-*/%^]/.test(mathExpr)) {
    try {
      const val = Function(`"use strict"; return (${mathExpr.replace(/\^/g, "**")});`)();
      if (typeof val === "number" && Number.isFinite(val)) {
        return `🧮 **Exact Math:** \`${mathExpr}\` = **${val.toLocaleString(undefined, { maximumFractionDigits: 8 })}**`;
      }
    } catch {}
  }
  return null;
}

export async function generateOmniAiResponse(rawQuery, preferredLang = "RW", persona = "Universal Genius", attachedFile = null) {
  const q = rawQuery.trim();
  const lower = q.toLowerCase();
  const w = getWalletState();
  const txs = getLedgerTxs();
  const snap = getLiveMarketSnapshot();
  const rwf = snap.rwfRate || 1480;

  // 1. Long-Term Fact Learning
  const memMatch = q.match(/^(?:remember(?:\s+that)?|ibuka(?:\s+ko)?|note\s+that)\s+(.+)/i);
  if (memMatch) {
    const fact = memMatch.at(1).trim();
    const all = rememberUserFact(fact);
    return { text: `🧠 **Nabibitse burundu mu bwonko bwanjye!** *"${fact}"* (Ubu nibuka ibintu **${all.length}**).` };
  }

  // 2. Real Image Vision & Code/Document Inspector
  if (attachedFile) {
    if (attachedFile.isImage) {
      try {
        const vResp = await fetch("/api/ai/vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: q, lang: preferredLang, imageUrl: attachedFile.dataUrl }),
        });
        if (vResp.ok) {
          const vd = await vResp.json();
          if (vd?.ok && vd?.answer) return { text: `🖼️ **Vision Analysis (${attachedFile.name}):**\n${vd.answer}` };
        }
      } catch {}
      return {
        text: `🖼️ **Image Vision Inspector (${attachedFile.name}):**\n• **Dimensions:** ${attachedFile.width || "?"}x${attachedFile.height || "?"} px · **Size:** ${attachedFile.sizeKb} KB (${attachedFile.mimeType})\n• **Status:** Image loaded into KGT Omni-AI v100.0 visual buffer. Ask me to extract data, verify KYC/receipt details, or generate a report from it!`,
      };
    }
    if (attachedFile.content) {
      const lines = attachedFile.content.split(/\r?\n/).length;
      return { text: `📂 **Document/Code Inspector (${attachedFile.name} · ${lines} lines):**\n\`\`\`\n${attachedFile.content.slice(0, 700)}\n\`\`\`` };
    }
  }

  // 3. Autonomous App & FinTech Tool Execution
  const toolOutcome = tryExecuteAutonomousTool(q, preferredLang);
  if (toolOutcome) return { text: toolOutcome };

  // 4. Math & Currency Converter
  const solved = solveMathAndFx(q, rwf);
  if (solved) return { text: solved };

  // 5. Universal Multi-Turn LLM Intelligence
  const history = loadAiHistory().slice(-6).map((m) => ({
    role: m.role === "ai" ? "assistant" : "user",
    content: String(m.text || "").slice(0, 450),
  }));
  const facts = loadUserFacts();
  const sysPrompt =
    `You are KGT Omni-AI v100.0 (${persona}), the apex omniscient AI assistant inside Kigali Global Tracker (Gatsibo/Kigali, Rwanda). ` +
    `You understand EVERY human language, dialect, and slang on Earth (fluent natural Kinyarwanda, English, French, Swahili, Spanish, Arabic, Chinese) and possess complete encyclopedic knowledge of every field (coding, science, medicine, law, business, history, math). ` +
    `Live App State: Wallet=$${w.usd} USDT (${Math.round(w.usd * rwf)} RWF), ${w.btc} BTC, ${w.eth} ETH, ${(w.paxg || 0).toFixed(2)} Gold, Yield=$${w.totalYieldEarnedUsd}, FX: 1 USD=${rwf} RWF, BTC=$${snap.prices["BTC/USDT"]?.price || 65420}, 138 Active Engines, ${txs.length} receipts. User Facts: ${facts.join(" | ") || "None"}. ` +
    `Reply accurately, warmly, and thoroughly in the exact language of the user's message (default: ${preferredLang}).`;

  try {
    const r1 = await fetch("/api/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: q, lang: preferredLang, context: sysPrompt, history }),
    });
    if (r1.ok) {
      const d1 = await r1.json();
      if (d1?.ok && d1?.answer) return { text: d1.answer };
    }
  } catch {}

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 14000);
    const r2 = await fetch("https://pollinations.ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
      body: JSON.stringify({
        messages: [{ role: "system", content: sysPrompt }, ...history, { role: "user", content: q }],
        model: "openai",
        private: true,
      }),
    });
    clearTimeout(timer);
    if (r2.ok) {
      const ans = (await r2.text()).trim();
      if (ans && ans.length > 3 && !ans.startsWith("<!DOCTYPE")) return { text: ans };
    }
  } catch {}

  // 6. Offline Encyclopedia & Live State Fallback
  if (lower.includes("wallet") || lower.includes("balance") || lower.includes("amafaranga")) {
    return { text: `💳 **Konti Yawe:** $${w.usd.toLocaleString()} USDT (**${Math.round(w.usd * rwf).toLocaleString()} RWF**) · ${w.btc} BTC · ${w.eth} ETH · ${(w.paxg || 0).toFixed(2)} Gold · Receipts: ${txs.length}.` };
  }
  const hit = DEEP_ENCYCLOPEDIA.find((e) => e.keys.some((k) => lower.includes(k)));
  if (hit) return { text: preferredLang === "FR" ? hit.fr : preferredLang === "EN" ? hit.en : hit.rw };

  return { text: `🧠 **KGT Omni-AI v100.0:** Numvise *"${q}"*. Konti yawe ifite **$${w.usd.toLocaleString()} USDT (${Math.round(w.usd * rwf).toLocaleString()} RWF)**. Mbaza ikibazo icyo ari cyo cyose cyangwa ukore igikorwa nka *"Gura $50 BTC"*!` };
}
