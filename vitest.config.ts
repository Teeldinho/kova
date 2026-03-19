import viteTsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		viteTsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
	],
	test: {
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				url: 'http://localhost',
			},
		},
		setupFiles: ['./src/test-setup.ts'],
		globals: true,
		include: ['src/**/*.test.{ts,tsx}'],
		exclude: ['node_modules', '.output', 'dist'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: [
				'src/**/*.test.ts',
				'src/**/*.test.tsx',
				'src/**/index.ts',
				'src/routeTree.gen.ts',
				'src/shared/api/generated/**',
				'src/routes/**',
			],
		},
	},
})
