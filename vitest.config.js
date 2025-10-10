import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.js'],
		globals: true,
		css: true,
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage',
		},
	},
})
