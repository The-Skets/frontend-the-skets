/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mlg': {'max': '1023px'},

      'mxlg': {'max': '1250px'},
      // => @media (max-width: 1023px) { ... }

      'vs': '400px',

      'vsm': {'max': '400px'},

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'smm': {'max': '640px'},

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'mmd': {'max': '768px'},
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1800px',
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    [require("daisyui")],
  ],
}