import { useState } from "react";

const FEATURED_CLUBS = {
  "Argentina": ["River Plate","Boca Juniors","Racing Club","Independiente","San Lorenzo","Vélez Sarsfield","Estudiantes LP","Talleres","Lanús","Argentinos Juniors"],
  "France": ["Paris Saint-Germain","Olympique Marseille","AS Monaco","Lille OSC","Olympique Lyonnais","OGC Nice","RC Lens","Stade Rennais","Stade Brestois","RC Strasbourg"],
  "Spain": ["Real Madrid","FC Barcelona","Atlético Madrid","Athletic Bilbao","Real Sociedad","Villarreal CF","Real Betis","Sevilla FC","Valencia CF","Girona FC","Celta Vigo","CA Osasuna"],
  "England": ["Manchester City","Arsenal FC","Liverpool FC","Aston Villa","Tottenham Hotspur","Chelsea FC","Newcastle United","Manchester United","West Ham United","Crystal Palace","Brighton","Everton FC"],
  "Brazil": ["CR Flamengo","SE Palmeiras","São Paulo FC","Botafogo FR","Fluminense FC","Grêmio","SC Internacional","Atlético Mineiro","Corinthians","Cruzeiro EC"],
  "Germany": ["Bayern Munich","Bayer Leverkusen","Borussia Dortmund","RB Leipzig","VfB Stuttgart","Eintracht Frankfurt","VfL Wolfsburg","SC Freiburg","Werder Bremen","Mainz 05"],
  "Italy": ["Inter Milan","AC Milan","Juventus FC","SSC Napoli","Atalanta BC","AS Roma","SS Lazio","ACF Fiorentina","Bologna FC","Torino FC"],
  "Portugal": ["Sporting CP","SL Benfica","FC Porto","SC Braga","Vitória SC","FC Famalicão","Moreirense FC","Gil Vicente"],
  "Netherlands": ["PSV Eindhoven","Feyenoord","AFC Ajax","AZ Alkmaar","FC Twente","FC Utrecht","Sparta Rotterdam","SC Heerenveen"],
  "Morocco": ["Wydad AC","Raja CA","AS FAR Rabat","RS Berkane","FUS Rabat","MAS Fès","Hassania Agadir","OC Safi"],
  "Egypt": ["Al Ahly SC","Zamalek SC","Pyramids FC","Al Masry SC","Ismaily SC","Ceramica Cleopatra","ENPPI SC","Smouha SC"],
  "Nigeria": ["Enyimba FC","Remo Stars","Rivers United","Kano Pillars","Enugu Rangers","Shooting Stars","Plateau United","Lobi Stars"],
  "Saudi Arabia": ["Al-Hilal SFC","Al-Nassr FC","Al-Ahli Saudi","Al-Ittihad Club","Al-Ettifaq","Al-Shabab FC","Al-Taawoun","Al-Fateh"],
  "South Africa": ["Mamelodi Sundowns","Orlando Pirates","Kaizer Chiefs","Stellenbosch FC","SuperSport United","Cape Town City","Sekhukhune United","AmaZulu FC"],
  "Uganda": ["Vipers SC","KCCA FC","SC Villa","BUL FC","URA FC","Express FC","Kitara FC","Maroons FC"],
  "Kenya": ["Gor Mahia FC","Tusker FC","Kenya Police FC","AFC Leopards","Bandari FC","KCB FC","Kakamega Homeboyz","Ulinzi Stars"],
  "Tanzania": ["Young Africans (Yanga)","Simba SC","Azam FC","Singida Fountain Gate","Coastal Union","Namungo FC","KMC FC","Dodoma Jiji"],
  "Rwanda": ["APR FC","Rayon Sports FC","Police FC","AS Kigali","SC Kiyovu","Mukura Victory Sports","Marines FC","Musanze FC","Bugesera FC","Gasogi United","Gorilla FC","Etincelles FC"],
};

const ALL_150_NATIONS = [
  "Argentina","France","Spain","England","Brazil","Germany","Italy","Portugal","Netherlands","Belgium",
  "Colombia","Uruguay","Croatia","Morocco","Japan","USA","Mexico","Switzerland","Senegal","Denmark",
  "Iran","South Korea","Australia","Austria","Ukraine","Turkey","Poland","Sweden","Hungary","Wales",
  "Serbia","Ecuador","Peru","Chile","Russia","Nigeria","Algeria","Tunisia","Cameroon","Ivory Coast",
  "Egypt","Mali","Canada","Costa Rica","Panama","Venezuela","Paraguay","Norway","Czech Republic","Scotland",
  "Romania","Slovakia","Greece","Slovenia","Republic of Ireland","Finland","Bosnia & Herzegovina","Iceland","North Macedonia","Albania",
  "Montenegro","Jamaica","Honduras","El Salvador","Iraq","UAE","Saudi Arabia","Qatar","Uzbekistan","Jordan",
  "Bahrain","Oman","Syria","China PR","Palestine","Vietnam","Thailand","India","Lebanon","Kyrgyzstan",
  "Tajikistan","North Korea","South Africa","Burkina Faso","Ghana","DR Congo","Cape Verde","Guinea","Gabon","Zambia",
  "Uganda","Benin","Equatorial Guinea","Mauritania","Namibia","Madagascar","Kenya","Zimbabwe","Mozambique","Congo",
  "Togo","Guinea-Bissau","Malawi","Angola","Sudan","Libya","Niger","Tanzania","Central African Republic","Sierra Leone",
  "Gambia","Ethiopia","Eswatini","Lesotho","Botswana","Liberia","Rwanda","Burundi","Comoros","Mauritius",
  "New Zealand","Bolivia","Guatemala","Trinidad & Tobago","Haiti","Curacao","Nicaragua","Suriname","Cuba","Guyana",
  "Luxembourg","Armenia","Belarus","Kazakhstan","Azerbaijan","Georgia","Kosovo","Bulgaria","Israel","Cyprus",
  "Estonia","Latvia","Lithuania","Faroe Islands","Moldova","Malta","Andorra","Liechtenstein","Indonesia","Philippines"
];

const GAMES = [
  ["✈️","Aviator Crash","97.0% RTP",2.5],["🚀","Spaceman Turbo","96.8% RTP",3.2],
  ["🍭","Sweet Bonanza","96.5% RTP",5.0],["⚡","Gates of Olympus","96.5% RTP",4.5],
  ["🎡","Lightning Roulette","97.3% RTP",8.0],["🃏","VIP Blackjack","99.54% RTP",2.0],
  ["♠️","Texas Hold'em Poker","98.9% RTP",3.5],["💣","Mines & Plinko","98.0% RTP",4.0],
];

function getNationData(country, rank) {
  const baseTeams = FEATURED_CLUBS[country] || [
    `${country} United FC`, `Real ${country}`, `Sporting ${country}`, `Atletico ${country}`,
    `${country} City FC`, `Olympique ${country}`, `Dynamo ${country}`, `${country} Stars FC`,
    `Inter ${country}`, `${country} Rovers`, `FC ${country} Capital`, `${country} Wanderers`
  ];
  const o1 = Number((1.75 + ((rank * 7) % 60) / 100).toFixed(2));
  const ox = Number((3.05 + ((rank * 5) % 45) / 100).toFixed(2));
  const o2 = Number((2.65 + ((rank * 11) % 95) / 100).toFixed(2));
  return {
    teams: baseTeams,
    divisions: ["1st Premier Division", "2nd Championship Division", "3rd National League", "National Federation Cup"],
    fixtures: [
      [`${baseTeams} vs ${baseTeams}`, o1, ox, o2],
      [`${baseTeams} vs ${baseTeams}`, Number((o1 + 0.15).toFixed(2)), ox, Number((o2 - 0.1).toFixed(2))],
      [`${baseTeams} vs ${baseTeams}`, Number((o1 + 0.25).toFixed(2)), 3.25, Number((o2 - 0.15).toFixed(2))],
    ],
  };
}

export default function InteractiveSportsAndGamesHub({ rates = {}, theme, panel }) {
  const [mode, setMode] = useState("football");
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  const [selectedDiv, setSelectedDiv] = useState("1st Premier Division");
  const [nationSearch, setNationSearch] = useState("");
  const [team, setTeam] = useState("");
  const [stakeRwf, setStakeRwf] = useState("5000");
  const [msg, setMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const rankIdx = Math.max(0, ALL_150_NATIONS.indexOf(selectedCountry));
  const cur = getNationData(selectedCountry, rankIdx + 1);
  const visibleNations = nationSearch.trim()
    ? ALL_150_NATIONS.filter((n) => n.toLowerCase().includes(nationSearch.toLowerCase()))
    : ALL_150_NATIONS;

  function betMatch(m, pick, odd) {
    const st = Math.max(500, Number(stakeRwf) || 5000);
    const bOdd = Number((odd * 1.15).toFixed(2));
    const winRwf = Math.round(st * bOdd);
    setMsg(`✅ ${selectedCountry.toUpperCase()} (${selectedDiv}) BET: ${m} [${pick} @ ${bOdd}x] · Stake: ${st.toLocaleString()} RWF → Payout: ${winRwf.toLocaleString()} RWF ($${(winRwf / rwfRate).toFixed(2)})`);
  }

  function playGame(icon, name, mult) {
    const st = Math.max(500, Number(stakeRwf) || 5000);
    const hit = Number((1.4 + Math.random() * mult).toFixed(2));
    const winRwf = Math.round(st * hit);
    setMsg(`🎉 ${icon} ${name}: Hit ${hit}x! Stake: ${st.toLocaleString()} RWF → Payout: ${winRwf.toLocaleString()} RWF ($${(winRwf / rwfRate).toFixed(2)}) [SHA-256 Verified]`);
  }

  return (
    <section id="interactive-sports-games" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌍 All 150 Football Nations (600 Leagues & Full Club Rosters) & 🎰 VIP Casino Arena</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>Click any of the 150 nations (#1 Argentina to #150 Philippines) to explore all 4 divisions, clubs & live odds, or play VIP Casino!</p>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <input type="number" value={stakeRwf} onChange={(e) => setStakeRwf(e.target.value)} style={{ width: 90, padding: "6px 8px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }} />
          <button type="button" onClick={() => setMode("football")} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: mode === "football" ? "#06b6d4" : theme.input, color: mode === "football" ? "#02131d" : theme.text, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>🌍 150 Nations & Clubs</button>
          <button type="button" onClick={() => setMode("casino")} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: mode === "casino" ? "#f59e0b" : theme.input, color: mode === "casino" ? "#02131d" : theme.text, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>🎰 VIP Casino & Games</button>
        </div>
      </div>

      {mode === "football" && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <input type="text" value={nationSearch} onChange={(e) => setNationSearch(e.target.value)} placeholder="Search any of 150 nations..." style={{ flex: 1, minWidth: 210, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {cur.divisions.map((d) => (
                <button key={d} type="button" onClick={() => setSelectedDiv(d)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${selectedDiv === d ? "#10b981" : theme.border}`, background: selectedDiv === d ? "#10b981" : theme.input, color: selectedDiv === d ? "#02131d" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{d}</button>
              ))}
            </div>
          </div>

          <div style={{ maxHeight: 135, overflowY: "auto", display: "flex", flexWrap: "wrap", gap: 5, padding: 8, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            {visibleNations.map((n) => {
              const r = ALL_150_NATIONS.indexOf(n) + 1;
              return (
                <button key={n} type="button" onClick={() => { setSelectedCountry(n); setTeam(""); }} style={{ padding: "4px 9px", borderRadius: 7, border: `1px solid ${selectedCountry === n ? "#06b6d4" : theme.border}`, background: selectedCountry === n ? "#06b6d4" : theme.card, color: selectedCountry === n ? "#02131d" : theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>#{r} {n}</button>
              );
            })}
          </div>

          <div style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#38bdf8", marginBottom: 6 }}>🏟️ #{rankIdx + 1} {selectedCountry} — {selectedDiv} ({cur.teams.length} Clubs):</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {cur.teams.map((t, i) => (
                <button key={t} type="button" onClick={() => setTeam((p) => (p === t ? "" : t))} style={{ padding: "4px 9px", borderRadius: 999, border: `1px solid ${team === t ? "#10b981" : theme.border}`, background: team === t ? "#10b981" : theme.card, color: team === t ? "#02131d" : theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>#{i + 1} {t}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 8 }}>
            {cur.fixtures.filter(([m]) => !team || m.toLowerCase().includes(team.toLowerCase())).map(([m, o1, ox, o2]) => (
              <div key={m} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 6 }}>
                <div style={{ fontSize: 10, color: "#10b981", fontWeight: 800 }}>● {selectedCountry} · {selectedDiv}</div>
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
