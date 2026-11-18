import { useState } from "react";

export default function FloatingCommandDock({ theme }) {
  const [open, setOpen] = useState(true);
  const [accent, setAccent] = useState("#06b6d4");

  const jumps = [
    ["⬆️ Top", () => window.scrollTo({ top: 0, behavior: "smooth" })],
    ["⚽ 150 Nations", () => document.getElementById("interactive-sports-games")?.scrollIntoView({ behavior: "smooth" })],
    ["⚡ Omni-AI v7", () => document.getElementById("omni-ai-copilot")?.scrollIntoView({ behavior: "smooth" })],
    ["📊 175M+ Nodes", () => document.getElementById("enterprise-scale-25k")?.scrollIntoView({ behavior: "smooth" })],
  ];

  const accents = [
    ["Cyan", "#06b6d4"],
    ["Emerald", "#10b981"],
    ["Gold", "#f59e0b"],
    ["Violet", "#8b5cf6"],
  ];

  function applyAccent(hex) {
    setAccent(hex);
    document.documentElement.style.setProperty("--kgt-accent", hex);
  }

  return (
    <div style={{
      position: "fixed",
      right: 14,
      bottom: 14,
      zIndex: 9999,
      padding: open ? "10px 12px" : "7px 11px",
      borderRadius: 14,
      background: "rgba(9, 17, 31, 0.92)",
      backdropFilter: "blur(12px)",
      border: `1px solid ${accent}`,
      boxShadow: `0 10px 30px rgba(0,0,0,0.45)`,
      color: "#f8fafc",
      display: "grid",
      gap: 8,
      fontSize: 11,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <strong style={{ color: accent }}>🧭 KGT Quick-Dock (v57)</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} style={{ border: "none", background: "transparent", color: "#cbd5e1", cursor: "pointer", fontWeight: 800 }}>
          {open ? "—" : "+"}
        </button>
      </div>

      {open && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {jumps.map(([label, fn]) => (
              <button key={label} type="button" onClick={fn} style={{ padding: "5px 8px", borderRadius: 7, border: `1px solid ${theme.border}`, background: "#111c33", color: "#f8fafc", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Glow:</span>
            {accents.map(([name, hex]) => (
              <button key={name} type="button" onClick={() => applyAccent(hex)} title={name} style={{ width: 15, height: 15, borderRadius: "50%", border: accent === hex ? "2px solid #fff" : "none", background: hex, cursor: "pointer" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
