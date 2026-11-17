import { useEffect, useState } from "react";

export default function ProInsights({ activeTab, theme, panel }) {
  const [movers, setMovers] = useState({ gainers: [], losers: [] });
  const [eaRates, setEaRates] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalCurrent, setGoalCurrent] = useState("");
  const [accountUsd, setAccountUsd] = useState("1000");
  const [riskPct, setRiskPct] = useState("2");
  const [stopLossPct, setStopLossPct] = useState("5");
  const [posResult, setPosResult] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const token = typeof window !== "undefined" ? sessionStorage.getItem("kgt-auth-token") : null;

  useEffect(() => {
    if (activeTab !== "insights") return;
    fetch("/api/market/movers").then((r) => r.ok ? r.json() : null).then((d) => { if (d) setMovers(d); }).catch(() => {});
    fetch("/api/market/ea-rates").then((r) => r.ok ? r.json() : null).then((d) => { if (d) setEaRates(d.rates); }).catch(() => {});
    if (token) {
      fetch("/api/user/notes", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((d) => { if (d?.notes) setNotes(d.notes); }).catch(() => {});
      fetch("/api/user/goals", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((d) => { if (d?.goals) setGoals(d.goals); }).catch(() => {});
    }
  }, [activeTab, token]);

  if (activeTab !== "insights") return null;

  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };
  const btnStyle = { padding: "10px 14px", borderRadius: 9, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer", fontSize: 13 };

  async function handleSaveNote(e) {
    e.preventDefault();
    if (!token) { setStatusMsg("Sign in under Accounts to save notes to SQLite."); return; }
    const res = await fetch("/api/user/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: noteTitle, content: noteContent }),
    });
    if (res.ok) {
      const updated = await fetch("/api/user/notes", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json());
      setNotes(updated.notes || []);
      setNoteTitle("");
      setNoteContent("");
      setStatusMsg("Trading note saved to SQLite.");
    }
  }

  async function handleSaveGoal(e) {
    e.preventDefault();
    if (!token) { setStatusMsg("Sign in under Accounts to save goals to SQLite."); return; }
    const res = await fetch("/api/user/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: goalTitle, targetUsd: Number(goalTarget), currentUsd: Number(goalCurrent) }),
    });
    if (res.ok) {
      const updated = await fetch("/api/user/goals", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json());
      setGoals(updated.goals || []);
      setGoalTitle("");
      setGoalTarget("");
      setGoalCurrent("");
      setStatusMsg("Savings goal updated in SQLite.");
    }
  }

  async function handleCalcPosition(e) {
    e.preventDefault();
    const res = await fetch("/api/quant/position-size", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountUsd: Number(accountUsd), riskPercent: Number(riskPct), stopLossPercent: Number(stopLossPct) }),
    });
    if (res.ok) setPosResult(await res.json());
  }

  return (
    <section style={{ display: "grid", gap: 18, marginBottom: 24 }}>
      <div style={panel}>
        <h2 style={{ marginTop: 0 }}>🚀 Pro Quant, Regional FX & Goals</h2>
        <p style={{ color: theme.muted, fontSize: 13, marginBottom: 0 }}>
          Live East Africa exchange rates, top 24h market movers, position sizing, and cloud-synced journal.
        </p>
      </div>

      {statusMsg && <div style={{ ...panel, border: "1px solid #06b6d4", fontSize: 13 }}>{statusMsg}</div>}

      {eaRates && (
        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 15 }}>🌍 East Africa & Global FX Rates (1 USD)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
            {Object.entries(eaRates).map(([cur, val]) => (
              <div key={cur} style={{ padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
                <div style={{ fontSize: 11, color: theme.muted }}>{cur}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{Number(val).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 15, color: "#10b981" }}>📈 Top 24h Gainers</h3>
          {movers.gainers.map((m) => (
            <div key={m.symbol} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 13 }}>
              <strong>{m.symbol}</strong>
              <span>${m.price} (<span style={{ color: "#10b981" }}>+{m.change.toFixed(2)}%</span>)</span>
            </div>
          ))}
        </div>

        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 15, color: "#ef4444" }}>📉 Top 24h Losers</h3>
          {movers.losers.map((m) => (
            <div key={m.symbol} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 13 }}>
              <strong>{m.symbol}</strong>
              <span>${m.price} (<span style={{ color: "#ef4444" }}>{m.change.toFixed(2)}%</span>)</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <form onSubmit={handleCalcPosition} style={{ ...panel, display: "grid", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>🧮 Risk & Position Size Calculator</h3>
          <input type="number" value={accountUsd} onChange={(e) => setAccountUsd(e.target.value)} placeholder="Account Balance (USD)" style={inputStyle} />
          <input type="number" step="0.1" value={riskPct} onChange={(e) => setRiskPct(e.target.value)} placeholder="Risk % per Trade" style={inputStyle} />
          <input type="number" step="0.1" value={stopLossPct} onChange={(e) => setStopLossPct(e.target.value)} placeholder="Stop Loss %" style={inputStyle} />
          <button type="submit" style={btnStyle}>Calculate Position Size</button>
          {posResult && (
            <div style={{ padding: 10, borderRadius: 8, background: theme.input, fontSize: 13 }}>
              Max Risk: <strong>${posResult.riskAmountUsd}</strong> · Recommended Size: <strong>${posResult.recommendedPositionUsd}</strong>
            </div>
          )}
        </form>

        <form onSubmit={handleSaveGoal} style={{ ...panel, display: "grid", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>🎯 Savings & Portfolio Goals</h3>
          <input type="text" required value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} placeholder="Goal title (e.g. Emergency BTC Fund)" style={inputStyle} />
          <input type="number" required value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="Target USD" style={inputStyle} />
          <input type="number" required value={goalCurrent} onChange={(e) => setGoalCurrent(e.target.value)} placeholder="Current Saved USD" style={inputStyle} />
          <button type="submit" style={btnStyle}>Save Goal</button>
          {goals.map((g) => (
            <div key={g.id} style={{ fontSize: 12, paddingTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{g.title}</span>
                <strong>{g.progressPercent}% (${g.currentUsd}/${g.targetUsd})</strong>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: theme.input, marginTop: 4, overflow: "hidden" }}>
                <div style={{ width: `${g.progressPercent}%`, height: "100%", background: "#06b6d4" }} />
              </div>
            </div>
          ))}
        </form>
      </div>

      <form onSubmit={handleSaveNote} style={{ ...panel, display: "grid", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15 }}>📓 Cloud Trading Journal & Notes</h3>
        <input type="text" required value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Note title (e.g. BTC Halving Setup)" style={inputStyle} />
        <textarea rows={3} required value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Write your market analysis..." style={inputStyle} />
        <button type="submit" style={btnStyle}>Save Note to SQLite</button>
        {notes.map((n) => (
          <div key={n.id} style={{ padding: 10, borderRadius: 8, background: theme.input, fontSize: 13 }}>
            <strong>{n.title}</strong>
            <p style={{ margin: "4px 0 0", color: theme.muted }}>{n.content}</p>
          </div>
        ))}
      </form>
    </section>
  );
}
