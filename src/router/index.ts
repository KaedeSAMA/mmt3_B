import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Login from '@/pages/Login/login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register/register.vue')
  },
  {
    // 后台管理主页面的路由
    path: '/home',
    name: 'Home',
    redirect: '/home/personalPage',
    component: () => import('@/pages/Home/home.vue'),
    children: [
      {
        // ### 个人首页
        path: '/home/personalPage',
        name: 'PersonalPage',
        component: () => import('@/pages/Home/personalPage/personalPage.vue')
      },
      {
        path: '/home/regFormSetting',
        name: 'regFormSetting',
        component: () =>
          import('@/pages/Home/SuperAdmin/regFormSetting/regFormSetting.vue')
      },
      {
        // ### 账号管理
        path: '/home/accountManage',
        name: 'accountManage',
        component: () =>
          import('@/pages/Home/SuperAdmin/accountManage/accountManage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
