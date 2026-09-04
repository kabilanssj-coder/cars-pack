import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { buildWhatsAppLink } from "../config/constants";

const Hero = () => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(229,9,20,0.14) 0%, rgba(10,10,12,0) 70%)",
        }}
      />
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-30 md:opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(184,184,184,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase-label mb-4"
          >
            Coimbatore &middot; Erode
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl leading-[0.95] mb-6"
          >
            DRIVE YOUR
            <br />
            <span className="text-accent text-glow-accent">DREAMS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-silver text-base md:text-lg max-w-md mb-10"
          >
            Premium pre-owned cars. Carefully selected for your next journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/cars"
              className="inline-flex items-center justify-center bg-accent text-white px-7 py-3.5 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
            >
              Explore Cars
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-silver/30 text-offwhite px-7 py-3.5 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ transform: `translate(${offset.x * 1.4}px, ${offset.y * 1.4}px)` }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-black2 to-charcoal border border-white/5 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 60%, rgba(229,9,20,0.18), transparent 60%)",
              }}
            />
            <img
              src="/logo.jpg"
              alt="Premium pre-owned vehicle"
              className="absolute inset-0 w-full h-full object-contain p-16 opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-silver"
      >
        <span className="text-[10px] tracking-widest2 uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
