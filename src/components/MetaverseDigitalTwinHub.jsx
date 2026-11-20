import { useState } from "react";

const TWIN_ASSETS = [
  { name: "🪪 Web3 Sovereign Digital ID & .kgt / .rw Domain Passport", priceUsd: 15, tag: "Self-Sovereign Identity" },
  { name: "🏙️ Kigali 3D Digital Twin Commercial Plot (Virtual HQ)", priceUsd: 180, tag: "Smart City Twin" },
  { name: "📜 On-Chain Property Deed, IP & Patent Timestamp Vault", priceUsd: 35, tag: "Immutable Registry" },
  { name: "🌐 Global Virtual Conference & VIP Trade Expo Booth", priceUsd: 90, tag: "3D Networking Arena" },
];

export default function MetaverseDigitalTwinHub({ rates = {}, theme, panel }) {
  const [twin, setTwin] = useState(TWIN_ASSETS);
  const [handleName, setHandleName] = useState("kigali-founder.kgt");
  const [twinMsg, setTwinMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function mintDigitalAsset(e) {
    e.preventDefault();
    const hash = "0xKGT" + Math.random().toString(16).substring(2, 12).toUpperCase();
    setTwinMsg(`🌐 DIGITAL TWIN & WEB3 MINTED [${hash}]: "${twin.name}" registered to ${handleName} · Paid $${twin.priceUsd} USD (${Math.round(twin.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="metaverse-digital-twin" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #d946ef", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🌐 Kigali 3D Digital Twin City, Web3 .kgt Identity & IP Registry (8B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Register .kgt Web3 identities, virtual Kigali HQ plots & immutable patent/deed timestamps in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(217,70,239,0.18)", color: "#f0abfc", fontWeight: 800, fontSize: 11 }}>
          8,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {TWIN_ASSETS.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setTwin(t)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${twin.name === t.name ? "#d946ef" : theme.border}`,
              background: twin.name === t.name ? "rgba(217,70,239,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{t.name}</strong>
            <span style={{ fontSize: 11, color: "#f0abfc", fontWeight: 800 }}>${t.priceUsd} USD ({Math.round(t.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{t.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={mintDigitalAsset} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={handleName} onChange={(e) => setHandleName(e.target.value)} placeholder="Enter .kgt Domain / Organization / Patent Title" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#d946ef", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🌐 Register & Mint ({Math.round(twin.priceUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {twinMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{twinMsg}</div>}
    </section>
  );
}
