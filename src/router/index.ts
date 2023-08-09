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
        // ### 面试总看板-报名阶段
        path: '/home/interviewBoard/regStage',
        name: 'RegStage',
        component: () =>
          import('@/pages/Home/interviewBoard/regStage/regStage.vue')
      },
      {
        // ### 面试总看板-面试阶段
        path: '/home/interviewBoard/interviewStage',
        name: 'InterviewStage',
        component: () =>
          import(
            '@/pages/Home/interviewBoard/interviewStage/interviewStage.vue'
          )
      },
      {
        // ### 面试总看板-复盘阶段
        path: '/home/interviewBoard/reviewStage',
        name: 'ReviewStage',
        component: () =>
          import('@/pages/Home/interviewBoard/reviewStage/reviewStage.vue')
      },
      {
        path: '/home/regFormSetting',
        name: 'regFormSetting',
        component: () =>
          import('@/pages/Home/regFormSetting/regFormSetting.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
