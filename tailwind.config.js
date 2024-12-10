/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'ms-overflow-style': 'none', /* Hide scrollbar in IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Hide scrollbar in WebKit-based browsers */
        },
      });
    },
  ],
};
