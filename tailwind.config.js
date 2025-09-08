/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["NanumSquare", "sans-serif"],
      },
      fontSize: {
        "20-bold": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "18-bold": ["18px", { lineHeight: "26px", fontWeight: "700" }],
        "16-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],
        "16-regular": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      },
      colors: {
        "slate-900": "#0F172A",
        "violet-600": "#7C3AED",
        "slate-800": "#1E293B",
        "violet-100": "#EDE9FE",
        "slate-500": "#64748B",
        "slate-400": "#94A3B8",
        "rose-500": "#F43F5E",
        "slate-300": "#CBD5E1",
        "lime-300": "#BEF264",
        "slate-200": "#E2E8F0",
        "slate-100": "#F1F5F9",
        "amber-800": "#92400E",
      },
    },
  },
  plugins: [],
};
