import asyncHandler from "express-async-handler";
import Car from "../models/Car.js";
import Enquiry from "../models/Enquiry.js";
import SellRequest from "../models/SellRequest.js";

// @desc  Admin dashboard metrics
// @route GET /api/stats
// @access Private/Admin
export const getStats = asyncHandler(async (req, res) => {
  const [totalCars, available, reserved, sold, enquiries, sellRequests, recentCars, recentEnquiries] =
    await Promise.all([
      Car.countDocuments(),
      Car.countDocuments({ status: "AVAILABLE" }),
      Car.countDocuments({ status: "RESERVED" }),
      Car.countDocuments({ status: "SOLD" }),
      Enquiry.countDocuments(),
      SellRequest.countDocuments(),
      Car.find().sort({ createdAt: -1 }).limit(5),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).populate("interestedCar", "brand model stockId"),
    ]);

  res.json({
    success: true,
    data: {
      totalCars,
      available,
      reserved,
      sold,
      enquiries,
      sellRequests,
      recentCars,
      recentEnquiries,
    },
  });
});
