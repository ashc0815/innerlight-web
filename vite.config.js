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
        register: resolve(__dirname, 'src/pages/register.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
