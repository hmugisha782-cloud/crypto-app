import "./vercelCloudEngine.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, background: "#0f172a", color: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h2 style={{ color: "#38bdf8" }}>Kigali Global Tracker — Safe Recovery Mode</h2>
          <p style={{ color: "#cbd5e1" }}>Detected component notice: <strong>{String(this.state.error?.message || this.state.error)}</strong></p>
          <button
            type="button"
            onClick={() => { localStorage.removeItem("kgt-active-tab"); window.location.reload(); }}
            style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer" }}
          >
            Reset View & Reload Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <SafeBoundary>
    <App />
  </SafeBoundary>
);
