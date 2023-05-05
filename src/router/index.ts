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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
