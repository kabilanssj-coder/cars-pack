import asyncHandler from "express-async-handler";
import Enquiry from "../models/Enquiry.js";
import Car from "../models/Car.js";
import { sendMail } from "../utils/mailer.js";

// @desc  Submit an enquiry
// @route POST /api/enquiries
// @access Public
export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, interestedCar, stockId, message } = req.body;

  if (!name || !phone) {
    res.status(400);
    throw new Error("Name and phone are required");
  }

  let carLabel = stockId || "";
  if (interestedCar) {
    const car = await Car.findById(interestedCar);
    if (car) carLabel = `${car.brand} ${car.model} (${car.stockId})`;
  }

  const enquiry = await Enquiry.create({ name, phone, email, interestedCar, stockId, message });

  await sendMail({
    subject: `New Enquiry — ${carLabel || "General"}`,
    html: `
      <h2>New Website Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "-"}</p>
      <p><strong>Car:</strong> ${carLabel || "-"}</p>
      <p><strong>Message:</strong> ${message || "-"}</p>
    `,
  });

  res.status(201).json({ success: true, data: enquiry });
});

// @desc  List enquiries
// @route GET /api/enquiries
// @access Private/Admin
export const getEnquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = {};
  if (status) query.status = status.toUpperCase();
  const enquiries = await Enquiry.find(query).populate("interestedCar", "brand model stockId").sort({ createdAt: -1 });
  res.json({ success: true, data: enquiries });
});

// @desc  Update enquiry status
// @route PUT /api/enquiries/:id
// @access Private/Admin
export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json({ success: true, data: enquiry });
});
