import { select, scaleLinear, extent, axisLeft, axisBottom } from 'd3';
import { svgSize } from './helpers/config';

export function makeScatterPlot(maxDriveThrough) {
  // console.log('hello');
  const data = maxDriveThrough;

  // Creating SVG
  const svg = select('#charts')
    .append('svg')
    .attr('width', svgSize.w - svgSize.m.l - svgSize.m.r)
    .attr('height', svgSize.h - svgSize.m.t - svgSize.m.b)
    .attr('viewBox', [0, 0, svgSize.w, svgSize.h])
    .classed('myBarChart', true);

  const graphTitle = 'DriveThrough height vs EV- charger capacity';
  const circleRadius = 5;
  const yValue = (d) => d.maxDriveThrough;
  const yAxisLabel = 'Drive-through height';
  const xValue = (d) => d.evChargerCapacity;
  const xAxisLabel = 'EV-chargers';
  //const margin = { top: 80, right: 60, bottom: 40, left: 120 };
  const innerWidth = svgSize.w - svgSize.m.l - svgSize.m.r;
  const innerHeight = svgSize.h - svgSize.m.t - svgSize.m.b;

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();

  const yScale = scaleLinear().domain(extent(data, yValue)).range([0, innerHeight]).nice();

  const g = svg.append('g').attr(`transform`, `translate(${svgSize.m.l}, ${svgSize.m.t})`);

  const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(20);

  const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(5);

  const yAxisG = g.append('g').call(yAxis);

  yAxisG.selectAll('.domain').remove();

  yAxisG
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text(yAxisLabel);

  const xAxisG = g.append('g').call(xAxis).attr(`transform`, `translate(0, ${innerHeight})`);

  xAxisG.selectAll('.domain').remove();

  xAxisG
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 75)
    .attr('fill', 'black')
    .text(xAxisLabel);

  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('r', circleRadius);

  g.append('text').attr('y', -20).text(graphTitle);
}
