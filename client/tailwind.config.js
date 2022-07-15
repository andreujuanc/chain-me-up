/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        "50": "#ff4f7a",
        "100": "#ff4570",
        "200": "#ff3b66",
        "300": "#f5315c",
        "400": "#eb2752",
        "500": "#e11d48",
        "600": "#d7133e",
        "700": "#cd0934",
        "800": "#c3002a",
        "900": "#b90020"
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      "text-base": "white",
    },
    extend: {},
  },
  plugins: [],
}
