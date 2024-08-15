/** @format */
import 'font-awesome/css/font-awesome.css';
import 'minireset.css/minireset.css';
import 'nprogress/nprogress.css';

import 'element-theme-dark';

import Element from 'element-ui';
import { PiniaVuePlugin, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './mocks/index.js';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

Vue.use(Element);
Vue.use(PiniaVuePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
