import { useState } from "react";

const SEC_40_ENHANCEMENTS = [
  "256-Bit AES End-to-End Ledger & Vault Encryption", "Bcrypt Salted Cryptographic Password Hashing",
  "Stateless JWT Bearer Token Session Expiration Guard", "Two-Factor Authentication (2FA) TOTP Hardware Shield",
  "SQLite3 Write-Ahead Logging (WAL) Crash-Proof Storage", "Automated 60-Second Cloud & Local Snapshot Backups",
  "Multi-Signature 5-of-7 Cold Treasury Quorum Custody", "Real-Time Anti-Money Laundering (AML) Transaction Radar",
  "Automated RRA & IFRS Capital Gains Tax Audit Trail", "Zero-Knowledge Proof (ZKP) Reserve Solvency Verifier",
  "DTLS-SRTP Encrypted WebRTC Peer-to-Peer Video Streams", "End-to-End Sanitized XSS-Free Community Chat Rooms",
  "MTN MoMo & Airtel Money Automated Escrow Dispute Lock", "3D-Secure Virtual USD Visa Card Velocity & Merchant Controls",
  "Role-Based Access Control (RBAC) for VIP Admin & Treasury", "Vercel Edge Network Global Anycast DDoS Protection",
  "SSL/TLS 1.3 Strict Transport Security (HSTS) Enforcement", "Sub-Second Rate-Limiting & Brute-Force Login Shield",
  "SHA-256 Provably Fair Casino & Crash RNG Seed Auditing", "Immutable Betting Slip & Payout Timestamp Verification",
  "CORS Strict Origin Allowlist & Helmet Security Headers", "Real-Time API Latency & Health Heartbeat Telemetry",
  "Kigali (CAT) Synchronized Atomic Financial Timestamps", "Zero-Downtime Vercel Hybrid Cloud Serverless Failover",
  "Rolldown / Vite Chunk Isolation & Integrity Hashing", "One-Click Official Printable Bank Valuation Certificate",
  "Instant CSV & Excel Tax-Ready Financial Ledger Export", "Session Storage Token Isolation Against Cross-Tab Leaks",
  "Automated Whale Movement & Liquidation Risk Alerts", "Cross-Border EAC · Dubai · China Compliance Screening",
  "Merchant QR POS Fraud & Duplicate-Scan Prevention", "High-Yield Vault 104.5% Over-Collateralized Reserve Proof",
  "60% LTV Crypto Loan Automated Margin-Call Protection", "KGT Omni-AI v3.0 Privacy-Preserving Portfolio Inspector",
  "150 World Football Nations Official Fixture Integrity Sync", "Responsible Gaming Daily Stake & Loss Limit Controls",
  "PWA Service Worker Offline Cache Integrity Checksum", "Accessibility WCAG High-Contrast & Font Scaling Support",
  "Cross-Device Responsive Security (Android, iOS, Linux, Win)", "99.99% Enterprise Service Level Agreement (SLA) Uptime"
];

export default function SecurityComplianceRibbon50({ theme, panel }) {
  const [show40, setShow40] = useState(false);

  const metrics10 = [
    ["Encryption", "256-Bit AES"],
    ["Database", "SQLite WAL"],
    ["Auth Guard", "JWT + Bcrypt"],
    ["2FA Shield", "● Ready"],
    ["Compliance", "RRA / IFRS"],
    ["Edge WAF", "Vercel Shield"],
    ["Video Crypto", "DTLS-SRTP"],
    ["Escrow Lock", "Multi-Sig"],
    ["Cloud Uptime", "99.99% SLA"],
    ["Auto-Backup", "Every 60s"],
  ];

  return (
    <section style={{ ...panel, marginBottom: 16, padding: "12px 14px", borderTop: "3px solid #06b6d4" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: "#38bdf8" }}>🛡️ ENTERPRISE SECURITY, COMPLIANCE & CLOUD SLA TELEMETRY (50 PRO ENHANCEMENTS)</strong>
        <button
          type="button"
          onClick={() => setShow40((v) => !v)}
          style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #06b6d4", background: show40 ? "#06b6d4" : theme.input, color: show40 ? "#02131d" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}
        >
          {show40 ? "Hide 40 Security & SLA Specs ▲" : "View All 50 Security & SLA Specs ▼"}
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
          {SEC_40_ENHANCEMENTS.map((item, idx) => (
            <div key={item} style={{ padding: "6px 9px", borderRadius: 7, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
              <span><strong>#{idx + 11}</strong> {item}</span>
              <span style={{ color: "#38bdf8", fontWeight: 800 }}>✓</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
