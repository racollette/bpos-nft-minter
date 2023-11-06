/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        shadows: ["Shadows Into Light"],
      },
      keyframes: {
        "carousel-spin-1": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-11900px)" },
        },
        "carousel-spin-2": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-14155px)" },
        },
        "carousel-spin-3": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-15580px)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "carousel-spin-1": "carousel-spin-1 10s ease-out",
        "carousel-spin-2": "carousel-spin-2 10s ease-out",
        "carousel-spin-3": "carousel-spin-3 10s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
