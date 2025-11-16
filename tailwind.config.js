/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palet Warna Hijau & Kuning
        primary: {
          50: '#f0fdf4', // Mint Cream (sangat muda)
          100: '#dcffdf', // Honeydew
          200: '#c5f5ce', // Mint
          300: '#a7e4b2', // Light Green
          400: '#7ac888', // Medium Aquamarine
          500: '#4caf50', // Green (Standard)
          600: '#43a047', // India Green
          700: '#388e3c', // Warna sidebar utama (hijau sedang)
          800: '#2e7d32', // Warna sidebar gelap (hijau botol)
          900: '#1b5e20', // Dark Green
        },
        secondary: {
          // Skala kuning mustard
          100: '#fff9e6',
          400: '#ffecb3',
          500: '#ffeb3b', // Kuning terang untuk highlight
          600: '#fbc02d',
          700: '#ffa000',
        },
      },
    },
  },
  plugins: [],
};
