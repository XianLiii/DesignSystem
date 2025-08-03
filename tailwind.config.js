/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'harmony': ['HarmonyOS Sans', 'Noto Sans SC', 'sans-serif'],
      },
      colors: {
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e5e5e5',
      }
    },
  },
  plugins: [],
} 