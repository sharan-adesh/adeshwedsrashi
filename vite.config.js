import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { env } from 'node:process'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: env.NETLIFY ? '/' : '/adeshwedsrashi/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{
      find: /^@\//,
      replacement: `${fileURLToPath(new URL('./src', import.meta.url))}/`,
    }],
  },
})
