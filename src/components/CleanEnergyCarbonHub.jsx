import { useState } from "react";

const ENERGY_MARKETS = [
  { name: "☀️ Rwamagana & Eastern Solar PPA (100 kWh Block)", priceUsd: 14, tag: "Clean Solar Grid" },
  { name: "⚡ Lake Kivu Methane-to-Power Industrial Token", priceUsd: 48, tag: "Baseload Power" },
  { name: "🌳 Nyungwe & Volcanoes Verified Carbon Credit (1 Ton CO₂)", priceUsd: 26, tag: "ESG Carbon Market" },
  { name: "🔋 Off-Grid Smart Home Solar + Battery Pay-As-You-Go", priceUsd: 19, tag: "Rural Electrification" },
];

export default function CleanEnergyCarbonHub({ rates = {}, theme, panel }) {
  const [energy, setEnergy] = useState(ENERGY_MARKETS);
  const [meterOrOrg, setMeterOrOrg] = useState("ESG-RW-440291 · Green Grid");
  const [energyMsg, setEnergyMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function executeEnergyTrade(e) {
    e.preventDefault();
    const tx = "KGT-NRG-" + Math.floor(100000 + Math.random() * 900000);
    setEnergyMsg(`⚡ CLEAN ENERGY & CARBON SETTLED [${tx}]: ${energy.name} (${meterOrOrg}) · Paid $${energy.priceUsd} USD (${Math.round(energy.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="clean-energy-carbon" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚡ Clean Energy, Lake Kivu Power, Solar PPA & Carbon Credits Exchange (4B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Trade verified Rwandan carbon credits, solar power blocks & smart off-grid energy tokens in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontWeight: 800, fontSize: 11 }}>
          4,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {ENERGY_MARKETS.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setEnergy(m)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${energy.name === m.name ? "#10b981" : theme.border}`,
              background: energy.name === m.name ? "rgba(16,185,129,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{m.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>${m.priceUsd} USD ({Math.round(m.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{m.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={executeEnergyTrade} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={meterOrOrg} onChange={(e) => setMeterOrOrg(e.target.value)} placeholder="Solar Meter ID / Carbon Registry Account" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          ⚡ Settle Clean Energy ({Math.round(energy.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {energyMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{energyMsg}</div>}
    </section>
  );
}
