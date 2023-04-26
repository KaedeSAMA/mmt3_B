import { defineConfig } from 'vite';
import setupVitePlugins from './vite/plugins';
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    open: true,
    proxy: {
      '/local': {
        target: 'http://localhost:8000',
        rewrite: (path) => {
          return path.replace(/^\/local/, '');
        }
      }
    }
  },
  plugins: setupVitePlugins()
});
