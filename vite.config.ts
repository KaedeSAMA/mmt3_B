import { defineConfig, loadEnv } from 'vite';
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
        target: loadEnv('development', process.cwd()).VITE_BASE_URL, // 代理地址,避免git泄漏
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
