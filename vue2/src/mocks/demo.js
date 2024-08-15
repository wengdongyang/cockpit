/** @format */
import Mock from 'mockjs';
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
    url: '/mock/carousel',
    response: () => {
      return resultSuccess({
        'list|20': [{ name: '@cname', 'image|1': '@cname' }],
      });
    },
  },
  {
    url: '/mock/carouselTable',
    response: () => {
      return resultSuccess({
        'list|20': [{ name: '@cname', 'age|+1': 10, address: `@county` }],
        total: 10,
      });
    },
  },
  {
    url: '/mock/chartBar',
    response: () => {
      return resultSuccess({
        'list|10': [{ cname: '@cname', 'num|+1': 10 }],
        total: 10,
      });
    },
  },
  {
    url: '/mock/chartGauge',
    response: () => {
      return resultSuccess({
        'num|1-100': 100,
      });
    },
  },
  {
    url: '/mock/chartLiquid',
    response: () => {
      return resultSuccess({
        'num|1-100': 100,
      });
    },
  },
  {
    url: '/mock/chartLine',
    response: () => {
      return resultSuccess({
        'list|10': [{ cname: '@cname', 'num|+1': 10 }],
        total: 10,
      });
    },
  },
  {
    url: '/mock/chartPie',
    response: () => {
      return resultSuccess({
        'list|10': [{ cname: '@cname', 'num|+1': 10 }],
        total: 10,
      });
    },
  },
  {
    url: '/mock/chartPyramid',
    response: () => {
      return resultSuccess({
        'list|10': [{ cname: '@cname', 'num|+1': 10 }],
        total: 10,
      });
    },
  },
].forEach((element) => Mock.mock(element.url, element.method || 'get', element.response()));
