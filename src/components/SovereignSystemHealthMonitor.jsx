export default function SovereignSystemHealthMonitor({ theme, panel }) {
  const nodes = [
    { city: "🇷🇼 Kigali Core IXP", ping: "4 ms", status: "99.999% ONLINE" },
    { city: "🇷🇼 Gatsibo Edge Mesh", ping: "6 ms", status: "99.999% ONLINE" },
    { city: "🇬🇧 London FinTech Hub", ping: "18 ms", status: "99.999% ONLINE" },
    { city: "🇦🇪 Dubai DIFC Node", ping: "21 ms", status: "99.999% ONLINE" },
    { city: "🇸🇬 Singapore Crypto Core", ping: "29 ms", status: "99.999% ONLINE" },
    { city: "🇺🇸 New York Wall St", ping: "32 ms", status: "99.999% ONLINE" },
  ];

  return (
    <section id="sovereign-system-health-monitor" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>📡 Global Sovereign Edge Telemetry & 99.999% SLA Node Monitor</strong>
        <span style={{ fontSize: 11.5, color: "#34d399", fontWeight: 800 }}>All 6 Global Regions Operational</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 8 }}>
        {nodes.map((n) => (
          <div key={n.city} style={{ padding: 8, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11.5 }}>
            <strong style={{ display: "block" }}>{n.city}</strong>
            <span style={{ color: "#34d399", fontWeight: 800 }}>● {n.status} ({n.ping})</span>
          </div>
        ))}
      </div>
    </section>
  );
}
