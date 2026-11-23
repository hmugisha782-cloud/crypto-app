import { useState } from "react";
import { TEN_THOUSAND_NODES, searchTenThousandNodes } from "../utils/sovereignTenThousandSuite.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

export default function SovereignTenThousandHub({ rates = {}, theme, panel }) {
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);
  const items = searchTenThousandNodes(q);

  function executeNode(n) {
    const { tx } = recordSovereignTx({
      hub: n.sector,
      title: `${n.name} (${n.id})`,
      amountUsd: n.rateUsd,
      rwfRate,
      type: "DEBIT",
    });
    setMsg(`✅ EXECUTED [${tx.id}] ${n.name} · $${n.rateUsd} USD (${Math.round(n.rateUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-ten-thousand-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>⚡ 10,000 Live Sovereign Service & Optimization Command Matrix</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Indexed Nodes: <strong>{TEN_THOUSAND_NODES.length.toLocaleString()}</strong> · Instant Zero-Latency Execution</span>
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Shakisha muri 10,000 (urugero: KGT-10K-09999, Gatsibo, Gold)..."
          style={{ width: 290, maxWidth: "100%", padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
      </div>
      {msg && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{msg}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8, maxHeight: 260, overflowY: "auto" }}>
        {items.map((n) => (
          <div key={n.id} style={{ padding: 9, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 5, fontSize: 11.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ color: "#34d399" }}>{n.id}</strong>
              <span style={{ color: theme.muted }}>{n.feeBps} bps</span>
            </div>
            <strong>{n.name}</strong>
            <button type="button" onClick={() => executeNode(n)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>
              ⚡ Execute (${n.rateUsd} / {Math.round(n.rateUsd * rwfRate).toLocaleString()} RWF)
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
