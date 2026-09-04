import express from "express";
import { getStats } from "../controllers/statsController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, requireAdmin, getStats);

export default router;
