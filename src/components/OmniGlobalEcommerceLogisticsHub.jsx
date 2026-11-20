import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const ECOM_PILLARS = [
  "🛍️ Verified Kigali & Global Tech Super-Store",
  "🚚 Same-Day Moto-Courier & EAC GPS Delivery",
  "🏭 B2B Wholesale Factory & Dubai Import Lot",
  "💳 0% APR Buy-Now-Pay-Later (BNPL) Smart Cart",
  "📦 Automated Customs Duty & RRA Bonded Clearance",
  "🏪 1-Click Sovereign Merchant Storefront & POS",
  "💎 Luxury Watches, Bullion & Certified Collectibles",
  "🔄 Escrowed Buyer-Protection Smart Guarantee"
];

const MARKET_HUBS = ["Kigali City Market", "Gatsibo Trade Center", "Nairobi EAC Hub", "Dubai Wholesale Port", "London Retail Desk", "Shenzhen Factory Direct", "Musanze North Hub", "Rubavu Border Post"];

export default function OmniGlobalEcommerceLogisticsHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [ecomMsg, setEcomMsg] = useState("");

  const TOTAL_PRODUCTS = 100000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const products = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_PRODUCTS) {
      const id = ((idx + scanned - 1) % TOTAL_PRODUCTS) + 1;
      scanned++;
      const p = ECOM_PILLARS[id % ECOM_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const hub = MARKET_HUBS[(id * 61) % MARKET_HUBS.length];
      const title = `${p} · ${hub} #${String(id).padStart(27, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const priceUsd = Number((12 + ((id * 157) % 488)).toFixed(2));
      out.push({ id, p, hub, title, priceUsd });
    }
    return out;
  }, [search, pillar, page]);

  function orderProduct(item) {
    const ord = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🛒 ESCROW ORDER DISPATCHED [${ord}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalEcommerceLogistics", title: item.title || "GlobalEcommerceLogistics Execution", amountUsd: _usdVal, rwfRate }); setEcomMsg(`🛒 ESCROW ORDER DISPATCHED [${ord}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-ecommerce-logistics-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f59e0b", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🛒 Sovereign E-Commerce, Same-Day Moto Courier, Wholesale & BNPL Hub (100QND+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Shop verified stores, dispatch GPS couriers, clear wholesale imports & split payments with 0% BNPL in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 11 }}>
          100SP+ Products & Shipments · 100 Quindecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search stores, couriers & wholesale (e.g. Kigali, Gatsibo, Courier, Dubai, BNPL)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign E-Commerce & Logistics Pillars (100SP+)</option>
          {ECOM_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {products.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>${item.priceUsd} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => orderProduct(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f59e0b", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🛒 Buy / Dispatch
            </button>
          </div>
        ))}
      </div>

      {ecomMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{ecomMsg}</div>}
    </section>
  );
}
