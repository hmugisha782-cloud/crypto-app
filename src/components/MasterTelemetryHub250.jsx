import { useState } from "react";
import MarketProRibbon50 from "./MarketProRibbon50.jsx";
import SportsCasinoRibbon50 from "./SportsCasinoRibbon50.jsx";
import FintechAiRibbon50 from "./FintechAiRibbon50.jsx";
import SecurityComplianceRibbon50 from "./SecurityComplianceRibbon50.jsx";
import DefiMerchantRibbon50 from "./DefiMerchantRibbon50.jsx";

export default function MasterTelemetryHub250({ rates = {}, theme, panel }) {
  const [activeDesk, setActiveDesk] = useState("market");

  const desks = [
    ["market", "📈 Market & FX (50)"],
    ["sports", "🏆 150 Nations & Casino (50)"],
    ["fintech", "🤖 MoMo, Video & AI (50)"],
    ["security", "🛡️ Security & SLA (50)"],
    ["defi", "🏪 DeFi & Merchant POS (50)"],
  ];

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ ...panel, padding: "10px 14px", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", borderLeft: "4px solid #10b981" }}>
        <strong style={{ fontSize: 12, color: "#10b981" }}>📊 250 INSTITUTIONAL TELEMETRY SPECS (SWITCH DESK):</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {desks.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveDesk(id)}
              style={{
                padding: "6px 11px",
                borderRadius: 8,
                border: `1px solid ${activeDesk === id ? "#10b981" : theme.border}`,
                background: activeDesk === id ? "#10b981" : theme.input,
                color: activeDesk === id ? "#02131d" : theme.text,
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeDesk === "market" && <MarketProRibbon50 rates={rates} theme={theme} panel={panel} />}
      {activeDesk === "sports" && <SportsCasinoRibbon50 theme={theme} panel={panel} />}
      {activeDesk === "fintech" && <FintechAiRibbon50 theme={theme} panel={panel} />}
      {activeDesk === "security" && <SecurityComplianceRibbon50 theme={theme} panel={panel} />}
      {activeDesk === "defi" && <DefiMerchantRibbon50 theme={theme} panel={panel} />}
    </div>
  );
}
