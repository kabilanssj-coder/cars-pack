/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0A0C",
        black2: "#121215",
        offwhite: "#F5F5F5",
        silver: "#B8B8B8",
        accent: "#E50914",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "'Archivo Black'", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
