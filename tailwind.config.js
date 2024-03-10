/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sairaHeader: ["sairaHeader", "system-ui", "sans-serif"],
        sairaBody: ["sairaBody", "system-ui", "sans-serif"],
      },
      colors: {
        red: {
          light: "#C10206",
          dark: "#A50113",
        },
        black: {
          light: "#23272a",
          dark: "#010A10",
        },
        white: {
          light: "#FFFBF2",
          dark: "#DFE2DB",
        },
      },
    },
  },
  plugins: [],
};
