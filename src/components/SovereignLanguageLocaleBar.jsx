import { useState, useEffect } from "react";
import { getActiveLang, setActiveLang } from "../utils/sovereignLedger.js";
import { GLOBAL_LANGUAGES, getLocaleConfig, applyGlobalLanguageToApp, detectBrowserLanguage } from "../utils/universalTranslator.js";

export default function SovereignLanguageLocaleBar({ theme, panel }) {
  const [lang, setLang] = useState(getActiveLang);
  const cur = getLocaleConfig(lang);

  useEffect(() => {
    applyGlobalLanguageToApp(lang);
    const sync = () => {
      const next = getActiveLang();
      setLang(next);
      applyGlobalLanguageToApp(next);
    };
    window.addEventListener("kgt-lang-updated", sync);
    return () => window.removeEventListener("kgt-lang-updated", sync);
  }, [lang]);

  function chooseLang(code) {
    setLang(code);
    setActiveLang(code);
    applyGlobalLanguageToApp(code);
  }

  return (
    <section id="sovereign-language-locale-bar" style={{ ...panel, marginBottom: 16, borderTop: "4px solid #10b981", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 14, display: "block" }}>{cur.flag} {cur.welcome}</strong>
          <span style={{ fontSize: 11.5, color: theme.muted }}>{cur.sub}</span>
        </div>
        <select
          value={lang}
          onChange={(e) => chooseLang(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #10b981", background: theme.input, color: theme.text, fontSize: 12, fontWeight: 900 }}
        >
          {GLOBAL_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.flag} {l.name} ({l.code})</option>
          ))}
        </select>
          <button type="button" onClick={() => chooseLang(detectBrowserLanguage())} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #38bdf8", background: theme.input, color: "#7dd3fc", fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>🌐 Auto-Detect</button>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {GLOBAL_LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => chooseLang(l.code)}
            style={{
              padding: "4px 8px",
              borderRadius: 7,
              border: lang === l.code ? "1px solid #10b981" : `1px solid ${theme.border}`,
              background: lang === l.code ? "#10b981" : theme.input,
              color: lang === l.code ? "#02131d" : theme.text,
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {l.flag} {l.name}
          </button>
        ))}
      </div>
    </section>
  );
}
