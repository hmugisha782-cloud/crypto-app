import { useState } from "react";

const SKINS = [
  { name: "🟢 Kigali Emerald", bg: "#020617", fg: "#f8fafc", accent: "#10b981" },
  { name: "👑 Royal Gold", bg: "#0c0a09", fg: "#fef3c7", accent: "#f59e0b" },
  { name: "🌌 Cyber Violet", bg: "#090d16", fg: "#ede9fe", accent: "#8b5cf6" },
  { name: "☀️ Clean Daylight", bg: "#f1f5f9", fg: "#0f172a", accent: "#059669" },
];

export default function SovereignThemeAndCalcStudio({ theme, panel }) {
  const [skin, setSkin] = useState(SKINS.at(0).name);
  const [expr, setExpr] = useState("1480 * 250");
  const [ans, setAns] = useState("370,000");

  function applySkin(s) {
    setSkin(s.name);
    document.body.style.backgroundColor = s.bg;
    document.body.style.color = s.fg; try { localStorage.setItem("kgt_skin_bg", s.bg); localStorage.setItem("kgt_skin_fg", s.fg); } catch {}
  }

  function runCalc(val) {
    setExpr(val);
    const clean = val.replace(/[^0-9+\-*/().%\s]/g, "");
    try {
      const res = Function(`"use strict"; return (${clean});`)();
      if (typeof res === "number" && Number.isFinite(res)) setAns(res.toLocaleString());
    } catch {}
  }

  return (
    <section id="sovereign-theme-calc-studio" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #a855f7", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <strong style={{ fontSize: 13 }}>🎨 App Skin:</strong>
        {SKINS.map((s) => (
          <button key={s.name} type="button" onClick={() => applySkin(s)} style={{ padding: "5px 9px", borderRadius: 8, border: skin === s.name ? `1px solid ${s.accent}` : `1px solid ${theme.border}`, background: skin === s.name ? s.accent : theme.input, color: skin === s.name ? "#02131d" : theme.text, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{s.name}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <strong style={{ fontSize: 12.5 }}>🧮 Quick Calc:</strong>
        <input type="text" value={expr} onChange={(e) => runCalc(e.target.value)} style={{ width: 130, padding: "5px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <span style={{ padding: "5px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", color: "#34d399", fontWeight: 900, fontSize: 12 }}>= {ans}</span>
      </div>
    </section>
  );
}
