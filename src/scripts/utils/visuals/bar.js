import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } from 'd3';

export function makeBar(carCapacity) {
  const data = carCapacity;
  console.log(data);
  // const svg = select('body').append('svg').attr('width', 700).attr('height', 500);

  // const width = parseFloat(svg.attr('width'));
  // const height = parseFloat(svg.attr('height'));

  // const render = (data) => {
  //   const xValue = (d) => d.population;
  //   const yValue = (d) => d.country;
  //   const margin = { top: 60, right: 60, bottom: 40, left: 120 };
  //   const innerWidth = width - margin.left - margin.right;
  //   const innerHeight = height - margin.left - margin.right;

  //   const xScale = scaleLinear()
  //     .domain([0, max(data, xValue)])
  //     .range([0, innerWidth]);

  //   const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]).padding(0.2);

  //   const g = svg.append('g').attr(`transform`, `translate(${margin.left}, ${margin.top})`);

  //   const xAxisTickFormat = (number) => format('.3s')(number).replace('G', 'B');

  //   const xAxis = axisBottom(xScale).tickFormat(xAxisTickFormat).tickSize(-innerHeight);

  //   g.append('g').call(axisLeft(yScale)).selectAll('.domain, .tick line').remove();

  //   const xAxisG = g.append('g').call(xAxis).attr(`transform`, `translate(0, ${innerHeight})`);

  //   xAxisG.selectAll('.domain').remove();

  //   xAxisG
  //     .append('text')
  //     .attr('class', 'axis-label')
  //     .attr('x', innerWidth / 2)
  //     .attr('y', 60)
  //     .attr('fill', 'black')
  //     .text('Population');

  //   g.selectAll('rect')
  //     .data(data)
  //     .enter()
  //     .append('rect')
  //     .attr('y', (d) => yScale(yValue(d)))
  //     .attr('width', (d) => xScale(xValue(d)))
  //     .attr('height', yScale.bandwidth());

  //   g.append('text').attr('y', -10).text('Top 10 Most Populous Countries');
  // };

  // // Loads in data
  // json(carCapacity).then((data) => {
  //   console.log(data);
  //   data.forEach((d) => {
  //     d.population = +d.population * 1000;
  //   });
  //   render(data);
  // });
}
