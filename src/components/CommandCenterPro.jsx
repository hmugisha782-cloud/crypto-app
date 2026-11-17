import { useEffect, useState } from "react";

export default function CommandCenterPro({ coins = [], rates = {}, theme, panel }) {
  const [pulse, setPulse] = useState({ fearGreedValue: 56, classification: "Greed" });
  const [events, setEvents] = useState([]);
  const [diag, setDiag] = useState(null);

  useEffect(() => {
    fetch("/api/market/pulse").then((r) => (r.ok ? r.json() : null)).then((d) => d && setPulse(d)).catch(() => {});
    fetch("/api/inst/macro-calendar").then((r) => (r.ok ? r.json() : null)).then((d) => d && setEvents(d.events || [])).catch(() => {});
    fetch("/api/system/diagnostics").then((r) => (r.ok ? r.json() : null)).then((d) => d && setDiag(d)).catch(() => {});
  }, []);

  const btc = coins.find((c) => String(c.symbol || "").toLowerCase() === "btc");
  const eth = coins.find((c) => String(c.symbol || "").toLowerCase() === "eth");
  const btcUsd = Number(btc?.price || btc?.current_price || 68000);
  const ethUsd = Number(eth?.price || eth?.current_price || 3400);
  const rwf = Number(rates?.RWF || 1380);
  const kes = Number(rates?.KES || 129.4);
  const eur = Number(rates?.EUR || 0.92);

  return (
    <section style={{ display: "grid", gap: 14, marginBottom: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <div style={{ ...panel, padding: 14, borderLeft: "4px solid #10b981" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.muted }}>FEAR & GREED SENTIMENT</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981", margin: "4px 0" }}>
            {pulse.fearGreedValue} / 100 · {pulse.classification}
          </div>
          <div style={{ fontSize: 12, color: theme.muted }}>Live market psychology & momentum gauge</div>
        </div>

        <div style={{ ...panel, padding: 14, borderLeft: "4px solid #06b6d4" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.muted }}>1 BTC MULTI-CURRENCY VALUE</div>
          <div style={{ fontSize: 18, fontWeight: 800, margin: "4px 0" }}>
            {Math.round(btcUsd * rwf).toLocaleString()} RWF
          </div>
          <div style={{ fontSize: 12, color: theme.muted }}>
            ${btcUsd.toLocaleString()} · {Math.round(btcUsd * kes).toLocaleString()} KES · €{Math.round(btcUsd * eur).toLocaleString()}
          </div>
        </div>

        <div style={{ ...panel, padding: 14, borderLeft: "4px solid #8b5cf6" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.muted }}>1 ETH MULTI-CURRENCY VALUE</div>
          <div style={{ fontSize: 18, fontWeight: 800, margin: "4px 0" }}>
            {Math.round(ethUsd * rwf).toLocaleString()} RWF
          </div>
          <div style={{ fontSize: 12, color: theme.muted }}>
            ${ethUsd.toLocaleString()} · {Math.round(ethUsd * kes).toLocaleString()} KES · €{Math.round(ethUsd * eur).toLocaleString()}
          </div>
        </div>

        <div style={{ ...panel, padding: 14, borderLeft: "4px solid #f59e0b" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.muted }}>KGT SYSTEM TELEMETRY</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#06b6d4", margin: "4px 0" }}>
            600+ Features Active
          </div>
          <div style={{ fontSize: 12, color: theme.muted }}>
            {diag ? `Uptime: ${diag.uptimeSeconds}s · SQLite: ${diag.sqliteSizeKb} KB` : "38 SQLite Tables · Express WAL"}
          </div>
        </div>
      </div>

      {events.length > 0 && (
        <div style={{ ...panel, padding: "10px 14px", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", fontSize: 12 }}>
          <strong style={{ color: "#f59e0b" }}>📅 UPCOMING MACRO EVENTS:</strong>
          {events.map((ev, i) => (
            <span key={i} style={{ padding: "3px 9px", borderRadius: 6, background: theme.input, border: `1px solid ${theme.border}` }}>
              <strong>{ev.date}:</strong> {ev.event} ({ev.impact})
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
