/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#FFFFFF",
        color2: "#808FA1",
        color3: "#547F9E",
        color4: "#64BFE4",
        color5: "#3A93CA",
        color6: "#21699A",
        color7: "#184160",
        color8: "#000000",
      },
      fontFamily: {
        primary: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
