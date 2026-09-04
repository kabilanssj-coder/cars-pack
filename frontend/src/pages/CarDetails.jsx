import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CarGallery from "../components/CarGallery";
import StatusBadge from "../components/StatusBadge";
import EnquiryForm from "../components/EnquiryForm";
import { CallButton, WhatsAppButton } from "../components/Buttons";
import { ErrorState } from "../components/States";
import { fetchCarById } from "../services/carService";
import { currencyINR, formatKm } from "../config/constants";

const specRows = (car) => [
  ["Manufacturing Year", car.manufacturingYear],
  ["Registration Year", car.registrationYear || "-"],
  ["KM Driven", formatKm(car.km)],
  ["Fuel", car.fuel],
  ["Transmission", car.transmission],
  ["Engine", car.engine || "-"],
  ["Body Type", car.bodyType],
  ["Colour", car.colour || "-"],
  ["Ownership", car.ownership || "-"],
  ["Insurance", car.insurance || "-"],
  ["Service History", car.serviceHistory || "-"],
];

const DetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 animate-pulse">
    <div className="h-4 w-40 bg-white/5 mb-8" />
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 aspect-[4/3] bg-white/5" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-white/5" />
        <div className="h-6 w-1/2 bg-white/5" />
        <div className="h-24 w-full bg-white/5" />
      </div>
    </div>
  </div>
);

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    fetchCarById(id)
      .then((res) => setCar(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (car) {
      document.title = `${car.brand} ${car.model} | Big Boys 18+`;
    }
  }, [car]);

  if (loading) return <DetailSkeleton />;
  if (error || !car) return <ErrorState title="CAR NOT FOUND" subtitle="This listing may have been removed." onRetry={load} />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 pb-32 lg:pb-16">
      <div className="flex items-center gap-2 text-xs text-silver mb-8 flex-wrap">
        <Link to="/" className="hover:text-offwhite transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/cars" className="hover:text-offwhite transition-colors">Cars</Link>
        <ChevronRight size={12} />
        <span className="text-offwhite">{car.brand} {car.model}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-16">
        <div className="lg:col-span-2">
          <CarGallery images={car.images} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={car.status} />
            <span className="text-[10px] tracking-widest2 uppercase text-silver">
              {car.branch}
            </span>
          </div>

          <h1 className="font-display text-4xl mb-1">{car.brand} {car.model}</h1>
          <p className="text-silver mb-4">{car.variant}</p>

          <p className="text-3xl font-semibold mb-6">{currencyINR(car.price)}</p>

          <p className="text-[10px] tracking-widest2 uppercase text-silver/70 mb-8">
            Stock ID: {car.stockId}
          </p>

          {/* Desktop sticky contact panel */}
          <div className="hidden lg:block bg-black2 border border-white/10 p-6 sticky top-28">
            <p className="uppercase-label mb-4">Interested In This Car?</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <CallButton className="w-full" />
              <WhatsAppButton brand={car.brand} model={car.model} stockId={car.stockId} className="w-full" />
            </div>
            <EnquiryForm carId={car._id} stockId={car.stockId} />
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-14">
          <section>
            <p className="uppercase-label mb-3">Overview</p>
            <h2 className="font-display text-3xl mb-6">VEHICLE OVERVIEW</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5">
              {specRows(car).map(([label, value]) => (
                <div key={label} className="bg-charcoal p-4">
                  <p className="text-[10px] tracking-widest2 uppercase text-silver/70 mb-1">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {car.features?.length > 0 && (
            <section>
              <h2 className="font-display text-3xl mb-6">KEY FEATURES</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-silver">
                    <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </section>
          )}

          {car.description && (
            <section>
              <h2 className="font-display text-3xl mb-6">ABOUT THIS CAR</h2>
              <p className="text-silver leading-relaxed whitespace-pre-line">{car.description}</p>
            </section>
          )}

          {/* Mobile enquiry form */}
          <section className="lg:hidden">
            <h2 className="font-display text-3xl mb-6">ENQUIRE ABOUT THIS CAR</h2>
            <EnquiryForm carId={car._id} stockId={car.stockId} />
          </section>
        </div>
      </div>

      {/* Mobile sticky contact bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-black2 border-t border-white/10 p-3 grid grid-cols-2 gap-3">
        <CallButton className="w-full" />
        <WhatsAppButton brand={car.brand} model={car.model} stockId={car.stockId} className="w-full" />
      </div>
    </div>
  );
};

export default CarDetails;
