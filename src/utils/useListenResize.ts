/**
 *
 * @param
 *
 *
 * @method
 *
 */

class Observer {
  width: number;
  height: number;
  constructor() {
    this.width = 1920;
    this.height = 1080;
  }
  handler() {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    console.log(this.width);
  }
  openWatch() {
    window.addEventListener('resize', this.handler);
  }
  destroyWatch() {
    window.removeEventListener('resize', this.handler);
  }
}

export const watchWidthAndHeight = new Observer();
