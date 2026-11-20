const KEY_BAL = "kgt_sovereign_wallet_v2";
const KEY_TXS = "kgt_sovereign_txs_v2";
const KEY_LANG = "kgt_active_lang_v1";

export function getActiveLang() {
  try {
    const saved = localStorage.getItem(KEY_LANG); if (saved) return saved; const nav = (typeof navigator !== "undefined" ? navigator.language : "rw").slice(0, 2).toUpperCase(); return ["RW","EN","FR","SW","ES","AR","ZH","PT","DE","HI","RU","JA","KO","TR","IT"].includes(nav) ? nav : "RW";
  } catch {
    return "RW";
  }
}

export function setActiveLang(code) {
  try {
    localStorage.setItem(KEY_LANG, code);
    window.dispatchEvent(new Event("kgt-lang-updated"));
  } catch {}
}

export function getWalletState() {
  try {
    const raw = localStorage.getItem(KEY_BAL);
    if (raw) return JSON.parse(raw);
  } catch {}
  const init = {
    usd: 25000.0,
    rwf: 37000000,
    btc: 0.42,
    eth: 4.5,
    sol: 35.0,
    paxg: 1.85,
    totalYieldEarnedUsd: 1420.5,
  };
  localStorage.setItem(KEY_BAL, JSON.stringify(init));
  return init;
}

export function getLedgerTxs() {
  try {
    const raw = localStorage.getItem(KEY_TXS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function recordSovereignTx({
  hub,
  title,
  amountUsd,
  rwfRate = 1480,
  type = "DEBIT",
  assetCode = "USDT",
  assetQty = 0,
}) {
  const w = getWalletState();
  const amt = Number(amountUsd || 0);
  const qty = Number(assetQty || 0);
  const amtRwf = Math.round(amt * Number(rwfRate || 1480));

  if (type === "CREDIT") {
    w.usd = Number((w.usd + amt).toFixed(2));
    w.rwf = Math.round(w.rwf + amtRwf);
    if (assetCode === "BTC" && qty > 0) w.btc = Number(Math.max(0, w.btc - qty).toFixed(6));
    if (assetCode === "ETH" && qty > 0) w.eth = Number(Math.max(0, w.eth - qty).toFixed(5));
    if (assetCode === "SOL" && qty > 0) w.sol = Number(Math.max(0, w.sol - qty).toFixed(4));
    if (assetCode === "PAXG" && qty > 0) w.paxg = Number(Math.max(0, w.paxg - qty).toFixed(5));
  } else {
    w.usd = Number(Math.max(0, w.usd - amt).toFixed(2));
    w.rwf = Math.max(0, Math.round(w.rwf - amtRwf));
    w.totalYieldEarnedUsd = Number((w.totalYieldEarnedUsd + amt * 0.045).toFixed(2));
    if (assetCode === "BTC" && qty > 0) w.btc = Number((w.btc + qty).toFixed(6));
    if (assetCode === "ETH" && qty > 0) w.eth = Number((w.eth + qty).toFixed(5));
    if (assetCode === "SOL" && qty > 0) w.sol = Number((w.sol + qty).toFixed(4));
    if (assetCode === "PAXG" && qty > 0) w.paxg = Number((w.paxg + qty).toFixed(5));
  }

  localStorage.setItem(KEY_BAL, JSON.stringify(w));

  const tx = {
    id: "KGT-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900),
    time: new Date().toLocaleTimeString(),
    hub,
    title,
    type,
    amountUsd: amt,
    amountRwf: amtRwf,
  };
  const list = [tx, ...getLedgerTxs()].slice(0, 150);
  localStorage.setItem(KEY_TXS, JSON.stringify(list));
  window.dispatchEvent(new Event("kgt-wallet-updated"));
  try {
    fetch("/api/sovereign/tx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    }).catch(() => {});
  } catch {}
  return { wallet: w, tx };
}
