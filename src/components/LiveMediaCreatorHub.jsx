import { useState } from "react";

const CHANNELS = [
  { name: "📺 SuperSport & beIN 4K Live Match Arena", status: "LIVE HD · 60fps", tipUsd: 5 },
  { name: "🇷🇼 Rwanda TV, KC2 & Kigali Business News 24/7", status: "LIVE · Kigali Feed", tipUsd: 3 },
  { name: "📈 Bloomberg & Global Crypto Market Live Desk", status: "LIVE · Wall St / Global", tipUsd: 10 },
  { name: "🎵 Kigali Afrobeats, Gakondo & Creator Music Radio", status: "LIVE · Hi-Fi Audio", tipUsd: 2 },
];

export default function LiveMediaCreatorHub({ rates = {}, theme, panel }) {
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [creatorHandle, setCreatorHandle] = useState("@Kigali_Sports_Creator");
  const [mediaMsg, setMediaMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function sendCreatorTip(e) {
    e.preventDefault();
    const tx = "KGT-MED-" + Math.floor(100000 + Math.random() * 900000);
    setMediaMsg(`🎬 STREAM & TIP ACTIVE [${tx}]: Watching "${channel.name}" · Sent $${channel.tipUsd} USD (${Math.round(channel.tipUsd * rwfRate).toLocaleString()} RWF) instant tip to ${creatorHandle}!`);
  }

  return (
    <section id="live-media-creator" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f97316", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🎬 4K Live Sports TV, Global News, Music Radio & Creator Monetization (1.5B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Stream live sports, financial news & Rwandan music channels while tipping creators in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(249,115,22,0.18)", color: "#fb923c", fontWeight: 800, fontSize: 11 }}>
          1,500,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {CHANNELS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setChannel(c)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${channel.name === c.name ? "#f97316" : theme.border}`,
              background: channel.name === c.name ? "rgba(249,115,22,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{c.name}</strong>
            <span style={{ fontSize: 11, color: "#fb923c", fontWeight: 800 }}>{c.status}</span>
            <span style={{ fontSize: 10, color: theme.muted }}>Instant Tip: ${c.tipUsd} ({Math.round(c.tipUsd * rwfRate).toLocaleString()} RWF)</span>
          </button>
        ))}
      </div>

      <form onSubmit={sendCreatorTip} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={creatorHandle} onChange={(e) => setCreatorHandle(e.target.value)} placeholder="Creator @Handle or Channel ID" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#f97316", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          🎬 Launch Stream & Send Tip ({Math.round(channel.tipUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {mediaMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{mediaMsg}</div>}
    </section>
  );
}
