/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "345px",
      },
    },
  },
  // added variants for using calc() inside Message.tsx for copy icon
  variants: {
    extend: {
      inset: ["responsive"],
    },
  },
  plugins: [],
};
