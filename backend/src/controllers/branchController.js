import asyncHandler from "express-async-handler";
import Branch from "../models/Branch.js";

// @desc  List branches
// @route GET /api/branches
// @access Public
export const getBranches = asyncHandler(async (req, res) => {
  const branches = await Branch.find().sort({ isPrimary: -1 });
  res.json({ success: true, data: branches });
});

// @desc  Update a branch
// @route PUT /api/branches/:id
// @access Private/Admin
export const updateBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!branch) {
    res.status(404);
    throw new Error("Branch not found");
  }
  res.json({ success: true, data: branch });
});
