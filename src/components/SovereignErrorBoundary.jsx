import React from "react";

export default class SovereignErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error?.message || "Transient UI State Recovered" };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, margin: "12px 0", borderRadius: 12, background: "rgba(15,23,42,0.92)", border: "1px solid #10b981", color: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <strong style={{ color: "#34d399" }}>🛡️ Sovereign Self-Healing Shield Active</strong>
            <span style={{ display: "block", fontSize: 12, color: "#94a3b8" }}>{this.state.errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, errorMsg: "" })}
            style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}
          >
            🔄 Restore Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
