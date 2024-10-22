/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#0e3481',
        primary: '#38bdf8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};
