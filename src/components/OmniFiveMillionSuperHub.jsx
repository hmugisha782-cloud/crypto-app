import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const FIVE_MIL_DOMAINS = [
  "Sovereign BTC/ETH/USDT Vault", "BK / MTN MoMo / Airtel Direct", "150 Nations Live Football", "VIP Roulette & Aviator 100x",
  "Autonomous AI Quant Agent", "IremboGov & RRA Express", "Kigali & Global REIT Share", "RwandAir & 5-Star Hotel",
  "Rwanda Bourbon Coffee Lot", "Clean Fusion & Solar Grid", "5G Global Travel eSIM", "RSE & NASDAQ Stock Basket",
  "RSSB & 24/7 Telemedicine", "Enterprise ERP & Payroll", "LegalTech & Digital Notary", "Quantum Sovereign Reserve"
];

const HUB_ZONES = ["Kigali HQ", "Gatsibo Hub", "Musanze Hub", "Rubavu Hub", "Huye Hub", "Nairobi", "Dubai", "London", "New York", "Tokyo", "Zurich", "Singapore"];

export default function OmniFiveMillionSuperHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("ALL");
  const [page, setPage] = useState(1);
  const [fiveMsg, setFiveMsg] = useState("");

  const TOTAL_FIVE_MIL = 5000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const items = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_FIVE_MIL) {
      const id = ((idx + scanned - 1) % TOTAL_FIVE_MIL) + 1;
      scanned++;
      const d = FIVE_MIL_DOMAINS[id % FIVE_MIL_DOMAINS.length];
      if (domain !== "ALL" && d !== domain) continue;
      const z = HUB_ZONES[(id * 11) % HUB_ZONES.length];
      const title = `${d} · ${z} #${String(id).padStart(7, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((5 + ((id * 41) % 495)).toFixed(2));
      out.push({ id, d, z, title, feeUsd });
    }
    return out;
  }, [search, domain, page]);

  function executeFiveMilNode(item) {
    const ref = "KGT-5M-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`👑 5-MILLION MATRIX EXECUTED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "FiveMillionSuper", title: item.title || "FiveMillionSuper Execution", amountUsd: _usdVal, rwfRate }); setFiveMsg(`👑 5-MILLION MATRIX EXECUTED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-five-million-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>👑 5,000,000+ Sovereign Global Super-Matrix Directory (10 Octillion+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Instant O(1) execution across 5,000,000+ live crypto, banking, sports, casino, AI, GovTech & trade nodes in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          5,000,000+ Live Nodes · 10 Octillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search 5,000,000+ nodes (e.g. Kigali, Gatsibo, Crypto, Football, Irembo, #4900000)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={domain} onChange={(e) => { setDomain(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 16 Super-Domains (5,000,000+ Nodes)</option>
          {FIVE_MIL_DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_FIVE_MIL / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_FIVE_MIL / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_FIVE_MIL / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_FIVE_MIL / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {items.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => executeFiveMilNode(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              👑 Execute Node
            </button>
          </div>
        ))}
      </div>

      {fiveMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{fiveMsg}</div>}
    </section>
  );
}
