import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const FinalCinematic = () => (
  <section className="relative py-32 px-4 md:px-8 bg-black overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.4 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse at center, rgba(229,9,20,0.2) 0%, transparent 65%)",
      }}
    />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl md:text-7xl mb-8 text-glow-accent"
      >
        DRIVE YOUR <span className="text-accent">DREAMS.</span>
      </motion.h2>
      <Link
        to="/cars"
        className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
      >
        Explore Our Cars
      </Link>
    </div>
  </section>
);

export const ContactCTA = () => (
  <section className="py-20 px-4 md:px-8 bg-charcoal border-t border-white/5">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
      <div>
        <h3 className="font-display text-2xl md:text-3xl mb-2">HAVE QUESTIONS?</h3>
        <p className="text-silver text-sm">We're here to help you find the right car.</p>
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center border border-silver/30 text-offwhite px-7 py-3.5 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors shrink-0"
      >
        Contact Us
      </Link>
    </div>
  </section>
);
