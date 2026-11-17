import express from "express";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/strategies", authenticateToken, (req, res) => {
  const list = db.prepare("SELECT id, name, rules, created_at AS createdAt FROM trade_strategies WHERE user_id = ?").all(req.user.id);
  res.json({ strategies: list });
});

router.post("/strategies", authenticateToken, (req, res) => {
  const { id, name, rules } = req.body || {};
  if (!name || !rules) return res.status(400).json({ message: "Name and rules are required." });
  const sid = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO trade_strategies (id, user_id, name, rules) VALUES (?, ?, ?, ?)").run(sid, req.user.id, String(name), String(rules));
  res.json({ ok: true, id: sid });
});

router.post("/rebalance", authenticateToken, (req, res) => {
  const targets = Array.isArray(req.body?.targets) ? req.body.targets : [];
  const ins = db.prepare("INSERT OR REPLACE INTO rebalance_targets (user_id, coin_id, target_percent) VALUES (?, ?, ?)");
  const save = db.transaction(() => {
    for (const t of targets) {
      if (t?.coinId) ins.run(req.user.id, String(t.coinId), Number(t.targetPercent) || 0);
    }
  });
  save();
  res.json({ ok: true, count: targets.length });
});

router.get("/staking", authenticateToken, (req, res) => {
  const rows = db.prepare("SELECT id, coin_id AS coinId, amount, apy FROM staking_positions WHERE user_id = ?").all(req.user.id);
  res.json({
    positions: rows.map((r) => ({ ...r, estimatedYearlyReward: Number(((r.amount * r.apy) / 100).toFixed(4)) })),
  });
});

router.post("/staking", authenticateToken, (req, res) => {
  const { id, coinId, amount, apy } = req.body || {};
  if (!coinId || Number(amount) <= 0) return res.status(400).json({ message: "Valid coinId and amount are required." });
  const pid = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO staking_positions (id, user_id, coin_id, amount, apy) VALUES (?, ?, ?, ?, ?)").run(pid, req.user.id, String(coinId), Number(amount), Number(apy) || 0);
  res.json({ ok: true, id: pid });
});

router.post("/rewards", authenticateToken, (req, res) => {
  const { id, coinId, rewardAmount } = req.body || {};
  if (!coinId) return res.status(400).json({ message: "coinId is required." });
  const rid = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO dividend_logs (id, user_id, coin_id, reward_amount) VALUES (?, ?, ?, ?)").run(rid, req.user.id, String(coinId), Number(rewardAmount) || 0);
  res.json({ ok: true, id: rid });
});

router.put("/notifications", authenticateToken, (req, res) => {
  const { emailAlerts = 1, priceSpikes = 1, weeklyDigest = 1 } = req.body || {};
  db.prepare("INSERT OR REPLACE INTO notification_prefs (user_id, email_alerts, price_spikes, weekly_digest) VALUES (?, ?, ?, ?)")
    .run(req.user.id, emailAlerts ? 1 : 0, priceSpikes ? 1 : 0, weeklyDigest ? 1 : 0);
  res.json({ ok: true });
});

router.post("/feedback", authenticateToken, (req, res) => {
  const { subject, message } = req.body || {};
  if (!subject || !message) return res.status(400).json({ message: "Subject and message are required." });
  const tid = String(Date.now());
  db.prepare("INSERT INTO support_tickets (id, user_id, subject, message) VALUES (?, ?, ?, ?)").run(tid, req.user.id, String(subject), String(message));
  res.json({ ok: true, ticketId: tid });
});

router.get("/executive-summary", authenticateToken, (req, res) => {
  const portfolio = db.prepare("SELECT COALESCE(SUM(quantity * buy_price), 0) AS total FROM portfolio_items WHERE user_id = ?").get(req.user.id).total;
  const goals = db.prepare("SELECT COUNT(*) AS c FROM savings_goals WHERE user_id = ?").get(req.user.id).c;
  const staking = db.prepare("SELECT COUNT(*) AS c FROM staking_positions WHERE user_id = ?").get(req.user.id).c;
  const strategies = db.prepare("SELECT COUNT(*) AS c FROM trade_strategies WHERE user_id = ?").get(req.user.id).c;
  res.json({
    investedUsd: Number(portfolio.toFixed(2)),
    investedRwf: Math.round(portfolio * 1380),
    activeGoals: goals,
    stakingPositions: staking,
    savedStrategies: strategies,
  });
});

export default router;
