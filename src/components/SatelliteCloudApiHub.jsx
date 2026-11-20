import { useState } from "react";

const CLOUD_PLANS = [
  { name: "🛰️ LEO Satellite High-Speed Rural & Business Internet", priceUsd: 55, spec: "350 Mbps · Unlimited Data" },
  { name: "☁️ Kigali Tier-4 Cloud VPS & SQLite/Postgres Cluster", priceUsd: 28, spec: "16 vCPU · 64GB RAM · NVMe" },
  { name: "🔑 Institutional MoMo, Crypto & FX Live REST/WS API Key", priceUsd: 75, spec: "100,000 Req/sec · 99.999% SLA" },
  { name: "🛡️ Global Edge CDN & Enterprise DDoS Mitigation Shield", priceUsd: 40, spec: "320+ Global PoPs" },
];

export default function SatelliteCloudApiHub({ rates = {}, theme, panel }) {
  const [plan, setPlan] = useState(CLOUD_PLANS);
  const [domainOrOrg, setDomainOrOrg] = useState("kigali-enterprise-node.rw");
  const [cloudMsg, setCloudMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function provisionCloudPlan(e) {
    e.preventDefault();
    const apiKey = "kgt_live_" + Math.random().toString(36).substring(2, 12).toUpperCase();
    setCloudMsg(`🛰️ PROVISIONED [${apiKey}]: ${plan.name} deployed for ${domainOrOrg} · Paid $${plan.priceUsd} USD (${Math.round(plan.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="satellite-cloud-api" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #a855f7", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🛰️ Global LEO Satellite Internet, Cloud VPS & Enterprise API Gateway (3B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Provision satellite connectivity, dedicated Kigali cloud servers & institutional payment APIs in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.18)", color: "#d8b4fe", fontWeight: 800, fontSize: 11 }}>
          3,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CLOUD_PLANS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setPlan(p)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${plan.name === p.name ? "#a855f7" : theme.border}`,
              background: plan.name === p.name ? "rgba(168,85,247,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{p.name}</strong>
            <span style={{ fontSize: 11, color: "#d8b4fe", fontWeight: 800 }}>${p.priceUsd} USD ({Math.round(p.priceUsd * rwfRate).toLocaleString()} RWF/mo)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{p.spec}</span>
          </button>
        ))}
      </div>

      <form onSubmit={provisionCloudPlan} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={domainOrOrg} onChange={(e) => setDomainOrOrg(e.target.value)} placeholder="Organization Name / Domain / Node ID" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#a855f7", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🛰️ Provision & Generate API Key ({Math.round(plan.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {cloudMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{cloudMsg}</div>}
    </section>
  );
}
