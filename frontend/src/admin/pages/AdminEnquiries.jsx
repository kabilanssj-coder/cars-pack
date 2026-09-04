import { useState, useEffect } from "react";
import { fetchEnquiries, updateEnquiry } from "../../services/dataService";
import { TableSkeleton, EmptyState, ErrorState } from "../../components/States";

const statuses = ["NEW", "CONTACTED", "FOLLOW_UP", "INTERESTED", "CLOSED", "NOT_INTERESTED"];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    setError(false);
    fetchEnquiries(filter ? { status: filter } : {})
      .then((res) => setEnquiries(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const handleStatusChange = async (id, status) => {
    await updateEnquiry(id, { status });
    load();
  };

  return (
    <div>
      <p className="uppercase-label mb-2">Customer Interest</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8">ENQUIRIES</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input max-w-xs mb-6"
      >
        <option value="">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s.replace("_", " ")}</option>
        ))}
      </select>

      {loading && <TableSkeleton rows={5} cols={5} />}
      {!loading && error && <ErrorState onRetry={load} />}
      {!loading && !error && enquiries.length === 0 && <EmptyState title="NO ENQUIRIES YET" subtitle="Customer enquiries will appear here." />}

      {!loading && !error && enquiries.length > 0 && (
        <div className="bg-black2 border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-[10px] tracking-widest2 uppercase text-silver border-b border-white/10">
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Car</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq._id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">{enq.name}</td>
                  <td className="p-4 text-silver">{enq.phone}</td>
                  <td className="p-4 text-silver">
                    {enq.interestedCar ? `${enq.interestedCar.brand} ${enq.interestedCar.model}` : enq.stockId || "-"}
                  </td>
                  <td className="p-4 text-silver max-w-xs truncate">{enq.message || "-"}</td>
                  <td className="p-4 text-silver">{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                      className="bg-charcoal border border-white/10 text-xs px-2 py-1.5"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s.replace("_", " ")}</option>
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

export default AdminEnquiries;
