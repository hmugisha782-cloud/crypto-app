import { useState, useEffect } from "react";
import { getLedgerTxs } from "../utils/sovereignLedger.js";

export default function SovereignAdminRevenueCenter({ rates = {}, theme, panel }) {
  const [txs, setTxs] = useState(getLedgerTxs);
  const [users, setUsers] = useState([
    { id: "USR-01", name: "Mugisha Admin (Kigali)", kyc: "VERIFIED", volUsd: 48200 },
    { id: "USR-02", name: "Uwase Trader (Gatsibo)", kyc: "VERIFIED", volUsd: 19450 },
    { id: "USR-03", name: "Niyonzima Merchant (Rubavu)", kyc: "PENDING", volUsd: 8900 },
  ]);
  const rwf = Number(rates?.RWF || 1480);

  useEffect(() => {
    const sync = () => setTxs(getLedgerTxs());
    window.addEventListener("kgt-wallet-updated", sync);
    return () => window.removeEventListener("kgt-wallet-updated", sync);
  }, []);

  const liveVolUsd = txs.reduce((acc, t) => acc + Number(t.amountUsd || 0), 76550);
  const feeRevenueUsd = Number((liveVolUsd * 0.015).toFixed(2));

  function toggleKyc(id) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, kyc: u.kyc === "VERIFIED" ? "SUSPENDED" : "VERIFIED" } : u)));
  }

  return (
    <section id="sovereign-admin-revenue-center" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f59e0b", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>📊 Executive Admin & Platform Revenue Command Center</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Total Platform Volume: <strong>${liveVolUsd.toLocaleString()} USD</strong> · Net Fee Revenue: <strong style={{ color: "#34d399" }}>${feeRevenueUsd.toLocaleString()} ({Math.round(feeRevenueUsd * rwf).toLocaleString()} RWF)</strong></span>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.2)", color: "#fbbf24", fontWeight: 900, fontSize: 11 }}>👑 SUPER-ADMIN LIVE</span>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {users.map((u) => (
          <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, padding: "7px 10px", borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 12 }}>
            <span><strong>[{u.id}]</strong> {u.name} · Volume: <strong>${u.volUsd.toLocaleString()}</strong></span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: u.kyc === "VERIFIED" ? "#34d399" : "#f87171", fontWeight: 800 }}>{u.kyc}</span>
              <button type="button" onClick={() => toggleKyc(u.id)} style={{ padding: "4px 9px", borderRadius: 6, border: "none", background: u.kyc === "VERIFIED" ? "#f43f5e" : "#10b981", color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{u.kyc === "VERIFIED" ? "Suspend" : "Approve KYC"}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
