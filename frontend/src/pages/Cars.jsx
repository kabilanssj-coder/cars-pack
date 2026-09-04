import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CarCard from "../components/CarCard";
import { CarGridSkeleton, EmptyState, ErrorState } from "../components/States";
import { fetchCars } from "../services/carService";

const bodyTypes = ["ALL", "PREMIUM", "SUV", "SEDAN", "HATCHBACK", "MUV", "OTHER"];
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "km_low", label: "KM: Low to High" },
];

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const bodyType = searchParams.get("bodyType") || "ALL";
  const branch = searchParams.get("branch") || "";
  const fuel = searchParams.get("fuel") || "";
  const transmission = searchParams.get("transmission") || "";
  const sort = searchParams.get("sort") || "recommended";
  const page = Number(searchParams.get("page") || 1);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "ALL") next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const loadCars = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchCars({
      search: searchParams.get("search") || undefined,
      bodyType: bodyType !== "ALL" ? bodyType : undefined,
      branch: branch || undefined,
      fuel: fuel || undefined,
      transmission: transmission || undefined,
      sort,
      page,
      limit: 12,
    })
      .then((res) => {
        setCars(res.data);
        setPagination(res.pagination);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchParams, bodyType, branch, fuel, transmission, sort, page]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const submitSearch = (e) => {
    e.preventDefault();
    updateParam("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  const activeFilterCount = [bodyType !== "ALL", branch, fuel, transmission].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-10">
        <p className="uppercase-label mb-3">Unified Inventory</p>
        <h1 className="font-display text-4xl md:text-6xl mb-4">EXPLORE OUR CARS</h1>
        <p className="text-silver max-w-lg">
          Every vehicle we sell, in one place — search, filter and find the right car for you.
        </p>
      </div>

      <form onSubmit={submitSearch} className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand, model, variant or stock ID..."
            className="w-full bg-black2 border border-white/10 pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="lg:hidden relative flex items-center gap-2 border border-white/10 px-4 py-3.5 text-xs tracking-widest2 uppercase"
        >
          <SlidersHorizontal size={16} />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </form>

      <div className={`${filtersOpen ? "block" : "hidden"} lg:block mb-8`}>
        <div className="flex flex-wrap gap-2 mb-4">
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => updateParam("bodyType", type)}
              className={`px-4 py-2 text-[11px] tracking-widest2 uppercase font-semibold border transition-colors ${
                bodyType === type
                  ? "bg-accent border-accent text-white"
                  : "border-white/10 text-silver hover:border-white/30"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={branch}
            onChange={(e) => updateParam("branch", e.target.value)}
            className="bg-black2 border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wide focus:outline-none focus:border-accent"
          >
            <option value="">All Branches</option>
            <option value="COIMBATORE">Coimbatore</option>
            <option value="ERODE">Erode</option>
          </select>

          <select
            value={fuel}
            onChange={(e) => updateParam("fuel", e.target.value)}
            className="bg-black2 border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wide focus:outline-none focus:border-accent"
          >
            <option value="">All Fuel Types</option>
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="ELECTRIC">Electric</option>
            <option value="HYBRID">Hybrid</option>
          </select>

          <select
            value={transmission}
            onChange={(e) => updateParam("transmission", e.target.value)}
            className="bg-black2 border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wide focus:outline-none focus:border-accent"
          >
            <option value="">All Transmissions</option>
            <option value="MANUAL">Manual</option>
            <option value="AUTOMATIC">Automatic</option>
          </select>

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-black2 border border-white/10 px-4 py-2.5 text-xs uppercase tracking-wide focus:outline-none focus:border-accent ml-auto"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {(activeFilterCount > 0 || search) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-silver hover:text-offwhite transition-colors"
            >
              <X size={14} /> Clear all
            </button>
          )}
        </div>
      </div>

      {loading && <CarGridSkeleton count={8} />}

      {!loading && error && <ErrorState onRetry={loadCars} />}

      {!loading && !error && cars.length === 0 && <EmptyState onAction={clearFilters} />}

      {!loading && !error && cars.length > 0 && (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </motion.div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: pagination.totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.set("page", p);
                      setSearchParams(next);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 text-sm font-semibold transition-colors ${
                      p === pagination.page
                        ? "bg-accent text-white"
                        : "border border-white/10 text-silver hover:border-white/30"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cars;
