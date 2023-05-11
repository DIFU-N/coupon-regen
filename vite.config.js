import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./mkcert/localhost+2-key.pem'),
      cert: fs.readFileSync('./mkcert/localhost+2.pem'),
    },
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    rollupOptions: {
      external: ['axios', 'http-proxy-middleware'],
    },
  },
})
