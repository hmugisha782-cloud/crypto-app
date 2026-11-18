import { useEffect, useState } from "react";

export default function AdminTreasuryHub({ activeTab, rates = {}, theme, panel }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [platformFeePct, setPlatformFeePct] = useState("0.8");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function installPwa() {
    if (!deferredPrompt) {
      alert("To install Kigali Global Tracker as a mobile/desktop app: click your browser menu (⋮) and select 'Install App' or 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
  }

  const rwfRate = Number(rates?.RWF || 1480);

  return (
    <>
      {/* TOP PWA APP INSTALL & VERCEL CLOUD STATUS STRIP */}
      <div style={{ ...panel, padding: "8px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, borderLeft: "4px solid #8b5cf6", fontSize: 12 }}>
        <div>
          <strong style={{ color: "#c4b5fd" }}>📲 Kigali Global Super-App (PWA Ready):</strong>{" "}
          <span style={{ color: theme.muted }}>Install directly on Android, iPhone, Windows & Linux for instant 1-tap access.</span>
        </div>
        <button
          type="button"
          onClick={installPwa}
          style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer" }}
        >
          {installed ? "✓ App Installed" : "📲 Install Mobile / Desktop App"}
        </button>
      </div>

      {/* DEDICATED VIP ADMIN & TREASURY CONTROL CENTER */}
      {activeTab === "admin" && (
        <section style={{ ...panel, borderTop: "4px solid #ef4444", marginBottom: 24, display: "grid", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ margin: 0 }}>🛡️ VIP Admin, Treasury & Platform Revenue Control Center</h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: theme.muted }}>
                Monitor platform revenue, P2P MoMo escrow volume, sportsbook exposure, and global system parameters.
              </p>
            </div>
            <span style={{ padding: "6px 12px", borderRadius: 999, background: maintenanceMode ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)", color: maintenanceMode ? "#ef4444" : "#10b981", fontWeight: 800, fontSize: 12 }}>
              {maintenanceMode ? "⚠ Maintenance Mode" : "● Production Live (Vercel + SQLite)"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Est. Monthly Platform Revenue</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981", marginTop: 4 }}>$48,920</div>
              <div style={{ fontSize: 11, color: theme.muted }}>{Math.round(48920 * rwfRate).toLocaleString()} RWF</div>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>24h P2P MoMo Escrow Volume</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#06b6d4", marginTop: 4 }}>$184,500</div>
              <div style={{ fontSize: 11, color: theme.muted }}>0.8% Fee · 100% Automated Release</div>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Active Telemetry & Sports Markets</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b", marginTop: 4 }}>85,000,000+</div>
              <div style={{ fontSize: 11, color: theme.muted }}>150 Football Nations · 600 Leagues</div>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 11, color: theme.muted }}>Global Cloud & WebRTC Health</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#8b5cf6", marginTop: 4 }}>99.99% SLA</div>
              <div style={{ fontSize: 11, color: theme.muted }}>Vercel Edge + SQLite WAL Synced</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <label style={{ fontSize: 12, fontWeight: 700 }}>
              P2P Escrow Fee (%):{" "}
              <input
                type="number"
                step="0.1"
                value={platformFeePct}
                onChange={(e) => setPlatformFeePct(e.target.value)}
                style={{ width: 70, padding: "5px 8px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text }}
              />
            </label>
            <button
              type="button"
              onClick={() => setMaintenanceMode((m) => !m)}
              style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: maintenanceMode ? "#10b981" : "#ef4444", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
            >
              {maintenanceMode ? "Resume Live Trading" : "Toggle Maintenance Mode"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
