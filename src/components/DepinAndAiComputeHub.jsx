import { useState } from "react";

export default function DepinAndAiComputeHub({ rates = {}, theme, panel }) {
  const [gpuNodes, setGpuNodes] = useState("2");
  const [solarKw, setSolarKw] = useState("5");
  const [depinMsg, setDepinMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const gCount = Math.max(0, Number(gpuNodes) || 0);
  const sCount = Math.max(0, Number(solarKw) || 0);

  const monthlyUsd = gCount * 145 + sCount * 38;
  const monthlyRwf = Math.round(monthlyUsd * rwfRate);

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #10b981", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>☀️ East Africa Solar DePIN & Decentralized AI GPU Compute Yield</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Earn passive USDT & RWF rewards by backing tokenized Kigali solar micro-grids and decentralized AI GPU compute nodes.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(16, 185, 129, 0.18)", color: "#10b981", fontWeight: 800, fontSize: 11 }}>
          145,000+ Active DePIN Nodes
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>AI GPU Compute Shares ($145/mo yield)</label>
          <input
            type="number"
            min="0"
            value={gpuNodes}
            onChange={(e) => setGpuNodes(e.target.value)}
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: theme.muted, marginBottom: 4 }}>Kigali Solar Grid kW Units ($38/mo yield)</label>
          <input
            type="number"
            min="0"
            value={solarKw}
            onChange={(e) => setSolarKw(e.target.value)}
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text }}
          />
        </div>
        <div style={{ padding: 10, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 11, color: theme.muted }}>Est. Monthly DePIN Passive Payout</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#10b981" }}>
            {"$"}{monthlyUsd.toLocaleString()} ({monthlyRwf.toLocaleString()} RWF)
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDepinMsg(`✓ DePIN Allocation Reserved: ${gCount} AI GPU Nodes + ${sCount} kW Solar Grid (${monthlyRwf.toLocaleString()} RWF/mo est. yield)!`)}
          style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
        >
          Stake in DePIN Grid
        </button>
      </div>

      {depinMsg && (
        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16, 185, 129, 0.16)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 700 }}>
          {depinMsg}
        </div>
      )}
    </section>
  );
}
