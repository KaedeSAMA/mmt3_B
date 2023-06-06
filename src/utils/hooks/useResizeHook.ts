/**
 * 中文：
 * 用于Vue3中监听窗口大小并动态变化
 * @作者
 * Hana
 * @导入
 * 使用import在组件中导入
 * import { useResizeHook } from "该文件路径"
 *
 * @功能
 * useResizeHook可以在监听到窗口变化时执行某个函数
 * @参数
 * @param : function
 * 一个函数，用于在监听到窗口变化时执行
 * @param : debounceTime
 * 防抖时间，默认200ms，避免性能浪费
 * 
 * @示例
 * import { useResizeHook } from '@/utils/hooks/useResizeHook';
        useResizeHook((width, height) => {
        console.log(width, height);
    });
 *
 *
 */

/**
    English:
    Used to dynamically resize and listen to window size changes in Vue 3.
    @Import
    Import in the component using the following:
    import { useResizeHook } from "file-path"
    @Functionality
    useResizeHook allows you to execute a function when window size changes are detected.
    @Params
    @param : function
    A function to be executed when window size changes are detected.
    @param : debounceTime
    Debounce time, default is 200ms to avoid performance waste.
    @Example
    import { useResizeHook } from '@/utils/hooks/useResizeHook';
    useResizeHook((width, height) => {
    console.log(width, height);
    });
*/

import { ref, onMounted, onUnmounted } from 'vue';
export function useResizeHook(
  config: (width: number, height: number) => any,
  debounceTime: number = 200
) {
  function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      const context = this;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, delay);
    };
  }

  const eventHandeler = debounce(() => {
    const userHandler = config;
    userHandler(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
  }, debounceTime);
  onMounted(() => {
    window.addEventListener('resize', eventHandeler);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', eventHandeler);
  });
}
