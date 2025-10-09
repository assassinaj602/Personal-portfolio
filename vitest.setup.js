import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers (toHaveTextContent, etc.)
expect.extend(matchers)

// Clean up React Testing Library between tests
afterEach(() => {
	cleanup()
})

// Polyfills/mocks for DOM APIs not implemented in jsdom
if (typeof window !== 'undefined') {
	// IntersectionObserver mock
	if (!('IntersectionObserver' in window)) {
		class IO {
			constructor() {}
			observe() {}
			unobserve() {}
			disconnect() {}
			takeRecords() { return [] }
		}
		// @ts-ignore
		window.IntersectionObserver = IO
		// @ts-ignore
		global.IntersectionObserver = IO
	}

	// matchMedia mock
		if (typeof window.matchMedia !== 'function') {
		// @ts-ignore
		window.matchMedia = (query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {}, // deprecated
			removeListener: () => {}, // deprecated
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		})
	}
}
