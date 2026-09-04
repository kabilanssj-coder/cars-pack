import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { submitEnquiry } from "../services/dataService";

const EnquiryForm = ({ carId, stockId }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone) {
      setError("Please provide your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      await submitEnquiry({ ...form, interestedCar: carId, stockId });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 border border-emerald-500/30 bg-emerald-500/5"
      >
        <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={36} />
        <h4 className="font-display text-xl mb-1">ENQUIRY SENT</h4>
        <p className="text-silver text-sm">We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="bg-black2 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="bg-black2 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email (optional)"
        className="w-full bg-black2 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message (optional)"
        rows={3}
        className="w-full bg-black2 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
      />
      {error && <p className="text-accent text-xs">{error}</p>}
      <PrimaryButton type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Send Enquiry"}
      </PrimaryButton>
    </form>
  );
};

export default EnquiryForm;
