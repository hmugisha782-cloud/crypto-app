import { useState, useMemo } from "react";

const DIRECTORY_MODULES = [
  { id: "sovereign-kyc-identity-passport", icon: "🪪", name: "NIDA / Passport Tier-3 KYC Credential", cat: "Identity" },
  { id: "sovereign-vip-loyalty-card", icon: "👑", name: "Sovereign Diamond VIP Card & 4.5% Cashback", cat: "VIP" },
  { id: "sovereign-collateral-loan-desk", icon: "🏦", name: "Instant BTC/Gold-Backed Cash Loans (4.9% APR)", cat: "Credit" },
  { id: "sovereign-auto-invest-dca-engine", icon: "🤖", name: "Auto-Invest DCA & Recurring Wealth Bots", cat: "Automation" },
  { id: "sovereign-rwanda-tax-ebm-calculator", icon: "🧾", name: "Rwanda RRA EBM v2.1 VAT Invoice Signer", cat: "Tax" },
  { id: "sovereign-multisig-treasury-vault", icon: "🏛️", name: "SACCO & Corporate 3-of-3 Multi-Sig Vault", cat: "Governance" },
  { id: "sovereign-referral-partner-engine", icon: "🤝", name: "25% Lifetime Partner Referral Commission", cat: "Partners" },
  { id: "sovereign-dao-governance-hub", icon: "🗳️", name: "Sovereign DAO Quadratic Voting Portal", cat: "Governance" },
  { id: "sovereign-developer-api-portal", icon: "⚡", name: "Enterprise REST & WebSocket API Keys", cat: "Developers" },
  { id: "sovereign-system-health-monitor", icon: "📡", name: "Global 6-Region 99.999% SLA Edge Monitor", cat: "Infrastructure" },
  { id: "sovereign-master-wallet-bar", icon: "💳", name: "Unified Sovereign Wallet, Withdraw & P2P", cat: "Finance" },
  { id: "sovereign-portfolio-analytics", icon: "💎", name: "Net-Worth & Portfolio Wealth Analytics", cat: "Finance" },
  { id: "sovereign-live-charts-hub", icon: "📊", name: "Live Interactive BTC / Gold / RWF Charts", cat: "Trading" },
  { id: "sovereign-p2p-orderbook-hub", icon: "🤝", name: "Rwanda & EAC P2P MoMo/BK Orderbook", cat: "P2P" },
  { id: "sovereign-qr-payment-hub", icon: "📲", name: "QR SoftPOS Scan-to-Pay & Instant Invoice", cat: "Payments" },
  { id: "sovereign-fx-converter-bar", icon: "💱", name: "BNR & Global Multi-Currency FX Converter", cat: "Finance" },
  { id: "sovereign-spot-futures-engine", icon: "📈", name: "Spot & Futures Crypto / Gold Trading Desk", cat: "Trading" },
  { id: "sovereign-quick-bet-slip", icon: "⚽", name: "Express Multi-Bet Slip & Instant Payout", cat: "Sports" },
  { id: "sovereign-omni-ai-copilot", icon: "🤖", name: "KGT Omni-AI v4.0 Kinyarwanda/English Copilot", cat: "AI" },
  { id: "sovereign-security-pin-vault", icon: "🔐", name: "Biometric PIN Lock & 2FA Anti-Fraud Vault", cat: "Security" },
  { id: "omni-global-mining-minerals-hub", icon: "⛏️", name: "Rwanda 3Ts Minerals, 999.9 Gold & EV Lithium", cat: "Commodities" },
  { id: "omni-parametric-insurance-pension-hub", icon: "🛡️", name: "Satellite Crop Insurance, Health & Pension", cat: "Insurance" },
  { id: "omni-global-publishing-research-hub", icon: "📚", name: "Kinyarwanda AI Audiobooks, Books & Research", cat: "Knowledge" },
  { id: "omni-social-impact-crowdfunding-hub", icon: "🤝", name: "Diaspora Crowdfunding & STEM Scholarships", cat: "Impact" },
  { id: "omni-global-trade-finance-hub", icon: "📜", name: "Digital Letter of Credit (e-LC) & EAC Customs", cat: "Trade" },
  { id: "omni-quantum-compute-mining-hub", icon: "⚛️", name: "Green-Hydro BTC Mining & Quantum QPU Cloud", cat: "Compute" },
  { id: "omni-global-auto-mobility-hub", icon: "🚗", name: "EV Moto Battery-Swap, Robo-Taxis & Freight", cat: "Mobility" },
  { id: "omni-cbdc-dex-clearing-hub", icon: "💱", name: "e-RWF (CBDC) Atomic Swap & PAPSS Clearing", cat: "Finance" },
  { id: "omni-global-telecom-6g-mesh-hub", icon: "📡", name: "195-Country eSIM, Satellite Mesh & +250 PBX", cat: "Telecom" },
  { id: "omni-luxury-jets-concierge-hub", icon: "💎", name: "Private Jets, Helicopters & Swiss Luxury Vault", cat: "Luxury" },
  { id: "omni-global-stock-exchange-etf-hub", icon: "👑", name: "RSE Kigali, NASDAQ Stocks & Sovereign ETFs", cat: "Markets" },
  { id: "omni-sports-esports-academy-hub", icon: "🏆", name: "Global Sports AI, Esports & Youth Academies", cat: "Sports" },
  { id: "omni-metaverse-digital-twin-hub", icon: "🌐", name: "Kigali & Gatsibo 3D Digital Twin & VR Arenas", cat: "Spatial" },
  { id: "omni-smart-infra-climate-bonds-hub", icon: "🏛️", name: "Electric Rail, Smart-Housing & Climate Bonds", cat: "Infra" },
  { id: "omni-pan-african-edtech-talent-hub", icon: "🎓", name: "Pan-African AI Universities & Startup Syndicate", cat: "Education" },
  { id: "omni-biotech-genomics-hub", icon: "🧬", name: "DNA Genomics, Kigali mRNA Patents & Longevity", cat: "Health" },
  { id: "omni-maritime-blue-economy-hub", icon: "🌊", name: "Maritime Shipping, Subsea Cables & Blue-Carbon", cat: "Logistics" },
  { id: "omni-spacetech-robotics-hub", icon: "🚀", name: "CubeSat Launches, Industrial Robotics & Space", cat: "Space" },
  { id: "omni-global-banking-remittance-hub", icon: "🏦", name: "0-Fee Diaspora Remittances, Visa & Microloans", cat: "Banking" },
  { id: "omni-creator-media-streaming-hub", icon: "🎬", name: "Afrobeat Royalties, 4K PPV & BK Arena Tickets", cat: "Media" },
  { id: "omni-tokenized-real-estate-gold-hub", icon: "🏙️", name: "Tokenized Skyscrapers, 24K Gold & Eco-Villas", cat: "Realty" },
  { id: "omni-ai-agents-automation-hub", icon: "🤖", name: "Trading Bots, Kinyarwanda AI Agents & AGI", cat: "AI" },
  { id: "omni-global-ecommerce-logistics-hub", icon: "🛒", name: "E-Commerce, Moto Courier, Wholesale & BNPL", cat: "Commerce" },
  { id: "omni-cloud-telecom-satellite-hub", icon: "🛰️", name: "LEO Satellite Internet & Tier-4 Kigali Cloud", cat: "Cloud" },
  { id: "omni-govtech-irembo-hub", icon: "🪪", name: "Irembo 2.0, Blockchain Land Title & E-Voting", cat: "GovTech" },
  { id: "omni-cyber-security-quantum-id-hub", icon: "🔐", name: "Cybersecurity, AI Fraud Shield & Quantum ID", cat: "Security" },
  { id: "omni-enterprise-erp-payroll-hub", icon: "🧾", name: "Enterprise ERP, MoMo/BK Payroll & RRA EBM", cat: "Enterprise" },
  { id: "omni-aviation-smart-city-hub", icon: "✈️", name: "RwandAir Flights, Tap&Go Transit & Airport VIP", cat: "Travel" },
  { id: "omni-clean-energy-utilities-hub", icon: "⚡", name: "Solar Micro-Grids, EV Chargers & CashPower", cat: "Energy" },
  { id: "omni-agritech-supply-chain-hub", icon: "🌾", name: "Rwanda Coffee/Tea Export, Drones & Cold-Chain", cat: "AgriTech" },
  { id: "omni-legal-tech-notary-hub", icon: "⚖️", name: "Digital Notary, AI Contract Audit & RDB Registry", cat: "Legal" },
];

export default function SovereignSuperAppDirectory({ theme, panel }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("ALL");

  const categories = useMemo(() => ["ALL", ...new Set(DIRECTORY_MODULES.map((m) => m.cat))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIRECTORY_MODULES.filter((m) => {
      if (cat !== "ALL" && m.cat !== cat) return false;
      if (!q) return true;
      return m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q);
    });
  }, [query, cat]);

  function jumpTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 650, behavior: "smooth" });
    }
  }

  return (
    <section id="sovereign-super-app-directory" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>🧭 Sovereign Super-App Instant Command Directory (55+ Active Hubs)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Click any hub pill below to jump straight to that engine in 0.1s</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter hubs (e.g. Gold, RwandAir, Mining, AI, Bank, Tax)..."
            style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, minWidth: 210 }}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
            {categories.map((c) => <option key={c} value={c}>{c === "ALL" ? "All Sectors" : c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 132, overflowY: "auto", paddingRight: 4 }}>
        {filtered.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => jumpTo(m.id)}
            style={{ padding: "5px 10px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            <span>{m.icon}</span>
            <span>{m.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
