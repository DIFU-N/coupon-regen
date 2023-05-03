module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	// extends: ['plugin:react/recommended', 'google'],
	overrides: [],
	// extends: "google",
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		// arraysInObjects: 0,
		'object-curly-spacing': [2, 'always'],
		'comma-dangle': 0,
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'quote-props': [2, 'as-needed', { keywords: true }]
	}
};
