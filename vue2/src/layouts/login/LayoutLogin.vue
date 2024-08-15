<!-- @format -->
<template>
  <section :class="$style['login-layout']">
    <section :class="$style['login-content']">
      <section :class="$style['login-form-layout']">
        <header :class="$style['login-form-header']">柯桥智治大脑</header>
        <section :class="$style['login-form-content']">
          <FormModel
            :class="$style['form']"
            :model="loginFormState"
            :rules="loginFormRules"
            ref="loginFormStateRef"
            size="large"
          >
            <FormModelItem :class="$style['form-item']" prop="account">
              <Input
                :class="$style['input']"
                v-model="loginFormState.account"
                placeholder="用户名"
                size="large"
                allowClear
              />
            </FormModelItem>
            <FormModelItem :class="$style['form-item']" prop="password">
              <Password
                :class="$style['input']"
                v-model="loginFormState.password"
                placeholder="密码"
                size="large"
                allowClear
              />
            </FormModelItem>
            <FormModelItem :class="$style['form-item']" prop="verCode">
              <Row :gutter="12">
                <Col :span="18">
                  <Input
                    :class="[$style['input'], $style['input-ver-code']]"
                    v-model="loginFormState.verCode"
                    placeholder="验证码"
                    size="large"
                    allowClear
                  />
                </Col>
                <Col :span="6">
                  <CaptchaImage
                    :class="$style['captcha-image']"
                    :verKey.sync="loginFormState.verKey"
                    @updateCaptchaImage="onUpdateCaptchaImage"
                    ref="captchaImageRef"
                  />
                </Col>
              </Row>
            </FormModelItem>
            <FormModelItem :class="$style['form-item']">
              <Checkbox :class="$style['checkbox']" v-model="isRemember" size="large"> 记住密码 </Checkbox>
            </FormModelItem>
            <FormModelItem :class="$style['form-item']">
              <Button :class="$style['login-btn']" type="primary" size="large" @click="onClickLogin"> 登录 </Button>
            </FormModelItem>
          </FormModel>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { Button, Checkbox, Col, FormModel, Input, Row } from 'ant-design-vue';
import { Message } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
// apis
import { apiPostLogin } from '@src/apis';
// utils
// types
// mixins
// stores
import { useLoginFormState, useUserInfo } from '@src/store';
// configs
import { ENV } from '@src/configs';
// components
import CaptchaImage from './components/CaptchaImage.vue';
const { Item: FormModelItem } = FormModel;
const { Password } = Input;
@Component({ components: { CaptchaImage, Button, Checkbox, Col, FormModel, FormModelItem, Input, Row, Password } })
export default class LayoutLogin extends Vue {
  loginFormState = { account: '', password: '', verKey: null, verCode: null };
  isRemember = false;

  loginFormStateRef;
  captchaImageRef;

  get computedIsRemember() {
    try {
      const storeLoginFormState = useLoginFormState();
      return storeLoginFormState.isRemember;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
  get computedLoginFormState() {
    try {
      const storeLoginFormState = useLoginFormState();
      return storeLoginFormState.loginFormState;
    } catch (error) {
      console.warn(error);
      return {};
    }
  }
  get loginFormRules() {
    return {
      account: [{ required: true, message: '用户名 - 必填' }],
      password: [{ required: true, message: '密码 - 必填' }],
      verCode: [{ required: true, message: '验证码 - 必填' }],
    };
  }
  checkLoginFormState() {
    try {
      const storeLoginFormState = useLoginFormState();
      storeLoginFormState.checkLoginFormState();
    } catch (error) {
      console.warn(error);
    }
  }
  initFormState() {
    try {
      const { computedIsRemember, computedLoginFormState, loginFormState } = this;
      if (computedIsRemember) {
        this.isRemember = computedIsRemember;
        this.loginFormState = Object.assign({}, loginFormState, computedLoginFormState);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async onClickLogin() {
    try {
      const storeUserInfo = useUserInfo();
      const storeLoginFormState = useLoginFormState();
      const { loginFormState, isRemember } = this;
      const isOk = await this.$refs.loginFormStateRef?.validate();
      if (isOk) {
        const { code, data, msg } = await apiPostLogin(loginFormState);
        if (code === 200) {
          Message.success(msg);
          storeUserInfo.setUserInfo(data);
          storeLoginFormState.setLoginFormState(isRemember ? loginFormState : {});
          sessionStorage.setItem(ENV.TOKEN_KEY, data.token);

          this.$router.push({ path: '/demo' });
        } else {
          Message.error(msg);
          this.$refs.captchaImageRef?.getCaptchaImage();
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }

  onUpdateCaptchaImage() {
    try {
      this.loginFormState.verCode = null;
    } catch (error) {
      console.warn(error);
    }
  }

  created() {
    this.checkLoginFormState();
  }
  mounted() {
    this.$nextTick(() => {
      this.initFormState();
    });
  }
  destroy() {}
}
</script>
<style lang="less" module>
@import './LayoutLogin.less';
</style>
