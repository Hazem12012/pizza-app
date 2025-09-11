/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    fontFamily: {
      pizza: ['Roboto', 'sans-serif'],
    },

    extend: {
      colors: {
        pizza: '#000000',
      },
    },
  },
  plugins: [],
};
