/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./styles/**/*.{css}"] ,
  theme: {
    extend: {
      colors: {
        primary: '#7B3FE4',
        secondary: '#9C6EFF',
      },
      borderRadius: {
        xl: '16px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
