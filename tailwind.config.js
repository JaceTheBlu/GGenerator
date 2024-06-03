import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.yellow[800],
        neutral: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

