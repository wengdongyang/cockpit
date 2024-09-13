<!-- @format -->
<template>
  <a-page-header>
    <template #title>
      <a-breadcrumb>
        <a-breadcrumb-item>DEMO</a-breadcrumb-item>
        <a-breadcrumb-item>ECHARTS 地图</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <section class="content">
      <a-row :gutter="[12, 12]">
        <a-col :span="8">
          <a-card class="card" title="地图 - 普通">
            <a-radio-group v-model:value="selectedCity">
              <a-radio-button v-for="item in [
                { label: '杭州', value: 'hangZhou' },
                { label: '绍兴', value: 'shaoXing' },
              ]" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>

            {{ selectedCity }}
            <VChart v-if="isRegistered" :style="{ width: '100%', height: '400px' }"
              :option="computedChartsMapDefaultOption" :ref="(ref) => (chartsBarCarouselHighLightRef = ref)" autoSize />
          </a-card>
        </a-col>
      </a-row>
    </section>
  </a-page-header>
</template>
<script lang="jsx" setup>
import { set, tryOnMounted } from '@vueuse/core';
import * as echarts from 'echarts';
import { provide, ref, computed } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
// apis
// hooks
// utils
// types
// stores
// mixins
// configs
// components
provide(THEME_KEY, 'dark');
const chartsBarCarouselHighLightRef = ref();
const isRegistered = ref(false);

const selectedCity = ref('hangZhou');

const getGeojson = async () => {
  try {
    const geojsonShaoXing = await fetch('/assets/geojson/浙江省/绍兴市.json').then((res) => res.json());
    const geojsonHangZhou = await fetch('/assets/geojson/浙江省/杭州市.json').then((res) => res.json());
    echarts.registerMap('shaoXing', geojsonShaoXing);
    echarts.registerMap('hangZhou', geojsonHangZhou);

    set(isRegistered, true);
  } catch (error) {
    console.warn(error);
  }
};

const computedChartsMapDefaultOption = computed(() => {
  try {
    const grid = {
      show: false,
      left: 20,
      right: 20,
      top: 40,
      bottom: 20,
      containLabel: true,
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 1,
      borderColor: '#ccc',
    };

    return {
      grid,
      backgroundColor: 'transparent',
      textStyle: { color: '#B9B8CE', fontSize: 12 },
      geo: {
        show: true,
        map: 'hangZhou',
        roam: true,
      },
      series: [{
        name: 'hangZhou',
        type: 'map',
        map: 'hangZhou',
        label: { show: true },
        nameProperty: 'name',
        itemStyle: { label: { show: true, color: '#fff' }, color: '#fff', borderWidth: 1, borderColor: '#32CBE0' },
        select: { label: { show: false, color: '#fff' } },
        emphasis: { disabled: true },
        tooltip: { show: false, trigger: 'item' },
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        roam: true,
        animation: false,
        showLegendSymbol: false, // 存在legend时显示
      }, {
        type: 'lines',
        coordinateSystem: 'geo',
        polyline: true,
        lineStyle: {
          width: 1,
          opacity: 1,
          curveness: 0.2,
        },
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol:
            'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705',
          symbolSize: 15,
        },
        data: [{ coords: [120.14322240845, 30.236064370321] }, { coords: [120.14138577045, 30.236113748704] }],
      }],
    };
  } catch (error) {
    console.warn(error);
    return { backgroundColor: 'transparent' };
  }
});

tryOnMounted(() => {
  getGeojson();
});
</script>
<style lang="less" scoped>
@import './ChartMap.less';
</style>
