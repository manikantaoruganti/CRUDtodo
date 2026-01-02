import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

/**
 * Load environment variables
 * IMPORTANT for Windows + ES Modules
 */
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * MongoDB Connection
 */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

/**
 * Health check
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
