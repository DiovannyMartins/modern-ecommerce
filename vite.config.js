import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'main.html'),
        catalogo: resolve(__dirname, 'catalogo.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
