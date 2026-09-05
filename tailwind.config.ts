import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#12141B",
          900: "#181B24",
          800: "#22262F",
          700: "#2E333F",
        },
        paper: {
          50: "#FBF9F4",
          100: "#F5F1E8",
          200: "#ECE5D4",
        },
        pen: {
          red: "#B23A2F",
          redDark: "#8C2C24",
          green: "#3C6E52",
          greenDark: "#2C5240",
          amber: "#C98A2C",
        },
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
