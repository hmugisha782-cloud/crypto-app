import { useTranslation } from "react-i18next";

export default function Header({ theme, panel, button, dark, setDark }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("kgt-language", language);
  };
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
          {t("header.title")}
        </h1>
        <p style={{
          color: theme.muted,
          margin: 0,
          fontSize: 13,
          lineHeight: 1.7,
        }}>
          {t("header.subtitle")}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} style={{ ...button(), color: theme.text, cursor: "pointer" }}>
          <option value="en">🇬🇧 English</option>
          <option value="kin">🇷🇼 Kinyarwanda</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="sw">🇹🇿 Kiswahili</option>
          <option value="es">🇪🇸 Español</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="pt">🇵🇹 Português</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="bn">🇧🇩 বাংলা</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="id">🇮🇩 Bahasa Indonesia</option>
          <option value="ur">🇵🇰 اردو</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="it">🇮🇹 Italiano</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="vi">🇻🇳 Tiếng Việt</option>
          <option value="mr">🇮🇳 मराठी</option>
        </select>
        <button style={button()} onClick={() => setDark((old) => !old)}>
          {dark ? `☀️ ${t("header.lightMode")}` : `🌙 ${t("header.darkMode")}`}
        </button>
      </div>
    </header>
  );
}
