/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pink-gradient": "linear-gradient(16deg, rgba(167,50,166,1) 0%, rgba(255,98,0,1) 46%, rgba(246,214,0,1) 100%)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        palanquin: ["Palanquin", "sans-serif"],
      },
      colors: {
        slate: "#6D6D6D"
      }
    },
  },
  plugins: [],
};
