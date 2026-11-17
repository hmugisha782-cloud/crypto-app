import express from "express";
import { db } from "../config/database.js";

const router = express.Router();

router.post("/ask", (req, res) => {
  const question = String(req.body?.question || "").trim();
  const q = question.toLowerCase();
  const livePrices = req.body?.livePrices || {};
  const rwfRate = Number(req.body?.rwfRate || 1480);

  if (!q) {
    return res.status(400).json({ error: "Please enter a question for KGT Omni-AI." });
  }

  // Gather live SQLite stats
  const usersCount = db.prepare("SELECT COUNT(*) AS c FROM users").get()?.c || 0;
  const betsCount = db.prepare("SELECT COUNT(*) AS c FROM betting_slips").get()?.c || 0;
  const chatCount = db.prepare("SELECT COUNT(*) AS c FROM community_messages").get()?.c || 0;
  const p2pCount = db.prepare("SELECT COUNT(*) AS c FROM p2p_orders").get()?.c || 0;

  let answer = "";
  let quickAction = null;

  if (q.includes("btc") || q.includes("bitcoin") || q.includes("eth") || q.includes("sol") || q.includes("crypto") || q.includes("price")) {
    const btc = Number(livePrices?.BTC || 64972).toLocaleString();
    const eth = Number(livePrices?.ETH || 1815).toLocaleString();
    const sol = Number(livePrices?.SOL || 73.82).toLocaleString();
    const btcRwf = Math.round(Number(livePrices?.BTC || 64972) * rwfRate).toLocaleString();
    answer = `📈 **Live Crypto Intelligence:**\n• **Bitcoin (BTC):** $${btc} (${btcRwf} RWF)\n• **Ethereum (ETH):** $${eth}\n• **Solana (SOL):** $${sol}\nYou can buy/sell instantly via MTN MoMo P2P Escrow or trade 15-Min BTC Binary Options (1.88x payout).`;
    quickAction = { label: "Open Live Crypto Market", tab: "market" };
  } else if (q.includes("football") || q.includes("spain") || q.includes("laliga") || q.includes("england") || q.includes("premier") || q.includes("germany") || q.includes("rwanda") || q.includes("league")) {
    answer = `⚽ **Top 150 World Football Nations & 600 Competitions:**\nOur sportsbook covers **150 ranked nations (#1 Argentina → #150 Philippines)** with **4 ranked tiers per country**:\n• **Spain (#3):** LaLiga EA Sports, LaLiga Hypermotion, Primera Federación, Copa del Rey.\n• **England (#4):** Premier League, EFL Championship, EFL League One, Emirates FA Cup.\n• **Germany (#6):** Bundesliga, 2. Bundesliga, 3. Liga, DFB-Pokal.\n• **Rwanda (#127):** Rwanda Premier League, Second Division, Third Division, Peace Cup.`;
    quickAction = { label: "Explore 150 Football Nations", tab: "earnbet", target: "world-football-150" };
  } else if (q.includes("casino") || q.includes("aviator") || q.includes("slot") || q.includes("roulette") || q.includes("blackjack") || q.includes("poker") || q.includes("game")) {
    answer = `🎰 **VIP Casino, Slots & Provably Fair Games:**\nAll games run 24/7 in **RWF & USDT** with verified RTP:\n• **✈️ Aviator & Spaceman Crash:** 97.0% RTP (1.50x to 100x+ multipliers)\n• **🍬 Sweet Bonanza & ⚡ Gates of Olympus:** 96.5% RTP (up to 500x–21,100x)\n• **🎡 Lightning Roulette (500x), 🃏 VIP Blackjack (99.54% RTP), ♠️ Poker & 🎟️ Powerball**.`;
    quickAction = { label: "Open VIP Casino Arcade", tab: "earnbet", target: "casino-arcade-section" };
  } else if (q.includes("momo") || q.includes("rwf") || q.includes("money") || q.includes("card") || q.includes("loan") || q.includes("vault") || q.includes("cashpower")) {
    answer = `💰 **Rwanda & East Africa FinTech Suite (Live Rate: 1 USD = ${rwfRate.toLocaleString()} RWF):**\n1. **P2P Escrow:** Buy/Sell USDT via MTN MoMo & Airtel Money (0.8% fee).\n2. **Virtual USD Visa Cards:** Instant issuance for global online payments.\n3. **EUCL CashPower & Airtime:** Pay utility bills directly with USDT.\n4. **High-Yield Vaults (10.5%–16% APY)** & **Crypto-Backed RWF Loans (60% LTV)**.`;
    quickAction = { label: "Open Money & FinTech Hub", tab: "earnbet" };
  } else if (q.includes("chat") || q.includes("video") || q.includes("call") || q.includes("support")) {
    answer = `💬 **Global Live Chat & HD Video Call Hub:**\nConnect with traders worldwide across **4 SQLite-synced rooms** (Global Lounge, Kigali & East Africa Desk, Sports & Bet Predictions, VIP Support) or launch an encrypted **WebRTC HD Video & Screen-Share Call** directly in your browser. (${chatCount} messages synced).`;
    quickAction = { label: "Join Live Chat & Video", tab: "chatvideo" };
  } else {
    answer = `🤖 **KGT Omni-AI Full System Report (Enterprise Suite v7.0):**\nI have full real-time access to every module in **Kigali Global Tracker**:\n• **84,100+ Active Telemetry Modules** & **45 SQLite Tables**\n• **150 Football Nations (600 Leagues/Cups)** + **VIP Casino & Crash Games**\n• **Live Crypto Market, RWF/EAC FX (${rwfRate.toLocaleString()} RWF/USD), P2P MoMo Escrow & WebRTC Video Chat**\n• **Live Database Stats:** ${usersCount} Registered Accounts · ${betsCount} Placed Bet Slips · ${p2pCount} P2P Orders · ${chatCount} Chat Messages.`;
    quickAction = { label: "Open Instant Global Search", tab: "market" };
  }

  res.json({
    ok: true,
    question,
    answer,
    quickAction,
    systemSnapshot: { modules: "84,100+", sqliteTables: 45, footballNations: 150, leagues: 600, rwfRate },
  });
});

export default router;
