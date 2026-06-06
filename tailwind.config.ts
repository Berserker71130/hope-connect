import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/*/.{js,ts,jsx,tsx,mdx}",
    "./components/*/.{js,ts,jsx,tsx,mdx}",
    "./lib/*/.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Deep Blue
        secondary: "#EA580C", // Warm Orange (Urgency)
        accent: "#059669", // Forest Green (Success metrics)
        trust: "#1E3A8A", // Navy
        hope: "#0EA5E9", // Sky Blue
        background: {
          DEFAULT: "#FFFFFF", // Clean White
          muted: "#F9FAFB", // Light Gray
        },
        text: {
          primary: "#111827", // Dark Gray
          muted: "#6B7280", // Medium Gray
        },
      },
      fontFamily: {
        heading: ["var(--font-merriweather)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        professional:
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
