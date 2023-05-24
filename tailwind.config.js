/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        history: "url('/public/assets/images/cold-brew.webp')",
        main: "url('/public/assets/images/bg-main-coffee.webp')",
        profile: "url('/public/assets/images/bg-profile.webp')",
        cart: "url('/public/assets/images/bg-cart.webp')",
      },
      boxShadow: {
        primary: "0px 6px 20px 0px #00000057;",
      },
      spacing: {
        22: "7rem",
      },
      colors: {
        primary: "#4F5665",
        secondary: "#ffba33",
        "secondary-200": "#f4a200",
        tertiary: "#6A4029",
        quartenary: "#0b132a",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
