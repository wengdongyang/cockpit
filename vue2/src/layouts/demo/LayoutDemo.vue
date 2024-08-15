<!-- @format -->
<template>
  <el-container :class="$style['layout']">
    <el-header :class="$style['header']">Header</el-header>
    <el-container :class="$style['content-layout']">
      <el-aside :class="$style['content-layout-aside']">Aside</el-aside>
      <el-main :class="$style['content-layout-content']">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Message } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
// apis
// utils
// types
// mixins
// stores
// configs
// components
@Component({ components: {} })
export default class LayoutDemo extends Vue {
  created() {}
  mounted() {}
  destroy() {}
}
</script>
<style lang="less" module>
@import './LayoutDemo.less';
</style>
