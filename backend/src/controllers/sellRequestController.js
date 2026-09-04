import asyncHandler from "express-async-handler";
import SellRequest from "../models/SellRequest.js";
import { sendMail } from "../utils/mailer.js";

// @desc  Submit a "sell your car" lead
// @route POST /api/sell-requests
// @access Public
export const createSellRequest = asyncHandler(async (req, res) => {
  const { name, phone, brand, model, year, km } = req.body;

  if (!name || !phone || !brand || !model || !year || !km) {
    res.status(400);
    throw new Error("Name, phone, brand, model, year and km are required");
  }

  const request = await SellRequest.create(req.body);

  await sendMail({
    subject: `New Sell Request — ${brand} ${model}`,
    html: `
      <h2>New "Sell Your Car" Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Vehicle:</strong> ${brand} ${model} (${year}), ${km} km</p>
      <p><strong>Expected Price:</strong> ${req.body.expectedPrice || "-"}</p>
      <p><strong>Preferred Branch:</strong> ${req.body.preferredBranch || "COIMBATORE"}</p>
      <p><strong>Message:</strong> ${req.body.message || "-"}</p>
    `,
  });

  res.status(201).json({ success: true, data: request });
});

// @desc  List sell requests
// @route GET /api/sell-requests
// @access Private/Admin
export const getSellRequests = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = {};
  if (status) query.status = status.toUpperCase();
  const requests = await SellRequest.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: requests });
});

// @desc  Update sell request status
// @route PUT /api/sell-requests/:id
// @access Private/Admin
export const updateSellRequest = asyncHandler(async (req, res) => {
  const request = await SellRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!request) {
    res.status(404);
    throw new Error("Sell request not found");
  }
  res.json({ success: true, data: request });
});
