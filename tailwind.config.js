/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'ocean': '#0D1B2A',
          'teal': '#00B4D8',
          'coral': '#FF6B6B',
          'teal-dark': '#0077B6',
          'teal-light': '#90E0EF',
          'success': '#2EC4B6',
          'gold': '#FFD166',
        },
        neutral: {
          'near-white': '#F8F9FA',
          'light-gray': '#E9ECEF',
          'mid-gray': '#6C757D',
          'charcoal': '#212529',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

