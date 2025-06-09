module.exports = {
  darkMode: "class",
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary:"#EE10B0",
        secoundry:"#0E9EEF",
        bgbody:"#181818",
        bgcard:"#1F1F1F",
        bgrow:"#1E1E1E",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
};
