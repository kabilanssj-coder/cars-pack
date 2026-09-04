import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bigboys18/cars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1920, crop: "limit", quality: "auto" }],
  },
});

// 5MB per file, up to 25 images per upload batch
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 25 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|webp/.test(file.mimetype);
    if (!ok) return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    cb(null, true);
  },
});

export default cloudinary;
