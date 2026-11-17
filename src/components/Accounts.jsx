import { useEffect, useState } from "react";

export default function Accounts({ activeTab, theme, panel }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securityLoading, setSecurityLoading] = useState(false);
  const [dbHealthy, setDbHealthy] = useState(null);

  useEffect(() => {
    let active = true;
    async function checkSession() {
      const token = sessionStorage.getItem("kgt-auth-token");
      fetch("/health").then((r) => { if (active) setDbHealthy(r.ok); }).catch(() => { if (active) setDbHealthy(false); });
      if (!token) { if (active) setCheckingSession(false); return; }
      try {
        const res = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { sessionStorage.removeItem("kgt-auth-token"); if (active) setUser(null); return; }
        if (active) setUser(data.user);
      } catch {
        if (active) setMessage("Could not connect to the server. Please try again.");
      } finally {
        if (active) setCheckingSession(false);
      }
    }
    checkSession();
    return () => { active = false; };
  }, [activeTab]);

  if (activeTab !== "accounts") return null;

  const inputStyle = { width: "100%", padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 14, marginTop: 6 };
  const buttonStyle = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer", fontSize: 14 };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const payload = mode === "register" ? { name: name.trim(), email: email.trim(), password } : { email: email.trim(), password };
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMessage(data.message || "Authentication failed. Please try again."); return; }
      if (data.token) sessionStorage.setItem("kgt-auth-token", data.token);
      setUser(data.user || { name, email });
      setPassword("");
      setMessage(mode === "register" ? "Account created and synced with SQLite database." : "Signed in successfully.");
    } catch {
      setMessage("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("kgt-auth-token");
    setUser(null);
    setMessage("You have been signed out.");
  }

  async function handleExportData() {
    const token = sessionStorage.getItem("kgt-auth-token");
    if (!token) return;
    setMessage("");
    try {
      const res = await fetch("/api/user/data", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const backup = { exportedAt: new Date().toISOString(), account: user, ...data };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kgt-account-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Account backup exported as JSON.");
    } catch {
      setMessage("Unable to export backup right now.");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("kgt-auth-token");
    if (!token) return;
    setSecurityLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      setMessage(data.message || "Password request completed.");
      if (res.ok) { setCurrentPassword(""); setNewPassword(""); }
    } catch {
      setMessage("Could not connect to the server.");
    } finally {
      setSecurityLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Are you sure you want to permanently delete your account and all SQLite saved data?")) return;
    const token = sessionStorage.getItem("kgt-auth-token");
    if (!token) return;
    setSecurityLoading(true);
    try {
      const res = await fetch("/api/user/account", { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { sessionStorage.removeItem("kgt-auth-token"); setUser(null); }
      setMessage(data.message || "Account deleted.");
    } catch {
      setMessage("Could not connect to the server.");
    } finally {
      setSecurityLoading(false);
    }
  }

  return (
    <section style={{ ...panel, maxWidth: 520, margin: "0 auto 24px", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>🔐 Crypto Tracker Account</h2>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: `1px solid ${dbHealthy ? "#10b981" : "#f59e0b"}`, color: dbHealthy ? "#10b981" : "#f59e0b" }}>
          {dbHealthy ? "● SQLite Connected" : "● Checking Server"}
        </span>
      </div>
      <p style={{ color: theme.muted, fontSize: 13, marginTop: 0 }}>
        Sign in or manage your cloud-synced portfolio, watchlist, and security settings.
      </p>

      {checkingSession ? (
        <p style={{ color: theme.muted, fontSize: 14 }}>Checking session...</p>
      ) : user ? (
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.input }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 16 }}>{user.name}</p>
            <p style={{ margin: "0 0 12px", color: theme.muted, fontSize: 13 }}>{user.email}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button type="button" onClick={handleExportData} style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontWeight: 600, cursor: "pointer" }}>
                ⬇ Export JSON Backup
              </button>
              <button type="button" onClick={handleLogout} style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: "1px solid #ef4444", background: "transparent", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>
                Sign Out
              </button>
            </div>
          </div>

          <form onSubmit={handleChangePassword} style={{ padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, display: "grid", gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 15 }}>🛡️ Security & Password</h3>
            <label style={{ fontSize: 13 }}>
              Current Password
              <input type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={inputStyle} />
            </label>
            <label style={{ fontSize: 13 }}>
              New Password (min 8 characters)
              <input type="password" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
            </label>
            <button type="submit" disabled={securityLoading} style={{ ...buttonStyle, padding: "10px 14px" }}>
              {securityLoading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(239, 68, 68, 0.4)" }}>
            <h3 style={{ margin: 0, fontSize: 14, color: "#ef4444" }}>Danger Zone</h3>
            <p style={{ margin: "0 0 12px", color: theme.muted, fontSize: 12 }}>
              Permanently remove your account, portfolio, watchlist, and saved alerts from SQLite.
            </p>
            <button type="button" disabled={securityLoading} onClick={handleDeleteAccount} style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "none", background: "#ef4444", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              Delete Account Permanently
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <button type="button" onClick={() => { setMode("login"); setMessage(""); }} style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: mode === "login" ? "#06b6d4" : theme.input, color: mode === "login" ? "#02131d" : theme.text, fontWeight: 700, cursor: "pointer" }}>
              Login
            </button>
            <button type="button" onClick={() => { setMode("register"); setMessage(""); }} style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: mode === "register" ? "#06b6d4" : theme.input, color: mode === "register" ? "#02131d" : theme.text, fontWeight: 700, cursor: "pointer" }}>
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            {mode === "register" && (
              <label style={{ fontSize: 13 }}>
                Full name
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </label>
            )}
            <label style={{ fontSize: 13 }}>
              Email address
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </label>
            <label style={{ fontSize: 13 }}>
              Password
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </label>
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Please wait..." : mode === "register" ? "Create Account" : "Login"}
            </button>
          </form>
        </>
      )}

      {message && (
        <p role="status" style={{ marginTop: 18, padding: 12, borderRadius: 9, background: theme.input, color: theme.text, fontSize: 13, overflowWrap: "anywhere" }}>
          {message}
        </p>
      )}
      <p style={{ marginTop: 22, color: theme.muted, fontSize: 12, lineHeight: 1.6, textAlign: "center" }}>
        Your account details are sent to the Crypto Tracker backend for authentication. Use a unique password.
      </p>
    </section>
  );
}
