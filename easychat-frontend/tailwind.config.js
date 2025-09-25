const tailwindcssPrimeui = require('tailwindcss-primeui');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{js,mjs}",
    "./node_modules/primeui/**/*.{js,mjs}"
  ],
  theme: { extend: {} },
  plugins: [tailwindcssPrimeui],
};
