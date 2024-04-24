/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB142',
        primaryWhite: '#D9D9D9',
        secondary: '#141417',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    plugins: [],
  }
}

