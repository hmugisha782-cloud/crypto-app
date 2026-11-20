import { useState, useEffect } from "react";
import { getLiveMarketSnapshot } from "../utils/liveMarketStore.js";

export default function SovereignPriceAlertEngine({ theme, panel }) {
  const [sym, setSym] = useState("BTC/USDT");
  const [target, setTarget] = useState("65000");
  const [alerts, setAlerts] = useState([{ id: "AL-1", sym: "BTC/USDT", target: 65000, hit: false }]);
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const check = () => {
      const snap = getLiveMarketSnapshot();
      setAlerts((prev) =>
        prev.map((a) => {
          const px = snap.prices[a.sym]?.price || 0;
          if (!a.hit && px >= a.target) {
            setBanner(`🔔 PRICE ALERT TRIGGERED: ${a.sym} reached $${px.toLocaleString()} (Target: $${a.target.toLocaleString()})!`);
            return { ...a, hit: true };
          }
          return a;
        })
      );
    };
    window.addEventListener("kgt-market-tick", check);
    return () => window.removeEventListener("kgt-market-tick", check);
  }, []);

  function addAlert() {
    const val = Math.max(1, Number(target || 0));
    setAlerts((p) => [{ id: "AL-" + Date.now().toString(36).toUpperCase(), sym, target: val, hit: false }, ...p]);
    setBanner(`🔔 Armed live alert for ${sym} @ $${val.toLocaleString()}`);
  }

  return (
    <section id="sovereign-price-alert-engine" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #38bdf8", display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15 }}>🔔 Real-Time Crypto & 24K Gold Price Alert Radar</strong>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <select value={sym} onChange={(e) => setSym(e.target.value)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
            <option>BTC/USDT</option><option>ETH/USDT</option><option>PAXG/USDT</option><option>SOL/USDT</option>
          </select>
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} style={{ width: 95, padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
          <button type="button" onClick={addAlert} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#38bdf8", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>🔔 Set Alert</button>
        </div>
      </div>
      {banner && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(56,189,248,0.2)", border: "1px solid #38bdf8", color: "#7dd3fc", fontSize: 12, fontWeight: 800 }}>{banner}</div>}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {alerts.map((a) => <span key={a.id} style={{ padding: "3px 9px", borderRadius: 999, background: theme.input, border: `1px solid ${theme.border}`, fontSize: 11 }}>{a.hit ? "✅" : "⏳"} {a.sym} ≥ ${a.target.toLocaleString()}</span>)}
      </div>
    </section>
  );
}
