import { select, json, geoPath, geoMercator } from 'd3';
import { feature } from 'topojson';

export function makeMap() {
  // Injecting SVG from javascript, to be able to create multiple SVG visualizations
  const svg = select('.svgArea').append('svg').attr('width', '100%').attr('height', '100%');

  const projection = geoMercator().scale(4000).center([5.116667, 52.17]);
  const pathGenerator = geoPath().projection(projection);

  // Source for map: https://github.com/cartomap/nl
  json('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson').then((data) => {
    // Using Gemeente to create the sizes.
    const gemeentes = feature(data, data.objects.gemeente_2020);
    svg
      .selectAll('path')
      .data(gemeentes.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .append('title')
      .text((d) => `${d.properties.statnaam}, ID:${d.id}`);
  });
}
