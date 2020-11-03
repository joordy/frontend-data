import 'regenerator-runtime/runtime';
import './../scss/main.scss';
import './../scss/utils/area.scss';

import { select, csv, scaleLinear, scaleTime, extent, axisLeft, axisBottom, area, curveBasis, max, format } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = (data) => {
  const graphTitle = 'World population';
  const circleRadius = 5;
  const yValue = (d) => d.population;
  const yAxisLabel = 'population';
  const xValue = (d) => d.year;
  const xAxisLabel = 'year';
  const margin = { top: 80, right: 60, bottom: 40, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.left - margin.right;

  const xScale = scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice();

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const g = svg.append('g').attr(`transform`, `translate(${margin.left}, ${margin.top})`);

  const yAxisTickFormat = (number) => format('.1s')(number).replace('G', 'B');

  const xAxis = axisBottom(xScale).ticks(6).tickSize(-innerHeight).tickPadding(20);

  const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10).tickFormat(yAxisTickFormat);
  //.tickSize(-innerWidth).tickPadding(5);

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

  const areaGenerator = area()
    .x((d) => xScale(xValue(d)))
    .y0(innerHeight)
    .y1((d) => yScale(yValue(d)))
    .curve(curveBasis);

  g.append('path').attr('class', 'line-path').attr('d', areaGenerator(data));

  svg
    .append('text')
    .attr('class', 'title')
    .attr('y', 60)
    .attr('x', width / 2)
    .text(graphTitle);
};

// Loads in data
csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv').then((data) => {
  data.forEach((d) => {
    d.population = +d.population;
    d.year = new Date(d.year);
  });
  render(data);
});

// https://vizhub.com/curran/datasets/world-population-by-year-2015.csv
