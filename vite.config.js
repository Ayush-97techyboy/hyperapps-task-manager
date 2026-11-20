import { sentryVitePlugin } from "@sentry/bundler-plugins/vite";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sentryVitePlugin({
    org: "workfall",
    project: "hyperapps-task-manager"
  })],

  test: {
    globals: true,
    environment: 'jsdom',
  },

  build: {
    sourcemap: true
  }
})
