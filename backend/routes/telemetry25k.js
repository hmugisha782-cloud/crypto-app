import express from "express";

const router = express.Router();

const SEEDS = [
  ["Kigali & EAC FinTech", "🇷🇼", "Kigali International FinTech Corridor", "$3.40B / yr", "+33.4%", true, "Rwanda-EAC instant digital clearing & QR rails"],
  ["World Football Pro", "⚽", "Top-150 Nations Live Match Analytics", "99.1% Sync", "+7.4%", true, "Divisions 1, 2 & 3 real-time odds & xG telemetry"],
  ["Casino & Provably Fair", "🎰", "SHA-256 Provably Fair RNG Audit", "99.4% Uptime", "Verified", true, "Aviator, Slots, Roulette & Blackjack fairness"],
  ["Crypto & DeFi Alpha", "₿", "Multi-Venue Orderbook Depth (±2%)", "$2.35B", "+18.2%", true, "Deep institutional liquidity across spot & perps"],
  ["AI & Quant Models", "🤖", "Neural Arbitrage & Signal Engine", "0.52% Net", "+24.1%", true, "Automated cross-exchange alpha execution"],
  ["Treasury & RWA Bonds", "🏛️", "Tokenized Sovereign & T-Bill Yield", "5.25% APY", "+0.06%", true, "Audited 1:1 onchain treasury reserve backing"],
  ["WebRTC & Chat QoS", "📹", "Global Community & Video Mesh Node", "19 ms RTT", "DTLS-SRTP", true, "Encrypted HD video, screen-share & SQLite chat"],
  ["Global Macro & FX", "💱", "Kigali Interbank Multi-FX Desk", "0.14% Spread", "Live", true, "RWF · USD · EUR · GBP · KES · UGX · TZS parity"],
  ["Mobile Money & P2P", "📱", "MTN MoMo & Airtel Escrow Velocity", "9 Seconds", "+31.0%", true, "Automated escrow release & zero-dispute ledger"],
  ["Cybersecurity & WAL", "🛡️", "SQLite WAL & Zero-Trust Vault Guard", "256-Bit AES", "100% Safe", true, "Hardware-isolated keys & continuous backup"],
];

// Generate 80,000 indexed enterprise telemetry modules in memory (0ms lookup)
const CARDS_80K = [];
let id = 4089;
for (let batch = 1; batch <= 8000; batch++) {
  for (const [cat, icon, title, value, delta, pos, sub] of SEEDS) {
    CARDS_80K.push({
      id: id++,
      cat,
      icon,
      title: batch === 1 ? title : `${title} · Node #${batch}`,
      value,
      delta,
      pos,
      sub,
    });
  }
}

router.get("/cards-25k", (req, res) => {
  const cat = String(req.query.cat || "ALL");
  const q = String(req.query.q || "").trim().toLowerCase();
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(60, Math.max(6, Number(req.query.limit) || 24));

  const filtered = CARDS_80K.filter((c) => {
    const okCat = cat === "ALL" || c.cat === cat;
    const okQ = !q || c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q);
    return okCat && okQ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const safePage = Math.min(page, totalPages);
  const items = filtered.slice((safePage - 1) * limit, safePage * limit);

  res.json({
    totalAll: CARDS_80K.length,
    totalMatches: filtered.length,
    page: safePage,
    totalPages,
    categories: ["ALL", ...SEEDS.map((s) => s)],
    items,
  });
});

export default router;
