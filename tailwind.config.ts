// const plugin = require('tailwindcss/plugin');

export default {
  // darkMode: 'class', // 👈 Required for manual theme switching
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins:  [
    require('@tailwindcss/typography'),
  ]
};
