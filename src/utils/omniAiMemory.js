const MEM_KEY = "kgt_omni_ai_memory_v56";
const FACTS_KEY = "kgt_omni_ai_user_facts_v56";

export function loadAiHistory() {
  try {
    const raw = localStorage.getItem(MEM_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [
    {
      role: "ai",
      time: new Date().toLocaleTimeString(),
      persona: "Universal Genius",
      text: "Muraho! Ndi KGT Omni-AI v56.0 (50 Neural Upgrades Active). Nzi buri kintu cyose kiri muri Kigali Global Tracker (138 Engines, Wallet, Ibiciro), nibuka ibiganiro byacu byose, nsesengura amadosiye (Code/CSV/Text), kandi nzi ubumenyi bwose bwo ku isi mu ndimi 7. Mbaza icyo ushaka cyose!",
    },
  ];
}

export function saveAiHistory(msgs) {
  try {
    localStorage.setItem(MEM_KEY, JSON.stringify(msgs.slice(-80)));
  } catch {}
}

export function clearAiHistory() {
  try {
    localStorage.removeItem(MEM_KEY);
  } catch {}
}

export function loadUserFacts() {
  try {
    return JSON.parse(localStorage.getItem(FACTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function rememberUserFact(fact) {
  const list = loadUserFacts();
  if (!list.includes(fact)) {
    const next = [fact, ...list].slice(0, 30);
    localStorage.setItem(FACTS_KEY, JSON.stringify(next));
    return next;
  }
  return list;
}
