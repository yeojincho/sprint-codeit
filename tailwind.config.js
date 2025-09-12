/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Next.js
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["NanumSquare", "sans-serif"],
      },
    },
  },
  plugins: [],
};
