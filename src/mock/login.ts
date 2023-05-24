import { MockMethod } from 'vite-plugin-mock';
// 单纯的使⽤⾃⼰的返回数据话，可以不⽤引⼊mockjs
// http://mockjs.com/examples.html
import Mock, { Random } from 'mockjs';
export default [
  {
    url: '/mock/b/user/loginp',
    method: 'post',
    response: () => {
      return {
        code: '00000',
        message: 'ok',
        data: Mock.mock({
          'userId|1-100': 100,
          username: Random.cname(),
          token: Random.string(50),
          'permissionId|1-100': 100,
          permissionName: Random.ctitle(4, 7)
        })
      };
    }
  },
  {
    url: '/mock/b/user/orgs',
    method: 'get',
    response: () => {
      return {
        code: '00000',
        data: {
          num: 1,
          organizations: [
            {
              organizationId: 0,
              organizationName: '科技协会'
            }
          ]
        },
        message: '请求成功'
      };
    }
  }
] as MockMethod[];
