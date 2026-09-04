import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { CarGridSkeleton } from "./States";

const FeaturedVehicles = ({ cars, loading }) => {
  if (!loading && (!cars || cars.length === 0)) return null;

  return (
    <section className="py-24 px-4 md:px-8 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="uppercase-label mb-3">Handpicked</p>
            <h2 className="font-display text-4xl md:text-5xl">FEATURED VEHICLES</h2>
          </div>
          <Link
            to="/cars"
            className="text-xs tracking-widest2 uppercase font-semibold border-b border-accent text-accent pb-1"
          >
            View All Cars
          </Link>
        </div>

        {loading ? (
          <CarGridSkeleton count={4} />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cars.slice(0, 4).map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
