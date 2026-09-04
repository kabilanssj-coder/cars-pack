import express from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  updateCarStatus,
  togglePublish,
  uploadCarImages,
  deleteCarImage,
} from "../controllers/carController.js";
import { protect, requireAdmin, optionalAuth } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", optionalAuth, getCars);
router.get("/:id", optionalAuth, getCarById);

router.post("/", protect, requireAdmin, createCar);
router.put("/:id", protect, requireAdmin, updateCar);
router.delete("/:id", protect, requireAdmin, deleteCar);
router.patch("/:id/status", protect, requireAdmin, updateCarStatus);
router.patch("/:id/publish", protect, requireAdmin, togglePublish);

router.post("/:id/images", protect, requireAdmin, upload.array("images", 25), uploadCarImages);
router.delete("/:id/images/:publicId", protect, requireAdmin, deleteCarImage);

export default router;
