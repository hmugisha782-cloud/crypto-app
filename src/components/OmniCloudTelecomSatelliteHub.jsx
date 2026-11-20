import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const TELECOM_CLOUD_PILLARS = [
  "🛰️ LEO Satellite Broadband & Rural Mesh Kit",
  "🧠 Sovereign AI H200 & Quantum GPU Cluster",
  "📱 195-Country Travel eSIM & Enterprise VoIP",
  "🗄️ Immutable IPFS / Quantum Cold-Vault Storage",
  "⚡ Tier-4 Kigali Data Center Dedicated Server",
  "🌐 Global Anycast CDN & Zero-Latency Edge Node",
  "📶 MTN / Airtel Enterprise Fiber & 5G Slice",
  "🔐 Sovereign Quantum Key Distribution (QKD) Link"
];

const DATA_REGIONS = ["Kigali Tier-4 DC", "Gatsibo LEO Ground", "Nairobi Edge Hub", "London Docklands", "Zurich Bunker DC", "Singapore Core", "Dubai Cloud Zone", "Virginia East"];

export default function OmniCloudTelecomSatelliteHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [cldMsg, setCldMsg] = useState("");

  const TOTAL_NODES = 10000000000000000000000000;
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
      const p = TELECOM_CLOUD_PILLARS[id % TELECOM_CLOUD_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const reg = DATA_REGIONS[(id * 59) % DATA_REGIONS.length];
      const title = `${p} · ${reg} #${String(id).padStart(26, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((7 + ((id * 151) % 490)).toFixed(2));
      out.push({ id, p, reg, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function provisionInfra(item) {
    const cid = "CLD-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`📡 INFRASTRUCTURE PROVISIONED [${cid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "CloudTelecomSatellite", title: item.title || "CloudTelecomSatellite Execution", amountUsd: _usdVal, rwfRate }); setCldMsg(`📡 INFRASTRUCTURE PROVISIONED [${cid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-cloud-telecom-satellite-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📡 Sovereign Satellite Internet, Quantum AI GPU Clusters & 195-Country eSIM Hub (10QND+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Provision LEO satellite links, AI GPU servers, 195-country eSIMs & Tier-4 Kigali cloud storage in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(6,182,212,0.18)", color: "#22d3ee", fontWeight: 800, fontSize: 11 }}>
          10SP+ Cloud & Telecom Nodes · 10 Quindecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search satellite, AI GPUs & eSIMs (e.g. Kigali, Gatsibo, Satellite, GPU, eSIM, Fiber)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Cloud, Satellite & Telecom Pillars (10SP+)</option>
          {TELECOM_CLOUD_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_NODES / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_NODES / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_NODES / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_NODES / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {nodes.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => provisionInfra(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              📡 Provision Node
            </button>
          </div>
        ))}
      </div>

      {cldMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{cldMsg}</div>}
    </section>
  );
}
