import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const TRADE_LINES = [
  "Rwanda Bourbon Coffee Export", "Kigali Tech Tower REIT", "24K Swiss & Rwanda Gold", "Mombasa–Kigali Cargo Lot",
  "Enterprise MacBook & Server", "Rwanda Mountain Tea Lot", "Kigali Smart Villa Fraction", "Solar Micro-Grid PPA",
  "RwandAir Air-Cargo Pallet", "EAC Cross-Border Grain", "Clean Carbon Credit Lot", "Sovereign Treasury Note"
];

const CORRIDORS = ["Kigali–Dubai", "Kigali–London", "Kigali–Nairobi", "Gatsibo–Mombasa", "Kigali–New York", "Kigali–Tokyo", "Kigali–Zurich", "Kigali–Singapore"];

export default function OmniGlobalTrade250kHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [line, setLine] = useState("ALL");
  const [page, setPage] = useState(1);
  const [tradeMsg, setTradeMsg] = useState("");

  const TOTAL_LOTS = 250000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const lots = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_LOTS) {
      const id = ((idx + scanned - 1) % TOTAL_LOTS) + 1;
      scanned++;
      const l = TRADE_LINES[id % TRADE_LINES.length];
      if (line !== "ALL" && l !== line) continue;
      const c = CORRIDORS[(id * 5) % CORRIDORS.length];
      const title = `${l} [${c}] · Lot #${String(id).padStart(6, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((15 + ((id * 23) % 985)).toFixed(2));
      out.push({ id, l, c, title, priceUsd });
    }
    return out;
  }, [search, line, page]);

  function lockTradeLot(lot) {
    const ref = "KGT-250K-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`📦 ESCROW LOCKED [${ref}]: ${lot.title} · Settled $${lot.priceUsd} USD (${Math.round(lot.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalTrade250k", title: item.title || "GlobalTrade250k Execution", amountUsd: _usdVal, rwfRate }); setTradeMsg(`📦 ESCROW LOCKED [${ref}]: ${lot.title} · Settled $${lot.priceUsd} USD (${Math.round(lot.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-trade-250k" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #0ea5e9", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📦 250,000+ Global Trade Lots, Commodities, Real Estate & Cargo Exchange (1SP+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Instant O(1) escrow across 250,000+ export coffee/tea lots, Kigali real estate, gold & cargo corridors in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(14,165,233,0.18)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          250,000+ Live Lots · 1 Septillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search 250,000+ lots (e.g. Coffee, Gold, Kigali, Dubai, Cargo, #190000)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={line} onChange={(e) => { setLine(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 12 Trade Lines (250,000+ Lots)</option>
          {TRADE_LINES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_LOTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_LOTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_LOTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_LOTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {lots.map((lot) => (
          <div key={lot.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{lot.title}</strong>
            <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>${lot.priceUsd} USD ({Math.round(lot.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => lockTradeLot(lot)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#0ea5e9", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              📦 Lock Escrow Lot
            </button>
          </div>
        ))}
      </div>

      {tradeMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{tradeMsg}</div>}
    </section>
  );
}
