module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}", // فولدر app به جای src
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '3.43rem',
      },
      colors: {
        primary: "#EE10B0",
        secondary: "#0E9EEF",
        bgbody: "#181818",
        bgcard: "#1F1F1F",
        bgrow: "#1E1E1E",
      },
      fontFamily: {
        morabbaLight: ["morabba-light", "sans-serif"],
        morabbaMedium: ["morabba-medium", "sans-serif"],
        morabbaBold: ["morabba-bold", "sans-serif"],
        iranSansLight: ["iransans-light", "sans-serif"],
        iranSansMedium: ["iransans-medium", "sans-serif"],
        iranSansBold: ["iransans-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
