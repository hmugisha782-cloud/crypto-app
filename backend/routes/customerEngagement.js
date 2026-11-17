import express from "express";
import crypto from "node:crypto";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/referral", authenticateToken, (req, res) => {
  let row = db.prepare("SELECT code, invites_count AS invitesCount, points FROM referral_codes WHERE user_id = ?").get(req.user.id);
  if (!row) {
    const code = "KGT-" + crypto.randomBytes(3).toString("hex").toUpperCase();
    db.prepare("INSERT INTO referral_codes (user_id, code, invites_count, points) VALUES (?, ?, 0, 100)").run(req.user.id, code);
    row = { code, invitesCount: 0, points: 100 };
  }
  res.json(row);
});

router.get("/badges", authenticateToken, (req, res) => {
  const existing = db.prepare("SELECT id, badge_name AS badgeName, awarded_at AS awardedAt FROM user_badges WHERE user_id = ?").all(req.user.id);
  if (existing.length === 0) {
    const id = String(Date.now());
    db.prepare("INSERT INTO user_badges (id, user_id, badge_name) VALUES (?, ?, ?)").run(id, req.user.id, "Early Pioneer");
    return res.json({ badges: [{ id, badgeName: "Early Pioneer", awardedAt: new Date().toISOString() }] });
  }
  res.json({ badges: existing });
});

router.post("/grid-bots", authenticateToken, (req, res) => {
  const { pair, lowerPrice, upperPrice, investmentUsd } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO grid_bots (id, user_id, pair, lower_price, upper_price, investment_usd) VALUES (?, ?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(pair || "BTC/USDT"), Number(lowerPrice) || 60000, Number(upperPrice) || 72000, Number(investmentUsd) || 500);
  res.json({ ok: true, id });
});

router.post("/folders", authenticateToken, (req, res) => {
  const { folderName, coinId } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO watchlist_folders (id, user_id, folder_name, coin_id) VALUES (?, ?, ?, ?)").run(id, req.user.id, String(folderName || "Favorites"), String(coinId || "bitcoin"));
  res.json({ ok: true, id });
});

router.post("/predictions", authenticateToken, (req, res) => {
  const { symbol, direction } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO price_predictions (id, user_id, symbol, direction) VALUES (?, ?, ?, ?)").run(id, req.user.id, String(symbol || "BTC"), String(direction || "UP"));
  const totalUp = db.prepare("SELECT COUNT(*) AS c FROM price_predictions WHERE direction = 'UP'").get().c;
  const totalDown = db.prepare("SELECT COUNT(*) AS c FROM price_predictions WHERE direction = 'DOWN'").get().c;
  res.json({ ok: true, poll: { upVotes: totalUp, downVotes: totalDown } });
});

router.post("/recovery-codes", authenticateToken, (req, res) => {
  const codes = Array.from({ length: 6 }, () => crypto.randomBytes(4).toString("hex").toUpperCase());
  db.prepare("INSERT OR REPLACE INTO security_2fa_codes (user_id, codes_json) VALUES (?, ?)").run(req.user.id, JSON.stringify(codes));
  res.json({ recoveryCodes: codes });
});

router.post("/fiat-sim", authenticateToken, (req, res) => {
  const { currency, amount } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO fiat_deposits_sim (id, user_id, currency, amount) VALUES (?, ?, ?, ?)").run(id, req.user.id, String(currency || "RWF"), Number(amount) || 50000);
  res.json({ ok: true, id });
});

router.post("/auto-invest", authenticateToken, (req, res) => {
  const { coinId, amountRwf, cadence } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO recurring_schedules (id, user_id, coin_id, amount_rwf, cadence) VALUES (?, ?, ?, ?, ?)").run(id, req.user.id, String(coinId || "bitcoin"), Number(amountRwf) || 25000, String(cadence || "weekly"));
  res.json({ ok: true, id });
});

router.get("/leaderboard", (req, res) => {
  res.json({
    leaders: [
      { rank: 1, alias: "KigaliWhale", roiPct: 48.2 },
      { rank: 2, alias: "NileTrader", roiPct: 36.7 },
      { rank: 3, alias: "VirungaBull", roiPct: 29.4 },
    ],
  });
});

router.get("/customer-score", authenticateToken, (req, res) => {
  const p = db.prepare("SELECT COUNT(*) AS c FROM portfolio_items WHERE user_id = ?").get(req.user.id).c;
  const b = db.prepare("SELECT COUNT(*) AS c FROM user_badges WHERE user_id = ?").get(req.user.id).c;
  res.json({ engagementScore: Math.min(100, 40 + p * 10 + b * 15) });
});

router.get("/tax-archive", authenticateToken, (req, res) => {
  res.json({ archives: db.prepare("SELECT id, tax_year AS taxYear, net_gain_usd AS netGainUsd FROM tax_reports_archive WHERE user_id = ?").all(req.user.id) });
});

router.get("/welcome-pack", authenticateToken, (req, res) => {
  res.json({ bonusPoints: 100, status: "Claimed" });
});

export default router;
