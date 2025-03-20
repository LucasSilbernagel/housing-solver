import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig(
  defineVitestConfig({
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  })
)
