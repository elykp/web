/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		extend: {},
		container: {
			center: true,
			screens: {
				sm: '380px',
				md: '468px',
				lg: '724px',
				xl: '980px',
				'2xl': '1236px'
			},
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		}
	},
	daisyui: {
		// themes: [
		// 	{
		// 		mytheme: {
		// 			primary: '#ef99dd',
		// 			secondary: '#e7bafc',
		// 			accent: '#47ed4f',
		// 			neutral: '#1A2023',
		// 			'base-100': '#283943',
		// 			info: '#55AFD3',
		// 			success: '#40E2AF',
		// 			warning: '#BC9E15',
		// 			error: '#DD222F'
		// 		}
		// 	}
		// ]
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
