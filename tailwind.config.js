/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      spacing: {
        '15': '60px',
        '30': '120px',
        '40': '160px',
        '45': '180px',
      },
    },
  },
  plugins: [],
}