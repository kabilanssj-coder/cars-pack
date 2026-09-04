import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <img src="/logo.jpg" alt="Big Boys 18+" className="h-16 w-16 object-contain rounded-md mb-4" />
          <h1 className="font-display text-2xl tracking-wide">DEALER CONSOLE</h1>
          <p className="text-silver text-xs mt-1">BIG BOYS 18+ Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-black2 border border-white/10 p-8 space-y-5">
          <label className="block">
            <span className="uppercase-label block mb-2">Email</span>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-charcoal border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="uppercase-label block mb-2">Password</span>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-charcoal border border-white/10 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent"
                required
              />
            </div>
          </label>

          {error && <p className="text-accent text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
