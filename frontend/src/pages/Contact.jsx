import { Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import { DEALERSHIP, COIMBATORE_BRANCH, buildCallLink, buildWhatsAppLink } from "../config/constants";
import EnquiryForm from "../components/EnquiryForm";

const Contact = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
    <p className="uppercase-label mb-3 text-center">Get In Touch</p>
    <h1 className="font-display text-4xl md:text-6xl mb-14 text-center">CONTACT US</h1>

    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <a
          href={buildCallLink()}
          className="flex items-center gap-4 bg-black2 border border-white/10 p-5 hover:border-accent/40 transition-colors"
        >
          <Phone className="text-accent shrink-0" size={22} />
          <div>
            <p className="uppercase-label mb-0.5">Call Us</p>
            <p className="text-sm">+91 {DEALERSHIP.phone}</p>
          </div>
        </a>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-black2 border border-white/10 p-5 hover:border-accent/40 transition-colors"
        >
          <MessageCircle className="text-accent shrink-0" size={22} />
          <div>
            <p className="uppercase-label mb-0.5">WhatsApp</p>
            <p className="text-sm">+91 {DEALERSHIP.whatsapp}</p>
          </div>
        </a>

        <a
          href={`mailto:${DEALERSHIP.email}`}
          className="flex items-center gap-4 bg-black2 border border-white/10 p-5 hover:border-accent/40 transition-colors"
        >
          <Mail className="text-accent shrink-0" size={22} />
          <div>
            <p className="uppercase-label mb-0.5">Email</p>
            <p className="text-sm">{DEALERSHIP.email}</p>
          </div>
        </a>

        <a
          href={DEALERSHIP.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-black2 border border-white/10 p-5 hover:border-accent/40 transition-colors"
        >
          <Instagram className="text-accent shrink-0" size={22} />
          <div>
            <p className="uppercase-label mb-0.5">Instagram</p>
            <p className="text-sm">@bigboys_erode_coimbatore</p>
          </div>
        </a>

        <div className="bg-black2 border border-white/10 p-5">
          <p className="uppercase-label mb-2">Coimbatore Showroom</p>
          <p className="text-sm text-silver">{COIMBATORE_BRANCH.address}</p>
        </div>
      </div>

      <div className="bg-black2 border border-white/10 p-6">
        <p className="uppercase-label mb-4">Send Us A Message</p>
        <EnquiryForm />
      </div>
    </div>
  </div>
);

export default Contact;
