import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
export default function setupAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'types/auto-imports.d.ts',
    resolvers: [ElementPlusResolver(), IconsResolver()],
    eslintrc: {
      enabled: true
    }
  });
}
