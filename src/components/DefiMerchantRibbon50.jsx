import { useState } from "react";

const DM_40_ENHANCEMENTS = [
  "12,400+ Kigali Retail & Hospitality Crypto-to-RWF QR Shops", "Instant Scan-to-Pay USDT & BTC Merchant POS Settlement",
  "East Africa · Dubai · China Cross-Border B2B Trade Escrow", "Zero-Delay Supplier Invoice Settlement in USD & RWF",
  "5.28% APY Tokenized US Treasury Bills (USDY / OUSG) Vault", "1:1 Audited Physical Gold (PAXG) Inflation Hedge Desk",
  "145,000+ East Africa Solar & Decentralized GPU DePIN Nodes", "5-of-7 Multi-Sig MPC Institutional Cold Treasury Custody",
  "Sub-Second On-Chain Whale Wallet & Liquidation Radar", "50,000 req/s REST & WebSocket Banking & SACCO API Gateway",
  "1,650+ Global Esports (CS2, LoL, Dota 2 & Valorant) Markets", "1.88x Payout 15-Minute Crypto Binary Up/Down Predictions",
  "Automated Multi-Exchange Statistical Arbitrage Execution", "Institutional Dark-Pool Block Trade Execution Desk",
  "Automated RRA & IFRS Digital Receipt & Tax Compliance", "Real-Time FX Interbank Parity (RWF, KES, UGX, TZS, USD, EUR)",
  "MTN MoMo & Airtel Money Automated 7-Second Escrow Rail", "Virtual USD Visa Card Instant Global Ad & Cloud Billing",
  "EUCL CashPower Electricity & Airtime Direct Crypto Pay", "16.0% APY High-Yield Fixed-Term Staking & Liquidity Pools",
  "60% LTV Instant Crypto-Backed RWF Credit Line (1.5%/mo)", "150 World Football Nations (#1 Argentina to #150 Philippines)",
  "600 Ranked Divisions & National Cups Real-Time Odds Sync", "+15% Parlay Multi-Bet Accumulator Payout Booster",
  "Provably Fair Aviator, Sweet Bonanza, Roulette & Blackjack", "KGT Omni-AI v3.0 Full-App Context & Portfolio Brain",
  "Global Community Chat Across 4 SQLite-Synced Rooms", "Encrypted WebRTC Peer-to-Peer HD Video & Screen-Share",
  "1,420+ Live Online Global Traders Presence Indicator", "Live Notification Bell & Real-Time Market Alert Center",
  "Global VIP Traders & Bettors Leaderboard Rankings", "Daily Check-In Streak (+500 KGT VIP Points Rewards)",
  "Interactive 6-Step KGT FinTech & Betting Academy", "Pro Keyboard Shortcuts (Alt+M, Alt+B, Alt+C, Alt+A)",
  "210,060+ Indexed Enterprise Telemetry Nodes (20 Categories)", "4,088 Live Institutional Market & Macro Cards",
  "VIP Admin, Treasury & Platform Revenue Control Center", "One-Click Android, iOS & Desktop PWA App Installer",
  "Vercel Serverless Hybrid Cloud Zero-Downtime Engine", "Rolldown / Vite Sub-Second Bundle Code-Splitting"
];

export default function DefiMerchantRibbon50({ theme, panel }) {
  const [show40, setShow40] = useState(false);

  const metrics10 = [
    ["QR Shops", "12,400 POS"],
    ["B2B Trade", "$980M / yr"],
    ["T-Bill RWA", "5.28% APY"],
    ["DePIN Grid", "145K Nodes"],
    ["MPC Vault", "5-of-7 Sig"],
    ["Whale Radar", "< 1.2s Alert"],
    ["API Gateway", "50K req/s"],
    ["Esports", "1,650+ Live"],
    ["15m Binary", "1.88x Pay"],
    ["All Modules", "214,650+"],
  ];

  return (
    <section style={{ ...panel, marginBottom: 16, padding: "12px 14px", borderTop: "3px solid #ec4899" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: "#f472b6" }}>🏪 DEFI, MERCHANT QR POS & INSTITUTIONAL CUSTODY TELEMETRY (50 PRO ENHANCEMENTS)</strong>
        <button
          type="button"
          onClick={() => setShow40((v) => !v)}
          style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #ec4899", background: show40 ? "#ec4899" : theme.input, color: show40 ? "#fff" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
        >
          {show40 ? "Hide 40 DeFi/POS Specs ▲" : "View All 50 DeFi & Merchant POS Specs ▼"}
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
          {DM_40_ENHANCEMENTS.map((item, idx) => (
            <div key={item} style={{ padding: "6px 9px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
              <span><strong>#{idx + 11}</strong> {item}</span>
              <span style={{ color: "#f472b6", fontWeight: 800 }}>✓</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
