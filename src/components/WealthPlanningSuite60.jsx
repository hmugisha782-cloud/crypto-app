import { useState } from "react";

export default function WealthPlanningSuite60({ rates = {}, theme, panel }) {
  const [initialUsd, setInitialUsd] = useState("500");
  const [monthlyUsd, setMonthlyUsd] = useState("100");
  const [years, setYears] = useState("5");
  const [loanPrincipalRwf, setLoanPrincipalRwf] = useState("25000000");
  const [loanMonths, setLoanMonths] = useState("36");

  const rwfRate = Number(rates?.RWF || 1480);
  const p = Math.max(0, Number(initialUsd) || 0);
  const pmt = Math.max(0, Number(monthlyUsd) || 0);
  const n = Math.max(1, Number(years) || 1) * 12;
  const r = 0.12 / 12; // 12% APY compounded monthly

  const futureUsd = p * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
  const totalContributed = p + pmt * n;
  const totalProfitUsd = Math.max(0, futureUsd - totalContributed);
  const futureRwf = Math.round(futureUsd * rwfRate);

  const lPrin = Math.max(0, Number(loanPrincipalRwf) || 0);
  const lMos = Math.max(1, Number(loanMonths) || 1);
  const lr = 0.11 / 12;
  const monthlyInstallmentRwf = Math.round((lPrin * lr) / (1 - Math.pow(1 + lr, -lMos)));

  const inp = { width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #a855f7", display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>📈 Long-Term Compound Wealth Builder & Kigali Asset Financing Planner</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Project multi-year compounding returns (12% APY) or calculate monthly RWF payments for property & business assets.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(168, 85, 247, 0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          +60 Wealth & Planning Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {/* COMPOUND WEALTH SIMULATOR */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#d8b4fe" }}>🚀 1. Compound Wealth & Freedom Calculator (12% APY)</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            <div>
              <label style={{ fontSize: 10, color: theme.muted }}>Start ($)</label>
              <input type="number" value={initialUsd} onChange={(e) => setInitialUsd(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 10, color: theme.muted }}>Monthly ($)</label>
              <input type="number" value={monthlyUsd} onChange={(e) => setMonthlyUsd(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 10, color: theme.muted }}>Years</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={inp} />
            </div>
          </div>
          <div style={{ fontSize: 12 }}>
            Projected Total: <strong style={{ color: "#10b981" }}>{"$"}{futureUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> ({futureRwf.toLocaleString()} RWF)
          </div>
          <div style={{ fontSize: 11, color: theme.muted }}>
            Total Compound Profit Earned: <strong style={{ color: "#d8b4fe" }}>+{"$"}{totalProfitUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          </div>
        </div>

        {/* KIGALI REAL ESTATE & ASSET AMORTIZATION */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#38bdf8" }}>🏡 2. Kigali Property & Business Financing Estimator</strong>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
            <div>
              <label style={{ fontSize: 10, color: theme.muted }}>Asset Value (RWF)</label>
              <input type="number" value={loanPrincipalRwf} onChange={(e) => setLoanPrincipalRwf(e.target.value)} style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 10, color: theme.muted }}>Months</label>
              <input type="number" value={loanMonths} onChange={(e) => setLoanMonths(e.target.value)} style={inp} />
            </div>
          </div>
          <div style={{ fontSize: 12 }}>
            Est. Monthly Payment: <strong style={{ color: "#38bdf8" }}>{monthlyInstallmentRwf.toLocaleString()} RWF / mo</strong>
          </div>
          <div style={{ fontSize: 11, color: theme.muted }}>
            Equivalent in USDT: ≈ {"$"}{(monthlyInstallmentRwf / rwfRate).toFixed(2)} USDT / month
          </div>
        </div>
      </div>
    </section>
  );
}
