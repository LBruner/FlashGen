import type {Config} from "tailwindcss";
import {heroui} from "@heroui/react";

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      typography: {
        // Customize the prose variant here
        'full': {
          css: {
            maxWidth: '100%', // Remove max-width
          },
        },
      },
      colors: {
        customGray: '#EAEAEA',
        customDarkBrown: '#E1AD7C',
        customDarkBg: '#212020',
        customDarkNav: '#161716',
        customCardBgLight: '#EAEAEA'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;