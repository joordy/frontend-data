import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending } from 'd3';

export function makeBar(carCapacity) {
  console.log('Loads bar');

  // Graph data
  const data = carCapacity.splice(0, 10);
  console.log(data);

  // sizes
  const width = 800;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  // Creating SVG
  const svg = select('#charts')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('viewBox', [0, 0, width, height]);

  // X axis
  const xValue = scaleBand()
    .domain(range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // Y axis
  const yValue = scaleLinear()
    .domain([0, max(data, (d) => d.carCapacity)])
    .range([height - margin.bottom, margin.top]);

  svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
    .join('rect')
    .attr('x', (d, i) => xValue(i))
    .attr('y', (d) => yValue(d.carCapacity))
    .attr('height', (d) => yValue(0) - yValue(d.carCapacity))
    .attr('width', xValue.bandwidth())
    .attr('class', 'rectangle');

  // const xAxis = (g) => {
  //   g.attr('transform', `translate(0 ${height - margin.bottom})`)
  //   // g.attr('transform', 'translate(-10,0)rotate(-45)').style('text-anchor', 'end');
  //   g.call(axisBottom(xValue).tickFormat((i) => data[i].itemID));
  // };

  // const yAxis = (g) => {
  //   g.attr('transform', `translate(${margin.left}, 0)`).call(axisLeft(yValue)).ticks(null, data.format);
  // };
  // svg.append('g').call(yAxis);
  // svg.append('g').call(xAxis);
  svg.node();
}