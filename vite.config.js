import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/modern-ecommerce/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalogo: resolve(__dirname, 'catalogo.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
