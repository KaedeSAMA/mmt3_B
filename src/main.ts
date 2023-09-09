import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import 'element-plus/theme-chalk/index.css';
import './assets/iconfont/iconfont.js';
import App from './App.vue';
import router from './router';
createApp(App).use(router).use(createPinia()).mount('#app');

import eventBus from 'vue3-eventbus';
App.use(eventBus);
