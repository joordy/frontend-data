import 'regenerator-runtime/runtime';
import './../scss/main.scss';
import './../scss/utils/line.scss';

import { select, csv, scaleLinear, scaleTime, extent, axisLeft, axisBottom, line, curveBasis } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = (data) => {
  const graphTitle = 'A week in San francisco';
  const circleRadius = 5;
  const yValue = (d) => d.temperature;
  const yAxisLabel = 'Temparature';
  const xValue = (d) => d.timestamp;
  const xAxisLabel = 'Time';
  const margin = { top: 80, right: 60, bottom: 40, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.left - margin.right;

  const xScale = scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice();
  const yScale = scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

  const g = svg.append('g').attr(`transform`, `translate(${margin.left}, ${margin.top})`);

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

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveBasis);

  g.append('path').attr('class', 'line-path').attr('d', lineGenerator(data));

  g.append('text').attr('y', -20).text(graphTitle);
};

// Loads in data
csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then((data) => {
  data.forEach((d) => {
    d.timestamp = new Date(d.timestamp);
    d.temperature = +d.temperature;
  });
  render(data);
});
