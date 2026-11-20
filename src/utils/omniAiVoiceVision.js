export function readImageAsVisionPayload(file) {
  return new Promise((resolve) => {
    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const img = new Image();
      img.onload = () => {
        resolve({
          name: file.name,
          isImage: true,
          mimeType: file.type || "image/png",
          sizeKb,
          width: img.width,
          height: img.height,
          dataUrl,
        });
      };
      img.onerror = () => resolve({ name: file.name, isImage: true, mimeType: file.type, sizeKb, dataUrl });
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function speakCleanText(rawText, langCode = "RW") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean = String(rawText || "")
    .replace(/```[\s\(\S\)]*?```/g, " Code block ready on screen. ")
    .replace(/[*#`•_~[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return;
  const utter = new SpeechSynthesisUtterance(clean);
  const voiceMap = { RW: "sw-KE", EN: "en-US", FR: "fr-FR", SW: "sw-KE", ES: "es-ES", AR: "ar-SA", ZH: "zh-CN" };
  utter.lang = voiceMap[langCode] || "en-US";
  utter.rate = 1.02;
  window.speechSynthesis.speak(utter);
}
