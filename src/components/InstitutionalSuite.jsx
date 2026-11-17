import { useEffect, useState } from "react";

export default function InstitutionalSuite({ activeTab, theme, panel }) {
  const [halving, setHalving] = useState(null);
  const [pegs, setPegs] = useState([]);
  const [arb, setArb] = useState([]);
  const [entryPrice, setEntryPrice] = useState("65000");
  const [leverage, setLeverage] = useState("10");
  const [side, setSide] = useState("LONG");
  const [liqRes, setLiqRes] = useState(null);
  const [fibHigh, setFibHigh] = useState("70000");
  const [fibLow, setFibLow] = useState("52000");
  const [fibRes, setFibRes] = useState(null);
  const [ilRatio, setIlRatio] = useState("1.5");
  const [ilRes, setIlRes] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [whaleSymbol, setWhaleSymbol] = useState("BTC");
  const [whaleMin, setWhaleMin] = useState("1000000");
  const [whales, setWhales] = useState([]);
  const [msg, setMsg] = useState("");

  const token = typeof window !== "undefined" ? sessionStorage.getItem("kgt-auth-token") : null;

  useEffect(() => {
    if (activeTab !== "institutional") return;
    fetch("/api/inst/halving-countdown").then((r) => r.ok ? r.json() : null).then(setHalving).catch(() => {});
    fetch("/api/inst/stablecoin-peg").then((r) => r.ok ? r.json() : null).then((d) => d && setPegs(d.pegs || [])).catch(() => {});
    fetch("/api/inst/arbitrage-scan").then((r) => r.ok ? r.json() : null).then((d) => d && setArb(d.opportunities || [])).catch(() => {});
    if (token) {
      fetch("/api/enterprise/snapshots", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((d) => d && setSnapshots(d.snapshots || [])).catch(() => {});
      fetch("/api/enterprise/whale-alerts", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((d) => d && setWhales(d.alerts || [])).catch(() => {});
    }
  }, [activeTab, token]);

  if (activeTab !== "institutional") return null;

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };
  const btn = { padding: "9px 14px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer", fontSize: 13 };

  async function calcLiq(e) {
    e.preventDefault();
    const r = await fetch("/api/inst/liquidation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entryPrice: Number(entryPrice), leverage: Number(leverage), side }) });
    if (r.ok) setLiqRes(await r.json());
  }

  async function calcFib(e) {
    e.preventDefault();
    const r = await fetch("/api/inst/fibonacci", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ high: Number(fibHigh), low: Number(fibLow) }) });
    if (r.ok) setFibRes(await r.json());
  }

  async function calcIl(e) {
    e.preventDefault();
    const r = await fetch("/api/inst/impermanent-loss", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priceChangeRatio: Number(ilRatio) }) });
    if (r.ok) setIlRes(await r.json());
  }

  async function takeSnapshot() {
    if (!token) { setMsg("Sign in under Accounts to save snapshots."); return; }
    const r = await fetch("/api/enterprise/snapshots", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (r.ok) {
      const list = await fetch("/api/enterprise/snapshots", { headers: { Authorization: `Bearer ${token}` } }).then((x) => x.json());
      setSnapshots(list.snapshots || []);
      setMsg("Portfolio snapshot captured in SQLite.");
    }
  }

  async function addWhale(e) {
    e.preventDefault();
    if (!token) { setMsg("Sign in under Accounts to save whale alerts."); return; }
    const r = await fetch("/api/enterprise/whale-alerts", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ symbol: whaleSymbol, minUsd: Number(whaleMin), note: "Large transfer watch" }) });
    if (r.ok) {
      const list = await fetch("/api/enterprise/whale-alerts", { headers: { Authorization: `Bearer ${token}` } }).then((x) => x.json());
      setWhales(list.alerts || []);
      setMsg("Whale alert rule saved.");
    }
  }

  return (
    <section style={{ display: "grid", gap: 18, marginBottom: 24 }}>
      <div style={panel}>
        <h2 style={{ marginTop: 0 }}>🏛️ Institutional Quant & Enterprise Suite</h2>
        <p style={{ color: theme.muted, fontSize: 13, marginBottom: 0 }}>
          Advanced derivatives calculators, DeFi impermanent loss, Fibonacci levels, arbitrage scanner, and SQLite snapshots.
        </p>
      </div>
      {msg && <div style={{ ...panel, border: "1px solid #06b6d4", fontSize: 13 }}>{msg}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {halving && (
          <div style={panel}>
            <h3 style={{ marginTop: 0, fontSize: 14 }}>⏳ Bitcoin Halving Countdown</h3>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#06b6d4" }}>{halving.daysRemaining} Days</div>
            <p style={{ fontSize: 12, color: theme.muted, marginBottom: 0 }}>Est: {halving.nextHalvingEstimate} · Reward: {halving.blockRewardAfter}</p>
          </div>
        )}
        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 14 }}>💵 Stablecoin Peg Health</h3>
          {pegs.map((p) => (
            <div key={p.symbol} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
              <strong>{p.symbol}</strong>
              <span>${p.price} · <span style={{ color: "#10b981" }}>{p.status}</span></span>
            </div>
          ))}
        </div>
        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 14 }}>⚡ Cross-Exchange Arbitrage</h3>
          {arb.map((a) => (
            <div key={a.pair} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0" }}>
              <span>{a.pair} ({a.buyExchange} → {a.sellExchange})</span>
              <strong style={{ color: "#10b981" }}>+{a.spreadPct}%</strong>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <form onSubmit={calcLiq} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14 }}>⚠️ Margin Liquidation Price</h3>
          <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} placeholder="Entry Price" style={inp} />
          <input type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} placeholder="Leverage (e.g. 10)" style={inp} />
          <select value={side} onChange={(e) => setSide(e.target.value)} style={inp}>
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
          <button type="submit" style={btn}>Calculate Liquidation</button>
          {liqRes && <div style={{ fontSize: 13, padding: 8, borderRadius: 8, background: theme.input }}>Est. Liquidation: <strong>${liqRes.liquidationPrice}</strong></div>}
        </form>
        <form onSubmit={calcFib} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14 }}>📐 Fibonacci Retracement</h3>
          <input type="number" value={fibHigh} onChange={(e) => setFibHigh(e.target.value)} placeholder="Swing High" style={inp} />
          <input type="number" value={fibLow} onChange={(e) => setFibLow(e.target.value)} placeholder="Swing Low" style={inp} />
          <button type="submit" style={btn}>Generate Levels</button>
          {fibRes && (
            <div style={{ fontSize: 12, padding: 8, borderRadius: 8, background: theme.input }}>
              {Object.entries(fibRes.levels).map(([k, v]) => <div key={k}>Fib {k}: <strong>${v}</strong></div>)}
            </div>
          )}
        </form>
        <form onSubmit={calcIl} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14 }}>🌊 DeFi Impermanent Loss</h3>
          <input type="number" step="0.1" value={ilRatio} onChange={(e) => setIlRatio(e.target.value)} placeholder="Price Change Ratio (e.g. 1.5)" style={inp} />
          <button type="submit" style={btn}>Calculate IL %</button>
          {ilRes && <div style={{ fontSize: 13, padding: 8, borderRadius: 8, background: theme.input }}>Impermanent Loss: <strong>{ilRes.impermanentLossPercent}%</strong></div>}
        </form>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <div style={{ ...panel, display: "grid", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 14 }}>📸 SQLite Portfolio Snapshots</h3>
          <button type="button" onClick={takeSnapshot} style={btn}>Capture Current Valuation Snapshot</button>
          {snapshots.map((s) => (
            <div key={s.id} style={{ fontSize: 12, padding: 8, borderRadius: 8, background: theme.input }}>
              <strong>${s.totalUsd}</strong> ({Number(s.totalRwf).toLocaleString()} RWF) — {s.capturedAt}
            </div>
          ))}
        </div>
        <form onSubmit={addWhale} style={{ ...panel, display: "grid", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 14 }}>🐋 Whale Transfer Alert Rules</h3>
          <input type="text" value={whaleSymbol} onChange={(e) => setWhaleSymbol(e.target.value)} placeholder="Coin Symbol (e.g. BTC)" style={inp} />
          <input type="number" value={whaleMin} onChange={(e) => setWhaleMin(e.target.value)} placeholder="Min Transfer USD" style={inp} />
          <button type="submit" style={btn}>Save Whale Alert</button>
          {whales.map((w) => (
            <div key={w.id} style={{ fontSize: 12, padding: 8, borderRadius: 8, background: theme.input }}>
              <strong>{w.symbol}</strong> transfers ≥ ${Number(w.minUsd).toLocaleString()}
            </div>
          ))}
        </form>
      </div>
    </section>
  );
}
