import { useState, useRef, useEffect } from "react";
import { startLocalMediaStream, startScreenShareStream, stopMediaStream, createRoomChannel, captureVideoSnapshot, startStreamRecording, attachAudioMeter } from "../utils/sovereignWebRtcEngine.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const FILTERS = { "HD Natural": "none", "Studio Glow": "brightness(1.1) contrast(1.06) saturate(1.12)", "Cinema Warm": "contrast(1.12) sepia(0.14) saturate(1.15)" };

export default function SovereignVideoCallHub({ rates = {}, theme, panel }) {
  const [roomId, setRoomId] = useState("KIGALI-VIP-250");
  const [userName, setUserName] = useState("Kigali Host");
  const [inCall, setInCall] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [mirror, setMirror] = useState(true);
  const [facing, setFacing] = useState("user");
  const [filterName, setFilterName] = useState("HD Natural");
  const [sharing, setSharing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [statusMsg, setStatusMsg] = useState("📹 HD 720p WebRTC Studio v3.0 Ready");
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([{ sender: "System", time: new Date().toLocaleTimeString(), text: "Murakaza neza muri KGT HD Video Studio v3.0!" }]);
  const [giftUsd, setGiftUsd] = useState("10");

  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const channelRef = useRef(null);
  const meterStopRef = useRef(() => {});
  const rwfRate = Number(rates?.RWF || 1480);

  useEffect(() => {
    if (!inCall) { setSeconds(0); setAudioLevel(0); return; }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [inCall]);

  useEffect(() => {
    const ch = createRoomChannel(roomId, (data) => {
      if (data.type === "CHAT" && data.msg) setChatMsgs((p) => [...p.slice(-60), data.msg]);
      else if (data.type === "PRESENCE") setStatusMsg(`🟢 ${data.user} yinjiye mu cyumba [${roomId}]!`);
    });
    channelRef.current = ch;
    return () => ch?.close();
  }, [roomId]);

  useEffect(() => () => { meterStopRef.current(); stopMediaStream(streamRef.current); }, []);
  const fmtTimer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  async function joinVideoCall(customFacing = facing) {
    try {
      meterStopRef.current(); stopMediaStream(streamRef.current);
      const stream = await startLocalMediaStream({ video: true, audio: true, facingMode: customFacing });
      streamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      meterStopRef.current = attachAudioMeter(stream, setAudioLevel);
      setInCall(true); setCamOn(true); setMicOn(true); setSharing(false);
      setStatusMsg(`🔴 LIVE HD 720p CALL — Room: ${roomId}`);
      channelRef.current?.postMessage({ type: "PRESENCE", user: userName });
    } catch (err) { setStatusMsg(`⚠️ Camera/Mic: ${err.message} (Live Chat & Pay Active)`); setInCall(true); }
  }

  async function shareScreen() {
    try {
      const s = await startScreenShareStream();
      meterStopRef.current(); stopMediaStream(streamRef.current);
      streamRef.current = s;
      if (localVideoRef.current) localVideoRef.current.srcObject = s;
      setInCall(true); setSharing(true); setMirror(false);
      setStatusMsg(`🖥️ SCREEN SHARING — Room: ${roomId}`);
    } catch (err) { setStatusMsg(`⚠️ Screen Share: ${err.message}`); }
  }

  function endCall() {
    if (recorderRef.current && recording) { try { recorderRef.current.stop(); } catch {} setRecording(false); }
    meterStopRef.current(); stopMediaStream(streamRef.current); streamRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    setInCall(false); setSharing(false); setHandRaised(false);
    setStatusMsg("📴 Call Ended.");
  }

  function toggleRecord() {
    if (!recording) {
      if (!streamRef.current) { setStatusMsg("⚠️ Start Video Call first."); return; }
      const rec = startStreamRecording(streamRef.current, () => setStatusMsg("💾 Video saved to Downloads (.webm)!"));
      if (rec) { recorderRef.current = rec; setRecording(true); setStatusMsg("⏺️ RECORDING..."); }
    } else { try { recorderRef.current?.stop(); } catch {} setRecording(false); }
  }

  function sendChat(customText) {
    const txt = (customText ?? chatInput).trim();
    if (!txt) return;
    const msg = { sender: userName, time: new Date().toLocaleTimeString(), text: txt };
    setChatMsgs((p) => [...p.slice(-60), msg]);
    channelRef.current?.postMessage({ type: "CHAT", msg });
    if (!customText) setChatInput("");
  }

  function saveChatLog() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([chatMsgs.map((m) => `[${m.time}] ${m.sender}: ${m.text}`).join("\n")], { type: "text/plain" }));
    a.download = `KGT_Chat_${roomId}_${Date.now()}.txt`;
    a.click();
  }

  function sendInCallTip() {
    const amt = Math.max(1, Number(giftUsd || 0));
    const { tx } = recordSovereignTx({ hub: "HD Video Call Pay", title: `In-Call Transfer (${roomId})`, amountUsd: amt, rwfRate, type: "DEBIT" });
    const sysMsg = { sender: "💳 Wallet Pay", time: new Date().toLocaleTimeString(), text: `✅ [${tx.id}] ${userName} sent $${amt} USD (${Math.round(amt * rwfRate).toLocaleString()} RWF)!` };
    setChatMsgs((p) => [...p.slice(-60), sysMsg]);
    channelRef.current?.postMessage({ type: "CHAT", msg: sysMsg });
  }

  return (
    <section id="sovereign-video-call-hub" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #ec4899", background: "linear-gradient(135deg, rgba(236,72,153,0.13), rgba(56,189,248,0.08))", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div><strong style={{ fontSize: 16 }}>📹 Kigali Global HD Video Call, Recording & Screen-Sharing Studio v3.0</strong><span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>{statusMsg} {inCall ? `· ⏱️ ${fmtTimer}` : ""}</span></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} style={{ width: 105, padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} style={{ width: 120, padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
          <select value={filterName} onChange={(e) => setFilterName(e.target.value)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11.5, fontWeight: 700 }}>{Object.keys(FILTERS).map((k) => <option key={k} value={k}>🎨 {k}</option>)}</select>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/?room=${roomId}`).catch(() => {}); setStatusMsg(`🔗 Invite copied for ${roomId}`); }} style={{ padding: "6px 9px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: "#7dd3fc", fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>🔗 Invite</button>
          {!inCall ? <button type="button" onClick={() => joinVideoCall()} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>📹 Start Video Call</button> : <button type="button" onClick={endCall} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>📴 End Call</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(265px, 1fr))", gap: 12 }}>
        <div style={{ borderRadius: 12, overflow: "hidden", background: "#020617", border: `1px solid ${theme.border}`, position: "relative", minHeight: 235, display: "grid", placeItems: "center" }}>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "100%", height: 240, objectFit: "cover", display: inCall ? "block" : "none", transform: mirror && !sharing ? "scaleX(-1)" : "none", filter: FILTERS[filterName] || "none" }} />
          {!inCall && <div style={{ textAlign: "center", padding: 14, color: "#94a3b8" }}><div style={{ fontSize: 32 }}>🎥</div><strong style={{ color: "#f8fafc", fontSize: 13 }}>HD 720p Camera & Screen Preview</strong></div>}
          {handRaised && <span style={{ position: "absolute", top: 10, left: 10, padding: "4px 9px", borderRadius: 999, background: "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 11 }}>✋ Hand Raised</span>}
          {recording && <span style={{ position: "absolute", top: 10, right: 10, padding: "4px 9px", borderRadius: 999, background: "#f43f5e", color: "#fff", fontWeight: 900, fontSize: 11 }}>⏺️ REC</span>}
          {inCall && <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 90, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}><div style={{ width: `${micOn ? audioLevel : 0}%`, height: "100%", background: "#10b981", transition: "width 0.12s ease" }} /></div>}
          <div style={{ position: "absolute", bottom: 8, left: 6, right: 6, display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={() => { (streamRef.current?.getAudioTracks() || []).forEach((t) => { t.enabled = !micOn; }); setMicOn((v) => !v); }} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: micOn ? "rgba(15,23,42,0.85)" : "#f43f5e", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>{micOn ? "🎙️ Mic" : "🔇 Muted"}</button>
            <button type="button" onClick={() => { (streamRef.current?.getVideoTracks() || []).forEach((t) => { t.enabled = !camOn; }); setCamOn((v) => !v); }} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: camOn ? "rgba(15,23,42,0.85)" : "#f43f5e", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>{camOn ? "📷 Cam" : "🚫 Off"}</button>
            <button type="button" onClick={() => { const n = facing === "user" ? "environment" : "user"; setFacing(n); if (inCall && !sharing) joinVideoCall(n); }} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: "rgba(15,23,42,0.85)", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>🔄 Flip</button>
            <button type="button" onClick={() => setMirror((m) => !m)} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: "rgba(15,23,42,0.85)", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>🪞 Mirror</button>
            <button type="button" onClick={shareScreen} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: sharing ? "#38bdf8" : "rgba(15,23,42,0.85)", color: sharing ? "#02131d" : "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>🖥️ Screen</button>
            <button type="button" onClick={toggleRecord} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: recording ? "#f43f5e" : "rgba(15,23,42,0.85)", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>{recording ? "⏹️ Stop" : "⏺️ Rec"}</button>
            <button type="button" onClick={() => setStatusMsg(captureVideoSnapshot(localVideoRef.current, roomId) ? "📸 Snapshot saved (.png)!" : "⚠️ Start camera first.")} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: "rgba(15,23,42,0.85)", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>📸 Snap</button>
            <button type="button" onClick={async () => { try { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else if (localVideoRef.current?.readyState >= 2) await localVideoRef.current.requestPictureInPicture(); } catch {} }} style={{ padding: "4px 7px", borderRadius: 999, border: "none", background: "rgba(15,23,42,0.85)", color: "#fff", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>🪟 PiP</button>
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {["✋", "👏", "❤️", "🔥", "🚀"].map((em) => <button key={em} type="button" onClick={() => { if (em === "✋") setHandRaised((h) => !h); sendChat(`${em} Reaction`); }} style={{ padding: "3px 6px", borderRadius: 6, border: `1px solid ${theme.border}`, background: "transparent", fontSize: 12, cursor: "pointer" }}>{em}</button>)}
              <button type="button" onClick={saveChatLog} style={{ padding: "3px 7px", borderRadius: 6, border: `1px solid ${theme.border}`, background: "transparent", color: "#38bdf8", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>📥 Chat</button>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <input type="number" min="1" value={giftUsd} onChange={(e) => setGiftUsd(e.target.value)} style={{ width: 55, padding: "4px 6px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 11, fontWeight: 800 }} />
              <button type="button" onClick={sendInCallTip} style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: "#10b981", color: "#02131d", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>💸 Send ${giftUsd}</button>
            </div>
          </div>
          <div style={{ height: 140, overflowY: "auto", display: "grid", gap: 5, padding: 6, borderRadius: 8, background: "rgba(2,6,23,0.35)" }}>
            {chatMsgs.map((m, i) => <div key={i} style={{ fontSize: 11.5 }}><strong style={{ color: "#f472b6" }}>{m.sender}</strong> <em style={{ fontSize: 10, color: theme.muted }}>({m.time})</em>: <span>{m.text}</span></div>)}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Andika ubutumwa muri call..." style={{ flex: 1, padding: "7px 9px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
            <button type="button" onClick={() => sendChat()} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: "#ec4899", color: "#fff", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>Send</button>
          </div>
        </div>
      </div>
    </section>
  );
}
