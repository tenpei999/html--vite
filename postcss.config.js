module.exports = {
	plugins: {
	tailwindcss: {
		content: [
			"./index.html",
			"./**/*.js",
		],
		theme: {
		extend: {},
		},
		plugins: [
			require('@tailwindcss/forms'),
		],
	},
	autoprefixer: {},
	},
}