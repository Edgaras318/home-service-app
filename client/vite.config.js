import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This allows you to use the _variables.scss file in all SCSS files
        additionalData: `@import "@/assets/styles/_variables.scss";`,
        // If you are using Vite 4 or newer, use this format:
        // additionalData: `@use "@/assets/styles/_variables.scss" as *;`,
      },
    },
  },
});