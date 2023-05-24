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
      '/local/': {
        target: 'http://mmt-test.sipc115.com',
        changeOrigin: true,
        rewrite: (path) => {
          // 写一段提示, 提示已经走了代理
          console.log(path + ' ===> ' + path.replace(/^\/local/, ''));
          return path.replace(/^\/local/, '');
        }
      }
    }
  },
  plugins: setupVitePlugins()
});
