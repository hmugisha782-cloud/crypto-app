export function initSovereignGlobalSync() {
  if (typeof window === "undefined") return;
  try {
    const savedBg = localStorage.getItem("kgt_skin_bg");
    const savedFg = localStorage.getItem("kgt_skin_fg");
    if (savedBg) document.body.style.backgroundColor = savedBg;
    if (savedFg) document.body.style.color = savedFg;
  } catch {}
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
}
