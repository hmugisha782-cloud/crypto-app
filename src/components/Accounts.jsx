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

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const token = sessionStorage.getItem("kgt-auth-token");

      if (!token) {
        if (active) setCheckingSession(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          sessionStorage.removeItem("kgt-auth-token");
          if (active) setUser(null);
          return;
        }

        if (active) setUser(data.user);
      } catch {
        if (active) {
          setMessage("Could not connect to the server. Please try again.");
        }
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (activeTab !== "accounts") return null;

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${theme.border}`,
    background: theme.input,
    color: theme.text,
    fontSize: 14,
    outline: "none",
  };

  const buttonStyle = {
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#0891b2",
    color: "#fff",
    fontWeight: 700,
    cursor: loading ? "wait" : "pointer",
    width: "100%",
    opacity: loading ? 0.7 : 1,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (mode === "register" && !name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (mode === "register" && password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        mode === "register"
          ? { name: name.trim(), email: email.trim(), password }
          : { email: email.trim(), password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(data.message || "Authentication failed. Please try again.");
        return;
      }

      if (!data.token || !data.user) {
        setMessage("The server response is missing account information.");
        return;
      }

      sessionStorage.setItem("kgt-auth-token", data.token);
      setUser(data.user);
      setPassword("");
      setMessage(
        mode === "register"
          ? "Your account was created successfully!"
          : "You logged in successfully!"
      );
    } catch {
      setMessage("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("kgt-auth-token");
    setUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setMessage("You have logged out successfully.");
  }

  return (
    <section
      style={{
        ...panel,
        maxWidth: 480,
        margin: "20px auto",
        padding: 28,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🔐</div>
        <h2 style={{ margin: "0 0 8px" }}>Crypto Tracker Account</h2>
        <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>
          Sign in or create your account.
        </p>
      </div>

      {checkingSession ? (
        <p style={{ textAlign: "center", color: theme.muted }}>
          Checking your account...
        </p>
      ) : user ? (
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: theme.input,
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 34 }}>👋</div>
          <h3 style={{ margin: "8px 0" }}>Welcome!</h3>
          <p style={{ color: theme.muted, overflowWrap: "anywhere" }}>
            {user.name}
          </p>
          <p style={{ color: theme.muted, overflowWrap: "anywhere" }}>
            {user.email}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 22,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
              style={{
                ...buttonStyle,
                background: mode === "login" ? "#0891b2" : theme.input,
                color: mode === "login" ? "#fff" : theme.text,
                border: `1px solid ${theme.border}`,
              }}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
              style={{
                ...buttonStyle,
                background: mode === "register" ? "#0891b2" : theme.input,
                color: mode === "register" ? "#fff" : theme.text,
                border: `1px solid ${theme.border}`,
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            {mode === "register" && (
              <label style={{ display: "grid", gap: 7, fontSize: 13 }}>
                Full name
                <input
                  style={inputStyle}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label style={{ display: "grid", gap: 7, fontSize: 13 }}>
              Email address
              <input
                style={inputStyle}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label style={{ display: "grid", gap: 7, fontSize: 13 }}>
              Password
              <input
                style={inputStyle}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={
                  mode === "register"
                    ? "At least 8 characters"
                    : "Enter your password"
                }
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                minLength={mode === "register" ? 8 : undefined}
                required
              />
            </label>

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "register"
                  ? "Create Account"
                  : "Login"}
            </button>
          </form>
        </>
      )}

      {message && (
        <p
          role="status"
          style={{
            marginTop: 18,
            padding: 12,
            borderRadius: 9,
            background: theme.input,
            color: theme.text,
            fontSize: 13,
            overflowWrap: "anywhere",
          }}
        >
          {message}
        </p>
      )}

      <p
        style={{
          marginTop: 22,
          color: theme.muted,
          fontSize: 12,
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        Your account details are sent to the Crypto Tracker backend for
        authentication. Use a unique password.
      </p>
    </section>
  );
}
