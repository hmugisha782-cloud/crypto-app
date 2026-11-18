import { useEffect, useState } from "react";

const GUIDES = [
  { icon: "📱", title: "1. Buy & Sell USDT with MTN MoMo / Airtel", steps: "Go to Growth & MoMo or Earn & Bet Hub → Enter RWF or USD amount → Choose MTN MoMo or Airtel Money → Confirm escrow release in 8 seconds." },
  { icon: "⚽", title: "2. Bet on 150 Football Nations (600 Leagues)", steps: "Click '150 Football Nations' → Pick any country (#1 Argentina to #150 Philippines) → Choose 1st, 2nd, 3rd Division or National Cup → Click 1 / X / 2 odds." },
  { icon: "🎰", title: "3. Play Provably Fair Casino & Aviator Crash", steps: "Open 'VIP Casino & Aviator' → Select Aviator, Sweet Bonanza, Lightning Roulette or Blackjack → Click multiplier → Enter RWF/USDT stake in Bet Slip." },
  { icon: "📹", title: "4. Global Live Chat & HD WebRTC Video Calls", steps: "Open 'Live Chat & Video' → Select one of 4 SQLite community rooms to chat, or enter a Room ID and click 'Start / Join Video' for camera & screen share." },
  { icon: "🤖", title: "5. Ask KGT Omni-AI v3.0 Copilot Anything", steps: "Click 'Ask KGT Omni-AI' at top-right → Ask for live RWF conversions, tax calculations, league odds, or a full audit of your SQLite portfolio." },
  { icon: "🛡️", title: "6. Keyboard Shortcuts & Pro Navigation", steps: "Press Alt+B for Earn & Bet Hub, Alt+C for Live Chat & Video, Alt+A for Omni-AI Copilot, or Alt+M for Live Crypto Market." },
];

export default function AcademyAndShortcuts({ setActiveTab, theme, panel }) {
  const [openAcademy, setOpenAcademy] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (!e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "b") setActiveTab("earnbet");
      if (k === "c") setActiveTab("chatvideo");
      if (k === "a") setActiveTab("omnichat_ai");
      if (k === "m") setActiveTab("market");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setActiveTab]);

  return (
    <section style={{ ...panel, marginBottom: 18, borderLeft: "4px solid #3b82f6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <strong style={{ fontSize: 14, color: "#60a5fa" }}>📚 KGT Academy, User Guide & Pro Keyboard Shortcuts</strong>
          <span style={{ fontSize: 12, color: theme.muted, marginLeft: 8 }}>
            Shortcuts: <code>Alt+M</code> Market · <code>Alt+B</code> Bet & Casino · <code>Alt+C</code> Video Chat · <code>Alt+A</code> Omni-AI
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpenAcademy((v) => !v)}
          style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #3b82f6", background: openAcademy ? "#3b82f6" : theme.input, color: openAcademy ? "#fff" : theme.text, fontWeight: 800, fontSize: 11, cursor: "pointer" }}
        >
          {openAcademy ? "Hide Guide ▲" : "Open 6-Step Guide ▼"}
        </button>
      </div>

      {openAcademy && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginTop: 12 }}>
          {GUIDES.map((g) => (
            <div key={g.title} style={{ padding: 11, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}` }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#60a5fa", marginBottom: 4 }}>{g.icon} {g.title}</div>
              <div style={{ fontSize: 11, color: theme.muted, lineHeight: 1.45 }}>{g.steps}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
