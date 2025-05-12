import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3005,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    open: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
