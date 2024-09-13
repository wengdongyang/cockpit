/** @format */

$.get('https://www.isqqw.com/asset/get/areas_v3/province/140000_full.json', function (geoJson) {
  echarts.registerMap('HK', geoJson);

  var focus = geoJson.features[0].properties.center,
    line = [],
    effect = [];
  geoJson.features.forEach(function (v) {
    var name = v.properties.name, // 地区名称
      cp = v.properties.center; // 地区经纬度
    line.push([{ coord: focus }, { coord: cp }]);
    effect.push({
      name: name,
      value: cp.concat(Math.round(Math.random() * 100)),
    });
  });

  option = {
    geo: {
      show: true,
      map: 'HK',
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
        map: 'HK',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        roam: true,
        animation: false,
        showLegendSymbol: false, // 存在legend时显示
        // data: []
      },
      {
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 3,
        },
        lineStyle: {
          normal: {
            width: 0,
            curveness: 0.2,
            color: '#0038C3',
          },
        },
        data: line,
      },
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol:
            'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705',
          symbolSize: 15,
        },
        lineStyle: {
          normal: {
            width: 1,
            opacity: 1,
            curveness: 0.2,
            color: '#FFEF22',
          },
        },
        data: line,
      },
    ],
  };
});
