import express from "express";
import crypto from "node:crypto";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/market/ea-rates", async (req, res) => {
  try {
    const resp = await fetch("https://er-api.com");
    const data = await resp.json();
    const r = data?.rates || {};
    res.json({
      base: "USD",
      rates: {
        RWF: r.RWF || 1380,
        KES: r.KES || 129,
        UGX: r.UGX || 3680,
        TZS: r.TZS || 2650,
        EUR: r.EUR || 0.92,
      },
    });
  } catch {
    res.json({ base: "USD", rates: { RWF: 1380, KES: 129, UGX: 3680, TZS: 2650, EUR: 0.92 }, fallback: true });
  }
});

router.post("/market/what-if", (req, res) => {
  const currentUsd = Number(req.body?.currentUsd) || 0;
  const changePercent = Number(req.body?.changePercent) || 0;
  const projectedUsd = currentUsd * (1 + changePercent / 100);
  res.json({
    currentUsd: Number(currentUsd.toFixed(2)),
    changePercent,
    projectedUsd: Number(projectedUsd.toFixed(2)),
    differenceUsd: Number((projectedUsd - currentUsd).toFixed(2)),
  });
});

router.get("/market/volatility", async (req, res) => {
  const symbol = String(req.query.symbol || "BTCUSDT").toUpperCase();
  try {
    const resp = await fetch(`https://binance.com${symbol}`);
    const t = await resp.json();
    const high = Number(t.highPrice) || 0;
    const low = Number(t.lowPrice) || 0;
    const spreadPct = low > 0 ? ((high - low) / low) * 100 : 0;
    res.json({
      symbol,
      high24h: high,
      low24h: low,
      volatilityPercent: Number(spreadPct.toFixed(2)),
      level: spreadPct > 8 ? "High" : spreadPct > 3 ? "Moderate" : "Low",
    });
  } catch {
    res.status(502).json({ message: "Unable to calculate volatility." });
  }
});

router.get("/market/sentiment-guide", (req, res) => {
  const score = Math.min(100, Math.max(0, Number(req.query.score) || 50));
  let zone = "Neutral";
  let note = "Market sentiment is balanced. Stick to your planned strategy.";
  if (score <= 25) {
    zone = "Extreme Fear";
    note = "High market anxiety often creates long-term accumulation opportunities.";
  } else if (score <= 45) {
    zone = "Fear";
    note = "Investors are cautious; consider gradual DCA entries.";
  } else if (score >= 75) {
    zone = "Extreme Greed";
    note = "Markets may be overheated; review risk and take partial profits.";
  } else if (score >= 55) {
    zone = "Greed";
    note = "Bullish momentum is active; watch support and resistance levels.";
  }
  res.json({ score, zone, note });
});

router.get("/user/goals", authenticateToken, (req, res) => {
  const goals = db.prepare("SELECT id, title, target_usd AS targetUsd, current_usd AS currentUsd FROM savings_goals WHERE user_id = ?").all(req.user.id);
  res.json({
    goals: goals.map((g) => ({
      ...g,
      progressPercent: g.targetUsd > 0 ? Math.min(100, Number(((g.currentUsd / g.targetUsd) * 100).toFixed(1))) : 0,
    })),
  });
});

router.post("/user/goals", authenticateToken, (req, res) => {
  const { id, title, targetUsd, currentUsd } = req.body || {};
  if (!title || Number(targetUsd) <= 0) return res.status(400).json({ message: "Title and targetUsd are required." });
  const goalId = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO savings_goals (id, user_id, title, target_usd, current_usd) VALUES (?, ?, ?, ?, ?)")
    .run(goalId, req.user.id, String(title), Number(targetUsd), Number(currentUsd) || 0);
  res.json({ ok: true, id: goalId });
});

router.post("/user/coin-tags", authenticateToken, (req, res) => {
  const { coinId, tag } = req.body || {};
  if (!coinId || !tag) return res.status(400).json({ message: "coinId and tag are required." });
  db.prepare("INSERT OR IGNORE INTO coin_tags (user_id, coin_id, tag) VALUES (?, ?, ?)").run(req.user.id, String(coinId), String(tag));
  const tags = db.prepare("SELECT coin_id AS coinId, tag FROM coin_tags WHERE user_id = ?").all(req.user.id);
  res.json({ tags });
});

router.post("/user/tax-ledger", authenticateToken, (req, res) => {
  const { id, coinId, realizedPnlUsd } = req.body || {};
  if (!coinId) return res.status(400).json({ message: "coinId is required." });
  const entryId = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO tax_ledger (id, user_id, coin_id, realized_pnl_usd) VALUES (?, ?, ?, ?)")
    .run(entryId, req.user.id, String(coinId), Number(realizedPnlUsd) || 0);
  const entries = db.prepare("SELECT id, coin_id AS coinId, realized_pnl_usd AS realizedPnlUsd, recorded_at AS recordedAt FROM tax_ledger WHERE user_id = ?").all(req.user.id);
  res.json({ entries });
});

router.get("/user/watchlist-digest", authenticateToken, (req, res) => {
  const watch = db.prepare("SELECT coin_id AS coinId FROM watchlist_items WHERE user_id = ?").all(req.user.id);
  const targets = db.prepare("SELECT coin_id AS coinId, buy_target AS buyTarget, sell_target AS sellTarget FROM watchlist_targets WHERE user_id = ?").all(req.user.id);
  const targetMap = new Map(targets.map((t) => [t.coinId, t]));
  res.json({
    count: watch.length,
    items: watch.map((w) => ({ coinId: w.coinId, targets: targetMap.get(w.coinId) || null })),
  });
});

router.post("/user/api-tokens", authenticateToken, (req, res) => {
  const label = String(req.body?.label || "Personal Key").trim();
  const rawToken = "kgt_" + crypto.randomBytes(16).toString("hex");
  const id = String(Date.now());
  db.prepare("INSERT INTO api_tokens (id, user_id, label, token_prefix) VALUES (?, ?, ?, ?)").run(id, req.user.id, label, rawToken.slice(0, 10) + "...");
  res.json({ id, label, token: rawToken });
});

router.get("/system/db-tables", (req, res) => {
  const tables = ["users", "portfolio_items", "watchlist_items", "price_alerts", "paper_trades", "user_transactions", "user_notes", "dca_plans", "fx_alerts", "savings_goals", "tax_ledger"];
  const counts = {};
  for (const name of tables) {
    try {
      counts[name] = db.prepare(\`SELECT COUNT(*) AS c FROM \${name}\`).get().c;
    } catch {
      counts[name] = 0;
    }
  }
  res.json({ tables: counts });
});

export default router;
