import { useState } from "react";
import WealthPlanningSuite60 from "./WealthPlanningSuite60.jsx";
import GlobalMacroCommoditiesHub from "./GlobalMacroCommoditiesHub.jsx";

export default function WealthAndMacroSuperHub({ rates = {}, theme, panel }) {
  const [wmTab, setWmTab] = useState("compound");
  const [salaryRwf, setSalaryRwf] = useState("800000");

  const rwfRate = Number(rates?.RWF || 1480);
  const sal = Math.max(0, Number(salaryRwf) || 0);
  const livingRwf = Math.round(sal * 0.5);
  const vaultRwf = Math.round(sal * 0.3);
  const cryptoGoldRwf = Math.round(sal * 0.2);

  const tabs = [
    ["compound", "📈 Compound Wealth & Asset Loan"],
    ["macro", "🥇 Gold (PAXG), Oil & T-Bills"],
    ["salary", "💼 Monthly RWF Salary Auto-Split"],
  ];

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ ...panel, padding: "10px 14px", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", borderLeft: "4px solid #a855f7" }}>
        <strong style={{ fontSize: 12, color: "#d8b4fe" }}>💎 WEALTH, GOLD & GLOBAL MACRO SUPER-HUB (3 PRO DESKS):</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setWmTab(id)}
              style={{
                padding: "6px 11px",
                borderRadius: 8,
                border: `1px solid ${wmTab === id ? "#a855f7" : theme.border}`,
                background: wmTab === id ? "#a855f7" : theme.input,
                color: wmTab === id ? "#fff" : theme.text,
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

      {wmTab === "compound" && <WealthPlanningSuite60 rates={rates} theme={theme} panel={panel} />}
      {wmTab === "macro" && <GlobalMacroCommoditiesHub rates={rates} theme={theme} panel={panel} />}
      {wmTab === "salary" && (
        <section style={{ ...panel, borderTop: "3px solid #10b981", display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>💼 Smart 50/30/20 RWF Monthly Income & Auto-Invest Planner</h3>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
                Automatically allocate your monthly RWF income across Living Expenses (50%), 16% APY Vaults (30%), and BTC/Gold PAXG (20%).
              </p>
            </div>
            <span style={{ padding: "5px 10px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#10b981", fontWeight: 800, fontSize: 11 }}>
              Automated Wealth Discipline
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <label style={{ fontSize: 12, fontWeight: 700 }}>Monthly Income (RWF):</label>
            <input
              type="number"
              value={salaryRwf}
              onChange={(e) => setSalaryRwf(e.target.value)}
              style={{ width: 160, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
            <div style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>50% · Living & CashPower Bills</div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{livingRwf.toLocaleString()} RWF</div>
              <div style={{ fontSize: 10, color: theme.muted }}>≈ {"$"}{(livingRwf / rwfRate).toFixed(2)} USD</div>
            </div>
            <div style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>30% · 16% APY Savings Vault</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#10b981" }}>{vaultRwf.toLocaleString()} RWF</div>
              <div style={{ fontSize: 10, color: theme.muted }}>≈ {"$"}{(vaultRwf / rwfRate).toFixed(2)} USDT</div>
            </div>
            <div style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>20% · BTC & Gold (PAXG) Auto-DCA</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#facc15" }}>{cryptoGoldRwf.toLocaleString()} RWF</div>
              <div style={{ fontSize: 10, color: theme.muted }}>≈ {"$"}{(cryptoGoldRwf / rwfRate).toFixed(2)} USD</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
