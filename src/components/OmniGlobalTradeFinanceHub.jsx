import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const TRADE_PILLARS = [
  "📜 Instant Digital Letter of Credit (e-LC) Vault",
  "🚚 EAC Single-Customs & RRA Cargo Fast-Track",
  "☕ Rwanda Coffee, Tea & Mineral Export Settlement",
  "💱 Multi-Currency Trade FX Rate-Lock Forward",
  "🚢 Mombasa–Kigali Bonded Container Escrow",
  "🏭 Supplier Invoice Factoring & 90-Day Trade Credit",
  "🌐 Automated Certificate of Origin & Phytosanitary",
  "🛡️ Marine & Air-Cargo All-Risk Sovereign Guard"
];

const TRADE_CORRIDORS = ["Kigali–Dubai Cargo", "Gatsibo–Mombasa Line", "Gatuna–Kampala Gate", "Rusumo–Dar Port", "Bugesera Air-Freight", "Kigali–Rotterdam Sea", "Kigali–Guangzhou Trade", "London–Kigali Bullion"];

export default function OmniGlobalTradeFinanceHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [trdMsg, setTrdMsg] = useState("");

  const TOTAL_DEALS = 100000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const deals = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_DEALS) {
      const id = ((idx + scanned - 1) % TOTAL_DEALS) + 1;
      scanned++;
      const p = TRADE_PILLARS[id % TRADE_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const cor = TRADE_CORRIDORS[(id * 151) % TRADE_CORRIDORS.length];
      const title = `${p} · ${cor} #${String(id).padStart(45, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const dealUsd = Number((25 + ((id * 257) % 975)).toFixed(2));
      const yieldPct = Number((15.8 + ((id * 37) % 105) / 10).toFixed(1));
      out.push({ id, p, cor, title, dealUsd, yieldPct });
    }
    return out;
  }, [search, pillar, page]);

  function executeTrade(item) {
    const ref = "ELC-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`📜 TRADE FINANCE & CUSTOMS CLEARED [${ref}]: ${item.title} (${item.yieldPct}% Yield) · Settled $${item.dealUsd} USD (${Math.round(item.dealUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalTradeFinance", title: item.title || "GlobalTradeFinance Execution", amountUsd: _usdVal, rwfRate }); setTrdMsg(`📜 TRADE FINANCE & CUSTOMS CLEARED [${ref}]: ${item.title} (${item.yieldPct}% Yield) · Settled $${item.dealUsd} USD (${Math.round(item.dealUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-trade-finance-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📜 Global Trade Finance, Digital e-LC, EAC Customs & Export Clearing Hub (100UVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Issue digital Letters of Credit, clear EAC customs & settle coffee/mineral exports in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          100TD+ Trade & Customs Rails · 100 Unvigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search e-LC, EAC customs & exports (e.g. Kigali, Gatsibo, Mombasa, Dubai, Coffee)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Global Trade Finance & Customs Pillars (100TD+)</option>
          {TRADE_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_DEALS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {deals.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${item.dealUsd} USD ({Math.round(item.dealUsd * rwfRate).toLocaleString()} RWF) · {item.yieldPct}% Yield</span>
            <button type="button" onClick={() => executeTrade(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              📜 Issue / Clear Trade
            </button>
          </div>
        ))}
      </div>

      {trdMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{trdMsg}</div>}
    </section>
  );
}
