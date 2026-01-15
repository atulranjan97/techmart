import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
})


/*
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }

  “Hey Vite, if any request starts with '/api', don’t handle it yourself.
  Forward it to http://localhost:5000.”

  Why `changeOrigin: true` Exists
  This changes the request headers so the backend thinks:
*/