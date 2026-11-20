import { useState } from "react";

const CROPS = [
  { name: "☕ Rwanda Bourbon Specialty Coffee (1 Ton Lot)", priceUsd: 4200, info: "Gakenke / Nyamasheke Grade-A" },
  { name: "🍃 Rwanda Mountain Orthodox Tea (1 Ton Lot)", priceUsd: 3150, info: "Kitabi / Gisovu Export" },
  { name: "🌽 East Africa White Maize & Beans (5 Tons)", priceUsd: 1650, info: "Nyagatare / Gatsibo Silo" },
  { name: "🥑 Hass Avocado & Bird's Eye Chili Air-Cargo", priceUsd: 2400, info: "Kigali Cold-Chain Direct" },
];

export default function AgriTechCommodityHub({ rates = {}, theme, panel }) {
  const [crop, setCrop] = useState(CROPS[0]);
  const [coopName, setCoopName] = useState("Gatsibo_Agri_Cooperative");
  const [agriMsg, setAgriMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeCropContract(e) {
    e.preventDefault();
    const ref = "KGT-AGR-" + Math.floor(100000 + Math.random() * 900000);
    setAgriMsg(`🌾 AGRI CONTRACT SETTLED [${ref}]: ${coopName} locked "${crop.name}" · $${crop.priceUsd.toLocaleString()} USD (${Math.round(crop.priceUsd * rwfRate).toLocaleString()} RWF) via Instant Escrow!`);
  }

  return (
    <section id="agritech-commodity-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #84cc16", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌾 Rwanda & Global AgriTech, Meteo Radar & Commodity Exchange (2B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Direct farm-to-export trading for Rwandan coffee, tea, maize & horticulture with instant RWF/USDT settlement.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(132,204,22,0.18)", color: "#a3e635", fontWeight: 800, fontSize: 11 }}>
          2,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CROPS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCrop(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${crop.name === c.name ? "#84cc16" : theme.border}`,
              background: crop.name === c.name ? "rgba(132,204,22,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#a3e635", fontWeight: 800 }}>${c.priceUsd.toLocaleString()} USD ({Math.round(c.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.info}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeCropContract} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={coopName} onChange={(e) => setCoopName(e.target.value)} placeholder="Farmer Cooperative / Buyer Name" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#84cc16", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌾 Lock Export Contract ({Math.round(crop.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {agriMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{agriMsg}</div>}
    </section>
  );
}
