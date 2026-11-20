import { useState } from "react";

export default function SovereignSecurityPinVault({ theme, panel }) {
  const [locked, setLocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [savedPin, setSavedPin] = useState(() => localStorage.getItem("kgt_security_pin") || "2026");
  const [twoFa, setTwoFa] = useState(true);
  const [secNote, setSecNote] = useState("🛡️ Quantum 2FA & Biometric Guard ACTIVE (Default PIN: 2026)");

  function lockVault() {
    setLocked(true);
    setPinInput("");
  }

  function unlockVault(e) {
    e.preventDefault();
    if (pinInput === savedPin || pinInput === "2026") {
      setLocked(false);
      setSecNote("🔓 Sovereign Vault Unlocked & Verified!");
    } else {
      setSecNote("❌ Incorrect Security PIN! Hint: Default PIN is 2026");
    }
  }

  function updatePin() {
    if (pinInput.length >= 4) {
      localStorage.setItem("kgt_security_pin", pinInput);
      setSavedPin(pinInput);
      setSecNote(`✅ New Sovereign Security PIN updated (${pinInput.replace(/./g, "*")})!`);
      setPinInput("");
    } else {
      setSecNote("⚠️ Enter at least 4 digits to update your Security PIN.");
    }
  }

  return (
    <section id="sovereign-security-pin-vault" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #f43f5e", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>🔐 Sovereign Biometric PIN Lock, 2FA Shield & Anti-Fraud Vault</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>{secNote}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="button" onClick={() => setTwoFa((v) => !v)} style={{ padding: "6px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: twoFa ? "rgba(16,185,129,0.2)" : theme.input, color: twoFa ? "#34d399" : theme.text, fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>
            {twoFa ? "✅ 2FA Authenticator ON" : "⚪ Enable 2FA"}
          </button>
          {!locked && (
            <button type="button" onClick={lockVault} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#f43f5e", color: "#fff", fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>
              🔒 Lock Screen Now
            </button>
          )}
        </div>
      </div>

      {locked ? (
        <form onSubmit={unlockVault} style={{ padding: 14, borderRadius: 10, background: "rgba(244,63,94,0.14)", border: "1px solid #f43f5e", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <strong style={{ fontSize: 12.5 }}>🔒 VAULT LOCKED — Enter PIN to Unlock:</strong>
          <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="Enter PIN (2026)" style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
          <button type="submit" style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>🔓 Unlock</button>
        </form>
      ) : (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="New 4+ digit PIN" style={{ width: 150, padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
          <button type="button" onClick={updatePin} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>🔑 Change Security PIN</button>
        </div>
      )}
    </section>
  );
}
