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
        'green-fluo': '#b2f252',
        'theme-yellow': '#ffc239',
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'larken': ['Larken', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem',
        '2xl': '1.5rem',
        'xl': '1.25rem',
      },
      lineHeight: {
        'xxs': '0.75rem',
        '7': '1.75rem',
        '6': '1.5rem',
      },
      zIndex: {
        '2': '2',
      },
    },
  },
  plugins: [],
}
