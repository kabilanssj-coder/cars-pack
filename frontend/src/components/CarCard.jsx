import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gauge, Fuel, Cog, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { WhatsAppButton, CallButton } from "./Buttons";
import { currencyINR, formatKm } from "../config/constants";

const mainImage = (car) => {
  const main = car.images?.find((i) => i.isMain) || car.images?.[0];
  return main?.url || "https://placehold.co/800x600/121215/B8B8B8?text=BIG+BOYS+18%2B";
};

const CarCard = ({ car }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group relative bg-black2 border border-white/5 overflow-hidden hover:border-accent/40 transition-colors duration-300"
    >
      <Link to={`/cars/${car._id}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={mainImage(car)}
            alt={`${car.brand} ${car.model}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={car.status} />
          </div>
          {car.featured && (
            <div className="absolute top-3 right-3 bg-accent/90 text-white text-[10px] tracking-widest2 uppercase font-semibold px-3 py-1">
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </div>

        <div className="p-5">
          <p className="uppercase-label mb-1">{car.branch}</p>
          <h3 className="font-display text-2xl leading-none mb-1">
            {car.brand} {car.model}
          </h3>
          <p className="text-silver text-sm mb-3">{car.variant}</p>

          <p className="text-xl font-semibold text-offwhite mb-4">{currencyINR(car.price)}</p>

          <div className="grid grid-cols-4 gap-2 text-[11px] text-silver border-t border-white/5 pt-3 mb-4">
            <div className="flex flex-col items-center gap-1">
              <Calendar size={14} />
              {car.manufacturingYear}
            </div>
            <div className="flex flex-col items-center gap-1">
              <Gauge size={14} />
              {formatKm(car.km).replace(" km", "")}
            </div>
            <div className="flex flex-col items-center gap-1">
              <Fuel size={14} />
              {car.fuel}
            </div>
            <div className="flex flex-col items-center gap-1">
              <Cog size={14} />
              {car.transmission?.slice(0, 4)}
            </div>
          </div>

          <p className="text-[10px] tracking-widest2 uppercase text-silver/70">
            Stock ID: {car.stockId}
          </p>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-px bg-white/5">
        <Link
          to={`/cars/${car._id}`}
          className="bg-black2 text-center py-3 text-[11px] tracking-widest2 uppercase font-semibold hover:bg-white/5 transition-colors"
        >
          View Details
        </Link>
        <WhatsAppButton
          brand={car.brand}
          model={car.model}
          stockId={car.stockId}
          className="!bg-black2 hover:!bg-accent/10 text-accent !py-3 !px-0 w-full"
          label="WhatsApp"
        />
      </div>
    </motion.div>
  );
};

export default CarCard;
