import omniAiGateway from "./routes/omniAiGateway.js";
import sovereignLedgerApi from "./routes/sovereignLedgerApi.js";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.js";
import userDataRoutes from "./routes/userData.js";
import marketExtraRoutes from "./routes/marketExtra.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");
app.use(helmet());

const allowedOrigin = process.env.FRONTEND_ORIGIN;

app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === allowedOrigin || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "100kb" }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    if (!res.headersSent) res.setHeader("X-Response-Time", ms + "ms");
  });
  next();
});


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(apiLimiter);
app.use("/api/ai", omniAiGateway);
app.use("/api/sovereign", sovereignLedgerApi);
app.use("/api/auth", authRoutes);
app.use("/api/user", userDataRoutes);
app.use("/api/market", marketExtraRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Crypto Tracker Backend is running!",
  });
});


let newsCache = { articles: [], fetchedAt: 0 };

app.get("/api/news", async (req, res) => {
  try {
    const now = Date.now();
    if (newsCache.articles.length > 0 && now - newsCache.fetchedAt < 10 * 60 * 1000) {
      return res.json({ articles: newsCache.articles, cached: true });
    }

    const response = await fetch("https://cryptocompare.com");
    if (!response.ok) {
      throw new Error("Upstream news API failed");
    }

    const data = await response.json();
    const rawList = Array.isArray(data.Data) ? data.Data : [];

    const articles = rawList.slice(0, 24).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      link: item.url,
      imageUrl: item.imageurl,
      source: item.source_info?.name || item.source || "Crypto News",
      category: item.categories ? item.categories.split("|")[0] : "Crypto",
      pubDate: item.published_on ? new Date(item.published_on * 1000).toISOString() : null,
    }));

    newsCache = { articles, fetchedAt: now };
    res.json({ articles, cached: false });
  } catch (err) {
    if (newsCache.articles.length > 0) {
      return res.json({ articles: newsCache.articles, cached: true });
    }
    res.status(502).json({ error: "Unable to fetch live crypto news right now." });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "crypto-tracker-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "../dist");
app.use(express.static(distDir));


app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path === "/health") return next();
  res.sendFile(path.join(distDir, "index.html"));
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Crypto Tracker Backend listening on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down gracefully`);

  server.close((error) => {
    if (error) {
      console.error("Error while closing server:", error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
