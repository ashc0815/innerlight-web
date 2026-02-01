import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        chat: resolve(__dirname, 'src/pages/chat.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        privacy: resolve(__dirname, 'src/pages/privacy.html'),
      },
    },
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Asset handling
    assetsInlineLimit: 4096,
    cssMinify: true,
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  preview: {
    port: 4173,
  },
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
