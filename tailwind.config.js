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
        primarytxt:'var(--primarytxt)',
        bgplayercontroll:'var(--bgplayercontroll)',
        bgplayercontrollCard:'var(--bgplayercontrollCard)',
      },
      fontFamily: {
        morabbaLight: ["morabba-light", "sans-serif"],
        morabbaMedium: ["morabba-medium", "sans-serif"],
        morabbaBold: ["morabba-bold", "sans-serif"],
        iranSansLight: ["iransans-light", "sans-serif"],
        iranSansMedium: ["iransans-medium", "sans-serif"],
        iranSansBold: ["iransans-bold", "sans-serif"],
      },
      boxShadow: {
        'bottom': '5px 9px 9px 2px rgba(0,0,0,0.75)', 
      },
    },
  },
  plugins: [],
};
