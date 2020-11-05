import 'regenerator-runtime/runtime';
import './../scss/main.scss';
// d3 library

import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
import { getAreaManager } from './utils/filters/data';

let selectedColumn = null;

getData(endpoint1, endpoint2).then((rdwData) => {
  console.log(rdwData);
  selectedColumn = 'areamanagerid';
  const areaManagersID = getAreaManager(rdwData, selectedColumn);
  console.log(areaManagersID);

  // let barchartResults = filterForBarChart(rdwData);
  // console.log(barchartResults);
});

// import { select, json, geoPath, geoMercator, zoom } from 'd3';
// import { feature } from 'topojson';

// const svg = select('svg');

// const projection = geoMercator().scale(8000).center([5.116667, 52.17]);
// const pathGenerator = geoPath().projection(projection);

// json('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson').then((data) => {
//   const gemeentes = feature(data, data.objects.gemeente_2020);

//   svg
//     .selectAll('path')
//     .data(gemeentes.features)
//     .enter()
//     .append('path')
//     .attr('d', pathGenerator)
//     .append('title')
//     .text((d) => `${d.properties.statnaam}, ID:${d.id}`);
// });
