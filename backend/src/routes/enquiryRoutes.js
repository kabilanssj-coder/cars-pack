import express from "express";
import { createEnquiry, getEnquiries, updateEnquiry } from "../controllers/enquiryController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", protect, requireAdmin, getEnquiries);
router.put("/:id", protect, requireAdmin, updateEnquiry);

export default router;
