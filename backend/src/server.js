import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import sellRequestRoutes from "./routes/sellRequestRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://cars-pack.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Basic global rate limiting — protects auth + write endpoints from abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/sell-requests", sellRequestRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("BIG BOYS 18+ API is running. See /api/health.");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] BIG BOYS 18+ API running on port ${PORT}`);
});
