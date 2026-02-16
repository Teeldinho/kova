import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
	...fsd.configs.recommended,
	{
		rules: {
			'fsd/forbidden-imports': 'off',
			'fsd/no-cross-imports': 'error',
			'fsd/no-higher-level-imports': 'error',
			'fsd/no-segmentless-slices': 'warn',
			'fsd/insignificant-slice': 'warn',
		},
	},
	{
		ignores: [
			'**/generated/**',
			'**/__mocks__/**',
			'**/node_modules/**',
			'**/.output/**',
			'**/dist/**',
			'**/*.test.ts',
			'**/*.spec.ts',
		],
	},
])
