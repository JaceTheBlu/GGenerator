import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary-color": colors.slate[800],
        "secondary-color": colors.pink[500],
        "tertiary-color": colors.indigo[900],
      },
      textColor:{
        "primary-color": colors.white,
        "secondary-color": colors.orange[500],
        "tertiary-color": colors.gray[500],

      },
      fontSize: {
        'primary': ['1.25rem', {
          lineHeight: '1.75rem',
          fontWeight: '500',
        }],
        'secondary': ['1.5rem', {
          lineHeight: '2rem',
          fontWeight: '700',
        }],
        'tertiary': ['1rem', {
          lineHeight: '1.5rem',
          fontWeight: '300',
        }],
      },

      borderRadius: {
        'primary': '0.75rem',
      },

      borderWidth: {
        'primary-width': '1px',
        'secondary-width': '2px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

