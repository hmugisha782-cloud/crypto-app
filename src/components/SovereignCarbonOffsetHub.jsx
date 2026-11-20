import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignCarbonOffsetHub({ rates = {}, theme, panel }) {
  const [tons, setTons] = useState("5");
  const [treesPlanted, setTreesPlanted] = useState(250);
  const [co2Msg, setCo2Msg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function buyCarbonCredits() {
    const t = Math.max(1, Number(tons || 0));
    const usd = t * 12;
    const newTrees = t * 50;
    const { tx } = recordSovereignTx({
      hub: "Green Carbon Registry",
      title: `Retired ${t} Tons CO2 (${newTrees} Trees in Gatsibo & Nyungwe)`,
      amountUsd: usd,
      rwfRate,
      type: "DEBIT",
    });
    setTreesPlanted((prev) => prev + newTrees);
    setCo2Msg(`🌳 CARBON CERTIFICATE ISSUED [${tx.id}]: Offset ${t} Tons CO2 & planted ${newTrees} trees in Rwanda ($${usd} USD)!`);
  }

  return (
    <section id="sovereign-carbon-offset-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🌳 Rwanda Verified Carbon Credits & Reforestation Offset Registry</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Fund Gatsibo & Nyungwe native tree planting · Total Community Trees: <strong>{treesPlanted.toLocaleString()}</strong></span>
        </div>
        <span style={{ fontSize: 11, color: "#34d399", fontWeight: 800 }}>$12 / Ton CO2 (50 Trees)</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="number" min="1" value={tons} onChange={(e) => setTons(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <span style={{ fontSize: 12, fontWeight: 700 }}>Tons CO2 (= {Number(tons || 0) * 50} Trees · ${Number(tons || 0) * 12} USD)</span>
        <button type="button" onClick={buyCarbonCredits} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
          🌳 Offset & Plant Trees
        </button>
      </div>
      {co2Msg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{co2Msg}</div>}
    </section>
  );
}
