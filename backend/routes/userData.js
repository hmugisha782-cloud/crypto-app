import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/data", authenticateToken, (req, res) => {
  try {
    const portfolioRows = db
      .prepare("SELECT id, coin_id AS coinId, quantity, buy_price AS buyPrice FROM portfolio_items WHERE user_id = ? ORDER BY created_at ASC")
      .all(req.user.id);
    const watchlistRows = db
      .prepare("SELECT coin_id FROM watchlist_items WHERE user_id = ?")
      .all(req.user.id);
    const alertRows = db
      .prepare("SELECT id, coin_id AS coinId, target_price AS targetPrice, condition FROM price_alerts WHERE user_id = ?")
      .all(req.user.id);

    res.json({
      portfolio: portfolioRows,
      watchlist: watchlistRows.map((r) => r.coin_id),
      alerts: alertRows,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load saved user data." });
  }
});

router.put("/portfolio", authenticateToken, (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const sync = db.transaction((list) => {
      db.prepare("DELETE FROM portfolio_items WHERE user_id = ?").run(req.user.id);
      const insert = db.prepare("INSERT INTO portfolio_items (id, user_id, coin_id, quantity, buy_price) VALUES (?, ?, ?, ?, ?)");
      for (const item of list) {
        if (item && item.id && item.coinId && Number(item.quantity) > 0) {
          insert.run(String(item.id), req.user.id, String(item.coinId), Number(item.quantity), Number(item.buyPrice) || 0);
        }
      }
    });
    sync(items);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to save portfolio." });
  }
});

router.put("/watchlist", authenticateToken, (req, res) => {
  try {
    const coinIds = Array.isArray(req.body.watchlist) ? req.body.watchlist : [];
    const sync = db.transaction((ids) => {
      db.prepare("DELETE FROM watchlist_items WHERE user_id = ?").run(req.user.id);
      const insert = db.prepare("INSERT OR IGNORE INTO watchlist_items (user_id, coin_id) VALUES (?, ?)");
      for (const coinId of ids) {
        if (coinId) insert.run(req.user.id, String(coinId));
      }
    });
    sync(coinIds);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to save watchlist." });
  }
});

router.put("/alerts", authenticateToken, (req, res) => {
  try {
    const alerts = Array.isArray(req.body.alerts) ? req.body.alerts : [];
    const sync = db.transaction((list) => {
      db.prepare("DELETE FROM price_alerts WHERE user_id = ?").run(req.user.id);
      const insert = db.prepare("INSERT INTO price_alerts (id, user_id, coin_id, target_price, condition) VALUES (?, ?, ?, ?, ?)");
      for (const a of list) {
        if (a && a.id && a.coinId && Number(a.targetPrice) > 0) {
          insert.run(String(a.id), req.user.id, String(a.coinId), Number(a.targetPrice), String(a.condition || "above"));
        }
      }
    });
    sync(alerts);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to save alerts." });
  }
});

router.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword || String(newPassword).length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }
    const user = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const valid = await bcrypt.compare(String(currentPassword), user.password_hash);
    if (!valid) return res.status(401).json({ message: "Current password is incorrect." });

    const hash = await bcrypt.hash(String(newPassword), 12);
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, req.user.id);
    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password." });
  }
});

router.delete("/account", authenticateToken, (req, res) => {
  try {
    db.prepare("DELETE FROM users WHERE id = ?").run(req.user.id);
    res.json({ message: "Account and all saved data permanently deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account." });
  }
});


router.get("/activity", authenticateToken, (req, res) => {
  try {
    const trades = db
      .prepare("SELECT id, coin_id AS coinId, side, quantity, price, created_at AS createdAt FROM paper_trades WHERE user_id = ? ORDER BY created_at DESC")
      .all(req.user.id);
    const transactions = db
      .prepare("SELECT id, coin_id AS coinId, type, quantity, price, note, created_at AS createdAt FROM user_transactions WHERE user_id = ? ORDER BY created_at DESC")
      .all(req.user.id);
    res.json({ trades, transactions });
  } catch (err) {
    res.status(500).json({ message: "Failed to load activity." });
  }
});

router.put("/activity", authenticateToken, (req, res) => {
  try {
    const trades = Array.isArray(req.body.trades) ? req.body.trades : [];
    const transactions = Array.isArray(req.body.transactions) ? req.body.transactions : [];
    const syncAll = db.transaction(() => {
      db.prepare("DELETE FROM paper_trades WHERE user_id = ?").run(req.user.id);
      const insTrade = db.prepare("INSERT INTO paper_trades (id, user_id, coin_id, side, quantity, price) VALUES (?, ?, ?, ?, ?, ?)");
      for (const t of trades) {
        if (t && t.id && t.coinId) insTrade.run(String(t.id), req.user.id, String(t.coinId), String(t.side || "BUY"), Number(t.quantity) || 0, Number(t.price) || 0);
      }
      db.prepare("DELETE FROM user_transactions WHERE user_id = ?").run(req.user.id);
      const insTx = db.prepare("INSERT INTO user_transactions (id, user_id, coin_id, type, quantity, price, note) VALUES (?, ?, ?, ?, ?, ?, ?)");
      for (const tx of transactions) {
        if (tx && tx.id && tx.coinId) insTx.run(String(tx.id), req.user.id, String(tx.coinId), String(tx.type || "BUY"), Number(tx.quantity) || 0, Number(tx.price) || 0, String(tx.note || ""));
      }
    });
    syncAll();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to save activity." });
  }
});

router.get("/export-csv", authenticateToken, (req, res) => {
  try {
    const rows = db
      .prepare("SELECT coin_id, quantity, buy_price, created_at FROM portfolio_items WHERE user_id = ?")
      .all(req.user.id);
    const header = "Coin,Quantity,BuyPriceUSD,TotalCostUSD,AddedAt\n";
    const body = rows
      .map((r) => `${r.coin_id},${r.quantity},${r.buy_price},${(r.quantity * r.buy_price).toFixed(2)},${r.created_at}`)
      .join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="kgt-portfolio.csv"');
    res.send(header + body);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate CSV report." });
  }
});


import { copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

router.get("/notes", authenticateToken, (req, res) => {
  const notes = db.prepare("SELECT id, title, content, created_at AS createdAt FROM user_notes WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
  res.json({ notes });
});

router.post("/notes", authenticateToken, (req, res) => {
  const { id, title, content } = req.body || {};
  if (!title || !content) return res.status(400).json({ message: "Title and content are required." });
  const noteId = String(id || Date.now());
  db.prepare("INSERT OR REPLACE INTO user_notes (id, user_id, title, content) VALUES (?, ?, ?, ?)").run(noteId, req.user.id, String(title), String(content));
  res.json({ ok: true, id: noteId });
});

router.put("/settings", authenticateToken, (req, res) => {
  const { preferredCurrency, themeMode } = req.body || {};
  db.prepare("INSERT OR REPLACE INTO user_settings (user_id, preferred_currency, theme_mode, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)")
    .run(req.user.id, String(preferredCurrency || "RWF"), String(themeMode || "dark"));
  res.json({ ok: true });
});

router.get("/stats", authenticateToken, (req, res) => {
  const portfolioCount = db.prepare("SELECT COUNT(*) AS c FROM portfolio_items WHERE user_id = ?").get(req.user.id).c;
  const watchlistCount = db.prepare("SELECT COUNT(*) AS c FROM watchlist_items WHERE user_id = ?").get(req.user.id).c;
  const alertsCount = db.prepare("SELECT COUNT(*) AS c FROM price_alerts WHERE user_id = ?").get(req.user.id).c;
  const tradesCount = db.prepare("SELECT COUNT(*) AS c FROM paper_trades WHERE user_id = ?").get(req.user.id).c;
  const notesCount = db.prepare("SELECT COUNT(*) AS c FROM user_notes WHERE user_id = ?").get(req.user.id).c;
  res.json({ portfolioCount, watchlistCount, alertsCount, tradesCount, notesCount });
});

router.delete("/reset-data", authenticateToken, (req, res) => {
  const wipe = db.transaction(() => {
    db.prepare("DELETE FROM portfolio_items WHERE user_id = ?").run(req.user.id);
    db.prepare("DELETE FROM watchlist_items WHERE user_id = ?").run(req.user.id);
    db.prepare("DELETE FROM price_alerts WHERE user_id = ?").run(req.user.id);
    db.prepare("DELETE FROM paper_trades WHERE user_id = ?").run(req.user.id);
    db.prepare("DELETE FROM user_transactions WHERE user_id = ?").run(req.user.id);
    db.prepare("DELETE FROM user_notes WHERE user_id = ?").run(req.user.id);
  });
  wipe();
  res.json({ message: "All saved trading and portfolio data cleared." });
});

router.post("/snapshot", authenticateToken, (req, res) => {
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    const src = join(dir, "../data/crypto_tracker.sqlite");
    const backupDir = join(dir, "../backups");
    mkdirSync(backupDir, { recursive: true });
    const dest = join(backupDir, "snapshot-" + Date.now() + ".sqlite");
    copyFileSync(src, dest);
    res.json({ message: "Database snapshot created successfully." });
  } catch {
    res.status(500).json({ message: "Unable to create database snapshot." });
  }
});

export default router;
