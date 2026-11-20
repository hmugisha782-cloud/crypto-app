import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const QUANTUM_MINING_PILLARS = [
  "⛏️ Green-Hydro & Solar BTC Hashrate Contract",
  "⚛️ Quantum QPU Photonic Compute Time-Slice",
  "🛡️ Institutional ETH / SOL Validator Staking Node",
  "🧠 Decentralized AI GPU Inference & ZK-Prover",
  "🔋 Lake Kivu Methane-Powered ASIC Mining Pod",
  "🌐 Sovereign Layer-1 Sequencer & RPC Enterprise",
  "🔐 Post-Quantum Lattice Cryptography Key Vault",
  "📊 Auto-Compounding Liquid Restaking Treasury"
];

const COMPUTE_CENTERS = ["Rusumo Hydro Mine", "Gatsibo Solar ASIC", "Kigali Tier-4 QPU", "Lake Kivu Methane Pod", "Zurich Cryo-Quantum", "Reykjavik Geo-Hash", "Singapore AI Cluster", "Nairobi Edge Prover"];

export default function OmniQuantumComputeMiningHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [qtmMsg, setQtmMsg] = useState("");

  const TOTAL_NODES = 10000000000000000000000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const nodes = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_NODES) {
      const id = ((idx + scanned - 1) % TOTAL_NODES) + 1;
      scanned++;
      const p = QUANTUM_MINING_PILLARS[id % QUANTUM_MINING_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const dc = COMPUTE_CENTERS[(id * 149) % COMPUTE_CENTERS.length];
      const title = `${p} · ${dc} #${String(id).padStart(44, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const stakeUsd = Number((15 + ((id * 251) % 985)).toFixed(2));
      const apyPct = Number((18.6 + ((id * 31) % 125) / 10).toFixed(1));
      out.push({ id, p, dc, title, stakeUsd, apyPct });
    }
    return out;
  }, [search, pillar, page]);

  function deployCompute(item) {
    const ref = "QTM-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`⚛️ QUANTUM & MINING NODE ACTIVE [${ref}]: ${item.title} (${item.apyPct}% APY) · Paid $${item.stakeUsd} USD (${Math.round(item.stakeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "QuantumComputeMining", title: item.title || "QuantumComputeMining Execution", amountUsd: _usdVal, rwfRate }); setQtmMsg(`⚛️ QUANTUM & MINING NODE ACTIVE [${ref}]: ${item.title} (${item.apyPct}% APY) · Paid $${item.stakeUsd} USD (${Math.round(item.stakeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-quantum-compute-mining-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>⚛️ Green-Hydro Bitcoin Mining, Quantum QPU Compute & Validator Staking Hub (10UVG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Mine BTC with Rusumo/Gatsibo clean power, rent Quantum QPUs & stake ETH/SOL validators in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          10TD+ Compute & Mining Nodes · 10 Unvigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search BTC mining, Quantum QPU & staking (e.g. Rusumo, Gatsibo, Kivu, ETH, GPU)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Quantum Compute & Mining Pillars (10TD+)</option>
          {QUANTUM_MINING_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {Math.ceil(TOTAL_NODES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^")}</span>
          <button type="button" onClick={() => setPage((p) => p + 1)} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {nodes.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${item.stakeUsd} USD ({Math.round(item.stakeUsd * rwfRate).toLocaleString()} RWF) · {item.apyPct}% APY</span>
            <button type="button" onClick={() => deployCompute(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              ⚛️ Start Hash / Stake
            </button>
          </div>
        ))}
      </div>

      {qtmMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{qtmMsg}</div>}
    </section>
  );
}
