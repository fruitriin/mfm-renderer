import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [vue(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx']
  }
})
