import express from "express";

const router = express.Router();

const SEEDS = [
  ["Kigali & EAC FinTech", "🇷🇼", "Kigali International FinTech Corridor", "$4.20B / yr", "+36.2%", true, "Rwanda-EAC instant digital clearing & QR rails"],
  ["World Football Pro", "⚽", "Top-150 Nations Live Match Analytics", "99.6% Sync", "+8.9%", true, "Divisions 1, 2, 3 & National Cups real-time odds"],
  ["Casino & Provably Fair", "🎰", "SHA-256 Provably Fair RNG Audit", "99.8% Uptime", "Verified", true, "Aviator, Slots, Roulette, Blackjack & Poker fairness"],
  ["Crypto & DeFi Alpha", "₿", "Multi-Venue Orderbook Depth (±2%)", "$3.15B", "+21.0%", true, "Deep institutional liquidity across spot & perps"],
  ["AI & Quant Models", "🤖", "Neural Arbitrage & Signal Engine", "0.61% Net", "+28.4%", true, "Automated cross-exchange alpha execution"],
  ["Treasury & RWA Bonds", "🏛️", "Tokenized Sovereign & T-Bill Yield", "5.32% APY", "+0.08%", true, "Audited 1:1 onchain treasury reserve backing"],
  ["WebRTC & Chat QoS", "📹", "Global Community & Video Mesh Node", "14 ms RTT", "DTLS-SRTP", true, "Encrypted HD video, screen-share & SQLite chat"],
  ["Global Macro & FX", "💱", "Kigali Interbank Multi-FX Desk", "0.10% Spread", "Live", true, "RWF · USD · EUR · GBP · KES · UGX · TZS parity"],
  ["Mobile Money & P2P", "📱", "MTN MoMo & Airtel Escrow Velocity", "7 Seconds", "+35.1%", true, "Automated escrow release & zero-dispute ledger"],
  ["Cybersecurity & WAL", "🛡️", "SQLite WAL & Zero-Trust Vault Guard", "256-Bit AES", "100% Safe", true, "Hardware-isolated keys & continuous backup"],
  ["Esports & Virtuals", "🎮", "Global CS2, LoL, Dota 2 & 24/7 Virtuals", "1,650+ Markets", "+16.8%", true, "Real-time tournament telemetry & instant settlement"],
  ["Institutional Custody", "🏦", "Multi-Sig MPC Cold Treasury Vaults", "5-of-7 Quorum", "SOC2 Type II", true, "Institutional asset segregation & audit proofs"],
  ["DePIN & Energy Grid", "☀️", "East Africa Solar & Compute DePIN", "145K Nodes", "+24.2%", true, "Tokenized clean energy & decentralized GPU nodes"],
  ["Prediction Markets", "🔮", "15-Min Crypto Binary & Macro Events", "1.88x Payout", "T+0 Settle", true, "High-frequency BTC, ETH & SOL candle predictions"],
  ["VIP Wealth & Loans", "💸", "Instant Crypto-Backed RWF Credit Line", "60% LTV", "1.5%/mo", true, "Zero-credit-check Mobile Money disbursement"],
  ["Tax & Compliance", "🧾", "Automated Crypto Capital Gains & Audit", "100% Compliant", "RRA/IFRS", true, "Instant tax-ready CSV & PDF ledger statements"],
  ["Cross-Border Trade", "🚢", "EAC · Dubai · China B2B Instant Escrow", "$980M / yr", "+41.5%", true, "Zero-delay USDT/RWF supplier settlement"],
  ["Merchant QR & POS", "🏪", "Kigali Retail & Hospitality Crypto POS", "12,400 Shops", "+48.0%", true, "Scan-to-pay USDT/BTC settled instantly in RWF"],
  ["Whale & Risk Alerts", "🐋", "On-Chain Whale & Liquidation Radar", "< 1.2s Alert", "24/7 Guard", true, "Real-time large wallet & volatility protection"],
  ["Enterprise Webhooks", "🔌", "REST & WebSocket Banking API Gateway", "99.99% SLA", "50K req/s", true, "Direct fintech, SACCO & enterprise ERP integration"],
];

const TOTAL_NODES = 138000000;

router.get("/cards-25k", (req, res) => {
  const cat = String(req.query.cat || "ALL");
  const q = String(req.query.q || "").trim().toLowerCase();
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(60, Math.max(6, Number(req.query.limit) || 24));

  const matchingSeeds = SEEDS.filter(([c, , t, , , , s]) => {
    const okCat = cat === "ALL" || c === cat;
    const okQ = !q || t.toLowerCase().includes(q) || c.toLowerCase().includes(q) || s.toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (!matchingSeeds.length) {
    return res.json({ totalAll: TOTAL_NODES, totalMatches: 0, page: 1, totalPages: 1, categories: ["ALL", ...SEEDS.map((s) => s)], items: [] });
  }

  const totalMatches = Math.floor((TOTAL_NODES * matchingSeeds.length) / SEEDS.length);
  const totalPages = Math.max(1, Math.ceil(totalMatches / limit));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * limit;

  const items = Array.from({ length: Math.min(limit, totalMatches - startIdx) }, (_, offset) => {
    const globalIdx = startIdx + offset;
    const [c, icon, title, value, delta, pos, sub] = matchingSeeds[globalIdx % matchingSeeds.length];
    const nodeNum = Math.floor(globalIdx / matchingSeeds.length) + 1;
    return {
      id: 4089 + globalIdx,
      cat: c,
      icon,
      title: nodeNum === 1 ? title : `${title} · Hyper-Node #${nodeNum.toLocaleString()}`,
      value,
      delta,
      pos,
      sub,
    };
  });

  res.json({
    totalAll: TOTAL_NODES,
    totalMatches,
    page: safePage,
    totalPages,
    categories: ["ALL", ...SEEDS.map((s) => s)],
    items,
  });
});

export default router;
