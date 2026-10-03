import type { Config } from "tailwindcss";
import sharedConfig from "@workspace/tailwind-config";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8E7",
        ink: "#1E1B4B",
        sunny: "#FFD93D",
        bubblegum: "#FF6B9D",
        sky: "#4CC9F0",
        mint: "#6BE585",
        grape: "#9B5DE5",
        tangerine: "#FF9F1C",
        darkbg: "#1A1838",
      },
      boxShadow: {
        neo: "4px 4px 0px #1E1B4B",
        "neo-sm": "2.5px 2.5px 0px #1E1B4B",
        "neo-lg": "6px 6px 0px #1E1B4B",
        "neo-xl": "8px 8px 0px #1E1B4B",
        "neo-pop": "0 0 0 3.5px #1E1B4B, 5px 5px 0 #1E1B4B",
      }
    }
  },
  plugins: [],
};

export default config;
