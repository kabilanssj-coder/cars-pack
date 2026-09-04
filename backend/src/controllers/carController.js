import asyncHandler from "express-async-handler";
import Car from "../models/Car.js";
import cloudinary from "../config/cloudinary.js";

// @desc  List/search/filter cars (public sees only published)
// @route GET /api/cars
// @access Public / Private (admin sees all via ?admin=true when authenticated)
export const getCars = asyncHandler(async (req, res) => {
  const {
    search,
    brand,
    bodyType,
    fuel,
    transmission,
    branch,
    status,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minKm,
    maxKm,
    featured,
    published,
    page = 1,
    limit = 12,
    sort = "recommended",
  } = req.query;

  const query = {};

  // Public requests only ever see published cars. Admin dashboard passes
  // published=all (authenticated route) to see everything.
  if (published === "all" && req.user && req.user.role === "admin") {
    // no filter
  } else if (published !== undefined && req.user && req.user.role === "admin") {
    query.published = published === "true";
  } else {
    query.published = true;
  }

  if (search) query.$text = { $search: search };
  if (brand) query.brand = new RegExp(`^${brand}$`, "i");
  if (bodyType) query.bodyType = bodyType.toUpperCase();
  if (fuel) query.fuel = fuel.toUpperCase();
  if (transmission) query.transmission = transmission.toUpperCase();
  if (branch) query.branch = branch.toUpperCase();
  if (status) query.status = status.toUpperCase();
  if (featured !== undefined) query.featured = featured === "true";

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (minYear || maxYear) {
    query.manufacturingYear = {};
    if (minYear) query.manufacturingYear.$gte = Number(minYear);
    if (maxYear) query.manufacturingYear.$lte = Number(maxYear);
  }
  if (minKm || maxKm) {
    query.km = {};
    if (minKm) query.km.$gte = Number(minKm);
    if (maxKm) query.km.$lte = Number(maxKm);
  }

  const sortMap = {
    recommended: { branch: 1, featured: -1, createdAt: -1 },
    newest: { createdAt: -1 },
    price_low: { price: 1 },
    price_high: { price: -1 },
    km_low: { km: 1 },
  };
  const sortOption = sortMap[sort] || sortMap.recommended;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(48, Math.max(1, Number(limit)));

  const [items, total] = await Promise.all([
    Car.find(query)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Car.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  });
});

// @desc  Get single car
// @route GET /api/cars/:id
// @access Public
export const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  if (!car.published && !(req.user && req.user.role === "admin")) {
    res.status(404);
    throw new Error("Car not found");
  }
  res.json({ success: true, data: car });
});

// @desc  Create car
// @route POST /api/cars
// @access Private/Admin
export const createCar = asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);
  res.status(201).json({ success: true, data: car });
});

// @desc  Update car
// @route PUT /api/cars/:id
// @access Private/Admin
export const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  res.json({ success: true, data: car });
});

// @desc  Delete car (and its Cloudinary images)
// @route DELETE /api/cars/:id
// @access Private/Admin
export const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  await Promise.allSettled(
    car.images.map((img) => cloudinary.uploader.destroy(img.publicId))
  );
  await car.deleteOne();

  res.json({ success: true, message: "Car deleted" });
});

// @desc  Update car status (AVAILABLE / RESERVED / SOLD)
// @route PATCH /api/cars/:id/status
// @access Private/Admin
export const updateCarStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["AVAILABLE", "RESERVED", "SOLD"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }
  const car = await Car.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  res.json({ success: true, data: car });
});

// @desc  Publish / unpublish (save draft) a car
// @route PATCH /api/cars/:id/publish
// @access Private/Admin
export const togglePublish = asyncHandler(async (req, res) => {
  const { published } = req.body;
  const car = await Car.findByIdAndUpdate(
    req.params.id,
    { published: !!published },
    { new: true }
  );
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  res.json({ success: true, data: car });
});

// @desc  Upload one or more images to a car via Cloudinary
// @route POST /api/cars/:id/images
// @access Private/Admin
export const uploadCarImages = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  const files = req.files || [];
  const category = (req.body.category || "EXTERIOR").toUpperCase();
  const MAX_IMAGES = 25;

  // Cloudinary storage uploads files during multer parsing, before this
  // handler runs — so if the cumulative total would exceed the cap, the
  // files are already on Cloudinary and must be cleaned up before we reject.
  if (car.images.length + files.length > MAX_IMAGES) {
    await Promise.allSettled(files.map((f) => cloudinary.uploader.destroy(f.filename)));
    res.status(400);
    throw new Error(
      `Maximum ${MAX_IMAGES} images per vehicle. This car already has ${car.images.length}, and you tried to add ${files.length}.`
    );
  }

  const newImages = files.map((f, idx) => ({
    url: f.path,
    publicId: f.filename,
    category,
    isMain: car.images.length === 0 && idx === 0,
    order: car.images.length + idx,
  }));

  car.images.push(...newImages);
  await car.save();

  res.status(201).json({ success: true, data: car });
});

// @desc  Delete a single image from a car
// @route DELETE /api/cars/:id/images/:publicId
// @access Private/Admin
export const deleteCarImage = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  const publicId = decodeURIComponent(req.params.publicId);
  await cloudinary.uploader.destroy(publicId).catch(() => {});
  car.images = car.images.filter((img) => img.publicId !== publicId);
  await car.save();

  res.json({ success: true, data: car });
});
