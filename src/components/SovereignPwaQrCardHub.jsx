import { useState, useEffect } from "react";

export default function SovereignPwaQrCardHub({ theme, panel }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [pwaMsg, setPwaMsg] = useState("📱 Installable Android / iOS / Desktop App Ready (PWA Offline Mode)");

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setPwaMsg("✅ Kigali Global Tracker installed on your device!");
    } else {
      setPwaMsg("📲 To install: Open Chrome Menu (⋮) → 'Install Kigali Global Tracker' / 'Add to Home Screen'!");
    }
  }

  return (
    <section id="sovereign-pwa-qr-card-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="58" height="58" viewBox="0 0 60 60" style={{ background: "#fff", padding: 4, borderRadius: 8 }}>
          <rect x="4" y="4" width="18" height="18" fill="#020617" /><rect x="8" y="8" width="10" height="10" fill="#fff" /><rect x="10" y="10" width="6" height="6" fill="#020617" />
          <rect x="38" y="4" width="18" height="18" fill="#020617" /><rect x="42" y="8" width="10" height="10" fill="#fff" /><rect x="44" y="10" width="6" height="6" fill="#020617" />
          <rect x="4" y="38" width="18" height="18" fill="#020617" /><rect x="8" y="42" width="10" height="10" fill="#fff" /><rect x="10" y="44" width="6" height="6" fill="#020617" />
          <rect x="26" y="26" width="8" height="8" fill="#10b981" /><rect x="38" y="38" width="18" height="18" fill="#020617" />
        </svg>
        <div>
          <strong style={{ fontSize: 15 }}>📲 Install Mobile/Desktop PWA & Scan-to-Pay QR Digital Business Card</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>{pwaMsg} · Merchant ID: KGT-RW-250</span>
        </div>
      </div>
      <button type="button" onClick={installApp} style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
        📲 Install App on Device
      </button>
    </section>
  );
}
