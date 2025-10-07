import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  resolve: {
    preserveSymlinks: true,
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true,
  },
  build: {
    sourcemap: false,
  },
})
