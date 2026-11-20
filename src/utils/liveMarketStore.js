const BASE_PRICES = {
  "BTC/USDT": { sym: "BTC/USDT", name: "Bitcoin", price: 65420.5, chg: 2.45, color: "#f59e0b" },
  "ETH/USDT": { sym: "ETH/USDT", name: "Ethereum", price: 1842.8, chg: 1.88, color: "#38bdf8" },
  "PAXG/USDT": { sym: "PAXG/USDT", name: "24K Swiss Gold", price: 2748.9, chg: 1.15, color: "#eab308" },
  "SOL/USDT": { sym: "SOL/USDT", name: "Solana", price: 76.4, chg: 4.12, color: "#10b981" },
  "TON/USDT": { sym: "TON/USDT", name: "TON Network", price: 5.42, chg: 3.6, color: "#06b6d4" },
  "BNB/USDT": { sym: "BNB/USDT", name: "BNB Chain", price: 598.2, chg: 0.95, color: "#f97316" },
};

let currentPrices = JSON.parse(JSON.stringify(BASE_PRICES));
let currentRwf = 1480;
let timerStarted = false;

export function getLiveMarketSnapshot() {
  return { prices: currentPrices, rwfRate: currentRwf };
}

export function startLiveMarketEngine() {
  if (timerStarted || typeof window === "undefined") return;
  timerStarted = true;
  setInterval(() => {
    Object.keys(currentPrices).forEach((k) => {
      const item = currentPrices[k];
      const deltaPct = (Math.random() - 0.48) * 0.0025;
      const nextPx = Number((item.price * (1 + deltaPct)).toFixed(item.price > 100 ? 2 : 3));
      const nextChg = Number((item.chg + deltaPct * 100).toFixed(2));
      currentPrices[k] = { ...item, price: nextPx, chg: nextChg };
    });
    currentRwf = Math.round(1478 + Math.random() * 5);
    window.dispatchEvent(new Event("kgt-market-tick"));
  }, 3000);
}
