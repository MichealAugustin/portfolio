import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RegiMc21_Portfolio/',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'gsap',
              test: /node_modules[\\/]gsap[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
