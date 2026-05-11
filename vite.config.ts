import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    exclude: ['@crestron/ch5-crcomlib']
  },
  build: {
    rollupOptions: {
      external: ['@crestron/ch5-crcomlib']
    }
  }
})