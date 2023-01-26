/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mainFa: ['YekanBakhFaNum', 'sans'],
      },
      backgroundImage: {
        main: "url('/images/Intro.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
