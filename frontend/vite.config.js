import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Ganti dengan port yang diinginkan, misalnya 3000
  },
  plugins: [react()],
})
