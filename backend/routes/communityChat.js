import express from "express";
import { db } from "../config/database.js";

const router = express.Router();

// Seed welcome message if empty
const count = db.prepare("SELECT COUNT(*) AS c FROM community_messages").get().c;
if (count === 0) {
  db.prepare("INSERT INTO community_messages (room, sender_name, message) VALUES (?, ?, ?)")
    .run("Global Lounge", "KGT Admin", "Welcome to Kigali Global Tracker Live Chat & Video Room! Connect with traders worldwide.");
}

router.get("/messages", (req, res) => {
  const room = String(req.query.room || "Global Lounge").slice(0, 60);
  const rows = db
    .prepare("SELECT id, room, sender_name AS senderName, message, created_at AS createdAt FROM community_messages WHERE room = ? ORDER BY id DESC LIMIT 60")
    .all(room)
    .reverse();
  res.json({ room, messages: rows });
});

router.post("/messages", (req, res) => {
  const room = String(req.body?.room || "Global Lounge").trim().slice(0, 60);
  const senderName = String(req.body?.senderName || "Trader").trim().slice(0, 40) || "Trader";
  const message = String(req.body?.message || "").trim().slice(0, 600);
  if (!message) return res.status(400).json({ error: "Message is required." });

  const info = db
    .prepare("INSERT INTO community_messages (room, sender_name, message) VALUES (?, ?, ?)")
    .run(room, senderName, message);
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

export default router;
