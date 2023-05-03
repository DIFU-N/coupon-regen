module.exports = {
	env: {
		es6: true,
		node: true
	},
	// extends: "google",
	parserOptions: {
		ecmaVersion: 2018
	},
	// extends: ["eslint:recommended", "google"],
	rules: {
		"no-restricted-globals": ["error", "name", "length"],
		"prefer-arrow-callback": "error",
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		indent: [2, "tab"],
		"no-tabs": 0,
		"object-curly-spacing": [2, "always"],
		"comma-dangle": 0,
		"quote-props": [2, "as-needed", { keywords: false }]
		// arraysInObjects: 0,
	},
	overrides: [
		{
			files: ["**/*.spec.*"],
			env: {
				mocha: true
			},
			rules: {}
		}
	],
	globals: {}
};
