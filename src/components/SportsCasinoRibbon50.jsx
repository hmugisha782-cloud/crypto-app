import { useState } from "react";

const SC_40_ENHANCEMENTS = [
  "150 World Football Nations (#1 Argentina to #150 Philippines)", "600 Ranked Divisions & National Cups Real-Time Sync",
  "LaLiga EA Sports, Hypermotion & Copa del Rey Full Markets", "Premier League, EFL Championship, League One & FA Cup",
  "Bundesliga, 2. Bundesliga, 3. Liga & DFB-Pokal Live Odds", "Serie A, Serie B, Ligue 1 & Rwanda Premier League",
  "Instant 1 / X / 2 Match Winner & Draw No Bet Pricing", "+15% Parlay Multi-Bet Accumulator Payout Booster",
  "Sub-Second Live Odds Suspension & Goal Alert Guard", "Dual-Currency Betting Slip (RWF & USDT Instant Toggle)",
  "Aviator Crash SHA-256 Provably Fair Seed Verification", "Spaceman & JetX Turbo Multiplier Auto-Cashout Logic",
  "Sweet Bonanza 21,100x Tumble & Free Spins Telemetry", "Gates of Olympus 500x Zeus Multiplier Tracker",
  "Lightning Roulette 500x Evolution RNG Live Stream", "VIP Live Blackjack 99.54% Optimal Payout Engine",
  "Texas Hold'em High-Stakes Poker Table Analytics", "Plinko & Mines Provably Fair Risk Level Selector",
  "Crazy Time & Monopoly Live 3D Bonus Round Odds", "Mega Moolah Progressive Jackpot & US Powerball",
  "NBA, EuroLeague, NFL, UFC, Boxing & Formula 1 Markets", "Global Esports (CS2, LoL, Dota 2 & Valorant) Live Odds",
  "24/7 Virtual Football, Greyhounds & Horse Racing", "One-Click Bet Slip Receipt & SQLite Ledger Sync",
  "Instant MTN MoMo & Airtel Money Winnings Withdrawal", "Zero-Fee USDT TRC20/ERC20 Casino Treasury Payouts",
  "Responsible Gaming Stake Limiter & Session Timer", "Live Expected Goals (xG) & Team Form Probability",
  "Both Teams To Score (BTTS) & Over/Under 2.5 Analytics", "Asian Handicap & Correct Score Precision Matrices",
  "VIP High-Roller Loyalty Cashback (+5% Weekly Rebate)", "KGT Omni-AI v3.0 Match & RTP Odds Advisor",
  "Global Sports & Casino Predictions Community Chat Room", "Live Match Watch-Party WebRTC Video Lounge",
  "210,060+ Indexed Enterprise Telemetry Nodes Sync", "4,088 Live Sports, Casino & Macro Intelligence Cards",
  "Vercel Serverless Hybrid Cloud Zero-Downtime Engine", "Rolldown / Vite Sub-Second Bundle Code-Splitting",
  "Luxury FinTech Glassmorphism & Hover Micro-Animations", "One-Click Android, iOS & Desktop PWA App Install"
];

export default function SportsCasinoRibbon50({ theme, panel }) {
  const [show40, setShow40] = useState(false);

  const metrics10 = [
    ["Football Nations", "150 Ranked"],
    ["Leagues & Cups", "600 Live"],
    ["Odds Latency", "8 ms Sync"],
    ["Aviator RTP", "97.0% Fair"],
    ["Blackjack RTP", "99.54%"],
    ["Parlay Boost", "+15% Bonus"],
    ["24h Handle", "$4.82M"],
    ["Payout Speed", "< 10 Sec"],
    ["Top Jackpot", "$250,000"],
    ["RNG Audit", "✓ SHA-256"],
  ];

  return (
    <section style={{ ...panel, marginBottom: 16, padding: "12px 14px", borderTop: "3px solid #f59e0b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: "#fbbf24" }}>🏆 LIVE SPORTSBOOK, 150 NATIONS & VIP CASINO TELEMETRY (50 PRO ENHANCEMENTS)</strong>
        <button
          type="button"
          onClick={() => setShow40((v) => !v)}
          style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #f59e0b", background: show40 ? "#f59e0b" : theme.input, color: show40 ? "#02131d" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
        >
          {show40 ? "Hide 40 Sports/Casino Specs ▲" : "View All 50 Sports & Casino Specs ▼"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))", gap: 6 }}>
        {metrics10.map(([k, v]) => (
          <div key={k} style={{ padding: "6px 8px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 10, color: theme.muted }}>{k}</div>
            <div style={{ fontSize: 12, fontWeight: 800 }}>{v}</div>
          </div>
        ))}
      </div>

      {show40 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 6, marginTop: 10 }}>
          {SC_40_ENHANCEMENTS.map((item, idx) => (
            <div key={item} style={{ padding: "6px 9px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
              <span><strong>#{idx + 11}</strong> {item}</span>
              <span style={{ color: "#fbbf24", fontWeight: 800 }}>✓</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
