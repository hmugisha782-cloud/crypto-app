import { useState, useEffect } from "react";
import { getLedgerTxs } from "../utils/sovereignLedger.js";

const INITIAL_ALERTS = [
  { id: "N1", tag: "FX LIVE", text: "🇷🇼 BNR & Kigali FX Benchmark steady at 1 USD = 1,480 RWF (0% MoMo Deposit Fee)." },
  { id: "N2", tag: "MINERALS", text: "⛏️ Gatsibo & Rutongo 3Ts Cassiterite/Coltan export settlement pool yielding 18.4% APY." },
  { id: "N3", tag: "SPORTS", text: "⚽ Rwanda Premier League: APR FC vs Rayon Sports live odds boosted (2.10 / 3.05 / 3.65)." },
];

export default function SovereignNotificationCenter({ theme, panel }) {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const onTx = () => {
      const latest = getLedgerTxs()[0];
      if (latest) {
        setAlerts((prev) => [
          { id: latest.id, tag: "RECEIPT", text: `✅ [${latest.id}] ${latest.hub}: ${latest.title} ($${latest.amountUsd.toFixed(2)} USD)` },
          ...prev.slice(0, 7),
        ]);
      }
    };
    window.addEventListener("kgt-wallet-updated", onTx);
    return () => window.removeEventListener("kgt-wallet-updated", onTx);
  }, []);

  return (
    <section id="sovereign-notification-center" style={{ ...panel, marginBottom: 16, borderLeft: "4px solid #38bdf8", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: 13.5 }}>🔔 Kigali Global Live Alert & Transaction Feed ({alerts.length} Active)</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
          {open ? "Minimize" : "Expand Alerts"}
        </button>
      </div>
      {open && (
        <div style={{ display: "grid", gap: 5, maxHeight: 115, overflowY: "auto" }}>
          {alerts.map((a) => (
            <div key={a.id} style={{ fontSize: 11.5, padding: "5px 8px", borderRadius: 7, background: theme.input, display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ padding: "2px 6px", borderRadius: 4, background: "rgba(56,189,248,0.2)", color: "#38bdf8", fontWeight: 900, fontSize: 10 }}>{a.tag}</span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
