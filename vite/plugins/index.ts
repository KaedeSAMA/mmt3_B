import type { PluginOption } from 'vite';
import setupAutoImport from './auto-import';
import setupComponents from './components';
import vue from '@vitejs/plugin-vue';

export default function setupVitePlugins() {
  const plugins: PluginOption[] = [
    vue(),
    // 自动引入插件
    setupAutoImport(),
    setupComponents()
  ];
  return plugins;
}
