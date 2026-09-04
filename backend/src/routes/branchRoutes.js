import express from "express";
import { getBranches, updateBranch } from "../controllers/branchController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBranches);
router.put("/:id", protect, requireAdmin, updateBranch);

export default router;
