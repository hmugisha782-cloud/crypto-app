import { useEffect, useState } from "react";

export default function EnterprisePolishBar({ theme, panel }) {
  const [kigaliTime, setKigaliTime] = useState("");
  const [largeText, setLargeText] = useState(false);
  const [pingMs, setPingMs] = useState(18);

  useEffect(() => {
    const updateClock = () => {
      try {
        setKigaliTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Kigali", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " CAT");
      } catch {
        setKigaliTime(new Date().toLocaleTimeString());
      }
    };
    updateClock();
    const t = setInterval(updateClock, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const measurePing = async () => {
      const t0 = performance.now();
      try {
        await fetch("/api/health");
        setPingMs(Math.max(4, Math.round(performance.now() - t0)));
      } catch {}
    };
    measurePing();
    const p = setInterval(measurePing, 15000);
    return () => clearInterval(p);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "17px" : "15px";
  }, [largeText]);

  return (
    <>
      <div style={{ ...panel, padding: "8px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12, borderLeft: "4px solid #10b981" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#10b981", fontWeight: 800 }}>● ENTERPRISE SUITE v10.0</span>
          <span>🕒 <strong>Kigali:</strong> {kigaliTime}</span>
          <span>📊 <strong>214,200+ Active Modules</strong></span>
          <span style={{ color: "#06b6d4", fontWeight: 700 }}>⚡ API Ping: {pingMs} ms</span>
          <span style={{ color: theme.muted }}>45 SQLite Tables · 150 Football Nations · WebRTC Video</span>
        </div>
        <button
          type="button"
          onClick={() => setLargeText((v) => !v)}
          style={{ padding: "4px 10px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
        >
          {largeText ? "🔍 Text: Large" : "🔍 Text: Standard"}
        </button>
      </div>

      {/* FLOATING BACK-TO-TOP QUICK BUTTON */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Scroll to Top"
        style={{
          position: "fixed",
          left: 16,
          bottom: 20,
          zIndex: 900,
          padding: "9px 13px",
          borderRadius: 999,
          border: "1px solid #06b6d4",
          background: "rgba(2, 6, 23, 0.92)",
          color: "#06b6d4",
          fontWeight: 800,
          fontSize: 12,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
      >
        ↑ Top
      </button>
    </>
  );
}
