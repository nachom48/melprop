/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-text': '#013921',
        'green-text-dark': '#003b1f',
        'green-menu': '#645E5A',
        'green-highcontrast': '#d4f2ac',
        'medium-grey': '#f5f5f5',
        'gray-border': '#E4E7E9',
        'yellow': '#E8E215',
        'black': '#332E29',
        'white': '#FCFCFC',
        'light-green': '#89ce48',
        'green-fluo': '#E8E215',
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem',
      },
      lineHeight: {
        'xxs': '0.75rem',
      },
    },
  },
  plugins: [],
}
