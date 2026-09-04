import { useState, useEffect } from "react";
import { Phone, MessageCircle, Navigation, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { buildCallLink, buildWhatsAppLink } from "../config/constants";
import { fetchBranches } from "../services/dataService";
import { TableSkeleton } from "../components/States";

const Locations = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches()
      .then((res) => setBranches(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <p className="uppercase-label mb-3 text-center">Find Us</p>
      <h1 className="font-display text-4xl md:text-6xl mb-14 text-center">OUR LOCATIONS</h1>

      {loading ? (
        <TableSkeleton rows={2} cols={1} />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((branch, i) => (
            <motion.div
              key={branch._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black2 border border-white/10 p-8"
            >
              {branch.isPrimary && (
                <span className="inline-block mb-4 text-[10px] tracking-widest2 uppercase bg-accent/15 text-accent border border-accent/30 px-3 py-1">
                  Primary Location
                </span>
              )}
              <h2 className="font-display text-3xl mb-4">{branch.name}</h2>

              <div className="flex gap-3 text-silver text-sm mb-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <p>{branch.address}</p>
              </div>

              {branch.openingHours && (
                <div className="flex gap-3 text-silver text-sm mb-6">
                  <Clock size={18} className="shrink-0 mt-0.5" />
                  <p>{branch.openingHours}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href={buildCallLink()}
                  className="inline-flex items-center gap-2 border border-silver/30 px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
                >
                  <Phone size={14} /> Call
                </a>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                {branch.mapUrl && (
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-silver/30 px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
                  >
                    <Navigation size={14} /> Directions
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
