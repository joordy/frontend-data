import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending } from 'd3';
import { svgSize } from './helpers/config';

export function makeBar(carCapacity) {
  // Graph data
  const data = carCapacity.splice(0, 100);
  // console.log(data);

  // Creating SVG
  const svg = select('#charts')
    .append('svg')
    .attr('width', svgSize.w - svgSize.m.l - svgSize.m.r)
    .attr('height', svgSize.h - svgSize.m.t - svgSize.m.b)
    .attr('viewBox', [0, 0, svgSize.w, svgSize.h])
    .classed('myBarChart Bar', true);
  // X axis

  const xValue = scaleBand()
    .domain(range(data.length))
    .range([svgSize.m.l, svgSize.w - svgSize.m.r])
    .padding(0.1);

  // Y axis
  const yValue = scaleLinear()
    .domain([0, max(data, (d) => d.carCapacity)])
    .range([svgSize.h - svgSize.m.b, svgSize.m.t]);

  svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .enter()
    .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
    .join('rect')
    .attr('x', (d, i) => xValue(i))
    .attr('y', (d) => yValue(d.carCapacity))
    .attr('height', (d) => yValue(0) - yValue(d.carCapacity))
    .attr('width', xValue.bandwidth());
}
