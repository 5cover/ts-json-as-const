import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import _import from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	globalIgnores(['**/*.d.ts']),
	{
		files: ['**/*.ts'],
		ignores: ['README.md/*'],

		extends: compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/strict-type-checked',
			'plugin:@typescript-eslint/stylistic-type-checked',
			'prettier',
		),

		plugins: {
			import: fixupPluginRules(_import),
		},

		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: 5,
			sourceType: 'commonjs',

			parserOptions: {
				project: ['tsconfig.build.json'],
			},
		},

		rules: {
			'@typescript-eslint/consistent-type-definitions': 'error',

			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'separate-type-imports',
				},
			],

			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-member-accessibility': 'error',
			'@/lines-between-class-members': 'warn',

			'@typescript-eslint/member-ordering': [
				'error',
				{
					default: {
						order: 'alphabetically',
					},
				},
			],

			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'interface',
					format: ['PascalCase'],

					custom: {
						regex: '^I[A-Z]',
						match: false,
					},
				},
			],

			'@typescript-eslint/no-extraneous-class': [
				'error',
				{
					allowWithDecorator: true,
				},
			],

			'@typescript-eslint/no-non-null-assertion': 'off',

			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/prefer-enum-initializers': 'error',
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/promise-function-async': 'error',
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/return-await': 'error',
			'@typescript-eslint/sort-type-constituents': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',

			'@typescript-eslint/unbound-method': [
				'error',
				{
					ignoreStatic: true,
				},
			],

			'import/newline-after-import': 'error',
			'import/no-duplicates': 'warn',

			'import/order': [
				'error',
				{
					groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling']],
					'newlines-between': 'always',
				},
			],
		},
	},
	{
		files: ['**/*.json'],
		extends: compat.extends('plugin:jsonc/recommended-with-jsonc', 'prettier'),
		rules: {},
	},
	{
		files: ['**/*.md'],
		extends: compat.extends('plugin:markdown/recommended-legacy', 'prettier'),
		rules: {},
	},
]);
