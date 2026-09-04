import { Phone, MessageCircle } from "lucide-react";
import { buildCallLink, buildWhatsAppLink } from "../config/constants";

export const CallButton = ({ className = "", label = "CALL", ...car }) => (
  <a
    href={buildCallLink()}
    className={`inline-flex items-center justify-center gap-2 border border-silver/30 text-offwhite px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors duration-200 ${className}`}
  >
    <Phone size={14} />
    {label}
  </a>
);

export const WhatsAppButton = ({ className = "", label = "WHATSAPP", ...car }) => (
  <a
    href={buildWhatsAppLink(car)}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-2.5 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors duration-200 ${className}`}
  >
    <MessageCircle size={14} />
    {label}
  </a>
);

export const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:bg-accent/85 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const GhostButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 border border-silver/30 text-offwhite px-6 py-3 text-xs tracking-widest2 uppercase font-semibold hover:border-offwhite transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
