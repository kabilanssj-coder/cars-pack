import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { label: "PREMIUM", query: "PREMIUM" },
  { label: "SUV", query: "SUV" },
  { label: "SEDAN", query: "SEDAN" },
  { label: "HATCHBACK", query: "HATCHBACK" },
  { label: "MUV", query: "MUV" },
  { label: "OTHER", query: "OTHER" },
];

const ExploreCategories = () => (
  <section className="py-24 px-4 md:px-8 bg-black2 border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <p className="uppercase-label mb-3">Unified Inventory</p>
      <h2 className="font-display text-4xl md:text-5xl mb-10">EXPLORE OUR CARS</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.query}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to={`/cars?bodyType=${cat.query}`}
              className="group relative flex items-center justify-center h-28 md:h-36 border border-white/10 hover:border-accent/50 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-accent/10 transition-colors" />
              <span className="relative font-display text-lg md:text-xl tracking-wide text-silver group-hover:text-offwhite transition-colors">
                {cat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExploreCategories;
