import express from "express";

const router = express.Router();
let moversCache = { data: null, at: 0 };
let pulseCache = { data: null, at: 0 };
let rwfCache = { rate: 1380, at: 0 };

router.get("/movers", async (req, res) => {
  try {
    if (moversCache.data && Date.now() - moversCache.at < 5 * 60 * 1000) {
      return res.json(moversCache.data);
    }
    const resp = await fetch("https://binance.com");
    const all = await resp.json();
    const usdt = Array.isArray(all)
      ? all.filter((t) => t.symbol.endsWith("USDT") && Number(t.quoteVolume) > 5000000)
      : [];
    const sorted = usdt.sort((a, b) => Number(b.priceChangePercent) - Number(a.priceChangePercent));
    const payload = {
      gainers: sorted.slice(0, 5).map((t) => ({ symbol: t.symbol.replace("USDT", ""), price: Number(t.lastPrice), change: Number(t.priceChangePercent) })),
      losers: sorted.slice(-5).reverse().map((t) => ({ symbol: t.symbol.replace("USDT", ""), price: Number(t.lastPrice), change: Number(t.priceChangePercent) })),
    };
    moversCache = { data: payload, at: Date.now() };
    res.json(payload);
  } catch {
    res.status(502).json({ message: "Unable to fetch market movers right now." });
  }
});

router.get("/pulse", async (req, res) => {
  try {
    if (pulseCache.data && Date.now() - pulseCache.at < 15 * 60 * 1000) {
      return res.json(pulseCache.data);
    }
    const resp = await fetch("https://alternative.me");
    const json = await resp.json();
    const fng = (json && Array.isArray(json.data) && json.data[0]) || { value: "50", value_classification: "Neutral" };
    const payload = {
      fearGreedValue: Number(fng.value),
      classification: fng.value_classification,
      updatedAt: new Date().toISOString(),
    };
    pulseCache = { data: payload, at: Date.now() };
    res.json(payload);
  } catch {
    res.json({ fearGreedValue: 50, classification: "Neutral", fallback: true });
  }
});

router.get("/rwf-rates", async (req, res) => {
  try {
    if (Date.now() - rwfCache.at < 30 * 60 * 1000 && rwfCache.at > 0) {
      return res.json({ base: "USD", target: "RWF", rate: rwfCache.rate });
    }
    const resp = await fetch("https://er-api.com");
    const json = await resp.json();
    if (json?.rates?.RWF) {
      rwfCache = { rate: Number(json.rates.RWF), at: Date.now() };
    }
    res.json({ base: "USD", target: "RWF", rate: rwfCache.rate });
  } catch {
    res.json({ base: "USD", target: "RWF", rate: rwfCache.rate, fallback: true });
  }
});

export default router;
