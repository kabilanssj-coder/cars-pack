import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Navigation, Instagram } from "lucide-react";
import { DEALERSHIP, COIMBATORE_BRANCH, buildCallLink, buildWhatsAppLink } from "../config/constants";

export const SellYourCarTeaser = () => (
  <section className="py-24 px-4 md:px-8 bg-black2 border-y border-white/5">
    <div className="max-w-5xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase-label mb-3"
      >
        Have A Car To Sell?
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-6xl mb-6"
      >
        SELL YOUR CAR WITH <span className="text-accent">BIG BOYS 18+</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-silver max-w-xl mx-auto mb-8"
      >
        Get a fair, transparent evaluation and easy assistance from start to finish.
      </motion.p>
      <Link
        to="/sell-your-car"
        className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
      >
        Get Started
      </Link>
    </div>
  </section>
);

export const CoimbatoreShowroom = () => (
  <section className="py-24 px-4 md:px-8 bg-charcoal">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <p className="uppercase-label mb-3">Primary Location</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          VISIT OUR <span className="text-accent">COIMBATORE</span> SHOWROOM
        </h2>
        <p className="text-silver mb-8 leading-relaxed">{COIMBATORE_BRANCH.address}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={buildCallLink()}
            className="inline-flex items-center gap-2 border border-silver/30 px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
          >
            <Phone size={14} /> Call
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a
            href={COIMBATORE_BRANCH.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-silver/30 px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
          >
            <Navigation size={14} /> Get Directions
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="aspect-video bg-black2 border border-white/5 flex items-center justify-center"
      >
        <a
          href={COIMBATORE_BRANCH.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 text-silver hover:text-offwhite transition-colors"
        >
          <Navigation size={32} />
          <span className="text-xs tracking-widest2 uppercase">Open in Google Maps</span>
        </a>
      </motion.div>
    </div>
  </section>
);

export const ErodeBranchSection = ({ branch }) => (
  <section className="py-24 px-4 md:px-8 bg-black2 border-y border-white/5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="order-2 md:order-1 aspect-video bg-charcoal border border-white/5 flex items-center justify-center"
      >
        <span className="text-silver/50 text-xs tracking-widest2 uppercase">Erode Branch</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="order-1 md:order-2"
      >
        <p className="uppercase-label mb-3">Secondary Location</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">ERODE BRANCH</h2>
        <p className="text-silver mb-8 leading-relaxed">
          {branch?.address || "Branch details will be updated soon."}
        </p>
        <a
          href={buildCallLink()}
          className="inline-flex items-center gap-2 border border-silver/30 px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors"
        >
          <Phone size={14} /> Contact This Branch
        </a>
      </motion.div>
    </div>
  </section>
);

export const InstagramSection = () => (
  <section className="py-24 px-4 md:px-8 bg-charcoal">
    <div className="max-w-3xl mx-auto text-center">
      <p className="uppercase-label mb-3">Stay Connected</p>
      <h2 className="font-display text-4xl md:text-5xl mb-8">FOLLOW THE JOURNEY</h2>
      <motion.a
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        href={DEALERSHIP.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 border border-white/10 px-8 py-5 hover:border-accent/50 transition-colors"
      >
        <Instagram className="text-accent" size={24} />
        <span className="font-display text-xl tracking-wide">@bigboys_erode_coimbatore</span>
      </motion.a>
    </div>
  </section>
);
