export const DEALERSHIP = {
  name: "BIG BOYS 18+",
  tagline: "Drive Your Dreams.",
  phone: "9500390683",
  whatsapp: "9500390683",
  email: "kabilanssj@gmail.com",
  instagram: "https://www.instagram.com/bigboys_erode_coimbatore",
};

export const COIMBATORE_BRANCH = {
  key: "COIMBATORE",
  name: "Coimbatore Showroom",
  address: "5/171B, Arasur Pirivu, Avinashi Road, Arasur, Coimbatore, Tamil Nadu 641407",
  mapUrl:
    "https://maps.google.com/?q=5/171B+Arasur+Pirivu+Avinashi+Road+Arasur+Coimbatore+Tamil+Nadu+641407",
};

export const buildWhatsAppLink = ({ brand, model, stockId } = {}) => {
  const base = `https://wa.me/91${DEALERSHIP.whatsapp}`;
  let text = "Hi, I'm interested in a car listed by Big Boys 18+.";
  if (brand && model) {
    text = `Hi, I'm interested in the ${brand} ${model} listed by Big Boys 18+.`;
    if (stockId) text += ` Stock ID: ${stockId}.`;
  }
  return `${base}?text=${encodeURIComponent(text)}`;
};

export const buildCallLink = () => `tel:+91${DEALERSHIP.phone}`;

export const currencyINR = (value) => {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatKm = (value) => {
  if (value === undefined || value === null) return "-";
  return `${new Intl.NumberFormat("en-IN").format(value)} km`;
};
