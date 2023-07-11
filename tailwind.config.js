/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark-main': '#1e1e2c',
      'dark-secondary': '#2d2d44',
      'light-main': '#33e1ed',
      'white': '#ffffff',
      'transparent': 'rgba(0, 0, 0, 0)',
      'opaque': 'rgba(0, 0, 0, 0.4)',
      'opaque-dark': 'rgba(0, 0, 0, 0.55)',
    }
  },
  plugins: [],
}