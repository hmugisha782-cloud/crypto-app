import express from "express";
import crypto from "node:crypto";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

// 1-5: P2P Escrow, EAC Remittance, Virtual Cards, Utilities & QR Merchant
router.post("/p2p-order", authenticateToken, (req, res) => {
  const { side = "BUY", asset = "USDT", rwfAmount = 50000, provider = "MTN MoMo" } = req.body || {};
  const id = "P2P-" + Date.now();
  db.prepare("INSERT INTO p2p_orders (id, user_id, side, asset, rwf_amount, provider) VALUES (?, ?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(side), String(asset), Number(rwfAmount), String(provider));
  res.json({ ok: true, id, feeRwf: Math.round(Number(rwfAmount) * 0.008), status: "ESCROW_LOCKED" });
});

router.post("/eac-remittance", (req, res) => {
  const rwf = Math.max(1000, Number(req.body?.rwfAmount) || 100000);
  const corridor = String(req.body?.corridor || "KES").toUpperCase();
  const rates = { KES: 0.0938, UGX: 2.67, TZS: 1.92 };
  const feeRwf = Math.round(rwf * 0.01);
  const netRwf = rwf - feeRwf;
  res.json({ corridor, rwfSent: rwf, feeRwf, recipientGets: Number((netRwf * (rates[corridor] || 0.0938)).toFixed(2)) });
});

router.post("/virtual-card", authenticateToken, (req, res) => {
  const usd = Math.max(5, Number(req.body?.amountUsd) || 25);
  const id = "CARD-" + Date.now();
  const last4 = String(Math.floor(1000 + Math.random() * 9000));
  db.prepare("INSERT INTO virtual_cards (id, user_id, card_last4, balance_usd) VALUES (?, ?, ?, ?)").run(id, req.user.id, last4, usd);
  res.json({ ok: true, id, cardNumberMasked: `4532 •••• •••• ${last4}`, balanceUsd: usd, feeRwf: 1500 });
});

router.post("/pay-utility", authenticateToken, (req, res) => {
  const { serviceType = "EUCL CashPower", accountRef = "0421984211", rwfAmount = 10000 } = req.body || {};
  const id = "UTIL-" + Date.now();
  db.prepare("INSERT INTO utility_bills (id, user_id, service_type, account_ref, rwf_amount) VALUES (?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(serviceType), String(accountRef), Number(rwfAmount));
  const tokenCode = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000)).join("-");
  res.json({ ok: true, id, serviceType, meterToken: tokenCode });
});

router.post("/merchant-qr", (req, res) => {
  const rwf = Number(req.body?.rwfAmount) || 25000;
  res.json({ qrPayload: `KGT-PAY:${rwf}RWF:${crypto.randomBytes(4).toString("hex")}`, usdtAmount: Number((rwf / 1380).toFixed(2)) });
});

// 6-10: Live Sports, Binary 15m Options, Mega Jackpot, Virtual League & Cash-Out
router.get("/live-sports-feed", (req, res) => {
  res.json({
    inPlay: [
      { id: "ip1", league: "Premier League", match: "Liverpool vs Man City", minute: "64'", score: "1 - 1", homeOdds: 2.6, drawOdds: 2.1, awayOdds: 2.9 },
      { id: "ip2", league: "La Liga", match: "Barcelona vs Atletico", minute: "38'", score: "2 - 0", homeOdds: 1.25, drawOdds: 5.5, awayOdds: 11.0 },
      { id: "ip3", league: "Virtual 24/7 League", match: "Kigali FC vs Nairobi United", minute: "12'", score: "0 - 0", homeOdds: 1.9, drawOdds: 3.1, awayOdds: 3.8 },
    ],
  });
});

router.post("/binary-15m", authenticateToken, (req, res) => {
  const { asset = "BTC", direction = "UP", stakeRwf = 5000 } = req.body || {};
  const payout = Math.round(Number(stakeRwf) * 1.85);
  const id = "BIN-" + Date.now();
  db.prepare("INSERT INTO betting_slips (id, user_id, category, event_title, pick, odds, stake_rwf, potential_payout_rwf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .run(id, req.user.id, "Binary 15m", `${asset} 15-Min Price`, String(direction), 1.85, Number(stakeRwf), payout);
  res.json({ ok: true, id, expiresInSeconds: 900, potentialPayoutRwf: payout });
});

router.get("/mega-jackpot", (req, res) => {
  res.json({ poolRwf: 25000000, ticketCostRwf: 1000, matchesCount: 10, closesIn: "18h 45m" });
});

router.post("/cashout-slip", authenticateToken, (req, res) => {
  const { slipId } = req.body || {};
  db.prepare("UPDATE betting_slips SET status = 'CASHED_OUT' WHERE id = ? AND user_id = ?").run(String(slipId || ""), req.user.id);
  res.json({ ok: true, message: "Slip cashed out instantly." });
});

// 11-15: AI Copy-Trading, Grid Bots, High-Yield Vaults, VIP Signals & Tokenized Gold/T-Bills
router.get("/copy-traders", (req, res) => {
  res.json({
    traders: [
      { id: "tr1", name: "KigaliAlphaPro", winRatePct: 78.4, monthlyRoiPct: 34.2, followers: 412, perfFeePct: 10 },
      { id: "tr2", name: "EastAfricaQuant", winRatePct: 74.1, monthlyRoiPct: 26.8, followers: 289, perfFeePct: 10 },
      { id: "tr3", name: "SafeYieldMaster", winRatePct: 86.0, monthlyRoiPct: 14.5, followers: 630, perfFeePct: 8 },
    ],
  });
});

router.post("/savings-vault", authenticateToken, (req, res) => {
  const { asset = "USDT", amountUsd = 200, lockDays = 90 } = req.body || {};
  const apy = Number(lockDays) >= 180 ? 16.0 : Number(lockDays) >= 90 ? 13.5 : 10.5;
  const id = "VLT-" + Date.now();
  db.prepare("INSERT INTO savings_vaults (id, user_id, asset, amount_usd, apy, lock_days) VALUES (?, ?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(asset), Number(amountUsd), apy, Number(lockDays));
  res.json({ ok: true, id, apy, estimatedYearlyUsd: Number(((Number(amountUsd) * apy) / 100).toFixed(2)) });
});

router.post("/vip-subscribe", authenticateToken, (req, res) => {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare("INSERT OR REPLACE INTO vip_subscriptions (user_id, tier, expires_at) VALUES (?, 'VIP_PRO', ?)").run(req.user.id, expires);
  res.json({ ok: true, tier: "VIP_PRO", priceRwf: 15000, expiresAt: expires });
});

router.get("/fractional-rwa", (req, res) => {
  res.json({
    assets: [
      { symbol: "PAXG", name: "Tokenized Physical Gold", minRwf: 10000, apy: 0 },
      { symbol: "USDY", name: "Tokenized US Treasury Bills", minRwf: 10000, apy: 5.15 },
      { symbol: "KGL-BOND", name: "East Africa Digital Infrastructure Note", minRwf: 10000, apy: 11.4 },
    ],
  });
});

// 16-20: Agent Affiliate, Crypto-Backed Loans, Gift Cards, Sponsored Ads & White-Label API
router.get("/agent-program", authenticateToken, (req, res) => {
  res.json({ tier: "Gold Agent", commissionPct: 20, activeReferrals: 14, earnedRwf: 84500 });
});

router.post("/instant-loan", authenticateToken, (req, res) => {
  const { collateralAsset = "BTC", collateralUsd = 500 } = req.body || {};
  const borrowedRwf = Math.round(Number(collateralUsd) * 0.6 * 1380);
  const id = "LOAN-" + Date.now();
  db.prepare("INSERT INTO crypto_loans (id, user_id, collateral_asset, collateral_usd, borrowed_rwf) VALUES (?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(collateralAsset), Number(collateralUsd), borrowedRwf);
  res.json({ ok: true, id, borrowedRwf, interestRateMonthlyPct: 1.5 });
});

router.get("/gift-cards", (req, res) => {
  res.json({
    catalog: [
      { brand: "PlayStation Store $25", priceRwf: 35500 },
      { brand: "Apple App Store $20", priceRwf: 28500 },
      { brand: "Steam Gaming Wallet $50", priceRwf: 70500 },
      { brand: "Netflix 1-Month Gift Code", priceRwf: 22000 },
    ],
  });
});

router.get("/revenue-overview", (req, res) => {
  res.json({ activeStreams: 20, status: "All Online Monetization Engines Operational" });
});

export default router;
