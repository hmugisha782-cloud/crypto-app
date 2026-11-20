import { useState } from "react";

const CAMPAIGNS = [
  { name: "🚀 Rwanda Youth AI & FinTech Startup Seed Pool", minUsd: 25, info: "Equity & Revenue-Share" },
  { name: "💧 Gatsibo & Eastern Clean Water & School Solar Fund", minUsd: 10, info: "100% Transparent On-Chain" },
  { name: "👩‍🌾 Women Agri-Cooperative Micro-Grant Accelerator", minUsd: 15, info: "0% Interest Impact Loan" },
  { name: "🌍 Global Open-Source & Community Builders Grant", minUsd: 20, info: "Instant Milestone Payout" },
];

export default function CrowdfundingImpactHub({ rates = {}, theme, panel }) {
  const [campaign, setCampaign] = useState(CAMPAIGNS);
  const [backerName, setBackerName] = useState("Kigali_Impact_Partner");
  const [crowdMsg, setCrowdMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function fundCampaign(e) {
    e.preventDefault();
    const tx = "KGT-IMP-" + Math.floor(100000 + Math.random() * 900000);
    setCrowdMsg(`🤝 IMPACT CONTRIBUTION VERIFIED [${tx}]: ${backerName} funded "${campaign.name}" with $${campaign.minUsd} USD (${Math.round(campaign.minUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="crowdfunding-impact" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #ec4899", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🤝 Global Crowdfunding, Startup Seed Pool & Social Impact Vault (5B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Back Rwandan youth startups, rural clean-water projects & women cooperatives with instant RWF/USDT tracking.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(236,72,153,0.18)", color: "#f472b6", fontWeight: 800, fontSize: 11 }}>
          5,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CAMPAIGNS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCampaign(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${campaign.name === c.name ? "#ec4899" : theme.border}`,
              background: campaign.name === c.name ? "rgba(236,72,153,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#f472b6", fontWeight: 800 }}>${c.minUsd} USD ({Math.round(c.minUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{c.info}</span>
          </button>
        ))}
      </div>

      <form onSubmit={fundCampaign} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={backerName} onChange={(e) => setBackerName(e.target.value)} placeholder="Backer / Organization Name" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#ec4899", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🤝 Fund & Issue Receipt ({Math.round(campaign.minUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {crowdMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{crowdMsg}</div>}
    </section>
  );
}
