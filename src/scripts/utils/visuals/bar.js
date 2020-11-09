// import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending } from 'd3';

// export function makeBar(carCapacity) {
//   console.log('Loads bar');

//   // Graph data
//   const data = carCapacity.splice(0, 10);
//   console.log(data);

//   // sizes
//   const width = 800;
//   const height = 450;
//   const margin = { top: 50, bottom: 50, left: 50, right: 50 };

//   // Creating SVG
//   const svg = select('#charts')
//     .append('svg')
//     .attr('width', width - margin.left - margin.right)
//     .attr('height', height - margin.top - margin.bottom)
//     .attr('viewBox', [0, 0, width, height]);

//   // X axis
//   const xValue = scaleBand()
//     .domain(range(data.length))
//     .range([margin.left, width - margin.right])
//     .padding(0.1);

//   // Y axis
//   const yValue = scaleLinear()
//     .domain([0, max(data, (d) => d.carCapacity)])
//     .range([height - margin.bottom, margin.top]);

//   svg
//     .append('g')
//     .attr('fill', 'royalblue')
//     .selectAll('rect')
//     .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
//     .join('rect')
//     .attr('x', (d, i) => xValue(i))
//     .attr('y', (d) => yValue(d.carCapacity))
//     .attr('height', (d) => yValue(0) - yValue(d.carCapacity))
//     .attr('width', xValue.bandwidth())
//     .attr('class', 'rectangle');

//   // const xAxis = (g) => {
//   //   g.attr('transform', `translate(0 ${height - margin.bottom})`)
//   //   // g.attr('transform', 'translate(-10,0)rotate(-45)').style('text-anchor', 'end');
//   //   g.call(axisBottom(xValue).tickFormat((i) => data[i].itemID));
//   // };

//   // const yAxis = (g) => {
//   //   g.attr('transform', `translate(${margin.left}, 0)`).call(axisLeft(yValue)).ticks(null, data.format);
//   // };
//   // svg.append('g').call(yAxis);
//   // svg.append('g').call(xAxis);
//   svg.node();
// }

// export function dddd(carCapacity) {
//   const data = carCapacity.splice(0, 10);
//   console.log(data);

//   const svg = select('#barOne').append('svg').attr('width', 800).attr('height', 400);
//   // .attr('viewBox', [0, 0, width, height]);

//   const xValue = (data) => data.carCapacity;
//   const yValue = (data) => data.itemDesc;

//   const width = parseFloat(svg.attr('width'));
//   const height = parseFloat(svg.attr('height'));
//   const margin = { top: 50, right: 50, bottom: 50, left: 50 };

//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.left - margin.right;

//   const xScale = scaleLinear() // x axle
//     .domain([0, max(data, xValue)])
//     .range([0, innerWidth]);

//   const yScale = scaleBand() // y axle
//     .domain(data.map(yValue))
//     .range([0, innerHeight])
//     .padding(0.2);

//   const g = svg // elements
//     .append('g')
//     .attr(`transform`, `translate(${margin.left}, ${margin.top})`);

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
// }
