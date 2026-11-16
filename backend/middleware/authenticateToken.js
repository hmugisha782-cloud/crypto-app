import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Authentication token is required.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "crypto-tracker-api",
      audience: "crypto-tracker-client",
      algorithms: ["HS256"],
    });

    if (
      !decoded ||
      (typeof decoded.userId !== "number" &&
        typeof decoded.userId !== "string")
    ) {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    req.user = { id: decoded.userId };
    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}
