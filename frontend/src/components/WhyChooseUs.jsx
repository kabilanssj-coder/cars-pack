import { motion } from "framer-motion";
import { ShieldCheck, LayoutGrid, HeartHandshake, MapPinned } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "CAREFULLY SELECTED",
    copy: "Transparent vehicle information.",
  },
  {
    icon: LayoutGrid,
    title: "WIDE SELECTION",
    copy: "Premium and everyday cars.",
  },
  {
    icon: HeartHandshake,
    title: "CUSTOMER FIRST",
    copy: "Easy assistance throughout the process.",
  },
  {
    icon: MapPinned,
    title: "TWO LOCATIONS",
    copy: "Coimbatore and Erode presence.",
  },
];

const WhyChooseUs = () => (
  <section className="py-24 px-4 md:px-8 bg-charcoal">
    <div className="max-w-7xl mx-auto">
      <p className="uppercase-label mb-3">Our Promise</p>
      <h2 className="font-display text-4xl md:text-5xl mb-14">WHY CHOOSE BIG BOYS 18+</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-charcoal p-8 hover:bg-black2 transition-colors"
          >
            <item.icon className="text-accent mb-5" size={28} strokeWidth={1.5} />
            <h3 className="font-display text-xl mb-2 tracking-wide">{item.title}</h3>
            <p className="text-silver text-sm">{item.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
