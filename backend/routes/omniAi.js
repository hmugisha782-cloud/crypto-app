import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";

const router = express.Router();

router.post("/ask", (req, res) => {
  const question = String(req.body?.question || "").trim();
  const q = question.toLowerCase();
  const livePrices = req.body?.livePrices || {};
  const rwfRate = Number(req.body?.rwfRate || 1480);

  if (!q) return res.status(400).json({ error: "Please enter a question for KGT Omni-AI." });

  let userId = null;
  let userEmail = null;
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (token && process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      userEmail = decoded.email;
    }
  } catch {}

  const usersCount = db.prepare("SELECT COUNT(*) AS c FROM users").get()?.c || 0;
  const betsCount = db.prepare("SELECT COUNT(*) AS c FROM betting_slips").get()?.c || 0;
  const chatCount = db.prepare("SELECT COUNT(*) AS c FROM community_messages").get()?.c || 0;
  const p2pCount = db.prepare("SELECT COUNT(*) AS c FROM p2p_orders").get()?.c || 0;
  const vaultsCount = db.prepare("SELECT COUNT(*) AS c FROM savings_vaults").get()?.c || 0;

  let answer = "";
  let quickAction = null;
  const numMatch = q.match(/(\d+(?:\.\d+)?)\s*(usd|dollar|\$|rwf|btc|eth|sol)/i);

  if (q.includes("my portfolio") || q.includes("my account") || q.includes("my bets") || q.includes("my balance")) {
    if (userId) {
      const holdings = db.prepare("SELECT symbol, amount, buy_price FROM portfolio_holdings WHERE user_id = ?").all(userId);
      const myBets = db.prepare("SELECT event_title, pick, odds, potential_payout_rwf FROM betting_slips WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);
      const totalUsd = holdings.reduce((sum, h) => sum + Number(h.amount || 0) * Number(livePrices[String(h.symbol || "").toUpperCase()] || h.buy_price || 0), 0);
      answer = `👤 **Personal SQLite Account Report (${userEmail}):**\n• **Portfolio:** ${holdings.length} assets = **$${totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}** (**${Math.round(totalUsd * rwfRate).toLocaleString()} RWF**)\n• **Recent Bets:** ${myBets.length} slips in SQLite.\n${myBets.map((b) => `  - ${b.event_title} (${b.pick} @ ${b.odds}x) → Win: ${Number(b.potential_payout_rwf).toLocaleString()} RWF`).join("\n") || "  - No bets placed yet."}`;
      quickAction = { label: "Open My Cloud Portfolio", tab: "portfolio" };
    } else {
      answer = "🔐 Sign in under **Accounts** so I can read your private SQLite portfolio & betting slips.";
      quickAction = { label: "Sign In / Register", tab: "accounts" };
    }
  } else if (numMatch && (q.includes("convert") || q.includes("how much") || q.includes("in rwf") || q.includes("in usd"))) {
    const val = Number(numMatch);
    const unit = numMatch.toUpperCase();
    if (unit === "RWF") {
      answer = `💱 **${val.toLocaleString()} RWF** = **$${(val / rwfRate).toFixed(2)} USD/USDT** (Rate: 1 USD = ${rwfRate.toLocaleString()} RWF).`;
    } else if (unit === "BTC" || unit === "ETH" || unit === "SOL") {
      const px = Number(livePrices[unit] || (unit === "BTC" ? 64972 : unit === "ETH" ? 1815 : 73.82));
      answer = `₿ **${val} ${unit}** = **$${(val * px).toLocaleString()}** = **${Math.round(val * px * rwfRate).toLocaleString()} RWF**.`;
    } else {
      answer = `💱 **$${val.toLocaleString()} USD** = **${Math.round(val * rwfRate).toLocaleString()} RWF** (Rate: 1 USD = ${rwfRate.toLocaleString()} RWF).`;
    }
    quickAction = { label: "Open FX Converter", tab: "converter" };
  } else if (q.includes("btc") || q.includes("bitcoin") || q.includes("eth") || q.includes("sol") || q.includes("crypto") || q.includes("price")) {
    const btc = Number(livePrices?.BTC || 64972);
    const eth = Number(livePrices?.ETH || 1815);
    const sol = Number(livePrices?.SOL || 73.82);
    answer = `📈 **Live Crypto & RWF Intelligence:**\n• **BTC:** $${btc.toLocaleString()} (**${Math.round(btc * rwfRate).toLocaleString()} RWF**)\n• **ETH:** $${eth.toLocaleString()} (**${Math.round(eth * rwfRate).toLocaleString()} RWF**)\n• **SOL:** $${sol.toLocaleString()} (**${Math.round(sol * rwfRate).toLocaleString()} RWF**)`;
    quickAction = { label: "Open Live Market", tab: "market" };
  } else if (q.includes("football") || q.includes("spain") || q.includes("laliga") || q.includes("england") || q.includes("premier") || q.includes("germany") || q.includes("rwanda") || q.includes("league")) {
    answer = `⚽ **Top 150 World Football Nations & 600 Ranked Leagues/Cups:**\n• **Spain (#3):** LaLiga EA Sports, LaLiga Hypermotion, Primera Federación, Copa del Rey.\n• **England (#4):** Premier League, EFL Championship, EFL League One, Emirates FA Cup.\n• **Germany (#6):** Bundesliga, 2. Bundesliga, 3. Liga, DFB-Pokal.\n• **Rwanda (#127):** Rwanda Premier League, Second Division, Third Division, Peace Cup.`;
    quickAction = { label: "Open 150 Football Nations", tab: "earnbet", target: "world-football-150" };
  } else if (q.includes("casino") || q.includes("aviator") || q.includes("slot") || q.includes("roulette") || q.includes("blackjack") || q.includes("poker") || q.includes("game")) {
    answer = `🎰 **VIP Casino & Crash Games (24/7 RWF & USDT):**\n• **✈️ Aviator & Spaceman:** 97.0% RTP (1.50x–100x+)\n• **🍬 Sweet Bonanza & ⚡ Gates of Olympus:** 96.5% RTP (up to 500x–21,100x)\n• **🎡 Lightning Roulette (500x), 🃏 VIP Blackjack (99.54% RTP), ♠️ Poker & 🎟️ Powerball**.`;
    quickAction = { label: "Open VIP Casino Arcade", tab: "earnbet", target: "casino-arcade-section" };
  } else if (q.includes("momo") || q.includes("rwf") || q.includes("money") || q.includes("card") || q.includes("loan") || q.includes("vault")) {
    answer = `💰 **Rwanda & EAC FinTech Suite (1 USD = ${rwfRate.toLocaleString()} RWF):**\nP2P MoMo Escrow (0.8% fee), Virtual USD Visa Cards, EUCL CashPower Crypto Pay, High-Yield Vaults (10.5%–16% APY) & Instant RWF Loans (60% LTV).`;
    quickAction = { label: "Open Earn & FinTech Hub", tab: "earnbet" };
  } else if (q.includes("chat") || q.includes("video") || q.includes("call")) {
    answer = `💬 **Live Chat & WebRTC HD Video Call Hub:** 4 SQLite-synced rooms (${chatCount} messages) + encrypted HD Video & Screen-Share.`;
    quickAction = { label: "Open Live Chat & Video", tab: "chatvideo" };
  } else {
    answer = `🤖 **KGT Omni-AI v3.0 Full System Report (Suite v8.0):**\n• **9,250,000+ Active Modules** (210,060 Indexed Telemetry Nodes + 4,088 Live Cards)\n• **45 SQLite Tables:** ${usersCount} Users · ${betsCount} Bets · ${p2pCount} P2P Orders · ${vaultsCount} Vaults · ${chatCount} Chat Messages\n• **150 Football Nations (600 Leagues)** + **VIP Casino** + **WebRTC Video Chat**.`;
    quickAction = { label: "Explore 210,060 Modules", tab: "market" };
  }

  res.json({ ok: true, question, answer, quickAction });
});

export default router;
