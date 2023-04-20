import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
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
  plugins: [
    vue(),
    // 自动引入插件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
});
