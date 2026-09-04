import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Car from "./models/Car.js";
import Branch from "./models/Branch.js";

dotenv.config();

// Demo image placeholder — replace with real Cloudinary uploads via the
// admin "Add Car" uploader. publicId is fake/unused until real images
// are uploaded, so these seed rows are never mistaken for a live Cloudinary asset.
const placeholderImage = (seed, category, i) => ({
  url: `https://placehold.co/1200x800/121215/B8B8B8?text=${encodeURIComponent(seed)}`,
  publicId: `demo/${seed.replace(/\s+/g, "-").toLowerCase()}-${category.toLowerCase()}-${i}`,
  category,
  isMain: i === 0 && category === "EXTERIOR",
  order: i,
});

const demoCars = [
  { brand: "Mercedes-Benz", model: "C-Class", variant: "C 220d", price: 3850000, bodyType: "PREMIUM", fuel: "DIESEL", transmission: "AUTOMATIC", manufacturingYear: 2021, km: 24500, colour: "Obsidian Black" },
  { brand: "BMW", model: "5 Series", variant: "530i M Sport", price: 4650000, bodyType: "PREMIUM", fuel: "PETROL", transmission: "AUTOMATIC", manufacturingYear: 2022, km: 18200, colour: "Alpine White" },
  { brand: "Audi", model: "Q5", variant: "45 TFSI Quattro", price: 4250000, bodyType: "SUV", fuel: "PETROL", transmission: "AUTOMATIC", manufacturingYear: 2021, km: 31000, colour: "Glacier White" },
  { brand: "Volvo", model: "XC60", variant: "B5 Inscription", price: 3990000, bodyType: "SUV", fuel: "DIESEL", transmission: "AUTOMATIC", manufacturingYear: 2020, km: 42500, colour: "Denim Blue" },
  { brand: "Jaguar", model: "XE", variant: "R-Dynamic", price: 2650000, bodyType: "SEDAN", fuel: "DIESEL", transmission: "AUTOMATIC", manufacturingYear: 2019, km: 51200, colour: "Santorini Black" },
  { brand: "Toyota", model: "Fortuner", variant: "Legender 4x2", price: 3350000, bodyType: "SUV", fuel: "DIESEL", transmission: "AUTOMATIC", manufacturingYear: 2022, km: 22000, colour: "Avante Garde Bronze" },
  { brand: "Jeep", model: "Compass", variant: "Model S", price: 1950000, bodyType: "SUV", fuel: "DIESEL", transmission: "MANUAL", manufacturingYear: 2021, km: 28900, colour: "Sting Grey" },
  { brand: "Kia", model: "Seltos", variant: "GTX+", price: 1450000, bodyType: "SUV", fuel: "PETROL", transmission: "AUTOMATIC", manufacturingYear: 2022, km: 19500, colour: "Gravity Grey" },
  { brand: "Hyundai", model: "Creta", variant: "SX(O)", price: 1350000, bodyType: "SUV", fuel: "DIESEL", transmission: "MANUAL", manufacturingYear: 2021, km: 33400, colour: "Polar White" },
  { brand: "Honda", model: "City", variant: "ZX CVT", price: 1120000, bodyType: "SEDAN", fuel: "PETROL", transmission: "AUTOMATIC", manufacturingYear: 2020, km: 38700, colour: "Radiant Red" },
  { brand: "Volkswagen", model: "Virtus", variant: "GT Plus", price: 1250000, bodyType: "SEDAN", fuel: "PETROL", transmission: "AUTOMATIC", manufacturingYear: 2023, km: 9800, colour: "Curcuma Yellow" },
  { brand: "Skoda", model: "Slavia", variant: "Ambition", price: 1080000, bodyType: "SEDAN", fuel: "PETROL", transmission: "MANUAL", manufacturingYear: 2022, km: 15600, colour: "Tornado Red" },
  { brand: "Tata", model: "Harrier", variant: "XZ+", price: 1650000, bodyType: "SUV", fuel: "DIESEL", transmission: "MANUAL", manufacturingYear: 2021, km: 27300, colour: "Orcus White" },
  { brand: "Mahindra", model: "XUV700", variant: "AX7 L", price: 2150000, bodyType: "SUV", fuel: "DIESEL", transmission: "AUTOMATIC", manufacturingYear: 2023, km: 12100, colour: "Napoli Black" },
  { brand: "Maruti Suzuki", model: "Swift", variant: "ZXi+", price: 650000, bodyType: "HATCHBACK", fuel: "PETROL", transmission: "MANUAL", manufacturingYear: 2022, km: 21400, colour: "Fire Red" },
  { brand: "Hyundai", model: "Venue", variant: "SX Turbo", price: 980000, bodyType: "SUV", fuel: "PETROL", transmission: "MANUAL", manufacturingYear: 2021, km: 26800, colour: "Titan Grey" },
  { brand: "Toyota", model: "Innova Crysta", variant: "GX", price: 2050000, bodyType: "MUV", fuel: "DIESEL", transmission: "MANUAL", manufacturingYear: 2020, km: 45200, colour: "White Pearl" },
  { brand: "Mahindra", model: "Thar", variant: "LX Hard Top", price: 1550000, bodyType: "SUV", fuel: "DIESEL", transmission: "MANUAL", manufacturingYear: 2022, km: 17200, colour: "Napoli Black" },
];

const featuresPool = [
  "Sunroof", "Leather Seats", "Rear Camera", "Cruise Control", "Ventilated Seats",
  "Wireless Charging", "Touchscreen Infotainment", "Alloy Wheels", "ABS with EBD",
  "Multiple Airbags", "Automatic Climate Control", "Keyless Entry",
];

const run = async () => {
  await connectDB();

  console.log("[Seed] Clearing existing demo collections...");
  await Promise.all([Car.deleteMany({}), Branch.deleteMany({})]);

  // Admin user — upsert so re-running seed never duplicates the account
  const adminEmail = (process.env.ADMIN_EMAIL || "kabilanssj@gmail.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await User.hashPassword(adminPassword);

  await User.findOneAndUpdate(
    { email: adminEmail },
    { name: "Big Boys 18+ Admin", email: adminEmail, passwordHash, role: "admin" },
    { upsert: true, new: true }
  );
  console.log(`[Seed] Admin user ready: ${adminEmail}`);

  // Branches
  await Branch.create([
    {
      key: "COIMBATORE",
      name: "Big Boys 18+ — Coimbatore",
      address: "5/171B, Arasur Pirivu, Avinashi Road, Arasur, Coimbatore, Tamil Nadu 641407",
      phone: "9500390683",
      email: "kabilanssj@gmail.com",
      mapUrl: "https://maps.google.com/?q=5/171B+Arasur+Pirivu+Avinashi+Road+Arasur+Coimbatore+Tamil+Nadu+641407",
      openingHours: "Mon–Sun: 10:00 AM – 8:00 PM",
      isPrimary: true,
      isActive: true,
    },
    {
      key: "ERODE",
      name: "Big Boys 18+ — Erode",
      address: "Address to be configured by admin",
      phone: "9500390683",
      email: "kabilanssj@gmail.com",
      mapUrl: "",
      openingHours: "Mon–Sun: 10:00 AM – 8:00 PM",
      isPrimary: false,
      isActive: true,
    },
  ]);
  console.log("[Seed] Branches created");

  // Cars
  const carDocs = demoCars.map((c, i) => {
    const stockId = `BB18-${String(i + 1).padStart(3, "0")}`;
    const seedName = `${c.brand} ${c.model}`;
    const images = [
      placeholderImage(seedName, "EXTERIOR", 0),
      placeholderImage(seedName, "EXTERIOR", 1),
      placeholderImage(seedName, "INTERIOR", 0),
      placeholderImage(seedName, "DASHBOARD", 0),
    ];
    const features = [...featuresPool].sort(() => 0.5 - Math.random()).slice(0, 6);

    return {
      ...c,
      stockId,
      registrationYear: c.manufacturingYear,
      engine: "1998 cc",
      ownership: "1st Owner",
      insurance: "Comprehensive — Valid",
      serviceHistory: "Full service history available",
      branch: i % 5 === 0 ? "ERODE" : "COIMBATORE",
      status: "AVAILABLE",
      featured: i < 6,
      published: true,
      description: `A well-maintained ${c.brand} ${c.model} ${c.variant}, carefully inspected and ready for its next owner. Demo listing — replace with real vehicle photos and details from the admin console.`,
      features,
      images,
    };
  });

  await Car.insertMany(carDocs);
  console.log(`[Seed] ${carDocs.length} demo vehicles created (marked as DEMO — replace via admin console)`);

  console.log("[Seed] Done.");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("[Seed] Failed:", err);
  process.exit(1);
});
