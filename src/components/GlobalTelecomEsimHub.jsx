import { useState } from "react";

const TELECOM_PLANS = [
  { name: "🌍 Global 195-Country 5G / 6G Unlimited Travel eSIM", priceUsd: 25, tag: "Instant QR Activation" },
  { name: "📱 MTN Rwanda, Airtel, Safaricom & Vodacom Instant Data", priceUsd: 10, tag: "East Africa Direct" },
  { name: "☎️ Virtual Business Phone Number (+250 / +1 USA / +44 UK)", priceUsd: 15, tag: "Cloud VoIP & SMS" },
  { name: "🛰️ Enterprise Bulk SMS & OTP Gateway (10,000 Messages)", priceUsd: 45, tag: "99.99% Delivery SLA" },
];

export default function GlobalTelecomEsimHub({ rates = {}, theme, panel }) {
  const [tel, setTel] = useState(TELECOM_PLANS);
  const [phoneTarget, setPhoneTarget] = useState("+250 788 000 123 · Kigali / Global");
  const [telMsg, setTelMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateTelecomPlan(e) {
    e.preventDefault();
    const ref = "KGT-TEL-" + Math.floor(100000 + Math.random() * 900000);
    setTelMsg(`📡 TELECOM & eSIM ACTIVE [${ref}]: "${tel.name}" activated for ${phoneTarget} · Paid $${tel.priceUsd} USD (${Math.round(tel.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="global-telecom-esim" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #3b82f6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📡 Global 5G/6G Travel eSIM, Virtual Numbers (+250/+1/+44) & Airtime Hub (500B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Activate instant worldwide 5G eSIMs, virtual international phone numbers & East Africa data bundles in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(59,130,246,0.18)", color: "#60a5fa", fontWeight: 800, fontSize: 11 }}>
          500,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {TELECOM_PLANS.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setTel(t)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${tel.name === t.name ? "#3b82f6" : theme.border}`,
              background: tel.name === t.name ? "rgba(59,130,246,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{t.name}</strong>
            <span style={{ fontSize: 11, color: "#60a5fa", fontWeight: 800 }}>${t.priceUsd} USD ({Math.round(t.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{t.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateTelecomPlan} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={phoneTarget} onChange={(e) => setPhoneTarget(e.target.value)} placeholder="Phone Number / eSIM EID / Country Code" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          📡 Activate eSIM / Airtime ({Math.round(tel.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {telMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{telMsg}</div>}
    </section>
  );
}
