import { useState } from "react";

const FA_40_ENHANCEMENTS = [
  "MTN MoMo Rwanda Instant Buy & Sell Crypto Settlement", "Airtel Money Rwanda Zero-Delay Automated Escrow",
  "Kenya M-Pesa (KES), Uganda (UGX) & Tanzania (TZS) Rails", "0.8% Low-Fee P2P Dispute-Free Merchant Protection",
  "Virtual USD Visa Card Instant Global Online Issuer", "3D-Secure International Card Freeze & Spending Limits",
  "EUCL CashPower Electricity Token Instant Crypto Pay", "MTN & Airtel Direct Airtime & Data Bundle Top-Up",
  "16.0% APY Fixed-Term USDT & RWF Yield Savings Vaults", "60% LTV Instant Crypto-Backed RWF Credit Line (1.5%/mo)",
  "Automated Capital Gains Tax & RRA/IFRS CSV Export", "Cross-Border EAC · Dubai · China B2B Supplier Escrow",
  "Merchant POS & Scan-to-Pay QR Retail Settlement", "KGT Omni-AI v3.0 Full-App Real-Time Context Memory",
  "Omni-AI Live USD ↔ RWF/KES/UGX/TZS Math Converter", "Omni-AI Private SQLite Portfolio & Bet Slip Auditor",
  "Omni-AI Algorithmic Entry, Take-Profit & Stop-Loss Signals", "Global Community Chat Across 4 SQLite-Synced Rooms",
  "Real-Time Quick Reactions & Live BTC/RWF Price Sharing", "Encrypted WebRTC Peer-to-Peer HD Video Conferencing",
  "One-Click Browser Screen-Sharing & Audio/Cam Controls", "1,420+ Live Online Global Traders Presence Indicator",
  "Live Notification Bell & Real-Time Market Alert Center", "Global VIP Traders & Bettors Leaderboard Rankings",
  "Daily Check-In Streak (+500 KGT VIP Points Rewards)", "Interactive 6-Step KGT FinTech & Betting Academy",
  "Pro Keyboard Shortcuts (Alt+M, Alt+B, Alt+C, Alt+A)", "Instant Autocomplete Search Across All App Sections",
  "210,060+ Indexed Enterprise Telemetry Nodes (20 Categories)", "4,088 Live Institutional Market & Macro Cards",
  "VIP Admin, Treasury & Platform Revenue Control Center", "One-Click Android, iOS & Desktop PWA App Installer",
  "WhatsApp & Referral Link 15% Commission Share Hub", "Vercel Serverless Hybrid Cloud Offline Resilience",
  "Rolldown / Vite Sub-Second Bundle Code-Splitting", "SQLite3 WAL Mode Persistence Across 45+ Tables",
  "JWT & Bcrypt Encrypted Session & Password Security", "Official Printable Bank Valuation & Audit Certificate",
  "Kigali (CAT) Real-Time Clock & Accessibility Text Scaling", "Luxury FinTech Glassmorphism & Smooth Micro-Animations"
];

export default function FintechAiRibbon50({ theme, panel }) {
  const [show40, setShow40] = useState(false);

  const metrics10 = [
    ["MoMo Speed", "7 Seconds"],
    ["P2P Fee", "0.8% Low"],
    ["USD Visa", "● Active"],
    ["CashPower", "24/7 Live"],
    ["Vault APY", "Up to 16%"],
    ["RWF Loan", "60% LTV"],
    ["WebRTC Video", "14 ms HD"],
    ["Online Users", "1,420+ Live"],
    ["Omni-AI", "v3.0 Brain"],
    ["Encryption", "256-Bit AES"],
  ];

  return (
    <section style={{ ...panel, marginBottom: 16, padding: "12px 14px", borderTop: "3px solid #8b5cf6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: "#c4b5fd" }}>🤖 RWANDA FINTECH, WEBRTC VIDEO & OMNI-AI TELEMETRY (50 PRO ENHANCEMENTS)</strong>
        <button
          type="button"
          onClick={() => setShow40((v) => !v)}
          style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #8b5cf6", background: show40 ? "#8b5cf6" : theme.input, color: show40 ? "#fff" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
        >
          {show40 ? "Hide 40 FinTech/AI Specs ▲" : "View All 50 FinTech, Video & AI Specs ▼"}
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
          {FA_40_ENHANCEMENTS.map((item, idx) => (
            <div key={item} style={{ padding: "6px 9px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
              <span><strong>#{idx + 11}</strong> {item}</span>
              <span style={{ color: "#c4b5fd", fontWeight: 800 }}>✓</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
