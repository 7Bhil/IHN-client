/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ihn: {
          green: '#008C2A',
          'light-green': '#80C41C',
          yellow: '#FFC900',
          dark: '#0B1D12',
          card: '#122919',
          lightBg: '#F4F8F4',
        }
      }
    },
  },
  plugins: [],
}
