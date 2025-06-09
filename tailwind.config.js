module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}",  // فولدر app به جای src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EE10B0",
        secondary: "#0E9EEF",
        bgbody: "#181818",
        bgcard: "#1F1F1F",
        bgrow: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
