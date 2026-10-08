/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fk: {
          blue: '#2874f0',
          darkBlue: '#1754be',
          yellow: '#ffe500',
          orange: '#fb641b',
          green: '#388e3c',
          bg: '#f1f3f6',
          border: '#e0e0e0',
          text: '#212121',
          muted: '#878787',
        },
        amz: {
          dark: '#131921',
          nav: '#232f3e',
          orange: '#ff9900',
          yellow: '#f3a847',
          blue: '#007185',
          bg: '#eaeded',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'fk-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'fk-hover': '0 4px 16px 0 rgba(0,0,0,0.12)',
        'fk-header': '0 2px 4px 0 rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
