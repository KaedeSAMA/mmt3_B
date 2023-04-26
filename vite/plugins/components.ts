import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
export default function setupComponents() {
  return Components({
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: 'types/components.d.ts',
    resolvers: [
      IconsResolver({
        enabledCollections: ['ep']
      }),
      ElementPlusResolver()
    ]
  });
}
