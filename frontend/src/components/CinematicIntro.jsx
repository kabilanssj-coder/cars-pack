import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const INTRO_SEEN_KEY = "bb18_intro_seen";

const CinematicIntro = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (alreadySeen || prefersReducedMotion) {
      setVisible(false);
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      finish();
    }, 3600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    setVisible(false);
    setTimeout(onFinish, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* ambient red glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(229,9,20,0.25) 0%, rgba(10,10,12,0) 65%)",
            }}
          />

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 mb-6"
          >
            <div className="relative">
              <img src="/logo.jpg" alt="Big Boys 18+" className="h-28 w-28 md:h-36 md:w-36 object-contain rounded-md" />
              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 0.9, delay: 1.0, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/3 skew-x-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(229,9,20,0.55), transparent)",
                }}
              />
            </div>
          </motion.div>

          {/* silhouette bar suggesting vehicle presence */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
            className="w-40 md:w-64 h-px bg-gradient-to-r from-transparent via-silver/60 to-transparent mb-8"
          />

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 2.2 }}
            className="font-display text-4xl md:text-6xl tracking-wide text-center px-6"
          >
            DRIVE YOUR <span className="text-accent">DREAMS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.7 }}
            className="text-silver text-sm md:text-base mt-3 tracking-wide text-center px-6"
          >
            Premium pre-owned cars, carefully selected.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ opacity: 1 }}
            onClick={finish}
            className="absolute bottom-8 right-8 text-[11px] tracking-widest2 uppercase text-silver border border-silver/30 px-4 py-2 hover:border-offwhite transition-colors"
          ></motion.button>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
