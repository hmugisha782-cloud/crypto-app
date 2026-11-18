import { useState } from "react";

const LEAGUES = {
  "🇪🇸 LaLiga (Spain)": {
    teams: ["Real Madrid","FC Barcelona","Atlético Madrid","Athletic Bilbao","Real Sociedad","Villarreal CF","Real Betis","Sevilla FC","Valencia CF","Girona FC","Celta Vigo","CA Osasuna","RCD Mallorca","Rayo Vallecano","Getafe CF","RCD Espanyol","Deportivo Alavés","UD Las Palmas","CD Leganés","Real Valladolid"],
    fixtures: [["Real Madrid vs FC Barcelona",2.15,3.55,3.05],["Atlético Madrid vs Athletic Bilbao",1.95,3.40,3.80],["Real Sociedad vs Villarreal CF",2.25,3.30,3.10],["Real Betis vs Sevilla FC",2.30,3.25,3.05]],
  },
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League": {
    teams: ["Manchester City","Arsenal FC","Liverpool FC","Aston Villa","Tottenham Hotspur","Chelsea FC","Newcastle United","Manchester United","West Ham United","Crystal Palace","Brighton","AFC Bournemouth","Fulham FC","Wolves","Everton FC","Brentford FC","Nottingham Forest","Leicester City","Ipswich Town","Southampton FC"],
    fixtures: [["Manchester City vs Arsenal FC",2.10,3.50,3.25],["Liverpool FC vs Chelsea FC",1.85,3.75,3.90],["Tottenham Hotspur vs Manchester United",2.20,3.60,2.95],["Aston Villa vs Newcastle United",2.35,3.45,2.85]],
  },
  "🏆 Champions League": {
    teams: ["Real Madrid","Manchester City","Bayern Munich","Arsenal FC","Inter Milan","Paris Saint-Germain","FC Barcelona","Liverpool FC","Borussia Dortmund","Bayer Leverkusen","Atlético Madrid","AC Milan","Juventus","Atalanta BC","RB Leipzig","SL Benfica"],
    fixtures: [["Real Madrid vs Bayern Munich",2.15,3.60,3.10],["Manchester City vs Inter Milan",1.80,3.75,4.10],["FC Barcelona vs Paris Saint-Germain",2.20,3.55,2.95]],
  },
  "🇩🇪 Bundesliga": {
    teams: ["Bayern Munich","Bayer Leverkusen","Borussia Dortmund","RB Leipzig","VfB Stuttgart","Eintracht Frankfurt","VfL Wolfsburg","SC Freiburg","TSG Hoffenheim","Werder Bremen","FC Augsburg","Mainz 05","M'gladbach","Union Berlin","VfL Bochum","Heidenheim","St. Pauli","Holstein Kiel"],
    fixtures: [["Bayern Munich vs Borussia Dortmund",1.72,4.10,4.20],["Bayer Leverkusen vs RB Leipzig",2.00,3.65,3.40]],
  },
  "🇷🇼 Rwanda PL & CAF": {
    teams: ["APR FC","Rayon Sports FC","Police FC","AS Kigali","SC Kiyovu","Mukura VS","Marines FC","Musanze FC","Bugesera FC","Etincelles FC","Gasogi United","Gorilla FC","Amagaju FC","Sunrise FC","Rutsiro FC","Muhazi United"],
    fixtures: [["APR FC vs Rayon Sports FC",2.10,3.05,3.65],["Police FC vs AS Kigali",2.25,3.00,3.30],["SC Kiyovu vs Mukura VS",2.15,3.10,3.45]],
  },
};

const GAMES = [
  ["✈️","Aviator Crash","97.0% RTP",2.5],["🚀","Spaceman Turbo","96.8% RTP",3.2],
  ["🍭","Sweet Bonanza","96.5% RTP",5.0],["⚡","Gates of Olympus","96.5% RTP",4.5],
  ["🎡","Lightning Roulette","97.3% RTP",8.0],["🃏","VIP Blackjack","99.54% RTP",2.0],
  ["♠️","Texas Hold'em Poker","98.9% RTP",3.5],["💣","Mines & Plinko","98.0% RTP",4.0],
];

export default function InteractiveSportsAndGamesHub({ rates = {}, theme, panel }) {
  const [mode, setMode] = useState("football");
  const [league, setLeague] = useState("🇪🇸 LaLiga (Spain)");
  const [team, setTeam] = useState("");
  const [stakeRwf, setStakeRwf] = useState("5000");
  const [msg, setMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const cur = LEAGUES[league];

  function betMatch(m, pick, odd) {
    const st = Math.max(500, Number(stakeRwf) || 5000);
    const bOdd = Number((odd * 1.15).toFixed(2));
    const winRwf = Math.round(st * bOdd);
    setMsg(`✅ BET PLACED: ${m} [${pick} @ ${bOdd}x] · Stake: ${st.toLocaleString()} RWF → Payout: ${winRwf.toLocaleString()} RWF ($${(winRwf / rwfRate).toFixed(2)})`);
  }

  function playGame(icon, name, mult) {
    const st = Math.max(500, Number(stakeRwf) || 5000);
    const hit = Number((1.4 + Math.random() * mult).toFixed(2));
    const winRwf = Math.round(st * hit);
    setMsg(`🎉 ${icon} ${name}: Hit ${hit}x! Stake: ${st.toLocaleString()} RWF → Payout: ${winRwf.toLocaleString()} RWF ($${(winRwf / rwfRate).toFixed(2)})`);
  }

  return (
    <section id="interactive-sports-games" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚽ Interactive Football Leagues (All Clubs & Fixtures) & 🎰 VIP Casino Arena</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>Click any league (LaLiga, Premier League, Champions League, Bundesliga, Rwanda PL) to view all clubs & live odds, or play Casino!</p>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <input type="number" value={stakeRwf} onChange={(e) => setStakeRwf(e.target.value)} style={{ width: 90, padding: "6px 8px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }} />
          <button type="button" onClick={() => setMode("football")} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: mode === "football" ? "#06b6d4" : theme.input, color: mode === "football" ? "#02131d" : theme.text, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>⚽ Football Leagues</button>
          <button type="button" onClick={() => setMode("casino")} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: mode === "casino" ? "#f59e0b" : theme.input, color: mode === "casino" ? "#02131d" : theme.text, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>🎰 VIP Casino & Games</button>
        </div>
      </div>

      {mode === "football" && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.keys(LEAGUES).map((lg) => (
              <button key={lg} type="button" onClick={() => { setLeague(lg); setTeam(""); }} style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${league === lg ? "#06b6d4" : theme.border}`, background: league === lg ? "rgba(6,182,212,0.22)" : theme.input, color: league === lg ? "#38bdf8" : theme.text, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>{lg}</button>
            ))}
          </div>
          <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#38bdf8", marginBottom: 6 }}>🏟️ All {cur.teams.length} Clubs in {league}:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {cur.teams.map((t, i) => (
                <button key={t} type="button" onClick={() => setTeam((p) => (p === t ? "" : t))} style={{ padding: "4px 9px", borderRadius: 999, border: `1px solid ${team === t ? "#10b981" : theme.border}`, background: team === t ? "#10b981" : theme.card, color: team === t ? "#02131d" : theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>#{i + 1} {t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 8 }}>
            {cur.fixtures.filter(([m]) => !team || m.toLowerCase().includes(team.toLowerCase())).map(([m, o1, ox, o2]) => (
              <div key={m} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{m}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button type="button" onClick={() => betMatch(m, "Home 1", o1)} style={{ flex: 1, padding: "5px", borderRadius: 6, border: "1px solid #06b6d4", background: "rgba(6,182,212,0.15)", color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>1 · {o1}</button>
                  <button type="button" onClick={() => betMatch(m, "Draw X", ox)} style={{ flex: 1, padding: "5px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>X · {ox}</button>
                  <button type="button" onClick={() => betMatch(m, "Away 2", o2)} style={{ flex: 1, padding: "5px", borderRadius: 6, border: "1px solid #10b981", background: "rgba(16,185,129,0.15)", color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>2 · {o2}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "casino" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(215px, 1fr))", gap: 8 }}>
          {GAMES.map(([icon, name, rtp, mult]) => (
            <div key={name} style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><strong>{icon} {name}</strong><span style={{ fontSize: 10, color: "#fbbf24" }}>{rtp}</span></div>
              <button type="button" onClick={() => playGame(icon, name, mult)} style={{ padding: "7px", borderRadius: 7, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>▶ Play ({Number(stakeRwf).toLocaleString()} RWF)</button>
            </div>
          ))}
        </div>
      )}

      {msg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
    </section>
  );
}
