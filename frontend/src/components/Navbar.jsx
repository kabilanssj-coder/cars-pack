import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { DEALERSHIP, buildCallLink, buildWhatsAppLink } from "../config/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/sell-your-car", label: "Sell Your Car" },
  { to: "/about", label: "About" },
  { to: "/locations", label: "Locations" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass border border-white/10 rounded-sm flex items-center justify-between px-4 md:px-6 py-2.5">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/logo.jpg" alt="Big Boys 18+" className="h-9 w-9 object-contain rounded-sm" />
              <span className="font-display text-lg tracking-wide hidden sm:block">
                BIG BOYS <span className="text-accent">18+</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative text-xs tracking-widest2 uppercase font-medium pb-1 transition-colors ${
                      isActive ? "text-offwhite" : "text-silver hover:text-offwhite"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href={buildCallLink()}
                className="flex items-center gap-2 text-xs tracking-widest2 uppercase font-semibold border border-silver/30 px-4 py-2 hover:border-offwhite transition-colors"
              >
                <Phone size={14} /> Call
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-widest2 uppercase font-semibold bg-accent px-4 py-2 hover:bg-accent/85 transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            <button
              className="lg:hidden p-2 text-offwhite"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-black2 border-l border-white/10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <img src="/logo.jpg" alt="Big Boys 18+" className="h-9 w-9 object-contain rounded-sm" />
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mb-auto">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display text-3xl ${isActive ? "text-accent" : "text-offwhite"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                <a
                  href={buildCallLink()}
                  className="flex items-center justify-center gap-2 text-xs tracking-widest2 uppercase font-semibold border border-silver/30 px-4 py-3"
                >
                  <Phone size={14} /> Call {DEALERSHIP.phone}
                </a>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs tracking-widest2 uppercase font-semibold bg-accent px-4 py-3"
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
