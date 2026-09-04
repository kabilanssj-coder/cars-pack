import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    interestedCar: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    stockId: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "FOLLOW_UP", "INTERESTED", "CLOSED", "NOT_INTERESTED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
