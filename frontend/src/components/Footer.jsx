import { Link } from "react-router-dom";
import { Instagram, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { DEALERSHIP, COIMBATORE_BRANCH, buildCallLink, buildWhatsAppLink } from "../config/constants";

const Footer = () => (
  <footer className="bg-black2 border-t border-white/5 pt-16 pb-8 px-4 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.jpg" alt="Big Boys 18+" className="h-10 w-10 object-contain rounded-sm" />
          <span className="font-display text-xl">
            BIG BOYS <span className="text-accent">18+</span>
          </span>
        </div>
        <p className="text-silver text-sm leading-relaxed">
          Premium pre-owned cars, carefully selected for your next journey.
        </p>
        <a
          href={DEALERSHIP.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-silver hover:text-accent transition-colors"
        >
          <Instagram size={18} />
          <span className="text-sm">Follow us</span>
        </a>
      </div>

      <div>
        <p className="uppercase-label mb-4">Explore</p>
        <ul className="flex flex-col gap-3 text-sm text-silver">
          <li><Link to="/cars" className="hover:text-offwhite transition-colors">All Cars</Link></li>
          <li><Link to="/sell-your-car" className="hover:text-offwhite transition-colors">Sell Your Car</Link></li>
          <li><Link to="/about" className="hover:text-offwhite transition-colors">About Us</Link></li>
          <li><Link to="/locations" className="hover:text-offwhite transition-colors">Locations</Link></li>
        </ul>
      </div>

      <div>
        <p className="uppercase-label mb-4">Coimbatore Showroom</p>
        <div className="flex gap-2 text-sm text-silver">
          <MapPin size={16} className="shrink-0 mt-0.5" />
          <p>{COIMBATORE_BRANCH.address}</p>
        </div>
      </div>

      <div>
        <p className="uppercase-label mb-4">Get In Touch</p>
        <ul className="flex flex-col gap-3 text-sm text-silver">
          <li>
            <a href={buildCallLink()} className="flex items-center gap-2 hover:text-offwhite transition-colors">
              <Phone size={15} /> +91 {DEALERSHIP.phone}
            </a>
          </li>
          <li>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-offwhite transition-colors"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${DEALERSHIP.email}`} className="flex items-center gap-2 hover:text-offwhite transition-colors">
              <Mail size={15} /> {DEALERSHIP.email}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-silver/60">
        © {new Date().getFullYear()} Big Boys 18+. All rights reserved.
      </p>
      <Link to="/admin/login" className="text-xs text-silver/40 hover:text-silver transition-colors">
        Dealer Login
      </Link>
    </div>
  </footer>
);

export default Footer;
