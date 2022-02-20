module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#65CCB8',
        secondary: '#464646',
        tertiary: '#002431',
        accent: '#26ABE2',
        markoyellow: '#FFA726',
      },
      container: {
        center: true,
        padding: {
          default: '1rem',
        },
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],

}



