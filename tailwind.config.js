/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2194F2",
        gray: "#E5E8EB",
        "light-gray": "#D3D3D3",
        black: "#121417",
        "dark-gray": "#61788A",
        white: "#FFFFFF",
        background: "#F3F5F3",
      },
    },
  },

  plugins: [],
};
