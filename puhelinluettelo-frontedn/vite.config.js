import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://puhelinluettelo-backend-ivdg.onrender.com/',
        changeOrigin: true,
      },
    },
  },
})
