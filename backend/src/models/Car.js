import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      enum: ["EXTERIOR", "INTERIOR", "DASHBOARD", "ENGINE", "DETAILS"],
      default: "EXTERIOR",
    },
    isMain: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    variant: { type: String, trim: true },
    stockId: { type: String, required: true, unique: true, trim: true, uppercase: true },
    price: { type: Number, required: true },

    manufacturingYear: { type: Number, required: true },
    registrationYear: { type: Number },
    km: { type: Number, required: true },
    fuel: {
      type: String,
      enum: ["PETROL", "DIESEL", "CNG", "ELECTRIC", "HYBRID"],
      required: true,
    },
    transmission: { type: String, enum: ["MANUAL", "AUTOMATIC"], required: true },
    engine: { type: String, trim: true },
    bodyType: {
      type: String,
      enum: ["PREMIUM", "SUV", "SEDAN", "HATCHBACK", "MUV", "OTHER"],
      default: "OTHER",
    },
    colour: { type: String, trim: true },
    ownership: { type: String, trim: true },
    insurance: { type: String, trim: true },
    serviceHistory: { type: String, trim: true },

    branch: { type: String, enum: ["COIMBATORE", "ERODE"], default: "COIMBATORE" },
    status: { type: String, enum: ["AVAILABLE", "RESERVED", "SOLD"], default: "AVAILABLE" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },

    description: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    images: [imageSchema],
  },
  { timestamps: true }
);

carSchema.index({ brand: "text", model: "text", variant: "text", stockId: "text" });

export default mongoose.model("Car", carSchema);
