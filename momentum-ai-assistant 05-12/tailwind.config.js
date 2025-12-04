
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'momentum-green': {
          '400': '#4ade80',
          '500': '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
