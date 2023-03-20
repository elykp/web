module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended'
	],
	plugins: ['svelte3', 'import', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
		'no-console': 'warn',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'import/no-unresolved': 'off',
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '~/**',
						group: 'internal'
					}
				],
				groups: ['builtin', 'external', 'internal'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				},
				'newlines-between': 'always'
			}
		]
	}
};
