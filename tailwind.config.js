module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0047FF",
        secondary: "#000000",
        tertiary: "#3C8AE7",
        accent: "#26ABE2",
        markoyellow: "#FFA726",
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  content: ["./node_modules/flowbite/**/*.js"],
};
