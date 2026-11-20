import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const AI_PILLARS = [
  "📈 24/7 Crypto, Forex & Gold Arbitrage AI Bot",
  "🗣️ Kinyarwanda & Multilingual Enterprise AI Agent",
  "💻 Autonomous Full-Stack & Smart-Contract AI Dev",
  "🎬 4K AI Cinema, Afrobeat Mastering & Ad Studio",
  "🧠 Sovereign Fine-Tuned Enterprise LLM Node",
  "📊 Predictive Risk, Credit & Fraud AI Oracle",
  "🤖 Automated WhatsApp, MoMo & CRM Sales Bot",
  "🔬 Scientific Drug-Discovery & Climate AI Compute"
];

const AI_CLUSTERS = ["Kigali AGI Core", "Gatsibo Neural Node", "Zurich Sovereign AI", "London Quant Lab", "Tokyo Robotics AI", "Silicon Valley H200", "Nairobi Pan-African AI", "Singapore AGI Hub"];

export default function OmniAiAgentsAutomationHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [aiMsg, setAiMsg] = useState("");

  const TOTAL_AGENTS = 1000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const agents = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_AGENTS) {
      const id = ((idx + scanned - 1) % TOTAL_AGENTS) + 1;
      scanned++;
      const p = AI_PILLARS[id % AI_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const cl = AI_CLUSTERS[(id * 67) % AI_CLUSTERS.length];
      const title = `${p} · ${cl} #${String(id).padStart(28, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((10 + ((id * 163) % 490)).toFixed(2));
      out.push({ id, p, cl, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function launchAiAgent(item) {
    const aid = "AGI-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🤖 AUTONOMOUS AI AGENT LAUNCHED [${aid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "AiAgentsAutomation", title: item.title || "AiAgentsAutomation Execution", amountUsd: _usdVal, rwfRate }); setAiMsg(`🤖 AUTONOMOUS AI AGENT LAUNCHED [${aid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-ai-agents-automation-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🤖 Autonomous Trading Bots, Kinyarwanda AI Agents & AGI Workflow Marketplace (1SXD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy 24/7 crypto arbitrage bots, Kinyarwanda voice agents, AI code engineers & LLM nodes in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.18)", color: "#c4b5fd", fontWeight: 800, fontSize: 11 }}>
          1OC+ Autonomous AI Agents · 1 Sexdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search AI agents & bots (e.g. Kinyarwanda, Arbitrage, Kigali, Gatsibo, LLM, WhatsApp)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign AI Agents & AGI Pillars (1OC+)</option>
          {AI_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_AGENTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_AGENTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_AGENTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_AGENTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {agents.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => launchAiAgent(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🤖 Launch AI Agent
            </button>
          </div>
        ))}
      </div>

      {aiMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{aiMsg}</div>}
    </section>
  );
}
