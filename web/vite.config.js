import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/authentication/",
  server: {
    port: 80, // Default HTTP port taaki :5173 na likhna pade
  }
})
