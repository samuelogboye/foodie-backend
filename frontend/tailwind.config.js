/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandColor: "rgba(119, 0, 5, 1)",
        footerColor: "rgba(79, 78, 78, 1)",
      },
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        spectral: ['Spectral', 'serif'],
      },
      
    },
  },
  plugins: [],
}
