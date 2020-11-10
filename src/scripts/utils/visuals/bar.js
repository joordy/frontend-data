import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending, svg } from 'd3';
import { svgSize } from './helpers/config';

export function drawVisualization(carCapacity) {
  console.log('joe');
  const data = carCapacity.splice(0, 10);
  // console.log(data);

  const x = scaleBand().padding(0.1);
  const y = scaleLinear();
  const svg = select('#charts')
    .append('svg')
    .attr('width', svgSize.w - svgSize.m.l - svgSize.m.r)
    .attr('height', svgSize.h - svgSize.m.t - svgSize.m.b)
    .attr('viewBox', [0, 0, svgSize.w, svgSize.h])
    .classed('myBarChart', true);

  setUpScaling(data, x, y, svgSize);
  setUpAx(svg, data, x, y);
}

function setUpScaling(data, x, y, svgSize) {
  x.domain(range(data.length)).range([svgSize.m.l, svgSize.w - svgSize.m.r]);
  y.domain([0, max(data, (d) => d.carCapacity)]).range([svgSize.h - svgSize.m.b, svgSize.m.t]);
}

function setUpAx(svg, data, x, y) {
  svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .enter()
    .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d.carCapacity))
    .attr('height', (d) => y(0) - y(d.carCapacity))
    .attr('width', x.bandwidth());
}

// import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending, svg } from 'd3';
// import { svgSize } from './helpers/svgsize';

// export function drawVisualization(carCapacity) {
//   console.log('joe');
//   const data = carCapacity.splice(0, 10);
//   console.log(data);

//   const x = scaleBand().padding(0.1);
//   const y = scaleLinear();
//   const svg = select('#charts')
//     .append('svg')
//     .attr('width', svgSize.w - svgSize.m.l - svgSize.m.r)
//     .attr('height', svgSize.h - svgSize.m.t - svgSize.m.b)
//     .attr('viewBox', [0, 0, svgSize.w, svgSize.h])
//     .classed('myBarChart', true);

//   setUpScaling(data, x, y, svgSize);
//   setUpAx(svg, data, x, y);
//   drawBars(data, x, y);
// }

// function setUpScaling(data, x, y, svgSize) {
//   x.domain(range(data.length)).range([svgSize.m.l, svgSize.w - svgSize.m.r]);
//   y.domain([0, max(data, (d) => d.carCapacity)]).range([svgSize.h - svgSize.m.b, svgSize.m.t]);
// }

// function setUpAx(svg, data, x, y) {
//   svg
//     .append('g')
//     .classed('axis axis-x', true)
//     .call(axisBottom(x))
//     .attr('transform', 'translate(0,' + svgSize.h + ')')
//     .selectAll('text')
//     .attr('transform', 'rotate(45)')
//     .attr('dx', 0)
//     .attr('dy', '1em');
//   // .append('g')
//   // .attr('fill', 'royalblue')
//   // .selectAll('rect')
//   // .enter()
//   // .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
//   // .join('rect');
//   // .attr('x', (d, i) => x(i))
//   // .attr('y', (d) => y(d.carCapacity))
//   // .attr('height', (d) => y(0) - y(d.carCapacity))
//   // .attr('width', x.bandwidth());
// }

// function drawBars(data, x, y) {
//   svg
//     .selectAll('rect')
//     .data(data)
//     .enter()
//     .append('rect')
//     .classed('bar', true)
//     .attr('x', (d, i) => x(i))
//     .attr('y', (d) => y(d.carCapacity))
//     .attr('height', (d) => y(0) - y(d.carCapacity))
//     .attr('width', x.bandwidth());
// }
