import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Save, CheckCircle2 } from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import { createCar, updateCar, fetchCarById } from "../../services/carService";
import { currencyINR } from "../../config/constants";

const emptyForm = {
  brand: "",
  model: "",
  variant: "",
  stockId: "",
  price: "",
  manufacturingYear: "",
  registrationYear: "",
  km: "",
  fuel: "PETROL",
  transmission: "MANUAL",
  engine: "",
  bodyType: "SEDAN",
  colour: "",
  ownership: "",
  insurance: "",
  serviceHistory: "",
  branch: "COIMBATORE",
  description: "",
  features: "",
  featured: false,
  images: [],
};

const sections = [
  "Basic Information",
  "Vehicle Details",
  "Branch",
  "Description",
  "Features",
  "Photos",
  "Publish",
];

const CarForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [carId, setCarId] = useState(id || null);
  const [published, setPublished] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    fetchCarById(id)
      .then((res) => {
        const car = res.data;
        setForm({
          ...car,
          features: (car.features || []).join(", "),
        });
        setPublished(car.published);
      })
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const buildPayload = () => ({
    ...form,
    price: Number(form.price),
    manufacturingYear: Number(form.manufacturingYear),
    registrationYear: form.registrationYear ? Number(form.registrationYear) : undefined,
    km: Number(form.km),
    features: form.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
  });

  const requiredFilled = () =>
    form.brand && form.model && form.stockId && form.price && form.manufacturingYear && form.km;

  const handleSaveDraft = async () => {
    setError("");
    if (!requiredFilled()) {
      setError("Please fill in Brand, Model, Stock ID, Price, Manufacturing Year and KM before saving.");
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (carId) {
        const res = await updateCar(carId, payload);
        setForm((f) => ({ ...f, ...res.data, features: (res.data.features || []).join(", ") }));
      } else {
        const res = await createCar({ ...payload, published: false });
        setCarId(res.data._id);
        setForm((f) => ({ ...f, ...res.data, features: (res.data.features || []).join(", ") }));
        navigate(`/admin/cars/${res.data._id}/edit`, { replace: true });
      }
      setSavedMsg("Draft saved.");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please check your inputs.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!carId) {
      await handleSaveDraft();
    }
    setSaving(true);
    setError("");
    try {
      const payload = { ...buildPayload(), published: true };
      const res = await updateCar(carId, payload);
      setPublished(true);
      setForm((f) => ({ ...f, ...res.data, features: (res.data.features || []).join(", ") }));
      setSavedMsg("Car published!");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish.");
    } finally {
      setSaving(false);
    }
  };

  const handleImagesChange = (images) => {
    // ImageUploader now persists uploads/deletes/reorders/set-main itself
    // (with its own rollback-on-failure), so this just keeps the rest of
    // the form's local state in sync — no redundant save here.
    setForm((f) => ({ ...f, images }));
  };

  if (loading) {
    return <p className="text-silver text-sm">Loading car...</p>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="uppercase-label mb-2">{isEdit ? "Edit Vehicle" : "New Vehicle"}</p>
          <h1 className="font-display text-3xl md:text-4xl">
            {isEdit ? `${form.brand || ""} ${form.model || ""}`.trim() || "EDIT CAR" : "ADD CAR"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {published && (
            <span className="text-[10px] tracking-widest2 uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5">
              Published
            </span>
          )}
          {carId && (
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-xs tracking-widest2 uppercase"
            >
              <Eye size={15} /> Preview
            </button>
          )}
        </div>
      </div>

      {/* Section indicators */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setActiveSection(i)}
            className={`shrink-0 px-4 py-2 text-[10px] tracking-widest2 uppercase font-semibold border-b-2 transition-colors ${
              activeSection === i ? "border-accent text-offwhite" : "border-transparent text-silver"
            }`}
          >
            {String(i + 1).padStart(2, "0")} {s}
          </button>
        ))}
      </div>

      {error && <p className="text-accent text-sm mb-4">{error}</p>}
      {savedMsg && (
        <p className="text-emerald-400 text-sm mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} /> {savedMsg}
        </p>
      )}

      <div className="bg-black2 border border-white/10 p-6 md:p-8 space-y-6">
        {activeSection === 0 && (
          <>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Brand *"><input name="brand" value={form.brand} onChange={handleChange} className="input" /></Field>
              <Field label="Model *"><input name="model" value={form.model} onChange={handleChange} className="input" /></Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Variant"><input name="variant" value={form.variant} onChange={handleChange} className="input" /></Field>
              <Field label="Stock ID *"><input name="stockId" value={form.stockId} onChange={handleChange} className="input" placeholder="e.g. BB18-019" /></Field>
            </div>
            <Field label="Price (₹) *"><input name="price" type="number" value={form.price} onChange={handleChange} className="input" /></Field>
            {form.price && <p className="text-xs text-silver">Preview: {currencyINR(Number(form.price))}</p>}
          </>
        )}

        {activeSection === 1 && (
          <>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Manufacturing Year *"><input name="manufacturingYear" type="number" value={form.manufacturingYear} onChange={handleChange} className="input" /></Field>
              <Field label="Registration Year"><input name="registrationYear" type="number" value={form.registrationYear} onChange={handleChange} className="input" /></Field>
            </div>
            <Field label="KM Driven *"><input name="km" type="number" value={form.km} onChange={handleChange} className="input" /></Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Fuel">
                <select name="fuel" value={form.fuel} onChange={handleChange} className="input">
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="CNG">CNG</option>
                  <option value="ELECTRIC">Electric</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </Field>
              <Field label="Transmission">
                <select name="transmission" value={form.transmission} onChange={handleChange} className="input">
                  <option value="MANUAL">Manual</option>
                  <option value="AUTOMATIC">Automatic</option>
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Engine"><input name="engine" value={form.engine} onChange={handleChange} className="input" placeholder="e.g. 1998 cc" /></Field>
              <Field label="Body Type">
                <select name="bodyType" value={form.bodyType} onChange={handleChange} className="input">
                  <option value="PREMIUM">Premium</option>
                  <option value="SUV">SUV</option>
                  <option value="SEDAN">Sedan</option>
                  <option value="HATCHBACK">Hatchback</option>
                  <option value="MUV">MUV</option>
                  <option value="OTHER">Other</option>
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Colour"><input name="colour" value={form.colour} onChange={handleChange} className="input" /></Field>
              <Field label="Ownership"><input name="ownership" value={form.ownership} onChange={handleChange} className="input" placeholder="e.g. 1st Owner" /></Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Insurance"><input name="insurance" value={form.insurance} onChange={handleChange} className="input" /></Field>
              <Field label="Service History"><input name="serviceHistory" value={form.serviceHistory} onChange={handleChange} className="input" /></Field>
            </div>
          </>
        )}

        {activeSection === 2 && (
          <Field label="Branch">
            <select name="branch" value={form.branch} onChange={handleChange} className="input">
              <option value="COIMBATORE">Coimbatore</option>
              <option value="ERODE">Erode</option>
            </select>
          </Field>
        )}

        {activeSection === 3 && (
          <Field label="Description">
            <textarea name="description" rows={6} value={form.description} onChange={handleChange} className="input resize-none" />
          </Field>
        )}

        {activeSection === 4 && (
          <Field label="Features (comma-separated)">
            <textarea
              name="features"
              rows={4}
              value={form.features}
              onChange={handleChange}
              className="input resize-none"
              placeholder="Sunroof, Leather Seats, Rear Camera, Cruise Control"
            />
          </Field>
        )}

        {activeSection === 5 && (
          <ImageUploader carId={carId} images={form.images} onImagesChange={handleImagesChange} />
        )}

        {activeSection === 6 && (
          <div>
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-accent" />
              <span className="text-sm">Mark as Featured Vehicle</span>
            </label>
            <p className="text-silver text-sm mb-6">
              Review all sections, then publish this car to make it visible on the public website.
              You can always unpublish or edit it later.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={handleSaveDraft}
          disabled={saving}
          className="flex items-center gap-2 border border-white/10 px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:border-white/30 transition-colors disabled:opacity-50"
        >
          <Save size={15} /> {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={handlePublish}
          disabled={saving}
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors disabled:opacity-50"
        >
          {saving ? "Publishing..." : published ? "Update & Republish" : "Publish Car"}
        </button>
        <Link
          to="/admin/cars"
          className="flex items-center gap-2 px-6 py-3 text-xs tracking-widest2 uppercase font-semibold text-silver hover:text-offwhite transition-colors ml-auto"
        >
          Back to Inventory
        </Link>
      </div>

      {showPreview && carId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal border border-white/10 w-full max-w-5xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <p className="uppercase-label">Preview — how customers will see this car</p>
              <button onClick={() => setShowPreview(false)} className="text-silver hover:text-offwhite text-sm">
                Close
              </button>
            </div>
            <iframe
              src={`/cars/${carId}`}
              title="Car preview"
              className="w-full h-[75vh] bg-charcoal"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="uppercase-label block mb-2">{label}</span>
    {children}
  </label>
);

export default CarForm;
