/** @format */
import * as Mock from 'mockjs';
// apis
// hooks
// utils
import { resultSuccess } from './_util';
// types
// stores
// mixins
// configs
// components

[
  {
    url: '/mock/captcha',
    response: () => {
      return resultSuccess({ verImage: '@dataImage', verKey: '@id' });
    },
  },
  {
    url: '/mock/login',
    method: 'post',
    response: () => {
      return resultSuccess({ userName: '@cname', token: '@guid', 'auth|1': ['superAdmin', 'user'] });
    },
  },
].forEach((element) => Mock.mock(element.url, element.method || 'get', element.response()));
