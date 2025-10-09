import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
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
