// const plugin = require('tailwindcss/plugin');

export default {
  // darkMode: 'class', // 👈 Required for manual theme switching
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'bg-zinc-950',
        surface: '#1c1c1e',
        accent: '#e60073',
        'accent-hover': '#ff4da6',
        success: '#3fe58c',
        muted: '#b0b0b0',
      },
    }
  },
  plugins:  [
    require('@tailwindcss/typography'),
  ]
};
