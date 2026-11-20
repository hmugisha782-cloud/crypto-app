export async function startLocalMediaStream({ video = true, audio = true, facingMode = "user" } = {}) {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera/Mic API unavailable.");
  return await navigator.mediaDevices.getUserMedia({
    video: video ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode } : false,
    audio: audio ? { echoCancellation: true, noiseSuppression: true } : false,
  });
}

export async function startScreenShareStream() {
  if (!navigator.mediaDevices?.getDisplayMedia) throw new Error("Screen share unsupported.");
  return await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
}

export function stopMediaStream(stream) {
  stream?.getTracks().forEach((t) => { try { t.stop(); } catch {} });
}

export function createRoomChannel(roomId, onSignal) {
  if (!("BroadcastChannel" in window)) return null;
  const ch = new BroadcastChannel(`kgt_video_room_${roomId}`);
  ch.onmessage = (ev) => { if (ev?.data) onSignal(ev.data); };
  return ch;
}

export function captureVideoSnapshot(videoEl, roomId = "KIGALI") {
  if (!videoEl?.videoWidth) return false;
  const c = document.createElement("canvas");
  c.width = videoEl.videoWidth; c.height = videoEl.videoHeight;
  c.getContext("2d")?.drawImage(videoEl, 0, 0, c.width, c.height);
  const a = document.createElement("a");
  a.href = c.toDataURL("image/png");
  a.download = `KGT_Snapshot_${roomId}_${Date.now()}.png`;
  a.click();
  return true;
}

export function startStreamRecording(stream, onSaved) {
  if (!stream || typeof MediaRecorder === "undefined") return null;
  const chunks = [];
  const rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => { if (e.data?.size > 0) chunks.push(e.data); };
  rec.onstop = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(chunks, { type: "video/webm" }));
    a.download = `KGT_VideoCall_${Date.now()}.webm`;
    a.click();
    if (onSaved) onSaved();
  };
  rec.start();
  return rec;
}

export function attachAudioMeter(stream, onLevel) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx || !stream?.getAudioTracks().length) return () => {};
    const ctx = new AudioCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    const id = setInterval(() => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      onLevel(Math.min(100, Math.round((avg / 128) * 100)));
    }, 150);
    return () => { clearInterval(id); ctx.close().catch(() => {}); };
  } catch { return () => {}; }
}
