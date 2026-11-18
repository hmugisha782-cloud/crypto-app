import { useState } from "react";
import MerchantQrAndVaultHub from "./MerchantQrAndVaultHub.jsx";
import VirtualCardAndBillPayHub from "./VirtualCardAndBillPayHub.jsx";
import InstantLoanAndSwapHub from "./InstantLoanAndSwapHub.jsx";

export default function EacFintechSuperHub({ rates = {}, theme, panel }) {
  const [fintechTab, setFintechTab] = useState("qr_vault");
  const [b2bUsd, setB2bUsd] = useState("2500");
  const [corridor, setCorridor] = useState("Rwanda ↔ Dubai / UAE");
  const [b2bStatus, setB2bStatus] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const amtUsd = Math.max(0, Number(b2bUsd) || 0);
  const feeUsd = amtUsd * 0.005;
  const totalRwf = Math.round((amtUsd + feeUsd) * rwfRate);

  const tabs = [
    ["qr_vault", "🏪 Merchant QR POS & 16% Vaults"],
    ["card_bills", "💳 Virtual USD Visa & CashPower"],
    ["loan_swap", "💸 RWF Credit Line & Quick-Swap"],
    ["b2b_trade", "🚢 Cross-Border B2B Trade Escrow"],
  ];

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ ...panel, padding: "10px 14px", marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", borderLeft: "4px solid #f59e0b" }}>
        <strong style={{ fontSize: 12, color: "#fbbf24" }}>🇷🇼 RWANDA & EAST AFRICA FINTECH SUPER-HUB (4 INSTANT DESKS):</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFintechTab(id)}
              style={{
                padding: "6px 11px",
                borderRadius: 8,
                border: `1px solid ${fintechTab === id ? "#f59e0b" : theme.border}`,
                background: fintechTab === id ? "#f59e0b" : theme.input,
                color: fintechTab === id ? "#02131d" : theme.text,
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

      {fintechTab === "qr_vault" && <MerchantQrAndVaultHub rates={rates} theme={theme} panel={panel} />}
      {fintechTab === "card_bills" && <VirtualCardAndBillPayHub rates={rates} theme={theme} panel={panel} />}
      {fintechTab === "loan_swap" && <InstantLoanAndSwapHub rates={rates} theme={theme} panel={panel} />}
      {fintechTab === "b2b_trade" && (
        <section style={{ ...panel, borderTop: "3px solid #3b82f6", display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>🚢 Cross-Border B2B Trade & Supplier Escrow Settlement</h3>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
                Settle international supplier invoices across EAC, Dubai, China & Europe in USDT/USD from RWF with 0.5% escrow fee.
              </p>
            </div>
            <span style={{ padding: "5px 10px", borderRadius: 999, background: "rgba(59,130,246,0.18)", color: "#60a5fa", fontWeight: 800, fontSize: 11 }}>
              T+0 Same-Day Clearing
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Trade Corridor</label>
              <select value={corridor} onChange={(e) => setCorridor(e.target.value)} style={inp}>
                <option>Rwanda ↔ Dubai / UAE</option>
                <option>Rwanda ↔ Guangzhou / China</option>
                <option>Rwanda ↔ Kenya / Mombasa Port</option>
                <option>Rwanda ↔ Tanzania / Dar Port</option>
                <option>Rwanda ↔ DRC / Goma & Bukavu</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Invoice Amount (USD/USDT)</label>
              <input type="number" value={b2bUsd} onChange={(e) => setB2bUsd(e.target.value)} style={inp} />
            </div>
            <div style={{ padding: 10, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Total RWF Payable (Incl. 0.5% Escrow)</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#60a5fa" }}>{totalRwf.toLocaleString()} RWF</div>
            </div>
            <button
              type="button"
              onClick={() => setB2bStatus(`✓ B2B Escrow Lock Created: ${amtUsd.toLocaleString()} USDT (${totalRwf.toLocaleString()} RWF) on ${corridor}!`)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
            >
              Lock B2B Trade Escrow
            </button>
          </div>
          {b2bStatus && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.16)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 700 }}>{b2bStatus}</div>}
        </section>
      )}
    </div>
  );
}
