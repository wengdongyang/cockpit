/** @format */
import dayjs from 'dayjs';
import lodash from 'lodash';
import { defineStore } from 'pinia';
// apis
// utils
// types
// mixins
// stores
// configs
// components
type I_LOGIN_FORM_STATE = Partial<{
  account: string;
  password: string;
  [key: string]: any;
}>;
interface I_STORE_LOGIN_FORM_STATE {
  STORAGE_TIME: string;
  IS_REMEMBER: boolean;
  LOGIN_FORM_STATE: I_LOGIN_FORM_STATE;
}

type I_USER_INFO = Partial<{
  userName: string;
  token: string;
  auth: string;
}>;

export const useLoginFormState = defineStore('loginFormState', {
  state: (): I_STORE_LOGIN_FORM_STATE => {
    return {
      STORAGE_TIME: '', // 存储时间
      IS_REMEMBER: false, // 是否记住密码
      LOGIN_FORM_STATE: {}, // 账号密码
    };
  },
  getters: {
    storageTime: (state: I_STORE_LOGIN_FORM_STATE) => state.STORAGE_TIME,
    isRemember: (state: I_STORE_LOGIN_FORM_STATE) => state.IS_REMEMBER,
    loginFormState: (state: I_STORE_LOGIN_FORM_STATE) => state.LOGIN_FORM_STATE,
  },
  actions: {
    checkLoginFormState() {
      try {
        const storageTime = this.STORAGE_TIME;
        const now = dayjs();
        if ((storageTime && now.subtract(1, 'week').isAfter(dayjs(storageTime))) || !storageTime) {
          this.IS_REMEMBER = false;
          this.LOGIN_FORM_STATE = {};
          this.STORAGE_TIME = '';
        }
      } catch (error) {
        console.warn(error);
      }
    },
    setLoginFormState(loginFormState: I_LOGIN_FORM_STATE) {
      try {
        if (loginFormState && !lodash.isEmpty(loginFormState)) {
          const account = lodash.get(loginFormState, ['account']);
          const password = lodash.get(loginFormState, ['password']);
          this.IS_REMEMBER = true;
          this.LOGIN_FORM_STATE = { account, password };
          this.STORAGE_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss');
        } else {
          this.IS_REMEMBER = false;
          this.LOGIN_FORM_STATE = {};
          this.STORAGE_TIME = '';
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
  persist: { storage: localStorage },
});

export const useUserInfo = defineStore('userinfo', {
  state: (): { USER_INFO: I_USER_INFO } => {
    return {
      USER_INFO: {}, // userinfo
    };
  },
  getters: {
    userInfo: (state) => state.USER_INFO,
    token: (state) => state.USER_INFO.token,
  },
  actions: {
    setUserInfo(userinfo: I_USER_INFO) {
      try {
        this.USER_INFO = userinfo;
      } catch (error) {
        console.warn(error);
      }
    },
  },
  persist: { storage: sessionStorage },
});
