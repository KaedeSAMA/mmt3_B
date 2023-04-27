import type { PluginOption } from 'vite';
import setupAutoImport from './auto-import';
import setupComponents from './components';
import setupIcons from './icons';
import vue from '@vitejs/plugin-vue';
import setupMock from './mock';
export default function setupVitePlugins() {
  const plugins: PluginOption[] = [
    vue(),
    // 自动引入插件
    setupAutoImport(),
    setupComponents(),
    setupIcons(),
    setupMock(false)
  ];
  return plugins;
}
