import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const PACKAGES = [
  { id: "TRV-01", title: "✈️ RwandAir Kigali (KGL) ↔ Dubai (DXB) Business", priceUsd: 680, perk: "VIP Pearl Lounge + 46kg Baggage" },
  { id: "TRV-02", title: "🦁 Akagera National Park Luxury Safari & Boat", priceUsd: 195, perk: "Full-Day 4x4 Game Drive + Lodge" },
  { id: "TRV-03", title: "✈️ RwandAir Kigali (KGL) ↔ London Heathrow (LHR)", priceUsd: 790, perk: "Direct Non-Stop Dreamliner" },
  { id: "TRV-04", title: "🌲 Nyungwe Canopy Walkway & Lake Kivu Resort", priceUsd: 160, perk: "2-Night Eco-Resort + Chimp Trek" },
];

export default function SovereignTravelSafariHub({ rates = {}, theme, panel }) {
  const [trvMsg, setTrvMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function bookTrip(pkg) {
    const { tx } = recordSovereignTx({
      hub: "RwandAir & Safari Desk",
      title: `Booked ${pkg.title}`,
      amountUsd: pkg.priceUsd,
      rwfRate,
      type: "DEBIT",
    });
    setTrvMsg(`✈️ E-TICKET & VOUCHER ISSUED [${tx.id}]: ${pkg.title} · Paid $${pkg.priceUsd} USD (${Math.round(pkg.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-travel-safari-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>✈️ RwandAir Direct Flights, Akagera Luxury Safari & Global Hotel Booking</strong>
        <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>Instant PNR E-Ticket in RWF or USDT</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {PACKAGES.map((p) => (
          <div key={p.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{p.title}</strong>
            <span style={{ fontSize: 10.5, color: theme.muted }}>{p.perk}</span>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${p.priceUsd} USD ({Math.round(p.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => bookTrip(p)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ✈️ Book Instant Ticket
            </button>
          </div>
        ))}
      </div>
      {trvMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{trvMsg}</div>}
    </section>
  );
}
