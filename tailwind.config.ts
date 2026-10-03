import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
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
        surface: '#fcf8ff',
        'surface-dim': '#dad6ff',
        'surface-bright': '#fcf8ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f2ff',
        'surface-container': '#efebff',
        'surface-container-high': '#e9e5ff',
        'surface-container-highest': '#e3dfff',
        'on-surface': '#181445',
        'on-surface-variant': '#4d4633',
        'inverse-surface': '#2d2a5b',
        'inverse-on-surface': '#f3eeff',
        outline: '#7e7761',
        'outline-variant': '#d0c6ad',
        'surface-tint': '#705d00',
        primary: '#705d00',
        'on-primary': '#ffffff',
        'primary-container': '#ffd93d',
        'on-primary-container': '#725e00',
        'inverse-primary': '#e8c426',
        secondary: '#ac2a5d',
        'on-secondary': '#ffffff',
        'secondary-container': '#ff6b9d',
        'on-secondary-container': '#6e0034',
        tertiary: '#006780',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#a3e5ff',
        'on-tertiary-container': '#006982',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        'primary-fixed': '#ffe173',
        'primary-fixed-dim': '#e8c426',
        'on-primary-fixed': '#221b00',
        'on-primary-fixed-variant': '#554500',
        'secondary-fixed': '#ffd9e1',
        'secondary-fixed-dim': '#ffb1c5',
        'on-secondary-fixed': '#3f001b',
        'on-secondary-fixed-variant': '#8c0a46',
        'tertiary-fixed': '#b7eaff',
        'tertiary-fixed-dim': '#5bd5fc',
        'on-tertiary-fixed': '#001f28',
        'on-tertiary-fixed-variant': '#004e61',
        background: '#fcf8ff',
        'on-background': '#181445',
        'surface-variant': '#e3dfff',
      },
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        nunito: ['"Nunito Sans"', 'sans-serif']
      },
      boxShadow: {
        neo: "4px 4px 0px #1E1B4B",
        "neo-sm": "2.5px 2.5px 0px #1E1B4B",
        "neo-lg": "6px 6px 0px #1E1B4B",
        "neo-xl": "8px 8px 0px #1E1B4B",
        "neo-pop": "0 0 0 3.5px #1E1B4B, 5px 5px 0 #1E1B4B",
      },
      borderRadius: {
        'xl': '2rem',
        'pill': '9999px',
      }
    }
  },
  plugins: [],
};

export default config;
