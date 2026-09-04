import mongoose from "mongoose";

const sellRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    km: { type: Number, required: true },
    fuel: { type: String, trim: true },
    transmission: { type: String, trim: true },
    expectedPrice: { type: Number },
    preferredBranch: { type: String, enum: ["COIMBATORE", "ERODE"], default: "COIMBATORE" },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: [
        "NEW",
        "CONTACTED",
        "INSPECTION",
        "VALUATION",
        "NEGOTIATION",
        "PURCHASED",
        "REJECTED",
      ],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SellRequest", sellRequestSchema);
