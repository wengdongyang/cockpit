/** @format */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';
// apis
// utils
// types
import type { RouteConfig } from 'vue-router';
// mixins
// stores
// configs
import { ENV } from '@src/configs';
// components
import LayoutLogin from '../layouts/login/LayoutLogin.vue';
import LayoutDemo from '../layouts/demo/LayoutDemo.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: '', redirect: '/login' },
  { path: '/login', name: 'login', component: LayoutLogin },
  { path: '/demo', name: 'demo', component: LayoutDemo },
];

const router = new VueRouter({ mode: 'hash', base: process.env.BASE_URL, routes });
router.beforeEach((to, from, next) => {
  if (!['/', '/login'].includes(to.path)) {
    if (sessionStorage.getItem(ENV.TOKEN_KEY)) {
      next();
    } else {
      Message.error('未登录!');
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
export default router;
