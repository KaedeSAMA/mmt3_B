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
          import('@/pages/Home/SuperAdmin/regFormSetting/regFormSetting.vue')
      },
      //数据看板路由
      {
        path: '/home/dateBoard',
        name: 'dateBoard',
        component: () => import('@/pages/Home/dateBoard/dateBoardHome.vue')
      },
      {
        path: '/home/campaignSetup', // 宣传信息设置
        name: 'regFormSetting',
        component: () => import('@/pages/Home/campaignSetup/campaignSetup.vue')
      },
      //实时面试路由
      {
        path: '/home/currentInterview',
        name: 'currentInterview',
        component: () =>
          import('@/pages/Home/currentIntrview/currentInterview.vue')
      },
      // 面试安排路由
      {
        path: '/home/interviewArrangement',
        name: 'interviewArrangement',
        component: () =>
          import('@/pages/Home/interviewArrangement/interviewArrangement.vue')
      },
      // 面试复盘路由
      {
        path: '/home/interviewReply',
        name: 'interviewReply',
        component: () =>
          import('@/pages/Home/interviewReply/interviewReply.vue')
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
