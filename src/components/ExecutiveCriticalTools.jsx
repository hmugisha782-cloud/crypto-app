import { useState } from "react";

export default function ExecutiveCriticalTools({ coins = [], rates = {}, theme, panel }) {
  const [investedUsd, setInvestedUsd] = useState("1000");
  const [currentUsd, setCurrentUsd] = useState("1450");
  const [taxRatePct, setTaxRatePct] = useState("15");

  const rwfRate = Number(rates?.RWF || 1480);
  const inv = Number(investedUsd) || 0;
  const cur = Number(currentUsd) || 0;
  const grossProfit = cur - inv;
  const taxDue = grossProfit > 0 ? grossProfit * ((Number(taxRatePct) || 0) / 100) : 0;
  const netProfit = grossProfit - taxDue;
  const roiPct = inv > 0 ? ((netProfit / inv) * 100).toFixed(2) : "0.00";

  function exportMarketCsv() {
    const header = "Symbol,Name,Price_USD,Price_RWF,Change_24h_Pct\n";
    const rows = (coins || [])
      .map((c) => {
        const px = Number(c.current_price || c.price || 0);
        const chg = Number(c.price_change_percentage_24h || 0).toFixed(2);
        return `${String(c.symbol || "").toUpperCase()},${c.name || ""},${px},${Math.round(px * rwfRate)},${chg}%`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Kigali_Global_Tracker_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <section style={{ ...panel, marginBottom: 20, borderLeft: "4px solid #f59e0b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>🧾 Essential Profit, Tax & Net-Worth Calculator + Instant CSV Ledger Export</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Calculate your exact net profit, capital gains tax, and RWF take-home value, or export live market prices to Excel/CSV.
          </p>
        </div>
        <button
          type="button"
          onClick={exportMarketCsv}
          style={{ padding: "9px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
        >
          📥 Export Live CSV Report
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12, alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Initial Capital (USD)</label>
          <input type="number" value={investedUsd} onChange={(e) => setInvestedUsd(e.target.value)} style={inp} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Current Portfolio Value (USD)</label>
          <input type="number" value={currentUsd} onChange={(e) => setCurrentUsd(e.target.value)} style={inp} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Tax Rate (%)</label>
          <input type="number" value={taxRatePct} onChange={(e) => setTaxRatePct(e.target.value)} style={inp} />
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 11, color: theme.muted }}>Net Take-Home Profit ({roiPct}% ROI)</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: netProfit >= 0 ? "#10b981" : "#ef4444" }}>
            {"$"}{netProfit.toFixed(2)} ({Math.round(netProfit * rwfRate).toLocaleString()} RWF)
          </div>
          <div style={{ fontSize: 10, color: theme.muted }}>Est. Tax Deducted: {"$"}{taxDue.toFixed(2)}</div>
        </div>
      </div>
    </section>
  );
}
