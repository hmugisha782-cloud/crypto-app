import { useEffect, useState } from "react";

export default function GrowthHub({ activeTab, theme, panel }) {
  const [rwfAmt, setRwfAmt] = useState("50000");
  const [momoCoin, setMomoCoin] = useState("USDT");
  const [momoRes, setMomoRes] = useState(null);
  const [gridLow, setGridLow] = useState("60000");
  const [gridHigh, setGridHigh] = useState("72000");
  const [gridInv, setGridInv] = useState("1000");
  const [gridRes, setGridRes] = useState(null);
  const [monthlyGoal, setMonthlyGoal] = useState("250");
  const [apyGoal, setApyGoal] = useState("6.8");
  const [apyRes, setApyRes] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [tvl, setTvl] = useState([]);
  const [brief, setBrief] = useState(null);
  const [referral, setReferral] = useState(null);
  const [badges, setBadges] = useState([]);
  const [pollMsg, setPollMsg] = useState("");

  const token = typeof window !== "undefined" ? sessionStorage.getItem("kgt-auth-token") : null;

  useEffect(() => {
    if (activeTab !== "growth") return;
    fetch("/api/growth/sector-performance").then((r) => r.ok ? r.json() : null).then((d) => d && setSectors(d.sectors || [])).catch(() => {});
    fetch("/api/growth/defi-tvl-leaders").then((r) => r.ok ? r.json() : null).then((d) => d && setTvl(d.protocols || [])).catch(() => {});
    fetch("/api/growth/ai-market-brief").then((r) => r.ok ? r.json() : null).then(setBrief).catch(() => {});
    if (token) {
      fetch("/api/engage/referral", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then(setReferral).catch(() => {});
      fetch("/api/engage/badges", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((d) => d && setBadges(d.badges || [])).catch(() => {});
    }
  }, [activeTab, token]);

  if (activeTab !== "growth") return null;

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };
  const btn = { padding: "9px 14px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer", fontSize: 13 };

  async function calcMomo(e) {
    e.preventDefault();
    const r = await fetch("/api/growth/momo-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rwfAmount: Number(rwfAmt), symbol: momoCoin }) });
    if (r.ok) setMomoRes(await r.json());
  }

  async function calcGrid(e) {
    e.preventDefault();
    const r = await fetch("/api/growth/grid-bot-sim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lowerPrice: Number(gridLow), upperPrice: Number(gridHigh), investmentUsd: Number(gridInv) }) });
    if (r.ok) setGridRes(await r.json());
  }

  async function calcPassive(e) {
    e.preventDefault();
    const r = await fetch("/api/growth/target-apy-goal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ desiredMonthlyUsd: Number(monthlyGoal), apyPercent: Number(apyGoal) }) });
    if (r.ok) setApyRes(await r.json());
  }

  async function voteMarket(direction) {
    if (!token) { setPollMsg("Sign in under Accounts to cast your 24h market vote."); return; }
    const r = await fetch("/api/engage/predictions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ symbol: "BTC", direction }) });
    if (r.ok) {
      const d = await r.json();
      setPollMsg(`Vote recorded! Bullish: ${d.poll.upVotes} · Bearish: ${d.poll.downVotes}`);
    }
  }

  return (
    <section style={{ display: "grid", gap: 18, marginBottom: 24 }}>
      <div style={panel}>
        <h2 style={{ marginTop: 0 }}>💎 Growth Hub, Mobile Money & AI Bots</h2>
        <p style={{ color: theme.muted, fontSize: 13, marginBottom: 0 }}>
          Instant RWF Mobile Money crypto quotes, AI Grid Bot simulator, passive income planner, and community rewards.
        </p>
      </div>

      {brief && (
        <div style={{ ...panel, borderLeft: "4px solid #06b6d4" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#06b6d4" }}>AI MARKET BRIEF · {brief.bias.toUpperCase()}</div>
          <h3 style={{ margin: "4px 0 6px", fontSize: 16 }}>{brief.headline}</h3>
          <p style={{ margin: 0, fontSize: 13, color: theme.muted }}>{brief.summary}</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <form onSubmit={calcMomo} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>📱 MoMo / Airtel Money RWF Quote</h3>
          <input type="number" value={rwfAmt} onChange={(e) => setRwfAmt(e.target.value)} placeholder="Amount in RWF (e.g. 50000)" style={inp} />
          <select value={momoCoin} onChange={(e) => setMomoCoin(e.target.value)} style={inp}>
            <option value="USDT">USDT (Tether)</option>
            <option value="BTC">BTC (Bitcoin)</option>
            <option value="ETH">ETH (Ethereum)</option>
            <option value="SOL">SOL (Solana)</option>
          </select>
          <button type="submit" style={btn}>Get Instant RWF Quote</button>
          {momoRes && (
            <div style={{ fontSize: 13, padding: 10, borderRadius: 8, background: theme.input }}>
              You receive: <strong>{momoRes.estimatedCoins} {momoRes.symbol}</strong> (${momoRes.usdEquivalent}) · Fee: {momoRes.feeRwf.toLocaleString()} RWF
            </div>
          )}
        </form>

        <form onSubmit={calcGrid} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>🤖 AI Grid Trading Bot Simulator</h3>
          <input type="number" value={gridLow} onChange={(e) => setGridLow(e.target.value)} placeholder="Lower Price ($)" style={inp} />
          <input type="number" value={gridHigh} onChange={(e) => setGridHigh(e.target.value)} placeholder="Upper Price ($)" style={inp} />
          <input type="number" value={gridInv} onChange={(e) => setGridInv(e.target.value)} placeholder="Investment (USD)" style={inp} />
          <button type="submit" style={btn}>Simulate 30-Day Bot Profit</button>
          {gridRes && (
            <div style={{ fontSize: 13, padding: 10, borderRadius: 8, background: theme.input }}>
              Est. 30d Profit: <strong style={{ color: "#10b981" }}>+${gridRes.estimated30dProfitUsd}</strong> ({gridRes.estimatedMonthlyApyPct}%/mo)
            </div>
          )}
        </form>

        <form onSubmit={calcPassive} style={{ ...panel, display: "grid", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>💰 Monthly Passive Income Goal</h3>
          <input type="number" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} placeholder="Target Monthly USD" style={inp} />
          <input type="number" step="0.1" value={apyGoal} onChange={(e) => setApyGoal(e.target.value)} placeholder="Staking APY %" style={inp} />
          <button type="submit" style={btn}>Calculate Required Capital</button>
          {apyRes && (
            <div style={{ fontSize: 13, padding: 10, borderRadius: 8, background: theme.input }}>
              Required Stake: <strong>${apyRes.requiredCapitalUsd.toLocaleString()}</strong> ({apyRes.requiredCapitalRwf.toLocaleString()} RWF)
            </div>
          )}
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 15 }}>📊 24h Crypto Sector Performance</h3>
          {sectors.map((s) => (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: `1px solid ${theme.border}` }}>
              <span>{s.name}</span>
              <strong style={{ color: s.change24h >= 0 ? "#10b981" : "#ef4444" }}>+{s.change24h}%</strong>
            </div>
          ))}
        </div>

        <div style={panel}>
          <h3 style={{ marginTop: 0, fontSize: 15 }}>🏦 Top DeFi Protocols by TVL</h3>
          {tvl.map((p) => (
            <div key={p.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: `1px solid ${theme.border}` }}>
              <span>{p.name} ({p.chain})</span>
              <strong>${p.tvlBillionUsd}B</strong>
            </div>
          ))}
        </div>

        <div style={{ ...panel, display: "grid", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>🎁 Refer & Earn + Market Poll</h3>
          {referral ? (
            <div style={{ padding: 10, borderRadius: 8, background: theme.input, fontSize: 13 }}>
              Invite Code: <strong>{referral.code}</strong> · Points: <strong>{referral.points}</strong>
            </div>
          ) : (
            <p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>Sign in to view your referral code and loyalty badges.</p>
          )}
          {badges.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {badges.map((b) => <span key={b.id} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 99, background: "rgba(6,182,212,0.15)", color: "#06b6d4", fontWeight: 700 }}>🏅 {b.badgeName}</span>)}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => voteMarket("UP")} style={{ ...btn, flex: 1, background: "#10b981" }}>▲ BTC Bullish 24h</button>
            <button type="button" onClick={() => voteMarket("DOWN")} style={{ ...btn, flex: 1, background: "#ef4444", color: "#fff" }}>▼ BTC Bearish 24h</button>
          </div>
          {pollMsg && <div style={{ fontSize: 12, color: "#06b6d4" }}>{pollMsg}</div>}
        </div>
      </div>
    </section>
  );
}
