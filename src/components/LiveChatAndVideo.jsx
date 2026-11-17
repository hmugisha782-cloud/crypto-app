import { useEffect, useState } from "react";

export default function LiveChatAndVideo({ activeTab, theme, panel }) {
  const [room, setRoom] = useState("Global Lounge");
  const [senderName, setSenderName] = useState(() => localStorage.getItem("kgt-chat-name") || "KigaliTrader");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [videoRoom, setVideoRoom] = useState("KigaliGlobalTracker-VIP-Room");
  const [videoActive, setVideoActive] = useState(false);

  const rooms = ["Global Lounge", "Kigali & East Africa Desk", "Sports & Bet Predictions", "VIP Support"];

  async function loadMessages(targetRoom = room) {
    try {
      const r = await fetch(`/api/chat/messages?room=${encodeURIComponent(targetRoom)}`);
      if (r.ok) {
        const d = await r.json();
        setMessages(d.messages || []);
      }
    } catch {}
  }

  useEffect(() => {
    if (activeTab !== "chatvideo") return;
    loadMessages(room);
    const timer = setInterval(() => loadMessages(room), 3500);
    return () => clearInterval(timer);
  }, [activeTab, room]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;
    localStorage.setItem("kgt-chat-name", senderName);
    const r = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room, senderName, message: text.trim() }),
    });
    if (r.ok) {
      setText("");
      loadMessages(room);
    }
  }

  if (activeTab !== "chatvideo") return null;

  const inp = { padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };
  const btn = { padding: "10px 15px", borderRadius: 9, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, cursor: "pointer", fontSize: 13 };

  return (
    <section style={{ display: "grid", gap: 18, marginBottom: 24 }}>
      <div style={{ ...panel, borderLeft: "4px solid #06b6d4" }}>
        <h2 style={{ marginTop: 0 }}>💬 Global Customer Live Chat & HD Video Call Hub</h2>
        <p style={{ color: theme.muted, fontSize: 13, marginBottom: 0 }}>
          Message traders and customers across Rwanda, East Africa, and worldwide in real time, or launch an instant HD Video & Audio conference room.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 18 }}>
        {/* REAL-TIME TEXT CHAT */}
        <div style={{ ...panel, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <strong style={{ fontSize: 16 }}>💬 Live Community & Support Chat</strong>
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>● Auto-Syncing SQLite</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {rooms.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoom(r)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: `1px solid ${room === r ? "#06b6d4" : theme.border}`,
                  background: room === r ? "#06b6d4" : theme.input,
                  color: room === r ? "#02131d" : theme.muted,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <div style={{ height: 290, overflowY: "auto", padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8, alignContent: "start" }}>
            {messages.map((m) => (
              <div key={m.id} style={{ padding: "8px 10px", borderRadius: 8, background: theme.card, border: `1px solid ${theme.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                  <strong style={{ color: "#06b6d4" }}>{m.senderName}</strong>
                  <span style={{ color: theme.muted }}>{m.createdAt}</span>
                </div>
                <div style={{ fontSize: 13 }}>{m.message}</div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} style={{ display: "grid", gap: 8 }}>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Display Name"
              style={inp}
            />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: theme.muted }}>Quick Reactions:</span>
              {["🚀 Bullish!", "⚽ Goal!", "💰 Paid!", "🔥 Let's Go!", "👍 Thanks"].map((tag) => (
                <button key={tag} type="button" onClick={() => setText((prev) => (prev ? prev + " " + tag : tag))} style={{ padding: "4px 8px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, cursor: "pointer" }}>{tag}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Write a message in ${room}...`}
                style={{ ...inp, flex: 1 }}
              />
              <button type="submit" style={btn}>Send</button>
            </div>
          </form>
        </div>

        {/* INSTANT HD VIDEO & VOICE CALL ROOM */}
        <div style={{ ...panel, display: "grid", gap: 12, alignContent: "start" }}>
          <strong style={{ fontSize: 16 }}>📹 Instant HD Video & Voice Call Room</strong>
          <p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>
            Enter any room name and share it with your partner or customer to start an encrypted live video & screen-sharing call directly inside the browser.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="text"
              value={videoRoom}
              onChange={(e) => setVideoRoom(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
              placeholder="Room Name (e.g. Kigali-Deal-101)"
              style={{ ...inp, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setVideoActive((v) => !v)}
              style={{ ...btn, background: videoActive ? "#ef4444" : "#10b981", color: videoActive ? "#fff" : "#02131d" }}
            >
              {videoActive ? "End Video Call" : "📹 Start / Join Video"}
            </button>
          </div>

          {videoActive ? (
            <iframe
              title="KGT Live Video Call"
              src={`https://jit.si${encodeURIComponent(videoRoom || "KigaliGlobalTracker-VIP-Room")}#config.prejoinPageEnabled=false`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              style={{ width: "100%", height: 340, borderRadius: 12, border: "1px solid #06b6d4" }}
            />
          ) : (
            <div style={{ height: 260, borderRadius: 12, background: theme.input, border: `1px dashed ${theme.border}`, display: "grid", placeItems: "center", textAlign: "center", padding: 20 }}>
              <div>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎥</div>
                <strong style={{ display: "block", marginBottom: 4 }}>Ready for Live Video & Audio Call</strong>
                <span style={{ fontSize: 12, color: theme.muted }}>
                  Click <strong>"Start / Join Video"</strong> above to turn on your camera & microphone and invite anyone using room ID <strong>{videoRoom}</strong>.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
