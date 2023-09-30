/** @type {import('tailwindcss').Config} */
export default {
  darkMode: true,
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        header: ['Cookie'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
}
