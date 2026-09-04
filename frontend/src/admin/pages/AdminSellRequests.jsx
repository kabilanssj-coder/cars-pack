import { useState, useEffect } from "react";
import { fetchSellRequests, updateSellRequest } from "../../services/dataService";
import { TableSkeleton, EmptyState, ErrorState } from "../../components/States";
import { currencyINR } from "../../config/constants";

const statuses = ["NEW", "CONTACTED", "INSPECTION", "VALUATION", "NEGOTIATION", "PURCHASED", "REJECTED"];

const AdminSellRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    setError(false);
    fetchSellRequests(filter ? { status: filter } : {})
      .then((res) => setRequests(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const handleStatusChange = async (id, status) => {
    await updateSellRequest(id, { status });
    load();
  };

  return (
    <div>
      <p className="uppercase-label mb-2">Vehicle Acquisition</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8">SELL REQUESTS</h1>

      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input max-w-xs mb-6">
        <option value="">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {loading && <TableSkeleton rows={5} cols={5} />}
      {!loading && error && <ErrorState onRetry={load} />}
      {!loading && !error && requests.length === 0 && <EmptyState title="NO SELL REQUESTS YET" subtitle="Customer sell requests will appear here." />}

      {!loading && !error && requests.length > 0 && (
        <div className="bg-black2 border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-[10px] tracking-widest2 uppercase text-silver border-b border-white/10">
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Expected Price</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">{r.name}</td>
                  <td className="p-4 text-silver">{r.phone}</td>
                  <td className="p-4 text-silver">{r.brand} {r.model} ({r.year}), {r.km} km</td>
                  <td className="p-4 text-silver">{r.expectedPrice ? currencyINR(r.expectedPrice) : "-"}</td>
                  <td className="p-4 text-silver">{r.preferredBranch}</td>
                  <td className="p-4">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r._id, e.target.value)}
                      className="bg-charcoal border border-white/10 text-xs px-2 py-1.5"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSellRequests;
