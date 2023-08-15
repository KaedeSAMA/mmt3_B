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
  },
  {
    /**
     * 刘荣
     * 获取组织信息
     */
    url: '/mock/b/admin/organization/info/get',
    method: 'get',
    response: () => {
      return {
        code: '00000',
        message: '请求正常',
        data: {
          name: '测试协会',
          avatarUrl: 'https://p5.itc.cn/q_70/images03/20220512/ecc151fbd129466aaa41ec90b4cef96c.gif',
          briefIntroduction:
            'Company XYZ specializes in software development and IT solutions.',
          tagList: [
            {
              tag: 'labore ut mollit',
              type: 2
            },
            {
              tag: 'ut adipisicing ex sit',
              type: 2
            },
            {
              tag: 'Technology',
              type: 2
            }
          ],
          introduction:
            'Company XYZ specializes in software development and IT solutions.',
          feature:
            'We deliver high-quality software products that meet your unique requirements.',
          daily: undefined,
          slogan: undefined,
          contactInfo:
            'For inquiries or collaboration opportunities, contact us at info@companyxyz.com or call +123456789.',
          more: undefined,
          departmentList: [
            {
              id: 169,
              name: 'Software Development',
              briefIntroduction:
                'Our software development team creates robust and scalable solutions tailored to your business needs.',
              introduction:
                'We deliver customized software applications that streamline processes and drive growth.',
              standard:
                'We follow industry best practices and agile methodologies to ensure timely delivery and code quality.'
            }
          ]
        }
      };
    }
  }
] as MockMethod[];
