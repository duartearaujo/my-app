import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1"}
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      },
      animation: {
        fadeIn: "fadeIn 2s ease",
        fadeOut: "fadeOut 1s ease",
      }
    },
  },
  plugins: [],
} satisfies Config;
