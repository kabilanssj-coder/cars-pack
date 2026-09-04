import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";
import { submitSellRequest } from "../services/dataService";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  brand: "",
  model: "",
  year: "",
  km: "",
  fuel: "PETROL",
  transmission: "MANUAL",
  expectedPrice: "",
  preferredBranch: "COIMBATORE",
  message: "",
};

const SellYourCar = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const required = ["name", "phone", "brand", "model", "year", "km"];
    if (required.some((f) => !form[f])) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await submitSellRequest({
        ...form,
        year: Number(form.year),
        km: Number(form.km),
        expectedPrice: form.expectedPrice ? Number(form.expectedPrice) : undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <p className="uppercase-label mb-3 text-center">Get A Fair Offer</p>
      <h1 className="font-display text-4xl md:text-6xl mb-6 text-center">
        SELL YOUR CAR WITH <span className="text-accent">BIG BOYS 18+</span>
      </h1>
      <p className="text-silver text-center max-w-xl mx-auto mb-14">
        Tell us about your car and our team will get in touch with a transparent evaluation.
      </p>

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 border border-emerald-500/30 bg-emerald-500/5"
        >
          <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={44} />
          <h3 className="font-display text-2xl mb-2">REQUEST RECEIVED</h3>
          <p className="text-silver text-sm">
            Thank you — our team will reach out to you shortly to discuss your vehicle.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-black2 border border-white/10 p-6 md:p-10 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name *">
              <input name="name" value={form.name} onChange={handleChange} className="input" />
            </Field>
            <Field label="Phone *">
              <input name="phone" value={form.phone} onChange={handleChange} className="input" />
            </Field>
          </div>
          <Field label="Email">
            <input name="email" value={form.email} onChange={handleChange} className="input" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Brand *">
              <input name="brand" value={form.brand} onChange={handleChange} className="input" />
            </Field>
            <Field label="Model *">
              <input name="model" value={form.model} onChange={handleChange} className="input" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Year *">
              <input name="year" type="number" value={form.year} onChange={handleChange} className="input" />
            </Field>
            <Field label="KM Driven *">
              <input name="km" type="number" value={form.km} onChange={handleChange} className="input" />
            </Field>
          </div>

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
            <Field label="Expected Price (₹)">
              <input name="expectedPrice" type="number" value={form.expectedPrice} onChange={handleChange} className="input" />
            </Field>
            <Field label="Preferred Branch">
              <select name="preferredBranch" value={form.preferredBranch} onChange={handleChange} className="input">
                <option value="COIMBATORE">Coimbatore</option>
                <option value="ERODE">Erode</option>
              </select>
            </Field>
          </div>

          <Field label="Message">
            <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="input resize-none" />
          </Field>

          {error && <p className="text-accent text-sm">{error}</p>}

          <PrimaryButton type="submit" disabled={submitting} className="w-full">
            {submitting ? "Submitting..." : "Submit Request"}
          </PrimaryButton>
        </form>
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

export default SellYourCar;
