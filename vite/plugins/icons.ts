import Icons from 'unplugin-icons/vite';

export default function setupIcons() {
  return Icons({
    autoInstall: true,
    scale: 1,
    defaultClass: 'inline-block'
  });
}
