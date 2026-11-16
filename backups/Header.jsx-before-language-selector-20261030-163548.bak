export default function Header({ theme, panel, button, dark, setDark }) {
  return (
    <header
      className="page-header"
      style={{
        ...panel,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 20,
        padding: 22,
      }}
    >
      <div>
        <div style={{
          color: "#22d3ee",
          fontWeight: 800,
          letterSpacing: 2,
          fontSize: 13,
        }}>
          ▥ KIGALI GLOBAL TRACKER
        </div>
        <h1 style={{ fontSize: 26, margin: "10px 0 7px" }}>
          Crypto & Currency Dashboard
        </h1>
        <p style={{
          color: theme.muted,
          margin: 0,
          fontSize: 13,
          lineHeight: 1.7,
        }}>
          Live crypto · Global currencies · Portfolio · Price alerts
        </p>
      </div>
      <button style={button()} onClick={() => setDark((old) => !old)}>
        {dark ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </header>
  );
}
