import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import noteRoutes from "./routes/notes.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security Headers ────────────────────────────────────────
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "access_token"],
  })
);

// ─── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});
app.use(limiter);

// ─── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ─── Compression ─────────────────────────────────────────────
app.use(compression());

// ─── Logging ─────────────────────────────────────────────────
app.use(morgan("short"));

// ─── Health Check ────────────────────────────────────────────
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ──────────────────────────────────────────────
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/auth", userRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("Unhandled Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// ─── MongoDB Connection with Retry ───────────────────────────
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.DB_LOCATION, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ Connected to MongoDB");
      return;
    } catch (err) {
      console.error(
        `❌ MongoDB connection attempt ${i + 1}/${retries} failed:`,
        err.message
      );
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }
  console.error("💀 Could not connect to MongoDB after", retries, "attempts");
  process.exit(1);
};

// ─── Start Server ────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

export default app;
