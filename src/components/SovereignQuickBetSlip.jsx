import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const FEATURED_MATCHES = [
  { id: "M1", league: "🇷🇼 Rwanda Premier League", match: "APR FC vs Rayon Sports", homeOdds: 2.10, drawOdds: 3.05, awayOdds: 3.65 },
  { id: "M2", league: "🇪🇸 Spain LaLiga", match: "Real Madrid vs FC Barcelona", homeOdds: 2.15, drawOdds: 3.55, awayOdds: 3.05 },
  { id: "M3", league: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England Premier League", match: "Manchester City vs Arsenal FC", homeOdds: 2.10, drawOdds: 3.50, awayOdds: 3.25 },
  { id: "M4", league: "🏆 UEFA Champions League", match: "Bayern Munich vs Paris SG", homeOdds: 2.05, drawOdds: 3.60, awayOdds: 3.35 },
];

export default function SovereignQuickBetSlip({ rates = {}, theme, panel }) {
  const [picks, setPicks] = useState([{ id: "M1", match: "APR FC vs Rayon Sports", pick: "1 (APR FC)", odds: 2.10 }]);
  const [stakeUsd, setStakeUsd] = useState("20");
  const [betMsg, setBetMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const totalOdds = picks.reduce((acc, p) => acc * p.odds, 1);
  const potentialUsd = Number((Number(stakeUsd || 0) * totalOdds).toFixed(2));

  function togglePick(m, label, odds) {
    setPicks((prev) => {
      const exists = prev.find((x) => x.id === m.id && x.pick === label);
      if (exists) return prev.filter((x) => x.id !== m.id);
      return [...prev.filter((x) => x.id !== m.id), { id: m.id, match: m.match, pick: label, odds }];
    });
  }

  function placeBetSlip() {
    if (picks.length === 0) return;
    const amt = Math.max(1, Number(stakeUsd || 0));
    const { tx } = recordSovereignTx({
      hub: "150-Nation Sportsbook",
      title: `Multi-Bet (${picks.length}x @ ${totalOdds.toFixed(2)} odds) · Est. Win $${potentialUsd}`,
      amountUsd: amt,
      rwfRate,
      type: "DEBIT",
    });
    setBetMsg(`🎟️ BET SLIP CONFIRMED [${tx.id}]: ${picks.length} Selections · Total Odds ${totalOdds.toFixed(2)}x · Potential Payout: $${potentialUsd.toLocaleString()} USD (${Math.round(potentialUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-quick-bet-slip" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>⚽ Express Multi-Bet Slip & Instant Payout Calculator (RWF & USDT)</strong>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#34d399" }}>Combined Odds: {totalOdds.toFixed(2)}x · Potential Win: ${potentialUsd.toLocaleString()} ({Math.round(potentialUsd * rwfRate).toLocaleString()} RWF)</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 8 }}>
        {FEATURED_MATCHES.map((m) => (
          <div key={m.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 6 }}>
            <span style={{ fontSize: 10.5, color: theme.muted, fontWeight: 700 }}>{m.league}</span>
            <strong style={{ fontSize: 12 }}>{m.match}</strong>
            <div style={{ display: "flex", gap: 5 }}>
              {[
                { lbl: `1 (${m.homeOdds})`, odd: m.homeOdds },
                { lbl: `X (${m.drawOdds})`, odd: m.drawOdds },
                { lbl: `2 (${m.awayOdds})`, odd: m.awayOdds },
              ].map((b) => {
                const active = picks.some((p) => p.id === m.id && p.pick === b.lbl);
                return (
                  <button
                    key={b.lbl}
                    type="button"
                    onClick={() => togglePick(m, b.lbl, b.odd)}
                    style={{
                      flex: 1,
                      padding: "5px 6px",
                      borderRadius: 6,
                      border: active ? "1px solid #10b981" : `1px solid ${theme.border}`,
                      background: active ? "#10b981" : "transparent",
                      color: active ? "#02131d" : theme.text,
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {b.lbl}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" min="1" value={stakeUsd} onChange={(e) => setStakeUsd(e.target.value)} style={{ width: 110, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={placeBetSlip} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🎟️ Place Bet Ticket (${stakeUsd} USD / {Math.round(Number(stakeUsd || 0) * rwfRate).toLocaleString()} RWF)
        </button>
      </div>

      {betMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{betMsg}</div>}
    </section>
  );
}
