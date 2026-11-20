import { useState } from "react";

const HUBS = [
  { id: "KGL", city: "🇷🇼 Kigali City (KIFC / Nyarugenge)", lat: -1.9441, lon: 30.0619, type: "HQ Vault · BK/MoMo Agent · 24K Gold", status: "OPEN 24/7" },
  { id: "GTB", city: "🇷🇼 Gatsibo District (Kabarore / Kiramuruzi)", lat: -1.5833, lon: 30.4500, type: "Agro-Wealth Hub · MoMo Cash-Out · EV Swap", status: "OPEN 24/7" },
  { id: "RBV", city: "🇷🇼 Rubavu / Lake Kivu Border Hub", lat: -1.6771, lon: 29.2564, type: "Cross-Border FX · USDT/CDF/RWF Desk", status: "OPEN 24/7" },
  { id: "MSZ", city: "🇷🇼 Musanze / Virunga Tourism Hub", lat: -1.4998, lon: 29.6344, type: "Safari Concierge · Multi-Currency ATM", status: "OPEN 24/7" },
  { id: "HYE", city: "🇷🇼 Huye Southern University Hub", lat: -2.5967, lon: 29.7394, type: "Student FinTech · Instant P2P Agent", status: "OPEN 24/7" },
];

export default function SovereignRwandaLiveMapHub({ theme, panel }) {
  const [selected, setSelected] = useState(HUBS.at(0));
  const bbox = `${selected.lon - 0.08},${selected.lat - 0.06},${selected.lon + 0.08},${selected.lat + 0.06}`;

  return (
    <section id="sovereign-rwanda-live-map-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15.5 }}>🗺️ Rwanda & East Africa Live Agent, ATM, Gold & EV Station Map</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Active Node: {selected.city} · {selected.type}</span>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.2)", color: "#34d399", fontWeight: 900, fontSize: 11 }}>● {selected.status}</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {HUBS.map((h) => (
          <button key={h.id} type="button" onClick={() => setSelected(h)} style={{ padding: "5px 10px", borderRadius: 8, border: selected.id === h.id ? "1px solid #10b981" : `1px solid ${theme.border}`, background: selected.id === h.id ? "#10b981" : theme.input, color: selected.id === h.id ? "#02131d" : theme.text, fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>{h.city.split("(").at(0).trim()}</button>
        ))}
      </div>
      <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}`, height: 220 }}>
        <iframe title="Rwanda Live Map" src={`https://openstreetmap.org{encodeURIComponent(bbox)}&layer=mapnik&marker=${selected.lat},${selected.lon}`} style={{ width: "100%", height: "100%", border: "none" }} />
      </div>
    </section>
  );
}
