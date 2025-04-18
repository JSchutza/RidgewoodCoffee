/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ef',
          100: '#e6e0d4',
          200: '#d4c9b5',
          300: '#c0b092',
          400: '#b09c7a',
          500: '#a08a62',
          600: '#927b5a',
          700: '#7c654c',
          800: '#675340',
          900: '#544435',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
} 