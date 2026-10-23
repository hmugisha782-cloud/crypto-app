import { useState } from "react";

export default function Accounts({ activeTab, theme, panel }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [demoUser, setDemoUser] = useState("");

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
    cursor: "pointer",
    width: "100%",
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (mode === "register" && !name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    setDemoUser(mode === "register" ? name.trim() : email.trim());
    setMessage(
      mode === "register"
        ? "Demo registration successful!"
        : "Demo login successful!"
    );
    setPassword("");
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
          Sign in or create a demo account.
        </p>
      </div>

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

      {demoUser ? (
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
            {demoUser}
          </p>
          <button
            type="button"
            onClick={() => {
              setDemoUser("");
              setEmail("");
              setName("");
              setPassword("");
              setMessage("");
            }}
            style={buttonStyle}
          >
            Sign out of demo
          </button>
        </div>
      ) : (
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
              placeholder="At least 6 characters"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              minLength={6}
              required
            />
          </label>

          <button type="submit" style={buttonStyle}>
            {mode === "register" ? "Create Demo Account" : "Login to Demo"}
          </button>
        </form>
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
        Demo only. No real account is created, and your details are not sent to
        a server. Do not use a real password.
      </p>
    </section>
  );
}
