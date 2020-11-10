import { select, scaleLinear, extent, axisLeft, axisBottom } from 'd3';

export function makeScatterPlot(maxDriveThrough) {
  console.log('hello');

  const data = maxDriveThrough;
  console.log(data);

  const width = 700;
  const height = 450;
  const margin = { top: 80, right: 60, bottom: 40, left: 120 };

  // Creating SVG
  const svg = select('#charts')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('viewBox', [0, 0, width, height])
    .classed('myBarChart', true);

  // const svg = select('svg');

  // const width = +svg.attr('width');
  // const height = +svg.attr('height');

  const graphTitle = 'DriveThrough height vs EV- charger capacity';
  const circleRadius = 5;
  const yValue = (d) => d.maxDriveThrough;
  const yAxisLabel = 'Drive-through height';
  const xValue = (d) => d.evChargerCapacity;
  const xAxisLabel = 'EV-chargers';
  //const margin = { top: 80, right: 60, bottom: 40, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.left - margin.right;

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();

  const yScale = scaleLinear().domain(extent(data, yValue)).range([0, innerHeight]).nice();

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

  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('r', circleRadius);

  g.append('text').attr('y', -20).text(graphTitle);
}
