import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, CheckCircle2, Clock, XCircle, MessageSquare, Tag, Plus } from "lucide-react";
import { fetchStats } from "../../services/dataService";
import { TableSkeleton, ErrorState } from "../../components/States";
import { currencyINR } from "../../config/constants";

const metricConfig = [
  { key: "totalCars", label: "Total Cars", icon: Car, color: "text-offwhite" },
  { key: "available", label: "Available", icon: CheckCircle2, color: "text-emerald-400" },
  { key: "reserved", label: "Reserved", icon: Clock, color: "text-amber-400" },
  { key: "sold", label: "Sold", icon: XCircle, color: "text-red-400" },
  { key: "enquiries", label: "Enquiries", icon: MessageSquare, color: "text-offwhite" },
  { key: "sellRequests", label: "Sell Requests", icon: Tag, color: "text-offwhite" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    fetchStats()
      .then((res) => setStats(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="uppercase-label mb-2">Overview</p>
          <h1 className="font-display text-3xl md:text-4xl">DASHBOARD</h1>
        </div>
        <Link
          to="/admin/cars/new"
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
        >
          <Plus size={16} /> Add New Car
        </Link>
      </div>

      {loading && <TableSkeleton rows={3} cols={3} />}
      {!loading && error && <ErrorState onRetry={load} />}

      {!loading && !error && stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
            {metricConfig.map((m) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black2 border border-white/10 p-5"
              >
                <m.icon className={`${m.color} mb-3`} size={20} />
                <p className="text-2xl font-semibold mb-1">{stats[m.key]}</p>
                <p className="text-[10px] tracking-widest2 uppercase text-silver">{m.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-black2 border border-white/10 p-6">
              <p className="uppercase-label mb-4">Recent Cars</p>
              {stats.recentCars.length === 0 ? (
                <p className="text-silver text-sm">No cars added yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.recentCars.map((car) => (
                    <Link
                      key={car._id}
                      to={`/admin/cars/${car._id}/edit`}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:text-accent transition-colors"
                    >
                      <span className="text-sm">{car.brand} {car.model}</span>
                      <span className="text-xs text-silver">{currencyINR(car.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-black2 border border-white/10 p-6">
              <p className="uppercase-label mb-4">Recent Enquiries</p>
              {stats.recentEnquiries.length === 0 ? (
                <p className="text-silver text-sm">No enquiries yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.recentEnquiries.map((enq) => (
                    <div key={enq._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm">{enq.name}</span>
                      <span className="text-xs text-silver">{enq.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
