import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { fetchBranches, updateBranch } from "../../services/dataService";
import { TableSkeleton, ErrorState } from "../../components/States";

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(null);
  const [savedId, setSavedId] = useState(null);

  const load = () => {
    setLoading(true);
    setError(false);
    fetchBranches()
      .then((res) => setBranches(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (id, field, value) => {
    setBranches((prev) => prev.map((b) => (b._id === id ? { ...b, [field]: value } : b)));
  };

  const handleSave = async (branch) => {
    setSaving(branch._id);
    try {
      await updateBranch(branch._id, branch);
      setSavedId(branch._id);
      setTimeout(() => setSavedId(null), 2000);
    } finally {
      setSaving(null);
    }
  };

  if (loading) return <TableSkeleton rows={4} cols={2} />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div>
      <p className="uppercase-label mb-2">Configuration</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8">BRANCH MANAGEMENT</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div key={branch._id} className="bg-black2 border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">{branch.key}</h3>
              {branch.key === "COIMBATORE" && (
                <span className="text-[10px] tracking-widest2 uppercase text-accent">Primary (locked)</span>
              )}
            </div>

            <Field label="Branch Name">
              <input value={branch.name || ""} onChange={(e) => handleChange(branch._id, "name", e.target.value)} className="input" />
            </Field>
            <Field label="Address">
              <textarea rows={2} value={branch.address || ""} onChange={(e) => handleChange(branch._id, "address", e.target.value)} className="input resize-none" />
            </Field>
            <Field label="Phone">
              <input value={branch.phone || ""} onChange={(e) => handleChange(branch._id, "phone", e.target.value)} className="input" />
            </Field>
            <Field label="Email">
              <input value={branch.email || ""} onChange={(e) => handleChange(branch._id, "email", e.target.value)} className="input" />
            </Field>
            <Field label="Map URL">
              <input value={branch.mapUrl || ""} onChange={(e) => handleChange(branch._id, "mapUrl", e.target.value)} className="input" />
            </Field>
            <Field label="Opening Hours">
              <input value={branch.openingHours || ""} onChange={(e) => handleChange(branch._id, "openingHours", e.target.value)} className="input" />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={branch.isActive}
                onChange={(e) => handleChange(branch._id, "isActive", e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              Active
            </label>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave(branch)}
                disabled={saving === branch._id}
                className="bg-accent text-white px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors disabled:opacity-50"
              >
                {saving === branch._id ? "Saving..." : "Save Changes"}
              </button>
              {savedId === branch._id && (
                <span className="flex items-center gap-1 text-emerald-400 text-xs">
                  <CheckCircle2 size={14} /> Saved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="uppercase-label block mb-1.5">{label}</span>
    {children}
  </label>
);

export default AdminBranches;
