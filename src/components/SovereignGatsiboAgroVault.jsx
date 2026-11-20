import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const AGRO_POOLS = [
  { id: "AG-01", name: "🐄 Gatsibo Modern Dairy & Smart Cattle Ranch", yieldPct: "21.4% APY", unitUsd: 40, cycle: "6 Months" },
  { id: "AG-02", name: "☕ Kayonza & Gatsibo Specialty Bourbon Coffee", yieldPct: "19.8% APY", unitUsd: 35, cycle: "4 Months" },
  { id: "AG-03", name: "🌽 Nyagatare & Gatsibo Irrigated Maize Silo", yieldPct: "17.5% APY", unitUsd: 25, cycle: "3 Months" },
  { id: "AG-04", name: "🍯 Akagera Organic Honey & Avocado Export", yieldPct: "22.1% APY", unitUsd: 30, cycle: "5 Months" },
];

export default function SovereignGatsiboAgroVault({ rates = {}, theme, panel }) {
  const [agroMsg, setAgroMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function investAgro(p) {
    const { tx } = recordSovereignTx({
      hub: "Gatsibo Agro-Wealth",
      title: `Funded ${p.name} (${p.yieldPct})`,
      amountUsd: p.unitUsd,
      rwfRate,
      type: "DEBIT",
    });
    setAgroMsg(`🌾 AGRO CO-INVESTMENT CONFIRMED [${tx.id}]: ${p.name} · $${p.unitUsd} USD (${Math.round(p.unitUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-gatsibo-agro-vault" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🌾 Gatsibo & Eastern Province Smart Livestock, Coffee & Maize Co-Investment</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Satellite-monitored Rwandan agriculture & dairy pools insured against weather risk</span>
        </div>
        <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>100% Crop-Insured</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {AGRO_POOLS.map((p) => (
          <div key={p.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{p.name}</strong>
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>{p.yieldPct} · Harvest Cycle: {p.cycle}</span>
            <span style={{ fontSize: 11, color: theme.muted }}>Share: ${p.unitUsd} USD ({Math.round(p.unitUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => investAgro(p)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🌾 Fund Farm Unit
            </button>
          </div>
        ))}
      </div>
      {agroMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{agroMsg}</div>}
    </section>
  );
}
