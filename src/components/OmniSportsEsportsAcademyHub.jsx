import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const SPORTS_PILLARS = [
  "⚽ FIFA, UEFA, CAF & Rwanda League AI Match Pass",
  "🎮 Global Esports Pro-League & Prize Pool Entry",
  "🏅 Gatsibo & Kigali Youth Sports Academy Share",
  "🎟️ Signed Pro-Club Jersey & VIP Stadium Box",
  "🏀 BAL (Basketball Africa League) BK Arena Pass",
  "🚴 Tour du Rwanda & UCI Cycling VIP Telemetry",
  "📊 Real-Time AI Sports Odds & Player Scouting API",
  "🏆 Sovereign Fan-Token & Club Governance Vote"
];

const ARENAS = ["Amahoro Stadium", "BK Arena Kigali", "Gatsibo Sports Complex", "London Wembley", "Madrid Bernabeu", "Nairobi Kasarani", "Paris Parc des Princes", "Tokyo Esports Dome"];

export default function OmniSportsEsportsAcademyHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [sptMsg, setSptMsg] = useState("");

  const TOTAL_EVENTS = 10000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const events = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_EVENTS) {
      const id = ((idx + scanned - 1) % TOTAL_EVENTS) + 1;
      scanned++;
      const p = SPORTS_PILLARS[id % SPORTS_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const arena = ARENAS[(id * 109) % ARENAS.length];
      const title = `${p} · ${arena} #${String(id).padStart(38, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((6 + ((id * 227) % 394)).toFixed(2));
      out.push({ id, p, arena, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function activateSports(item) {
    const tkt = "SPT-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏆 SPORTS & ESPORTS PASS ACTIVE [${tkt}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "SportsEsportsAcademy", title: item.title || "SportsEsportsAcademy Execution", amountUsd: _usdVal, rwfRate }); setSptMsg(`🏆 SPORTS & ESPORTS PASS ACTIVE [${tkt}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-sports-esports-academy-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏆 Global Sports AI Analytics, Esports Pro-Leagues, BAL & Youth Academies Hub (10NVD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Access AI match analytics, join Esports tournaments, sponsor Gatsibo/Kigali academies & buy VIP passes in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          10UD+ Sports & Esports Events · 10 Novemdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search sports, BAL, Esports & academies (e.g. Amahoro, Gatsibo, Esports, Cycling, BAL)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Global Sports, Esports & Academy Pillars (10UD+)</option>
          {SPORTS_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_EVENTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_EVENTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_EVENTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_EVENTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {events.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => activateSports(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏆 Join / Buy Pass
            </button>
          </div>
        ))}
      </div>

      {sptMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{sptMsg}</div>}
    </section>
  );
}
