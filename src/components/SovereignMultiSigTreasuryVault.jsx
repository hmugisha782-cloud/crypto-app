import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignMultiSigTreasuryVault({ rates = {}, theme, panel }) {
  const [proposals, setProposals] = useState([
    { id: "MSIG-01", title: "Gatsibo Solar & Agro-Cooperative Equipment Grant", amountUsd: 500, sigs: 2, required: 3, executed: false },
    { id: "MSIG-02", title: "Kigali Tech Hub Cloud & Starlink Annual Renewal", amountUsd: 320, sigs: 2, required: 3, executed: false },
  ]);
  const [msMsg, setMsMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function signProposal(item) {
    if (item.executed) return;
    const nextSigs = item.sigs + 1;
    const done = nextSigs >= item.required;
    setProposals((prev) => prev.map((p) => (p.id === item.id ? { ...p, sigs: nextSigs, executed: done } : p)));
    if (done) {
      const { tx } = recordSovereignTx({
        hub: "Multi-Sig Treasury",
        title: `3/3 Approved: ${item.title}`,
        amountUsd: item.amountUsd,
        rwfRate,
        type: "DEBIT",
      });
      setMsMsg(`🏛️ MULTI-SIG EXECUTED [${tx.id}]: ${item.title} · $${item.amountUsd} USD (${Math.round(item.amountUsd * rwfRate).toLocaleString()} RWF) disbursed!`);
    }
  }

  return (
    <section id="sovereign-multisig-treasury-vault" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🏛️ Corporate & SACCO Multi-Signature Treasury Vault (2-of-3 / 3-of-3 Governance)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Board-level cryptographic approval for cooperative, company & institutional disbursements</span>
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#34d399" }}>Hardware-Key Protected</span>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {proposals.map((p) => (
          <div key={p.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <strong style={{ fontSize: 12 }}>[{p.id}] {p.title}</strong>
              <span style={{ display: "block", fontSize: 11, color: theme.muted }}>
                Amount: ${p.amountUsd} USD ({Math.round(p.amountUsd * rwfRate).toLocaleString()} RWF) · Signatures: {p.sigs}/{p.required}
              </span>
            </div>
            <button
              type="button"
              onClick={() => signProposal(p)}
              disabled={p.executed}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                background: p.executed ? "#475569" : "#10b981",
                color: p.executed ? "#cbd5e1" : "#02131d",
                fontWeight: 900,
                fontSize: 11.5,
                cursor: p.executed ? "default" : "pointer",
              }}
            >
              {p.executed ? "✅ Disbursed (3/3)" : "✍️ Co-Sign & Release"}
            </button>
          </div>
        ))}
      </div>
      {msMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msMsg}</div>}
    </section>
  );
}
