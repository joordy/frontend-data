import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending } from 'd3';

export function makeBar(carCapacity) {
  console.log('Loads bar');

  // Graph data
  const data = carCapacity.splice(0, 300);
  console.log(data);

  // sizes
  const width = 700;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  // Creating SVG
  const svg = select('#charts')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('viewBox', [0, 0, width, height])
    .classed('myBarChart', true);
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
    .enter()
    .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
    .join('rect')
    .attr('x', (d, i) => xValue(i))
    .attr('y', (d) => yValue(d.carCapacity))
    .attr('height', (d) => yValue(0) - yValue(d.carCapacity))
    .attr('width', xValue.bandwidth());

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
  // svg.node();
}

// export function makeBar(carCapac) {
//   console.log('bar loads');

//   // Graph data
//   const myData = carCapac.splice(0, 100);
//   console.log(myData);

//   const bar = select('#charts').data(myData).classed('myBarChart', true);

//   bar.selectAll('rect').data(myData).enter();
// }

// import { select } from 'd3';

// export function makeBar(carCapacity) {
//   // Template from https://bl.ocks.org/mbostock/3885304
//   const svg = select('svg');
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = parseFloat(svg.attr('width') - margin.left - margin.right);
//   const height = parseFloat(svg.attr('height') - margin.top - margin.bottom);

//   //Generates a categorical x axis and a numeric y axis
//   var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);

//   //Generates chart container that is adjusted by margin parameters
//   var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//   //Reads data from tsv
//   d3.tsv(
//     'data.tsv',
//     function (d) {
//       //set up your data transforms here
//       d.name = '';
//       d.value = +0;
//       return d;
//     },
//     function (error, data) {
//       if (error) throw error;

//       //Sets categorical x domain based on given column
//       x.domain(
//         data.map(function (d) {
//           return d.name;
//         })
//       );
//       y.domain([
//         0,
//         d3.max(data, function (d) {
//           return d.value;
//         }),
//       ]);

//       //Draw x axis and adjust for container size
//       g.append('g')
//         .attr('class', 'axis axis--x')
//         .attr('transform', 'translate(0,' + height + ')')
//         .call(d3.axisBottom(x));
//       //Draw y axis with various styling and transforms
//       g.append('g')
//         .attr('class', 'axis axis--y')
//         .call(d3.axisLeft(y).ticks(10, '%'))
//         .append('text')
//         .attr('transform', 'rotate(-90)')
//         .attr('y', 6)
//         .attr('dy', '0.71em')
//         .attr('text-anchor', 'end')
//         .text('Value');
//       //Draw bars for each name and value in data
//       g.selectAll('.bar')
//         .data(data)
//         .enter()
//         .append('rect')
//         .attr('class', 'bar')
//         .attr('x', function (d) {
//           return x(d.name);
//         })
//         .attr('y', function (d) {
//           return y(d.value);
//         })
//         .attr('width', x.bandwidth())
//         .attr('height', function (d) {
//           return height - y(d.value);
//         }); //draws bars on screen from top to bottom
//     }
//   );
// }
