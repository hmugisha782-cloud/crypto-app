import express from "express";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const prompt = String(req.body?.prompt || "").trim();
  const lang = String(req.body?.lang || "RW");
  const context = String(req.body?.context || "");
  if (!prompt) return res.status(400).json({ ok: false, error: "Empty prompt" });

  const sysPrompt =
    "You are KGT Omni-AI v6.0, a world-class universal AI assistant built into Kigali Global Tracker (Rwanda). " +
    "You possess complete encyclopedic knowledge of the world (science, mathematics, programming, history, business, medicine, law, literature, and global news) AND full knowledge of the user's app context: " +
    context +
    `. Respond clearly, accurately, and thoroughly in the user's language (Target language code: ${lang}; RW = fluent natural Kinyarwanda, EN = English, FR = French, SW = Swahili, ES = Spanish, AR = Arabic, ZH = Chinese).`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 14000);
    const resp = await fetch("https://pollinations.ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          { role: "system", content: sysPrompt },
          { role: "user", content: prompt },
        ],
        model: "openai",
        private: true,
      }),
    });
    clearTimeout(timer);
    if (resp.ok) {
      const answer = (await resp.text()).trim();
      if (answer && answer.length > 4 && !answer.startsWith("<!DOCTYPE")) {
        return res.json({ ok: true, source: "universal-llm", answer });
      }
    }
  } catch {}

  res.json({ ok: false, fallback: true });
});

router.get("/status", (req, res) => res.json({ ok: true, engine: "KGT Omni-AI v56.0", upgrades: 50, languages: ["RW","EN","FR","SW","ES","AR","ZH"], status: "ONLINE" }));

router.post("/vision", async (req, res) => {
  const prompt = String(req.body?.prompt || "Describe this image in detail.");
  const lang = String(req.body?.lang || "RW");
  const imageUrl = String(req.body?.imageUrl || "");
  if (!imageUrl) return res.status(400).json({ ok: false });
  try {
    const r = await fetch("https://pollinations.ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Analyze this image thoroughly and answer in language " + lang + ": " + prompt },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }],
        model: "openai"
      })
    });
    if (r.ok) {
      const answer = (await r.text()).trim();
      if (answer && !answer.startsWith("<!DOCTYPE")) return res.json({ ok: true, answer });
    }
  } catch {}
  res.json({ ok: false });
});

export default router;
