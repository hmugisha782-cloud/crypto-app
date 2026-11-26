import express from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts. Please try again in 15 minutes.",
  },
});

function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
    issuer: "crypto-tracker-api",
    audience: "crypto-tracker-client",
  });
}

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = db.prepare(
      "SELECT id, name, email FROM users WHERE id = ? LIMIT 1"
    ).get(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get current user error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve account details. Please try again.",
    });
  }
});

router.post("/register", registerLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return res.status(400).json({
        message: "Enter a name, a valid email address, and a password with at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Enter a valid email address.",
      });
    }

    if (normalizedName.length > 100 || normalizedEmail.length > 254) {
      return res.status(400).json({
        message: "The name or email address is too long.",
      });
    }

    const existingUser = db.prepare(
      "SELECT id FROM users WHERE email = ? LIMIT 1"
    ).get(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "This email address is already in use.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = db.prepare(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
    ).run(normalizedName, normalizedEmail, passwordHash);

    const userId = Number(result.lastInsertRowid);

    return res.status(201).json({
      message: "Account created successfully.",
      token: createAccessToken(userId),
      user: {
        id: userId,
        name: normalizedName,
        email: normalizedEmail,
      },
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "This email address is already in use.",
      });
    }

    console.error("Register error:", error.message);

    return res.status(500).json({
      message: "Unable to create the account. Please try again.",
    });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Enter your email address and password.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
      return res.status(400).json({
        message: "Enter a valid email address and password.",
      });
    }

    const user = db.prepare(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1"
    ).get(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email address or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email address or password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      token: createAccessToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in. Please try again.",
    });
  }
});

router.post("/reset-password",async(req,res)=>{const{email,newPassword}=req.body||{};const em=String(email||"").trim().toLowerCase();if(!em||!newPassword||newPassword.length<6)return res.status(400).json({message:"Invalid email or password (6+ chars)"});const u=db.prepare("SELECT id,name,email FROM users WHERE email=?").get(em);if(!u)return res.status(404).json({message:"User not found"});const h=await bcrypt.hash(newPassword,12);db.prepare("UPDATE users SET password_hash=? WHERE id=?").run(h,u.id);res.json({message:"Password updated",token:createAccessToken(u.id),user:u});});
export default router;
