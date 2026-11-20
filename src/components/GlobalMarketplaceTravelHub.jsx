import { useState } from "react";

const MARKET_ITEMS = [
  { name: "✈️ RwandAir Kigali ↔ London / Dubai / Nairobi Ticket", priceUsd: 680, cat: "Global Aviation" },
  { name: "🏨 Kigali Marriott / Radisson Blu VIP Suite (2 Nights)", priceUsd: 420, cat: "Luxury Hospitality" },
  { name: "💻 MacBook Pro M4 / Starlink Enterprise Kit", priceUsd: 1450, cat: "Tech Hardware Escrow" },
  { name: "🚚 East Africa Cross-Border Cargo Escrow (Kigali–Mombasa)", priceUsd: 310, cat: "Logistics & Trade" },
];

export default function GlobalMarketplaceTravelHub({ rates = {}, theme, panel }) {
  const [selected, setSelected] = useState(MARKET_ITEMS[0]);
  const [payMethod, setPayMethod] = useState("USDT / Crypto Instant");
  const [orderMsg, setOrderMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function placeEscrowOrder(e) {
    e.preventDefault();
    const ref = "KGT-MKT-" + Math.floor(100000 + Math.random() * 900000);
    setOrderMsg(`🛍️ ESCROW ORDER CONFIRMED [${ref}]: ${selected.name} · $${selected.priceUsd.toLocaleString()} USD (${Math.round(selected.priceUsd * rwfRate).toLocaleString()} RWF) paid via ${payMethod}!`);
  }

  return (
    <section id="global-marketplace-travel" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #0ea5e9", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🛍️ Global E-Commerce Marketplace, RwandAir Flight Booking & Hotel Escrow (650M+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Book flights, luxury hotels, tech hardware & cross-border cargo with instant USDT, BTC, MTN MoMo or RWF escrow.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(14,165,233,0.18)", color: "#38bdf8", fontWeight: 800, fontSize: 11 }}>
          100% Buyer Escrow Guard
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {MARKET_ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelected(item)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${selected.name === item.name ? "#0ea5e9" : theme.border}`,
              background: selected.name === item.name ? "rgba(14,165,233,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{item.name}</strong>
            <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>${item.priceUsd.toLocaleString()} USD ({Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{item.cat}</span>
          </button>
        ))}
      </div>

      <form onSubmit={placeEscrowOrder} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}>
          <option>USDT / Crypto Instant</option>
          <option>MTN MoMo / Airtel Money RWF</option>
          <option>Bank of Kigali / Visa Virtual Card</option>
        </select>
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#0ea5e9", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🛍️ Book & Lock Escrow ({Math.round(selected.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {orderMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{orderMsg}</div>}
    </section>
  );
}
