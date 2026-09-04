# BIG BOYS 18+ — Dealership Platform

A full-stack pre-owned car dealership platform for **Big Boys 18+** (Coimbatore, primary;
Erode, secondary). Public customer website + private dealer management console, backed by
a real Express/MongoDB API.

```
bigboys18/
  backend/     Node.js + Express + MongoDB (Mongoose) API
  frontend/    React + Vite + Tailwind + Framer Motion
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database (local `mongod`, or a free MongoDB Atlas cluster)
- A Cloudinary account (free tier is fine) — required for the admin photo uploader
- (Optional) An SMTP account for email notifications — enquiries/sell-requests still work
  without this, emails are just skipped with a console log

## 2. Backend setup

```bash
cd backend
cp .env.example .env
# edit .env: set MONGODB_URI, JWT_SECRET, CLOUDINARY_*, ADMIN_EMAIL, ADMIN_PASSWORD, etc.
npm install
npm run seed   # creates the admin user, branches, and 18 demo vehicles
npm run dev    # starts the API on http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

Demo admin login (from `.env` `ADMIN_EMAIL` / `ADMIN_PASSWORD`, defaults shown in
`.env.example`): change `ADMIN_PASSWORD` before deploying anywhere public.

## 3. Frontend setup

```bash
cd frontend
cp .env.example .env
# VITE_API_URL should point at your backend, e.g. http://localhost:5000/api
npm install
npm run dev    # starts the site on http://localhost:5173
```

Public site: `http://localhost:5173`
Admin console: `http://localhost:5173/admin/login`

## 4. Demo data

`npm run seed` (in `backend/`) inserts 18 realistic demo vehicles across major brands sold in
India, all clearly using **placeholder images** (`placehold.co`) — replace these with real
photos through the admin **Add Car → Photos** uploader, which stores images in Cloudinary.
Re-running the seed script wipes and recreates cars/branches, but is idempotent for the admin
user (it upserts rather than duplicates).

## 5. Core flows to test

- **Admin → Public:** Log in → Add Car → fill sections → Save Draft → upload photos → Publish
  → confirm the car appears on `/cars` and its detail page.
- **Edit → Public:** Change a price or mark a car SOLD from `/admin/cars` → confirm the public
  listing updates immediately (no caching).
- **Customer enquiry:** Open a car → Send Enquiry → confirm it appears under
  `/admin/enquiries` and (if SMTP is configured) an email arrives.
- **Sell your car:** Submit `/sell-your-car` → confirm it appears under
  `/admin/sell-requests`.
- **WhatsApp/Call:** Buttons should deep-link to `wa.me/91<number>` with a prefilled message
  containing the brand, model and stock ID, and to `tel:+91<number>`.

## 6. Security notes

- Passwords are hashed with bcrypt; JWT is required for all admin-only API routes.
- Cloudinary, MongoDB, JWT and email credentials live only in `backend/.env` — never sent to
  the frontend and never committed (`.env` is gitignored; only `.env.example` is checked in).
- Admin-only REST endpoints are protected by `protect` + `requireAdmin` middleware.

## 7. Notes on this build

- The Erode branch address was intentionally left as "to be configured" — the business owner
  can fill it in from **Admin → Branches** rather than it being invented here.
- If `CLOUDINARY_*` env vars are left blank, image uploads will fail with a clear error;
  everything else (browsing, filters, enquiries, sell requests) still works against the seeded
  placeholder images.
