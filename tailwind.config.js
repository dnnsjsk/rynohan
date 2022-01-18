const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js"],
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      "blue-gray": colors.blueGray,
      "cool-gray": colors.coolGray,
      gray: colors.gray,
      "true-gray": colors.trueGray,
      "warm-gray": colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            p: {
              lineHeight: 1.5
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
              marginBottom: theme('spacing.2'),
            },
            h3: {
              color: theme('colors.white'),
              marginBottom: theme('spacing.2'),
            },
            h4: {
              color: theme('colors.white'),
              marginBottom: theme('spacing.2'),
            },
            h5: {
              color: theme('colors.white'),
              marginBottom: theme('spacing.2'),
            },
            h6: {
              color: theme('colors.white'),
              marginBottom: theme('spacing.2'),
            }
          },
        },
      })
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
