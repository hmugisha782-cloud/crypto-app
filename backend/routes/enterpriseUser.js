import express from "express";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/snapshots", authenticateToken, (req, res) => {
  res.json({ snapshots: db.prepare("SELECT id, total_usd AS totalUsd, total_rwf AS totalRwf, captured_at AS capturedAt FROM portfolio_snapshots WHERE user_id = ? ORDER BY captured_at DESC").all(req.user.id) });
});

router.post("/snapshots", authenticateToken, (req, res) => {
  const total = db.prepare("SELECT COALESCE(SUM(quantity * buy_price), 0) AS t FROM portfolio_items WHERE user_id = ?").get(req.user.id).t;
  const id = String(Date.now());
  db.prepare("INSERT INTO portfolio_snapshots (id, user_id, total_usd, total_rwf) VALUES (?, ?, ?, ?)").run(id, req.user.id, Number(total.toFixed(2)), Math.round(total * 1380));
  res.json({ ok: true, id, totalUsd: Number(total.toFixed(2)), totalRwf: Math.round(total * 1380) });
});

router.get("/whale-alerts", authenticateToken, (req, res) => {
  res.json({ alerts: db.prepare("SELECT id, symbol, min_usd AS minUsd, note FROM whale_alerts WHERE user_id = ?").all(req.user.id) });
});

router.post("/whale-alerts", authenticateToken, (req, res) => {
  const { symbol, minUsd, note } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO whale_alerts (id, user_id, symbol, min_usd, note) VALUES (?, ?, ?, ?, ?)").run(id, req.user.id, String(symbol || "BTC"), Number(minUsd) || 1000000, String(note || ""));
  res.json({ ok: true, id });
});

router.post("/ico-watchlist", authenticateToken, (req, res) => {
  const { projectName, tokenSymbol, launchDate } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO ico_watchlist (id, user_id, project_name, token_symbol, launch_date) VALUES (?, ?, ?, ?, ?)").run(id, req.user.id, String(projectName || "Project"), String(tokenSymbol || "TKN"), String(launchDate || "2026-12-31"));
  res.json({ ok: true, id });
});

router.post("/copy-traders", authenticateToken, (req, res) => {
  const { traderAlias, allocationUsd } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO copy_traders (id, user_id, trader_alias, allocation_usd) VALUES (?, ?, ?, ?)").run(id, req.user.id, String(traderAlias || "ProTrader"), Number(allocationUsd) || 100);
  res.json({ ok: true, id });
});

router.put("/tax-jurisdiction", authenticateToken, (req, res) => {
  const { countryCode, capitalGainsRate } = req.body || {};
  db.prepare("INSERT OR REPLACE INTO tax_jurisdictions (user_id, country_code, capital_gains_rate) VALUES (?, ?, ?)").run(req.user.id, String(countryCode || "RW"), Number(capitalGainsRate) || 15);
  res.json({ ok: true });
});

router.post("/webhooks", authenticateToken, (req, res) => {
  const { eventType, targetUrl } = req.body || {};
  const id = String(Date.now());
  db.prepare("INSERT INTO api_webhooks (id, user_id, event_type, target_url) VALUES (?, ?, ?, ?)").run(id, req.user.id, String(eventType || "PRICE_ALERT"), String(targetUrl || ""));
  res.json({ ok: true, id });
});

router.put("/fee-schedule", authenticateToken, (req, res) => {
  const { makerFee, takerFee } = req.body || {};
  db.prepare("INSERT OR REPLACE INTO fee_schedules (user_id, maker_fee, taker_fee) VALUES (?, ?, ?)").run(req.user.id, Number(makerFee) || 0.1, Number(takerFee) || 0.1);
  res.json({ ok: true });
});

router.get("/full-audit", authenticateToken, (req, res) => {
  const snapshots = db.prepare("SELECT COUNT(*) AS c FROM portfolio_snapshots WHERE user_id = ?").get(req.user.id).c;
  const whales = db.prepare("SELECT COUNT(*) AS c FROM whale_alerts WHERE user_id = ?").get(req.user.id).c;
  const icos = db.prepare("SELECT COUNT(*) AS c FROM ico_watchlist WHERE user_id = ?").get(req.user.id).c;
  res.json({ snapshots, whales, icos, status: "Audited" });
});

export default router;
