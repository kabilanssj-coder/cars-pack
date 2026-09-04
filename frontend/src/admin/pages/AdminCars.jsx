import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import { fetchCars, deleteCar, updateCarStatus, togglePublish } from "../../services/carService";
import { TableSkeleton, EmptyState, ErrorState } from "../../components/States";
import StatusBadge from "../../components/StatusBadge";
import { currencyINR } from "../../config/constants";

const mainImage = (car) => car.images?.find((i) => i.isMain)?.url || car.images?.[0]?.url;

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => {
    setLoading(true);
    setError(false);
    fetchCars({ published: "all", limit: 48, sort: "newest", search: search || undefined })
      .then((res) => setCars(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [search]);

  const handleStatus = async (id, status) => {
    await updateCarStatus(id, status);
    load();
  };

  const handlePublishToggle = async (car) => {
    await togglePublish(car._id, !car.published);
    load();
  };

  const handleDelete = async (id) => {
    await deleteCar(id);
    setConfirmDelete(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="uppercase-label mb-2">Manage</p>
          <h1 className="font-display text-3xl md:text-4xl">INVENTORY</h1>
        </div>
        <Link
          to="/admin/cars/new"
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
        >
          <Plus size={16} /> Add Car
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory..."
          className="w-full bg-black2 border border-white/10 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      {loading && <TableSkeleton rows={6} cols={6} />}
      {!loading && error && <ErrorState onRetry={load} />}
      {!loading && !error && cars.length === 0 && <EmptyState title="NO CARS YET" subtitle="Add your first vehicle to get started." />}

      {!loading && !error && cars.length > 0 && (
        <div className="bg-black2 border border-white/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-[10px] tracking-widest2 uppercase text-silver border-b border-white/10">
                <th className="p-4">Image</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Price</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Status</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <img
                      src={mainImage(car) || "https://placehold.co/100x70/121215/B8B8B8"}
                      alt={car.brand}
                      className="w-16 h-11 object-cover"
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{car.brand} {car.model}</p>
                    <p className="text-xs text-silver">{car.stockId}</p>
                  </td>
                  <td className="p-4">{currencyINR(car.price)}</td>
                  <td className="p-4 text-silver">{car.branch}</td>
                  <td className="p-4">
                    <select
                      value={car.status}
                      onChange={(e) => handleStatus(car._id, e.target.value)}
                      className="bg-charcoal border border-white/10 text-xs px-2 py-1.5"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handlePublishToggle(car)}
                      className={`text-[10px] tracking-widest2 uppercase font-semibold px-3 py-1.5 border ${
                        car.published
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : "border-silver/30 text-silver"
                      }`}
                    >
                      {car.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/cars/${car._id}`} target="_blank" className="text-silver hover:text-offwhite" title="Preview">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/admin/cars/${car._id}/edit`} className="text-silver hover:text-offwhite" title="Edit">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => setConfirmDelete(car)} className="text-silver hover:text-accent" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-black2 border border-white/10 p-6 max-w-sm w-full">
            <h3 className="font-display text-xl mb-2">DELETE VEHICLE?</h3>
            <p className="text-silver text-sm mb-6">
              This will permanently delete {confirmDelete.brand} {confirmDelete.model} ({confirmDelete.stockId}) and its images. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-white/10 py-2.5 text-xs tracking-widest2 uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete._id)}
                className="flex-1 bg-accent py-2.5 text-xs tracking-widest2 uppercase font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCars;
