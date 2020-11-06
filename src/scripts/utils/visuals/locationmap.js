import { select } from 'd3';

export function locationMap(locations) {
  const data = locations;
  console.log(data);

  const width = 800;
  const height = 500;

  const svg = select('.svgArea').append('svg').attr('height', height).attr('width', width);

  // const mapFromHolland = svg
  //   .append('path')
  //   .attr('fill', orange)
  //   .attr('d', path('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'));

  const projection = geoMercator().scale(4000).center([5.116667, 52.17]);
  const pathGenerator = geoPath().projection(projection);

  json('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson').then((data) => {
    // Using Gemeente to create the sizes.
    const gemeenteNL = feature(data, data.objects.gemeente_2020);
    svg
      .selectAll('path')
      .data(gemeenteNL.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .append('title')
      .text((d) => `${d.properties.statnaam}, ID:${d.id}`);
  });
}
