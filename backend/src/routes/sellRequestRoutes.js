import express from "express";
import {
  createSellRequest,
  getSellRequests,
  updateSellRequest,
} from "../controllers/sellRequestController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createSellRequest);
router.get("/", protect, requireAdmin, getSellRequests);
router.put("/:id", protect, requireAdmin, updateSellRequest);

export default router;
