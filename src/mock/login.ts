import { MockMethod } from 'vite-plugin-mock';
// 单纯的使⽤⾃⼰的返回数据话，可以不⽤引⼊mockjs
// http://mockjs.com/examples.html
import Mock, { Random } from 'mockjs';
export default [
  {
    url: '/mock/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: Mock.mock({
          token: Random.string(10)
        })
      };
    }
  }
] as MockMethod[];
