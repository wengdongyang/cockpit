/** @format */
// apis
// utils
import { requestGet, requestPost } from '@src/utils';
// types
// mixins
// stores
// configs
// components
export const apiPostLogin = (data: any) => {
  return requestPost({ baseURL: '/mock', url: '/login', data });
};

export const apiGetCaptcha = () => {
  return requestGet({ baseURL: '/mock', url: '/captcha' });
};
