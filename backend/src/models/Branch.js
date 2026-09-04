import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    key: { type: String, enum: ["COIMBATORE", "ERODE"], required: true, unique: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    mapUrl: { type: String, trim: true },
    openingHours: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);
