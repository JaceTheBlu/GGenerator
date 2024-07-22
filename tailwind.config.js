import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary-color': colors.slate[800],
				'secondary-color': colors.orange[500],
				'tertiary-color': colors.gray[500],
				'validate-color': colors.green[500],
				'cancel-color': colors.red[500],
				'background-primary-color': colors.indigo[900],
				'background-secondary-color': colors.pink[500]
			},
			textColor: {
				'primary-color': colors.white,
				'secondary-color': colors.orange[500],
				'tertiary-color': colors.gray[500]
			},
			fontSize: {
				primary: [
					'1.25rem',
					{
						lineHeight: '1.75rem',
						fontWeight: '500'
					}
				],
				secondary: [
					'1.5rem',
					{
						lineHeight: '2rem',
						fontWeight: '700'
					}
				],
				tertiary: [
					'1rem',
					{
						lineHeight: '1.5rem',
						fontWeight: '300'
					}
				]
			},

			borderRadius: {
				primary: '0.75rem',
				secondary: '0.5rem'
			},

			borderWidth: {
				'primary-width': '1px',
				'secondary-width': '2px'
			},
			keyframes: {
				spinRainbow: {
					'0%, 100%': {
						'border-color': 'red transparent transparent transparent'
					},
					'25%': {
						'border-color': 'yellow transparent transparent transparent'
					},
					'50%': {
						'border-color': 'green transparent transparent transparent'
					},
					'75%': {
						'border-color': 'blue transparent transparent transparent'
					}
				},
				spin: {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				}
			},
			animation: {
				'spin-rainbow': 'spinRainbow 1s linear infinite, spin 1s linear infinite'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('children', '&>*');
		})
	]
};
