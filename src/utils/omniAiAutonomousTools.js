import { getWalletState, recordSovereignTx } from "./sovereignLedger.js";
import { getLiveMarketSnapshot } from "./liveMarketStore.js";

export function tryExecuteAutonomousTool(rawQuery, lang = "RW") {
  const q = rawQuery.trim();
  const lower = q.toLowerCase();
  const w = getWalletState();
  const snap = getLiveMarketSnapshot();
  const rwf = snap.rwfRate || 1480;

  // 1. Autonomous Deposit / Top-Up
  const dep = lower.match(/(?:deposit|top\s*up|bika|ongeramo)\s*\$?(\d+(?:\.\d+)?)/);
  if (dep) {
    const usd = Math.max(1, Number(dep.at(1)));
    const { tx, wallet } = recordSovereignTx({ hub: "KGT Omni-AI Agent", title: `AI Deposit ($${usd})`, amountUsd: usd, rwfRate: rwf, type: "CREDIT" });
    return `✅ **AI Action Executed [${tx.id}]:** Credited **$${usd} USD (${Math.round(usd * rwf).toLocaleString()} RWF)** to Wallet. New Balance: **$${wallet.usd.toLocaleString()} USDT**!`;
  }

  // 2. Autonomous Withdraw / Cash-Out
  const wit = lower.match(/(?:withdraw|cash\s*out|bikuza|kura)\s*\$?(\d+(?:\.\d+)?)/);
  if (wit) {
    const usd = Math.max(1, Number(wit.at(1)));
    if (usd > w.usd) return `⚠️ **Insufficient Balance:** Wallet has **$${w.usd.toFixed(2)} USDT** available.`;
    const { tx, wallet } = recordSovereignTx({ hub: "KGT Omni-AI Agent", title: `AI MoMo/Bank Cash-Out ($${usd})`, amountUsd: usd, rwfRate: rwf, type: "DEBIT" });
    return `🏧 **AI Cash-Out Sent [${tx.id}]:** Withdrew **$${usd} USD (${Math.round(usd * rwf).toLocaleString()} RWF)** to MTN MoMo/BK. Remaining: **$${wallet.usd.toLocaleString()} USDT**!`;
  }

  // 3. Autonomous P2P Send
  const p2p = lower.match(/(?:send|transfer|ohereza)\s*\$?(\d+(?:\.\d+)?)(?:\s*(?:to|kuri)\s*([+\d\w@.-]+))?/);
  if (p2p) {
    const usd = Math.max(1, Number(p2p.at(1)));
    const to = p2p.at(2) || "+250 788 000 000";
    if (usd > w.usd) return `⚠️ **Insufficient Balance:** Wallet has **$${w.usd.toFixed(2)} USDT** available.`;
    const { tx, wallet } = recordSovereignTx({ hub: "KGT Omni-AI P2P", title: `AI Instant P2P to ${to}`, amountUsd: usd, rwfRate: rwf, type: "DEBIT" });
    return `📲 **AI P2P Transfer Complete [${tx.id}]:** Sent **$${usd} USD (${Math.round(usd * rwf).toLocaleString()} RWF)** to **${to}**. Balance: **$${wallet.usd.toLocaleString()} USDT**!`;
  }

  // 4. Autonomous Crypto / 24K Gold Buy
  const buy = lower.match(/(?:buy|gura)\s*\$?(\d+(?:\.\d+)?)\s*(?:of|ya|bya)?\s*(btc|bitcoin|eth|ethereum|sol|solana|gold|zahabu|paxg)/);
  if (buy) {
    const usd = Math.max(5, Number(buy.at(1)));
    const rawSym = buy.at(2);
    const sym = rawSym.startsWith("bt") ? "BTC" : rawSym.startsWith("et") ? "ETH" : rawSym.startsWith("so") ? "SOL" : "PAXG";
    const px = snap.prices[`${sym}/USDT`]?.price || 65420;
    const qty = Number((usd / px).toFixed(6));
    if (usd > w.usd) return `⚠️ **Insufficient Balance:** Wallet has **$${w.usd.toFixed(2)} USDT** available.`;
    const { tx, wallet } = recordSovereignTx({ hub: "KGT Omni-AI Trading", title: `AI Spot Buy ${qty} ${sym}`, amountUsd: usd, rwfRate: rwf, type: "DEBIT", assetCode: sym, assetQty: qty });
    return `🚀 **AI Spot Order Filled [${tx.id}]:** Bought **${qty} ${sym}** for **$${usd} USD (${Math.round(usd * rwf).toLocaleString()} RWF)** @ $${px.toLocaleString()}! Remaining Cash: **$${wallet.usd.toLocaleString()} USDT**.`;
  }

  // 5. Autonomous Section Navigator
  const navs = [
    { k: ["gold", "zahabu", "minerals", "3ts"], id: "omni-global-mining-minerals-hub", n: "3Ts Minerals & 24K Gold Hub" },
    { k: ["sport", "bet", "apr", "rayon", "football"], id: "sovereign-quick-bet-slip", n: "150-Nation Sportsbook" },
    { k: ["ebm", "tax", "rra", "umusoro"], id: "sovereign-rwanda-tax-ebm-calculator", n: "RRA EBM v2.1 Tax Signer" },
    { k: ["land", "upi", "ubutaka"], id: "sovereign-rwanda-land-registry", n: "Rwanda UPI Land Registry" },
    { k: ["p2p", "merchant"], id: "sovereign-p2p-orderbook-hub", n: "Rwanda P2P Orderbook" },
  ];
  if (/(open|go to|jump|jya kuri|fungura|nyereka)/.test(lower)) {
    const hit = navs.find((x) => x.k.some((w) => lower.includes(w)));
    if (hit) {
      const el = document.getElementById(hit.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return `🧭 **Opened ${hit.n}!** Scroll down slightly to interact with it directly.`;
    }
  }

  return null;
}
