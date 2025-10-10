// ESLint flat config
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'

export default [
  // Global ignores
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  // Base recommended + Prettier
  js.configs.recommended,
  prettier,

  // App source files
  {
    files: ['src/**/*.{js,jsx}', 'vite.config.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        IntersectionObserver: 'readonly',
        matchMedia: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        URL: 'readonly',
      },
    },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Allow keeping React import when present
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    },
    settings: { react: { version: 'detect' } },
  },

  // Test files - vitest globals
  {
    files: ['src/**/*.{test,spec}.{js,jsx}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^(React|screen)$' }],
    },
  },

  // Vitest setup file can reference jsdom globals
  {
    files: ['vitest.setup.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        global: 'readonly',
        IntersectionObserver: 'readonly',
        matchMedia: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
      },
    },
  },

  // Netlify functions - Node environment
  {
    files: ['netlify/functions/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        exports: 'writable',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
      },
    },
    rules: {
      // Functions often use CommonJS
      'no-undef': 'off',
    },
  },
]
