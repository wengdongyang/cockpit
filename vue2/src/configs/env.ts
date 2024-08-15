/** @format */
// apis
// utils
// types
// mixins
// stores
// configs
// components
const ENV_MODE = process.env.MODE || 'production'; // 模式

const ENV_TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY || 'TOKEN'; // token的key

export default {
  MODE: ENV_MODE,

  TOKEN_KEY: ENV_TOKEN_KEY, // token key
};
