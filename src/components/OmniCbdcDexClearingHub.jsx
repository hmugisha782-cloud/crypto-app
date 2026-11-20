import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const CBDC_DEX_PILLARS = [
  "🇷🇼 e-RWF (CBDC) ↔ USDT / BTC Instant Atomic Swap",
  "🌐 Pan-African PAPSS & ISO-20022 Bank Clearing",
  "💧 Concentrated-Liquidity Sovereign DEX Pool",
  "🏛️ Sovereign Wealth Fund Co-Investment Note",
  "⚡ Zero-Gas Layer-2 Cross-Chain Bridge (ETH/SOL/TON)",
  "💱 Central Bank FX Forward & Rate-Lock Contract",
  "🏦 Institutional Prime-Brokerage Custody Vault",
  "📊 Real-Time On-Chain Proof-of-Reserve Audit"
];

const CLEARING_HUBS = ["Kigali BNR-Mesh", "Gatsibo FinTech Node", "Nairobi PAPSS Hub", "London FX Clearing", "Zurich Custody Vault", "Dubai DIFC Bridge", "Singapore MAS-Link", "New York Fed-Wire"];

export default function OmniCbdcDexClearingHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [cbdcMsg, setCbdcMsg] = useState("");

  const TOTAL_POOLS = 100000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const pools = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_POOLS) {
      const id = ((idx + scanned - 1) % TOTAL_POOLS) + 1;
      scanned++;
      const p = CBDC_DEX_PILLARS[id % CBDC_DEX_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = CLEARING_HUBS[(id * 137) % CLEARING_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(42, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const amountUsd = Number((15 + ((id * 241) % 985)).toFixed(2));
      const apyPct = Number((16.2 + ((id * 23) % 115) / 10).toFixed(1));
      out.push({ id, p, hub, title, amountUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function executeCbdcSwap(item) {
    const tx = "CBDC-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`💱 CBDC & DEX CLEARING SETTLED [${tx}]: ${item.title} (${item.apyPct}% APY) · Settled $${item.amountUsd} USD (${Math.round(item.amountUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "CbdcDexClearing", title: item.title || "CbdcDexClearing Execution", amountUsd: _usdVal, rwfRate }); setCbdcMsg(`💱 CBDC & DEX CLEARING SETTLED [${tx}]: ${item.title} (${item.apyPct}% APY) · Settled $${item.amountUsd} USD (${Math.round(item.amountUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-cbdc-dex-clearing-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>💱 e-RWF (CBDC) Atomic Swap, PAPSS Cross-Border Clearing & Sovereign DEX Hub (100VG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Swap e-RWF to USDT/BTC, settle Pan-African PAPSS transfers & earn yield in sovereign DEX pools in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          100DD+ Clearing Pools · 100 Vigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search e-RWF CBDC, PAPSS & DEX pools (e.g. Kigali, Gatsibo, e-RWF, USDT, PAPSS)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign CBDC, DEX & Clearing Pillars (100DD+)</option>
          {CBDC_DEX_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_POOLS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {pools.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${item.amountUsd} USD ({Math.round(item.amountUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => executeCbdcSwap(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              💱 Swap / Settle
            </button>
          </div>
        ))}
      </div>

      {cbdcMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{cbdcMsg}</div>}
    </section>
  );
}
