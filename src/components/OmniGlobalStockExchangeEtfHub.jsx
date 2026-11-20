import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const EXCHANGE_PILLARS = [
  "📈 RSE & NASDAQ Fractional Blue-Chip Stock",
  "🌐 Pan-African & Sovereign AI Index ETF",
  "🛢️ Strategic Lithium, Coffee & Crude Futures",
  "🏛️ Quantitative Delta-Neutral AI Hedge Vault",
  "💎 Bank of Kigali & MTN Rwanda Dividend Share",
  "⚡ Clean Energy & Global Semiconductor Basket",
  "🌍 Emerging Markets Sovereign Eurobond Note",
  "🤖 Automated Dividend Reinvestment (DRIP) Bot"
];

const EXCHANGES = ["RSE Kigali Floor", "NASDAQ New York", "London Stock Exch", "Nairobi NSE Hub", "Zurich SIX Swiss", "Tokyo TSE Prime", "Dubai DFM Market", "Singapore SGX"];

export default function OmniGlobalStockExchangeEtfHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [stkMsg, setStkMsg] = useState("");

  const TOTAL_TICKERS = 100000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const tickers = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_TICKERS) {
      const id = ((idx + scanned - 1) % TOTAL_TICKERS) + 1;
      scanned++;
      const p = EXCHANGE_PILLARS[id % EXCHANGE_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const ex = EXCHANGES[(id * 113) % EXCHANGES.length];
      const title = `${p} · ${ex} #${String(id).padStart(39, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const shareUsd = Number((10 + ((id * 229) % 490)).toFixed(2));
      const divPct = Number((12.8 + ((id * 19) % 135) / 10).toFixed(1));
      out.push({ id, p, ex, title, shareUsd, divPct });
    }
    return out;
  }, [search, pillar, page]);

  function buyEquity(item) {
    const ord = "RSE-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`👑 EQUITY & ETF ORDER FILLED [${ord}]: ${item.title} (${item.divPct}% Est. Yield) · Paid $${item.shareUsd} USD (${Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalStockExchangeEtf", title: item.title || "GlobalStockExchangeEtf Execution", amountUsd: _usdVal, rwfRate }); setStkMsg(`👑 EQUITY & ETF ORDER FILLED [${ord}]: ${item.title} (${item.divPct}% Est. Yield) · Paid $${item.shareUsd} USD (${Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-stock-exchange-etf-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #eab308", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 RSE Kigali, NASDAQ & London Fractional Stocks, Sovereign ETFs & Hedge Vaults (100NVD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Buy fractional BK, MTN Rwanda, NVIDIA & Apple shares, sovereign ETFs & commodities in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(234,179,8,0.18)", color: "#fde047", fontWeight: 800, fontSize: 11 }}>
          100UD+ Equities & ETFs · 100 Novemdecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search RSE, NASDAQ, ETFs & commodities (e.g. Kigali, BK, MTN, NVIDIA, Lithium)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Stock Exchange & ETF Pillars (100UD+)</option>
          {EXCHANGE_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_TICKERS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_TICKERS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_TICKERS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_TICKERS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {tickers.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fde047", fontWeight: 800 }}>${item.shareUsd} USD ({Math.round(item.shareUsd * rwfRate).toLocaleString()} RWF) · {item.divPct}% Yield</span>
            <button type="button" onClick={() => buyEquity(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#eab308", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              👑 Buy Fractional Share
            </button>
          </div>
        ))}
      </div>

      {stkMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{stkMsg}</div>}
    </section>
  );
}
