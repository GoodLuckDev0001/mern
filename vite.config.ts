import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // binds to 0.0.0.0, making it accessible on all interfaces
    port: 5173, // optional: you can set a fixed port if needed
    proxy: {
      '/api': {
        target: 'https://localhost:3443', // replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})