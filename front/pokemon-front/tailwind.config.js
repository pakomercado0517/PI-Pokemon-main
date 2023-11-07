/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bug: "#92BC2C",
        dark: "#595761",
        dragon: "#0F6AC0",
        electric: "#F2D94E",
        fairy: "#EE90E6",
        fire: "#FBA54C",
        fighting: "#D3425F",
        flying: "#A1BBEC",
        ghost: "#5F6DBC",
        grass: "#5FBD58",
        ground: "#DA7C4D",
        ice: "#75D0C1",
        normal: "#A0A29F",
        poison: "#B763CF",
        psychic: "#FA8581",
        rock: "#C9BB8A",
        steel: "#5695A3",
        water: "#539DDF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
