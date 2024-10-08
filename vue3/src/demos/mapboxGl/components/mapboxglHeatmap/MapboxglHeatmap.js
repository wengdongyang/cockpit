/** @format */
import * as lodash from 'lodash';
// apis
// hooks
// utils
// types
// stores
// mixins
// configs
// components
import SurperMapboxGl from '../../SurperMapboxGl.ts';

const GRIDS = {
  SOURCE: 'GRIDS_SOURCE',
  AREA_LAYER: 'GRIDS_AREA_LAYER',
  LINE_LAYER: 'GRIDS_LINE_LAYER',
  TEXT_LAYER: 'GRIDS_TEXT_LAYER',
};

const HEATMAP = {
  SOURCE: 'HEATMAP_SOURCE',
  HEAT_LAYER: 'earthquakes-heat',
  POINT_LAYER: 'earthquakes-point',
};

export default class SurperMapboxglHeatmap extends SurperMapboxGl {
  constructor(props) {
    super(props);
  }

  surperMapStyleLoadCallback = () => {
    this.initMapStyleArea();
    this.updateMapArea();

    this.initMapStyleHeatmap();
    this.updateMapHeatmap();
  };

  initMapStyleArea = () => {
    const { surperMap, mapOptions } = this;
    try {
      if (surperMap) {
        const sourceGeojson = lodash.get(mapOptions, ['grids']) || {};

        if (sourceGeojson && !lodash.isEmpty(sourceGeojson)) {
          this.privateInitSurperMapSource(GRIDS.SOURCE);

          this.privateInitSurperMapLayer(GRIDS.AREA_LAYER, {
            id: GRIDS.AREA_LAYER,
            source: GRIDS.SOURCE,
            type: 'fill',
            paint: { 'fill-color': '#5F84FF', 'fill-opacity': 0.3 },
            filter: ['!=', '$type', 'Point'],
          });
          this.privateInitSurperMapLayer(GRIDS.LINE_LAYER, {
            id: GRIDS.LINE_LAYER,
            source: GRIDS.SOURCE,
            type: 'line',
            filter: ['!=', '$type', 'Point'],
            paint: { 'line-color': '#FFFFFF', 'line-width': 3 },
          });
          this.privateInitSurperMapLayer(GRIDS.TEXT_LAYER, {
            id: GRIDS.TEXT_LAYER,
            source: GRIDS.SOURCE,
            type: 'symbol',
            layout: {
              'icon-offset': [0, -0],
              'text-field': ['get', 'name'],
              'text-anchor': 'center',
              'text-size': 12,
              'text-offset': [0, -0],
            },
            paint: {
              'text-color': 'rgba(45, 45, 45, 1)',
              'text-halo-color': 'rgba(255, 255, 255, 1)',
              'text-halo-width': 2,
            },
          });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  updateMapArea = () => {
    const { surperMap, mapOptions } = this;
    try {
      const sourceGeojson = lodash.get(mapOptions, ['grids']) || {};
      if (surperMap) {
        if (sourceGeojson && !lodash.isEmpty(sourceGeojson)) {
          this.privateUpdateSurperMapSource(GRIDS.SOURCE, sourceGeojson);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  initMapStyleHeatmap = () => {
    const { surperMap, mapOptions } = this;
    try {
      const sourceGeojson = lodash.get(mapOptions, ['heatmap']) || {};
      if (surperMap) {
        if (sourceGeojson && !lodash.isEmpty(sourceGeojson)) {
          this.privateInitSurperMapSource(HEATMAP.SOURCE);
          this.privateInitSurperMapLayer(HEATMAP.HEAT_LAYER, {
            id: HEATMAP.HEAT_LAYER,
            type: 'heatmap',
            source: HEATMAP.SOURCE,
            paint: {
              // 根据频率和属性大小增加热力图权重
              // 'heatmap-weight': { property: 'mag', type: 'exponential', stops: [ [1, 0], [62, 1], ], },
              // 根据缩放级别增加热力图权重
              'heatmap-intensity': {
                stops: [
                  [11, 1],
                  [15, 3],
                ],
              },
              // 色带
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)',
              ],
              // 根据缩放级别调整热力图半径
              'heatmap-radius': {
                stops: [
                  [11, 15],
                  [15, 20],
                ],
              },
              // 透明度
              'heatmap-opacity': {
                default: 1,
                stops: [
                  [14, 1],
                  [15, 0],
                ],
              },
            },
          });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };
  updateMapHeatmap = () => {
    const { surperMap, mapOptions } = this;
    try {
      const sourceGeojson = lodash.get(mapOptions, ['heatmap']) || {};
      if (surperMap && sourceGeojson && !lodash.isEmpty(sourceGeojson)) {
        this.privateUpdateSurperMapSource(HEATMAP.SOURCE, sourceGeojson);
      }
    } catch (error) {
      console.warn(error);
    }
  };
}
