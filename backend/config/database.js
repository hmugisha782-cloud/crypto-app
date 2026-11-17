import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const dataDirectory = join(currentDirectory, "../data");

mkdirSync(dataDirectory, { recursive: true });

const databasePath = join(dataDirectory, "crypto_tracker.sqlite");

export const db = new Database(databasePath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS portfolio_items (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    quantity REAL NOT NULL,
    buy_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS watchlist_items (
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, coin_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS price_alerts (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    target_price REAL NOT NULL,
    condition TEXT NOT NULL DEFAULT 'above',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS paper_trades (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    side TEXT NOT NULL,
    quantity REAL NOT NULL,
    price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_transactions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    type TEXT NOT NULL,
    quantity REAL NOT NULL,
    price REAL NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_notes (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_settings (
    user_id INTEGER PRIMARY KEY,
    preferred_currency TEXT NOT NULL DEFAULT 'RWF',
    theme_mode TEXT NOT NULL DEFAULT 'dark',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS alert_history (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    triggered_price REAL NOT NULL,
    triggered_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tax_ledger (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    realized_pnl_usd REAL NOT NULL,
    recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS coin_tags (
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (user_id, coin_id, tag),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS savings_goals (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    target_usd REAL NOT NULL,
    current_usd REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS api_tokens (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    label TEXT NOT NULL,
    token_prefix TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS margin_simulations (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, symbol TEXT, leverage REAL, entry_price REAL, liq_price REAL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS ico_watchlist (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, project_name TEXT, token_symbol TEXT, launch_date TEXT);
  CREATE TABLE IF NOT EXISTS whale_alerts (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, symbol TEXT, min_usd REAL, note TEXT);
  CREATE TABLE IF NOT EXISTS tax_jurisdictions (user_id INTEGER PRIMARY KEY, country_code TEXT DEFAULT 'RW', capital_gains_rate REAL DEFAULT 15.0);
  CREATE TABLE IF NOT EXISTS api_webhooks (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, event_type TEXT, target_url TEXT);
  CREATE TABLE IF NOT EXISTS portfolio_snapshots (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, total_usd REAL, total_rwf REAL, captured_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS ai_signals_log (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, symbol TEXT, signal TEXT, confidence REAL);
  CREATE TABLE IF NOT EXISTS copy_traders (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, trader_alias TEXT, allocation_usd REAL);
  CREATE TABLE IF NOT EXISTS fee_schedules (user_id INTEGER PRIMARY KEY, maker_fee REAL DEFAULT 0.1, taker_fee REAL DEFAULT 0.1);
  CREATE TABLE IF NOT EXISTS custom_dashboards (user_id INTEGER PRIMARY KEY, layout_json TEXT);
`);

console.log("SQLite database initialized successfully.");
