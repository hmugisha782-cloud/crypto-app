import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const DB_FILE = path.resolve("backend/data/sovereign_ledger.json");

function loadLedger() {
  try {
    if (fs.existsSync(DB_FILE)) return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {}
  return [];
}

function saveLedger(list) {
  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(list.slice(0, 1000), null, 2), "utf8");
  } catch {}
}

router.get("/status", (req, res) => {
  const list = loadLedger();
  res.json({
    ok: true,
    suite: "Enterprise Suite v172.0",
    activeHubs: 61,
    persistentDiskDb: "backend/data/sovereign_ledger.json",
    totalTransactions: list.length,
    kigaliTime: new Date().toISOString(),
  });
});

router.get("/ledger", (req, res) => {
  const list = loadLedger();
  res.json({ ok: true, count: list.length, transactions: list.slice(0, 100) });
});

router.post("/tx", (req, res) => {
  const list = loadLedger();
  const entry = {
    id: req.body?.id || "KGT-SRV-" + Date.now(),
    hub: req.body?.hub || "Sovereign Hub",
    title: req.body?.title || "Executed Order",
    amountUsd: Number(req.body?.amountUsd || 0),
    amountRwf: Number(req.body?.amountRwf || 0),
    type: req.body?.type || "DEBIT",
    recordedAt: new Date().toISOString(),
  };
  list.unshift(entry);
  saveLedger(list);
  res.status(201).json({ ok: true, entry });
});

export default router;
