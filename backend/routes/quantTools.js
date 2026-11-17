import express from "express";

const router = express.Router();

router.get("/correlation", (req, res) => {
  res.json({
    base: "BTC",
    correlations: [
      { asset: "ETH", score: 0.89, strength: "Strong Positive" },
      { asset: "SOL", score: 0.82, strength: "Strong Positive" },
      { asset: "ADA", score: 0.76, strength: "Moderate Positive" },
      { asset: "USDT", score: -0.02, strength: "Uncorrelated" },
    ],
  });
});

router.post("/position-size", (req, res) => {
  const accountUsd = Math.max(0, Number(req.body?.accountUsd) || 1000);
  const riskPercent = Math.min(100, Math.max(0.1, Number(req.body?.riskPercent) || 2));
  const stopLossPercent = Math.min(99, Math.max(0.5, Number(req.body?.stopLossPercent) || 5));
  const riskAmountUsd = accountUsd * (riskPercent / 100);
  const positionSizeUsd = riskAmountUsd / (stopLossPercent / 100);
  res.json({
    accountUsd,
    riskAmountUsd: Number(riskAmountUsd.toFixed(2)),
    recommendedPositionUsd: Number(positionSizeUsd.toFixed(2)),
  });
});

router.post("/break-even", (req, res) => {
  const entryPrice = Math.max(0, Number(req.body?.entryPrice) || 0);
  const feePercent = Math.max(0, Number(req.body?.feePercent) || 0.1);
  const multiplier = (1 + feePercent / 100) / Math.max(0.01, 1 - feePercent / 100);
  res.json({
    entryPrice,
    feePercent,
    breakEvenPrice: Number((entryPrice * multiplier).toFixed(4)),
  });
});

router.post("/compound-interest", (req, res) => {
  const principal = Math.max(0, Number(req.body?.principal) || 1000);
  const apy = Math.max(0, Number(req.body?.apy) || 8) / 100;
  const years = Math.min(30, Math.max(1, Number(req.body?.years) || 3));
  const finalAmount = principal * Math.pow(1 + apy / 12, 12 * years);
  res.json({
    principal,
    years,
    finalAmountUsd: Number(finalAmount.toFixed(2)),
    profitUsd: Number((finalAmount - principal).toFixed(2)),
  });
});

router.get("/market-hours", (req, res) => {
  res.json({
    kigaliUtcOffset: "UTC+2",
    cryptoMarket: "24/7 Continuous",
    sessions: [
      { city: "Kigali (CAT)", status: "Active", localWindow: "24 Hours" },
      { city: "London (LSE)", status: "08:00 - 16:30 UTC" },
      { city: "New York (NYSE)", status: "14:30 - 21:00 UTC" },
      { city: "Tokyo (TSE)", status: "00:00 - 06:00 UTC" },
    ],
  });
});

router.get("/liquidity-check", async (req, res) => {
  const symbol = String(req.query.symbol || "BTCUSDT").toUpperCase();
  try {
    const resp = await fetch(`https://binance.com{symbol}`);
    const t = await resp.json();
    const vol = Number(t.quoteVolume) || 0;
    res.json({
      symbol,
      quoteVolume24hUsd: Math.round(vol),
      liquidityTier: vol > 100000000 ? "Deep Liquidity" : vol > 10000000 ? "Healthy" : "Low Liquidity",
    });
  } catch {
    res.status(502).json({ message: "Unable to verify liquidity." });
  }
});

router.get("/trending-pairs", async (req, res) => {
  try {
    const resp = await fetch("https://binance.com");
    const all = await resp.json();
    const top = Array.isArray(all)
      ? all.filter((t) => t.symbol.endsWith("USDT")).sort((a, b) => Number(b.count) - Number(a.count)).slice(0, 8)
      : [];
    res.json({
      pairs: top.map((t) => ({ symbol: t.symbol, trades24h: Number(t.count), lastPrice: Number(t.lastPrice) })),
    });
  } catch {
    res.status(502).json({ message: "Unable to load trending pairs." });
  }
});

export default router;
