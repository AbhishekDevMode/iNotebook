require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectToMongo = require("./db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Fail fast if required env vars are missing
["MONGO_URI", "JWT_SECRET"].forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
        /\.vercel\.app$/.test(origin) ||
        /\.onrender\.com$/.test(origin) ||
        /\.netlify\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: " + origin));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));

// Throttle login/signup to slow down brute-force attempts
app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests, try again later" },
  })
);

app.get("/", (req, res) => res.json({ success: true, message: "iNotebook API is running" }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const path = require("path");
const fs = require("fs");
const clientDistPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(path.join(clientDistPath, "index.html"))) {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

connectToMongo().then(() => {
  app.listen(PORT, () => console.log(`iNotebook backend listening on port ${PORT}`));
});
