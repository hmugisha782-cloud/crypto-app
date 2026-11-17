import express from "express";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/markets", (req, res) => {
  res.json({
    categories: [
      "All Games & Sports",
      "Cricket & Rugby",
      "Golf & Snooker",
      "Cycling & Athletics",
      "Volleyball & Table Tennis",
      "Darts & Billiards",
      "Chess, Ludo & Skill Games",
      "Megaways Slots",
      "Instant Mini-Games",
      "Football",
      "Basketball & US Sports",
      "Tennis & Motorsport",
      "UFC & Boxing",
      "Esports",
      "Horse & Virtuals",
      "Crash & Instant Games",
      "Video Slots",
      "Live Casino Tables",
      "TV Game Shows",
      "Lottery & Keno",
      "Crypto 15m"
    ],
    events: [
      // 13. Cricket & Rugby
      { id: "crk1", category: "Cricket & Rugby", league: "IPL & ICC Cricket World Cup", match: "India vs Australia (T20 International)", options: [{ label: "India", odds: 1.85 }, { label: "Australia", odds: 1.98 }] },
      { id: "crk2", category: "Cricket & Rugby", league: "Rugby World Cup", match: "South Africa Springboks vs New Zealand All Blacks", options: [{ label: "Springboks", odds: 1.90 }, { label: "All Blacks", odds: 1.92 }] },
      // 14. Golf & Snooker
      { id: "glf1", category: "Golf & Snooker", league: "PGA Tour · The Masters", match: "Scottie Scheffler vs Rory McIlroy (Tournament Winner)", options: [{ label: "Scheffler", odds: 2.40 }, { label: "McIlroy", odds: 3.10 }, { label: "Jon Rahm", odds: 4.50 }] },
      { id: "glf2", category: "Golf & Snooker", league: "World Snooker Championship", match: "Ronnie O'Sullivan vs Judd Trump", options: [{ label: "O'Sullivan", odds: 1.88 }, { label: "Judd Trump", odds: 1.92 }] },
      // 15. Cycling & Athletics
      { id: "cyc1", category: "Cycling & Athletics", league: "Tour de France", match: "Tadej Pogacar vs Jonas Vingegaard (Yellow Jersey)", options: [{ label: "Pogacar", odds: 1.65 }, { label: "Vingegaard", odds: 2.35 }] },
      { id: "cyc2", category: "Cycling & Athletics", league: "World Athletics 100m", match: "Noah Lyles vs Kishane Thompson (100m Final)", options: [{ label: "Noah Lyles", odds: 1.80 }, { label: "Thompson", odds: 2.05 }] },
      // 16. Volleyball & Table Tennis
      { id: "vol1", category: "Volleyball & Table Tennis", league: "FIVB Volleyball Nations League", match: "Poland vs Brazil", options: [{ label: "Poland", odds: 1.75 }, { label: "Brazil", odds: 2.10 }] },
      { id: "vol2", category: "Volleyball & Table Tennis", league: "WTT Table Tennis Grand Smash", match: "Fan Zhendong vs Wang Chuqin", options: [{ label: "Fan Zhendong", odds: 1.95 }, { label: "Wang Chuqin", odds: 1.85 }] },
      // 17. Darts & Billiards
      { id: "drt1", category: "Darts & Billiards", league: "PDC World Darts Championship", match: "Luke Littler vs Michael van Gerwen", options: [{ label: "Luke Littler", odds: 1.78 }, { label: "van Gerwen", odds: 2.05 }] },
      { id: "drt2", category: "Darts & Billiards", league: "Mosconi Cup 9-Ball Pool", match: "Team Europe vs Team USA", options: [{ label: "Europe", odds: 1.68 }, { label: "USA", odds: 2.20 }] },
      // 18. Chess, Ludo & Skill Games
      { id: "skl1", category: "Chess, Ludo & Skill Games", league: "FIDE World Blitz Chess", match: "Magnus Carlsen vs Hikaru Nakamura", options: [{ label: "Carlsen", odds: 1.70 }, { label: "Nakamura", odds: 2.18 }] },
      { id: "skl2", category: "Chess, Ludo & Skill Games", league: "Multiplayer Skill Rooms", match: "🎲 Ludo King Cash · 🀄 Dominoes Pro · ⚫ Checkers Blitz", options: [{ label: "Win 2x Room", odds: 2.00 }, { label: "4-Player 3.8x", odds: 3.80 }] },
      // 19. Megaways Slots
      { id: "mgw1", category: "Megaways Slots", league: "Big Time & Pragmatic Megaways", match: "🐃 Buffalo King Megaways · 🍭 Sugar Rush 1000 · 🤠 Wanted Dead or a Wild", options: [{ label: "Base Hit 3x", odds: 3.00 }, { label: "Super Bonus 30x", odds: 30.0 }, { label: "Max 500x", odds: 500.0 }] },
      // 20. Instant Mini-Games
      { id: "mng1", category: "Instant Mini-Games", league: "Turbo Arcade & Penalty Shootout", match: "⚽ Penalty Shootout · 🃏 Hi-Lo Card · 🎡 Mega Wheel 500x", options: [{ label: "Goal / High 1.95x", odds: 1.95 }, { label: "Hat-Trick 6x", odds: 6.00 }, { label: "Mega Wheel 50x", odds: 50.0 }] },
      // 1. Football
      { id: "fb1", category: "Football", league: "UEFA Champions League", match: "Real Madrid vs Manchester City", options: [{ label: "1", odds: 2.25 }, { label: "X", odds: 3.55 }, { label: "2", odds: 2.95 }] },
      { id: "fb2", category: "Football", league: "English Premier League", match: "Arsenal vs Liverpool", options: [{ label: "1", odds: 2.40 }, { label: "X", odds: 3.40 }, { label: "2", odds: 2.85 }] },
      { id: "fb3", category: "Football", league: "Spanish La Liga", match: "FC Barcelona vs Atletico Madrid", options: [{ label: "1", odds: 1.85 }, { label: "X", odds: 3.65 }, { label: "2", odds: 4.10 }] },
      { id: "fb4", category: "Football", league: "AFCON & FIFA Qualifiers", match: "Rwanda Amavubi vs Nigeria", options: [{ label: "1", odds: 4.10 }, { label: "X", odds: 3.30 }, { label: "2", odds: 1.90 }] },
      // 2. Basketball & US Sports
      { id: "us1", category: "Basketball & US Sports", league: "NBA Basketball", match: "LA Lakers vs Boston Celtics", options: [{ label: "Lakers", odds: 2.15 }, { label: "Celtics", odds: 1.72 }] },
      { id: "us2", category: "Basketball & US Sports", league: "NFL American Football", match: "Kansas City Chiefs vs San Francisco 49ers", options: [{ label: "Chiefs", odds: 1.84 }, { label: "49ers", odds: 1.98 }] },
      { id: "us3", category: "Basketball & US Sports", league: "MLB Baseball & NHL Hockey", match: "NY Yankees vs LA Dodgers", options: [{ label: "Yankees", odds: 1.95 }, { label: "Dodgers", odds: 1.87 }] },
      // 3. Tennis & Motorsport
      { id: "tm1", category: "Tennis & Motorsport", league: "ATP Grand Slam Tennis", match: "Carlos Alcaraz vs Jannik Sinner", options: [{ label: "Alcaraz", odds: 1.92 }, { label: "Sinner", odds: 1.92 }] },
      { id: "tm2", category: "Tennis & Motorsport", league: "Formula 1 Grand Prix", match: "Max Verstappen vs Lewis Hamilton vs Charles Leclerc", options: [{ label: "Verstappen", odds: 1.75 }, { label: "Hamilton", odds: 3.40 }, { label: "Leclerc", odds: 4.20 }] },
      { id: "tm3", category: "Tennis & Motorsport", league: "MotoGP World Championship", match: "Francesco Bagnaia vs Marc Marquez", options: [{ label: "Bagnaia", odds: 1.90 }, { label: "Marquez", odds: 1.95 }] },
      // 4. UFC & Boxing
      { id: "cb1", category: "UFC & Boxing", league: "UFC Heavyweight Title", match: "Jon Jones vs Tom Aspinall", options: [{ label: "Jon Jones", odds: 2.10 }, { label: "Tom Aspinall", odds: 1.76 }] },
      { id: "cb2", category: "UFC & Boxing", league: "World Heavyweight Boxing", match: "Oleksandr Usyk vs Tyson Fury", options: [{ label: "Usyk", odds: 1.80 }, { label: "Fury", odds: 2.05 }] },
      // 5. Esports
      { id: "es1", category: "Esports", league: "Counter-Strike 2 Major", match: "Natus Vincere vs FaZe Clan", options: [{ label: "NAVI", odds: 1.85 }, { label: "FaZe", odds: 1.95 }] },
      { id: "es2", category: "Esports", league: "League of Legends Worlds", match: "T1 vs Gen.G", options: [{ label: "T1", odds: 1.90 }, { label: "Gen.G", odds: 1.90 }] },
      { id: "es3", category: "Esports", league: "Dota 2 The International", match: "Team Spirit vs Gaimin Gladiators", options: [{ label: "Spirit", odds: 1.82 }, { label: "Gladiators", odds: 2.00 }] },
      { id: "es4", category: "Esports", league: "Valorant Champions", match: "Sentinels vs Fnatic", options: [{ label: "Sentinels", odds: 1.95 }, { label: "Fnatic", odds: 1.85 }] },
      // 6. Horse & Virtuals
      { id: "hv1", category: "Horse & Virtuals", league: "Dubai World Cup Racing", match: "Thunder Snow vs Golden Sixty", options: [{ label: "Thunder Snow", odds: 2.60 }, { label: "Golden Sixty", odds: 2.20 }] },
      { id: "hv2", category: "Horse & Virtuals", league: "24/7 Virtual Premier League", match: "Kigali FC vs London Blues (Instant 3m)", options: [{ label: "1", odds: 2.05 }, { label: "X", odds: 3.20 }, { label: "2", odds: 3.45 }] },
      // 7. Crash & Instant Games
      { id: "cg1", category: "Crash & Instant Games", league: "Crash Multipliers", match: "✈️ Aviator · 🚀 Spaceman · 🛩️ JetX", options: [{ label: "Safe 1.50x", odds: 1.50 }, { label: "Pro 3.00x", odds: 3.00 }, { label: "Moon 10.0x", odds: 10.0 }] },
      { id: "cg2", category: "Crash & Instant Games", league: "Arcade Provably Fair", match: "🔺 Plinko · 💣 Mines · 🪙 Coin Flip · 🎯 Limbo", options: [{ label: "Plinko 2.5x", odds: 2.50 }, { label: "Mines 4.2x", odds: 4.20 }, { label: "CoinFlip 1.96x", odds: 1.96 }] },
      // 8. Video Slots
      { id: "sl1", category: "Video Slots", league: "Pragmatic & Play'n GO", match: "🍬 Sweet Bonanza · ⚡ Gates of Olympus · 📖 Book of Dead", options: [{ label: "Spin 2x Bonus", odds: 2.00 }, { label: "Free Spins 15x", odds: 15.0 }, { label: "Max Win 100x", odds: 100.0 }] },
      { id: "sl2", category: "Video Slots", league: "Progressive Jackpot Slots", match: "🦁 Mega Moolah · 🎣 Big Bass Bonanza · ✨ Starburst", options: [{ label: "Mini 5x", odds: 5.0 }, { label: "Major 25x", odds: 25.0 }, { label: "Mega 250x", odds: 250.0 }] },
      // 9. Live Casino Tables
      { id: "lc1", category: "Live Casino Tables", league: "Evolution Live Studio", match: "🎡 Lightning Roulette · 🃏 VIP Blackjack · 🎴 Baccarat", options: [{ label: "Red/Player 2x", odds: 2.00 }, { label: "Tie 8x", odds: 8.00 }, { label: "Zero 36x", odds: 36.0 }] },
      { id: "lc2", category: "Live Casino Tables", league: "Poker & Dice Tables", match: "♠️ Texas Hold'em Poker · 🎲 Craps · 🐉 Dragon Tiger", options: [{ label: "Ante Win 2x", odds: 2.00 }, { label: "Flush 6x", odds: 6.00 }, { label: "Royal 50x", odds: 50.0 }] },
      // 10. TV Game Shows
      { id: "gs1", category: "TV Game Shows", league: "Live Wheel & Studio Shows", match: "🎪 Crazy Time · 🎩 Monopoly Live · 🍭 CandyLand · 💼 Deal or No Deal", options: [{ label: "Number 2x", odds: 2.00 }, { label: "Coin Flip 5x", odds: 5.00 }, { label: "Crazy Bonus 40x", odds: 40.0 }] },
      // 11. Lottery & Keno
      { id: "lt1", category: "Lottery & Keno", league: "Global Draws & Instant Cards", match: "🎟️ US Powerball · 🇪🇺 EuroMillions · 🔢 Keno 80 · 🎫 Gold Scratch", options: [{ label: "3-Match 4x", odds: 4.00 }, { label: "5-Match 50x", odds: 50.0 }, { label: "Jackpot 500x", odds: 500.0 }] },
      // 12. Crypto 15m
      { id: "cr1", category: "Crypto 15m", league: "15-Min Price Binary Options", match: "₿ Bitcoin (BTC) · Ξ Ethereum (ETH) · ◎ Solana (SOL) 15m Candle", options: [{ label: "UP (Call)", odds: 1.88 }, { label: "DOWN (Put)", odds: 1.88 }] }
    ],
  });
});

router.get("/slips", authenticateToken, (req, res) => {
  const slips = db
    .prepare("SELECT id, category, event_title AS eventTitle, pick, odds, stake_rwf AS stakeRwf, potential_payout_rwf AS potentialPayoutRwf, status, created_at AS createdAt FROM betting_slips WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.user.id);
  res.json({ slips });
});

router.post("/place-bet", authenticateToken, (req, res) => {
  const { category, eventTitle, pick, odds, stakeRwf } = req.body || {};
  const stake = Math.max(500, Number(stakeRwf) || 1000);
  const oddVal = Math.max(1.01, Number(odds) || 1.5);
  const payout = Math.round(stake * oddVal);
  const id = "BET-" + Date.now();
  db.prepare("INSERT INTO betting_slips (id, user_id, category, event_title, pick, odds, stake_rwf, potential_payout_rwf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .run(id, req.user.id, String(category || "Global Gaming"), String(eventTitle || "Event"), String(pick || "Win"), oddVal, stake, payout);
  res.json({ ok: true, id, potentialPayoutRwf: payout });
});

export default router;
