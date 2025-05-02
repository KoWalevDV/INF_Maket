// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Рут – директория с HTML и всем React-кодом
  root: 'src/renderer',
  base: './',            // чтобы пути были относительными
  build: {
    outDir: '../../public',  // билд попадёт в public
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  plugins: [react()],
})
