module.exports = {
  // darkMode: "class",
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
        primary: 'var(--primary)', 
        secondary: 'var(--secondary)',
        bgbody: 'var(--bgbody)',
        bgcard: 'var(--bgcard)',
        bgrow: 'var(--bgrow)',
        primarytxt:'var(--primarytxt)'
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
