const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/pagedone/dist/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        itim: ['Itim', 'cursive'],
      },
    },
    // screens: {
    //   'xl': { 'max': '1200px' },
    //   'lg': { 'max': '1080px' },
    //   'md-lg': { 'max': '991px' },
    //   'md': { 'max': '768px' },
    //   'sm': { 'max': '576px' },
    //   'xs': { 'max': '480px' },
    //   '2xs': { 'max': '340px' },
    // }
  },
  plugins: [
    flowbite.plugin(),
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}