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
              <a-radio-button
                v-for="item in [
                  { label: '杭州', value: HANG_ZHOU },
                  { label: '绍兴', value: SHAO_XING },
                ]"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>

            <VChart v-if="isRegistered" :style="{ width: '100%', height: '400px' }" :option="computedChartsMapDefaultOption" :ref="(ref) => (chartsBarCarouselHighLightRef = ref)" autoSize />
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
const isRegistered = ref(false);

const HANG_ZHOU = 'HANG_ZHOU';
const SHAO_XING = 'SHAO_XING';

const selectedCity = ref(HANG_ZHOU);

const geoJsonHangZhou = ref([]);
const geoJsonShaoXing = ref([]);

const getGeojson = async () => {
  try {
    const geojsonHangZhou = await fetch('/assets/geojson/浙江省/杭州市.json').then((res) => res.json());
    const geojsonShaoXing = await fetch('/assets/geojson/浙江省/绍兴市.json').then((res) => res.json());
    echarts.registerMap(HANG_ZHOU, geojsonHangZhou);
    echarts.registerMap(SHAO_XING, geojsonShaoXing);

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
      geo: [
        {
          show: false, // 缩放的问题
          roam: true,
          map: HANG_ZHOU,
          geoIndex: 0,
          selectedMode: 'single',
          coordinateSystem: 'geo',
          label: { show: false, color: '#000' },
          itemStyle: { borderWidth: 0.5, borderColor: '#444', areaColor: '#eee' },
          // emphasis: { label: { show: true, color: 'rgb(100,0,0)' }, itemStyle: { areaColor: 'rgba(255,215,0,0.8)' } },
          // select: { label: { show: true, color: 'rgb(100,0,0)' }, itemStyle: { color: 'rgba(255,215,0,0.8)' } },
        },
      ],
      series: [
        {
          type: 'map',
          zlevel: 0,
          roam: true,
          map: HANG_ZHOU,
          selectedMode: 'single',
          coordinateSystem: 'geo',
          label: { show: false, color: '#000' },
          itemStyle: { borderWidth: 0.5, borderColor: '#444', areaColor: '#eee' },
          // emphasis: { label: { show: true, color: 'rgb(100,0,0)' }, itemStyle: { areaColor: 'rgba(255,215,0,0.8)' } },
          // select: { label: { show: true, color: 'rgb(100,0,0)' }, itemStyle: { color: 'rgba(255,215,0,0.8)' } },
        },
        {
          type: 'lines',
          zlevel: 1,
          // roam: true,
          geoIndex: 0,
          polyline: false,
          coordinateSystem: 'geo',
          label: { show: false, position: 'end' },
          lineStyle: { curveness: 0.2, color: '#0038C3', opacity: 0.5 },
          emphasis: { label: { show: false } },
          effect: { show: true, period: 6, trailLength: 0.7, color: '#fff', symbolSize: 3, constantSpeed: 0, symbol: 'circle', loop: true },
          data: [
            {
              coords: [
                [120.171465, 30.250236],
                [120.271465, 30.350236],
              ],
            },
          ],
        },
        {
          type: 'lines',
          zlevel: 2,
          // roam: true,
          geoIndex: 0,
          polyline: true,
          coordinateSystem: 'geo',
          lineStyle: { color: '#FFEF22' },
          emphasis: { label: { show: false } },
          label: { show: false, position: 'end' },
          effect: { show: true, period: 6, trailLength: 0, symbolSize: 15, constantSpeed: 0, symbol: 'circle', loop: true },
          data: [
            {
              coords: [
                [120.171465, 30.250236],
                [120.271465, 30.350236],
              ],
            },
          ],
        },
      ],
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
