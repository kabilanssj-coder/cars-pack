import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const categories = ["ALL", "EXTERIOR", "INTERIOR", "DASHBOARD", "ENGINE", "DETAILS"];

const CarGallery = ({ images = [] }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const filtered =
    activeCategory === "ALL" ? images : images.filter((img) => img.category === activeCategory);
  const current = filtered[index] || filtered[0];

  useEffect(() => {
    setIndex(0);
  }, [activeCategory]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, next, prev]);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] bg-black2 border border-white/5 flex items-center justify-center">
        <span className="text-silver text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories
          .filter((c) => c === "ALL" || images.some((img) => img.category === c))
          .map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 text-[10px] tracking-widest2 uppercase font-semibold border transition-colors ${
                activeCategory === c
                  ? "bg-accent border-accent text-white"
                  : "border-white/10 text-silver hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
      </div>

      <div className="relative aspect-[4/3] md:aspect-[16/10] bg-black2 border border-white/5 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={current?.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={current?.url}
            alt="Vehicle"
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setFullscreen(true)}
          />
        </AnimatePresence>

        {filtered.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <button
          onClick={() => setFullscreen(true)}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 p-2"
          aria-label="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>

        <div className="absolute bottom-3 right-3 bg-black/60 text-xs px-3 py-1 tracking-wide">
          {String(index + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
        </div>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {filtered.map((img, i) => (
          <button
            key={img.url + i}
            onClick={() => setIndex(i)}
            className={`shrink-0 w-20 h-16 border-2 overflow-hidden transition-colors ${
              i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-6 right-6 text-offwhite p-2"
              aria-label="Close fullscreen"
            >
              <X size={28} />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-offwhite"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-offwhite"
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <img
              src={current?.url}
              alt="Vehicle fullscreen"
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-6 text-xs text-silver tracking-wide">
              {String(index + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarGallery;
