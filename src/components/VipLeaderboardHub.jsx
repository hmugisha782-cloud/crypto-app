import { useState } from "react";

export default function VipLeaderboardHub({ rates = {}, theme, panel }) {
  const [points, setPoints] = useState(() => Number(localStorage.getItem("kgt-vip-points") || 1250));
  const [claimedToday, setClaimedToday] = useState(() => localStorage.getItem("kgt-daily-claim") === new Date().toDateString());
  const rwfRate = Number(rates?.RWF || 1480);

  const leaders = [
    { rank: "🥇 #1", name: "KigaliWhale_RW", category: "Crypto & MoMo P2P", profitUsd: 18450, winRate: "94.2%" },
    { rank: "🥈 #2", name: "LaLigaMaster_250", category: "150 Nations Football", profitUsd: 14200, winRate: "89.7%" },
    { rank: "🥉 #3", name: "AviatorQueen_KGL", category: "VIP Casino & Crash", profitUsd: 11890, winRate: "86.5%" },
    { rank: "#4", name: "NairobiQuantPro", category: "DeFi & Arbitrage", profitUsd: 9640, winRate: "91.0%" },
    { rank: "#5", name: "AmavubiStar_11", category: "Rwanda Premier League", profitUsd: 7820, winRate: "84.8%" },
  ];

  function claimDailyBonus() {
    if (claimedToday) return;
    const next = points + 500;
    setPoints(next);
    setClaimedToday(true);
    localStorage.setItem("kgt-vip-points", String(next));
    localStorage.setItem("kgt-daily-claim", new Date().toDateString());
  }

  return (
    <section style={{ ...panel, marginBottom: 20, borderTop: "3px solid #f59e0b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>🏆 Global VIP Traders & Bettors Leaderboard + Daily Streak Rewards</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Compete across Crypto Markets, 150 Football Nations & VIP Casino to climb the Kigali Global VIP ranks.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(245, 158, 11, 0.18)", color: "#fbbf24", fontWeight: 800, fontSize: 12 }}>
            ⭐ Your VIP Balance: {points.toLocaleString()} KGT Pts
          </span>
          <button
            type="button"
            disabled={claimedToday}
            onClick={claimDailyBonus}
            style={{
              padding: "8px 13px",
              borderRadius: 8,
              border: "none",
              background: claimedToday ? "#475569" : "#f59e0b",
              color: claimedToday ? "#cbd5e1" : "#02131d",
              fontWeight: 800,
              fontSize: 12,
              cursor: claimedToday ? "default" : "pointer",
            }}
          >
            {claimedToday ? "✓ Daily Bonus Claimed" : "🎁 Claim +500 VIP Pts"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {leaders.map((l) => (
          <div key={l.rank} style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800 }}>
              <span style={{ color: "#fbbf24" }}>{l.rank} {l.name}</span>
              <span style={{ color: "#10b981" }}>{l.winRate}</span>
            </div>
            <div style={{ fontSize: 11, color: theme.muted, marginTop: 3 }}>{l.category}</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 5 }}>
              +{"$"}{l.profitUsd.toLocaleString()} <span style={{ fontSize: 11, color: theme.muted }}>({Math.round(l.profitUsd * rwfRate).toLocaleString()} RWF)</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
