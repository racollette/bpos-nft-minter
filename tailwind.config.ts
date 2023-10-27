import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "carousel-spin-1": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-11700px)" },
        },
        "carousel-spin-2": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-14016px)" },
        },
        "carousel-spin-3": {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-16043px)" },
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
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
