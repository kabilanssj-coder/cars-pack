import { motion } from "framer-motion";
import WhyChooseUs from "../components/WhyChooseUs";
import { FinalCinematic } from "../components/FinalSections";

const About = () => (
  <div>
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="uppercase-label mb-3"
      >
        About Us
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-6xl mb-8"
      >
        BIG BOYS <span className="text-accent">18+</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-silver text-lg leading-relaxed"
      >
        Based in Coimbatore with a growing presence in Erode, Big Boys 18+ is a pre-owned car
        dealership focused on transparent vehicle information, a wide selection of premium and
        everyday cars, and making the buying and selling process as simple as possible for our
        customers.
      </motion.p>
    </div>
    <WhyChooseUs />
    <FinalCinematic />
  </div>
);

export default About;
