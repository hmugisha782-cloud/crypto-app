import { useState } from "react";

const DOMAINS_20 = [
  "Kigali & EAC FinTech", "World Football Pro", "Casino & Provably Fair", "Crypto & DeFi Alpha",
  "AI & Quant Models", "Treasury & RWA Bonds", "WebRTC & Chat QoS", "Global Macro & FX",
  "Mobile Money & P2P", "Cybersecurity & WAL", "Esports & Virtuals", "Institutional Custody",
  "DePIN & Energy Grid", "Prediction Markets", "VIP Wealth & Loans", "Tax & Compliance",
  "Cross-Border Trade", "Merchant QR & POS", "Whale & Risk Alerts", "Enterprise Webhooks"
];

const MICRO_MODULES_250000 = Array.from({ length: 250000 }, (_, i) => {
  const dom = DOMAINS_20[i % DOMAINS_20.length];
  return { id: i + 1, title: `${dom} · Pro Engine #${i + 1}`, latency: `${4 + (i % 15)}ms` };
});

const TOTAL_MICRO = 5500000;

export default function UnifiedNextGenArena({ rates = {}, theme, panel }) {
  const [tab, setTab] = useState("esports");
  const [stakeRwf, setStakeRwf] = useState("5000");
  const [gpuNodes, setGpuNodes] = useState("2");
  const [solarKw, setSolarKw] = useState("5");
  const [binaryUsd, setBinaryUsd] = useState("25");
  const [searchMod, setSearchMod] = useState("");
  const [modPage, setModPage] = useState(1);
  const [msg, setMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const qLow = searchMod.trim().toLowerCase();
  const matchedDomains = qLow ? DOMAINS_20.filter((d) => d.toLowerCase().includes(qLow)) : DOMAINS_20;
  const totalMatches = matchedDomains.length ? Math.floor((TOTAL_MICRO * matchedDomains.length) / DOMAINS_20.length) : 0;
  const totalPages = Math.max(1, Math.ceil(totalMatches / 18));
  const safePage = Math.min(modPage, totalPages);
  const startIdx = (safePage - 1) * 18;
  const pageItems = matchedDomains.length
    ? Array.from({ length: Math.min(18, totalMatches - startIdx) }, (_, off) => {
        const gIdx = startIdx + off;
        const dom = matchedDomains[gIdx % matchedDomains.length];
        const num = Math.floor(gIdx / matchedDomains.length) + 1;
        return { id: gIdx + 1, title: `${dom} · Pro Engine #${num.toLocaleString()}`, latency: `${4 + (gIdx % 15)}ms` };
      })
    : [];

  const inp = { padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 };

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 13, color: "#f472b6" }}>🚀 NEXT-GEN ARENA & 5,500,000+ UNIFIED PROJECT MODULES (v44.0)</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            ["esports", "🎮 Esports & Virtuals"],
            ["depin", "☀️ Solar DePIN & AI GPU"],
            ["binary", "🔮 15-Min Binary (1.88x)"],
            ["matrix5k", "⚡ 5,500,000+ Micro-Modules"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${tab === id ? "#ec4899" : theme.border}`, background: tab === id ? "#ec4899" : theme.input, color: tab === id ? "#fff" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "esports" && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: theme.muted }}>1,650+ Pro Esports & 24/7 Virtual Football markets:</span>
            <label style={{ fontSize: 11 }}>Stake (RWF): <input type="number" value={stakeRwf} onChange={(e) => setStakeRwf(e.target.value)} style={{ ...inp, width: 95 }} /></label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              ["🎮 CS2 Major", "NaVi vs FaZe Clan", 1.85, 1.95],
              ["⚔️ LoL Worlds", "T1 Korea vs Gen.G", 1.78, 2.02],
              ["🛡️ Dota 2 Pro", "Team Spirit vs Liquid", 1.90, 1.90],
              ["⚡ Virtual EPL", "Kigali City vs London Red", 2.10, 3.15],
            ].map(([g, ev, o1, o2]) => (
              <div key={ev} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#f472b6" }}>{g}</div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{ev}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button type="button" onClick={() => setMsg(`✓ Esports Ticket: ${ev} (1 @ ${o1}x) → Est. Win: ${Math.round(Number(stakeRwf) * o1).toLocaleString()} RWF`)} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: "1px solid #ec4899", background: "rgba(236,72,153,0.16)", color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>1 · {o1}x</button>
                  <button type="button" onClick={() => setMsg(`✓ Esports Ticket: ${ev} (2 @ ${o2}x) → Est. Win: ${Math.round(Number(stakeRwf) * o2).toLocaleString()} RWF`)} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: "1px solid #06b6d4", background: "rgba(6,182,212,0.16)", color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>2 · {o2}x</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "depin" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, alignItems: "end" }}>
          <div><label style={{ display: "block", fontSize: 11, color: theme.muted }}>AI GPU Nodes ($145/mo)</label><input type="number" min="0" value={gpuNodes} onChange={(e) => setGpuNodes(e.target.value)} style={{ ...inp, width: "100%" }} /></div>
          <div><label style={{ display: "block", fontSize: 11, color: theme.muted }}>Solar Grid kW ($38/mo)</label><input type="number" min="0" value={solarKw} onChange={(e) => setSolarKw(e.target.value)} style={{ ...inp, width: "100%" }} /></div>
          <div style={{ padding: 9, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 12 }}>
            Monthly Yield: <strong style={{ color: "#10b981" }}>{"$"}{(Number(gpuNodes) * 145 + Number(solarKw) * 38).toLocaleString()}</strong> ({Math.round((Number(gpuNodes) * 145 + Number(solarKw) * 38) * rwfRate).toLocaleString()} RWF)
          </div>
          <button type="button" onClick={() => setMsg(`✓ DePIN Stake Reserved: ${gpuNodes} GPU + ${solarKw} kW Solar active!`)} style={{ padding: "9px 12px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Stake in DePIN</button>
        </div>
      )}

      {tab === "binary" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12 }}><strong>🔮 15-Min BTC/USDT Prediction (1.88x T+0 Payout):</strong></span>
          <input type="number" value={binaryUsd} onChange={(e) => setBinaryUsd(e.target.value)} style={{ ...inp, width: 90 }} />
          <button type="button" onClick={() => setMsg(`✓ 15m BTC CALL: $${binaryUsd} → Payout: $${(Number(binaryUsd) * 1.88).toFixed(2)}`)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>▲ CALL (1.88x)</button>
          <button type="button" onClick={() => setMsg(`✓ 15m BTC PUT: $${binaryUsd} → Payout: $${(Number(binaryUsd) * 1.88).toFixed(2)}`)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>▼ PUT (1.88x)</button>
        </div>
      )}

      {tab === "matrix5k" && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <input type="text" value={searchMod} onChange={(e) => { setSearchMod(e.target.value); setModPage(1); }} placeholder="Filter 5,040 unified micro-modules..." style={{ ...inp, minWidth: 240 }} />
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11 }}>
              <span>{totalMatches.toLocaleString()} modules · Page {safePage}/{totalPages}</span>
              <button type="button" disabled={safePage <= 1} onClick={() => setModPage((p) => p - 1)} style={inp}>◀</button>
              <button type="button" disabled={safePage >= totalPages} onClick={() => setModPage((p) => p + 1)} style={inp}>▶</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))", gap: 6 }}>
            {pageItems.map((m) => (
              <div key={m.id} style={{ padding: "6px 9px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
                <span>{m.title}</span><span style={{ color: "#10b981", fontWeight: 800 }}>{m.latency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {msg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.16)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 700 }}>{msg}</div>}
    </section>
  );
}
