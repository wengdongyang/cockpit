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
                  { label: '杭州', value: 'hangZhou' },
                  { label: '绍兴', value: 'shaoXing' },
                ]"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>

            <VChart
              v-if="isRegistered"
              :style="{ width: '100%', height: '400px' }"
              :option="computedChartsMapDefaultOption"
              :ref="(ref) => (chartsBarCarouselHighLightRef = ref)"
              autoSize
            />
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

    setTimeout(() => {
      console.error(chartsBarCarouselHighLightRef.value.getOption());
    });
  } catch (error) {
    console.warn(error);
  }
};

const computedChartsMapDefaultOption = computed(() => {
  try {
    return {
      geo: {
        show: true,
        map: 'hangZhou',
        roam: true,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#fff',
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: '#759eed',
            areaColor: '#3656f9',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(11,158,212, 5)',
          },
          emphasis: {
            areaColor: '#31d2ff',
          },
        },
      },
      series: [
        {
          type: 'map',
          map: 'hangZhou',
          geoIndex: 0,
          aspectScale: 0.75,
          roam: true,
          animation: false,
          showLegendSymbol: false,
        },
        {
          type: 'lines',
          zlevel: 1,
          effect: { show: true, period: 6, trailLength: 0.7, color: '#fff', symbolSize: 3 },
          lineStyle: { normal: { width: 0, curveness: 0.2, color: '#0038C3' } },
          data: [[{ coord: [120.171465, 30.250236] }, { coord: [120.271465, 30.350236] }]],
        },
        {
          type: 'lines',
          zlevel: 2,
          effect: { show: true, period: 6, trailLength: 0, symbolSize: 15 },
          lineStyle: { normal: { width: 1, opacity: 1, curveness: 0.2, color: '#FFEF22' } },
          data: [[{ coord: [120.171465, 30.250236] }, { coord: [120.271465, 30.350236] }]],
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
