import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const TELECOM_6G_PILLARS = [
  "📶 195-Country Unlimited 5G/6G Travel eSIM",
  "🛰️ Gatsibo & Rural LEO Satellite Mesh Terminal",
  "☎️ Sovereign +250 & Global Cloud PBX Number",
  "🔗 Kigali–Mombasa Dark-Fiber Wavelength Lease",
  "📡 Decentralized 6G Community Hotspot Node",
  "🔐 Quantum-Encrypted Sovereign Voice & SMS Trunk",
  "🌐 Enterprise SD-WAN & Zero-Jitter CDN Edge",
  "📲 Instant Airtime, Fiber & Data Bundle Auto-Topup"
];

const TELCO_ZONES = ["Kigali IXP Core", "Gatsibo Mesh Hub", "Mombasa Landing", "Nairobi Carrier Hub", "London Telehouse", "Dubai Smart-Net", "Frankfurt DE-CIX", "Singapore Equinix"];

export default function OmniGlobalTelecom6GMeshHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [telMsg, setTelMsg] = useState("");

  const TOTAL_NODES = 10000000000000000000000000000000000000000;
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
      const p = TELECOM_6G_PILLARS[id % TELECOM_6G_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = TELCO_ZONES[(id * 131) % TELCO_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(41, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((5 + ((id * 239) % 395)).toFixed(2));
      out.push({ id, p, zone, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function activateTelco(item) {
    const iccid = "6G-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`📡 TELECOM & 6G MESH ACTIVATED [${iccid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GlobalTelecom6GMesh", title: item.title || "GlobalTelecom6GMesh Execution", amountUsd: _usdVal, rwfRate }); setTelMsg(`📡 TELECOM & 6G MESH ACTIVATED [${iccid}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-global-telecom-6g-mesh-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #38bdf8", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📡 Global 195-Country eSIM, Satellite Mesh, +250 Cloud PBX & Dark-Fiber Hub (10VG+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Activate travel eSIMs, Gatsibo/Kigali satellite terminals, +250 cloud numbers & dark fiber in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(56,189,248,0.18)", color: "#7dd3fc", fontWeight: 800, fontSize: 11 }}>
          10DD+ Telecom Nodes · 10 Vigintillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search eSIM, +250 PBX & dark fiber (e.g. Kigali, Gatsibo, eSIM, Satellite, Fiber)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Telecom & 6G Mesh Pillars (10DD+)</option>
          {TELECOM_6G_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
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
            <span style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => activateTelco(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              📡 Activate Node
            </button>
          </div>
        ))}
      </div>

      {telMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{telMsg}</div>}
    </section>
  );
}
