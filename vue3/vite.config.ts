/** @format */

import { fileURLToPath, URL } from 'node:url';

import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import vueDevTools from 'vite-plugin-vue-devtools';
import { createHtmlPlugin } from 'vite-plugin-html';
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 新版开发者工具
    // vueDevTools(),
    // setup上主动命名
    vueSetupExtend({ enableAutoExpose: true }),
    // mock接口
    viteMockServe({ mockPath: './src/mocks', enable: true }),
    // html模板
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.ts',
      template: 'public/index.html',
      inject: {
        data: { title: '驾驶舱模板系统', injectScript: `` },
        tags: [{ injectTo: 'body-prepend', tag: 'section', attrs: { id: 'app' } }],
      },
    }),
  ],
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@src/styles/mixins/index.less";`, // less前置
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    proxy: {
      // '/mock': { target: baseURL, changeOrigin: true }
    },
  },
});
