// import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending, svg } from 'd3';
// import { svgSize, view } from './helpers/config';

// export function drawVisualization(parkingSpec) {
//   const svg = select('#charts')
//     .append('svg')
//     .attr('width', view.width)
//     .attr('height', view.height)
//     .classed('dataviz scat', true);

//   const props = {
//     myData: parkingSpec.splice(0, 15),
//     group: svg.append('g').attr('transform', `translate(${view.margin.l}, ${view.margin.t})`),
//     y: scaleBand(),
//     x: scaleLinear(),
//     width: parseInt(svg.style('height'), 10) - view.margin.t - view.margin.b,
//     height: parseInt(svg.style('width'), 10) - view.margin.l - view.margin.r,
//     innerHeight: height - view.margin.t - view.margin.b,
//     innerWidth: width - view.margin.l - view.margin.r,
//   };

//   console.log(props.width);
//   console.log(props.height);
//   console.log(props.innerHeight);
//   console.log(props.innerWidth);

//   setScaling(props);
//   setAxes(props);
//   drawVisual(props);
// }

// const setScaling = (props) => {
//   // props.y
//   //   .domain(props.myData.map((item) => item.itemDesc))
//   //   .range([0, innerHeight])
//   //   .padding(0.1);
//   // props.x.domain([0, max(props.myData.map((item) => item.carCapacity))]).range([0, innerWidth]);

//   props.x.domain([0, max(props.myData.map((item) => item.carCapacity))]).range([0, innerWidth]);
//   props.y.domain(props.myData.map((item) => item.itemDesc)).range([0]);
//   props.x.rangeRound([props.innerWidth, 0]);
//   props.y.rangeRound([0, props.innerHeight]);
// };
// const setAxes = (props) => {
//   props.group // X axis
//     .append('g')
//     .classed('axis axis-x', true)
//     .call(axisBottom(props.x))
//     .attr('transform', `translate(0, ${props.height})`)
//     .selectAll('text')
//     .attr('transform', 'rotate(90)')
//     .attr('dx', 80)
//     .attr('dy', '1em')
//     .attr('font-size', '10px');

//   props.group // Y axis
//     .append('g')
//     .classed('axis axis-y', true)
//     .call(axisLeft(props.y));
// };
// const drawVisual = (props) => {
//   props.group
//     .selectAll('rect')
//     .data(props.myData)
//     .enter()
//     .append('rect')
//     .classed('bar', true)
//     .attr('x', (d) => props.x(d.carCapacity))
//     .attr('y', (d) => props.y(d.itemDesc))
//     .attr('height', props.y.bandwidth())
//     .attr('width', (d) => props.innerWidth - props.x(d.carCapacity));
// };

//   console.log('joe');
//   const data = carCapacity.splice(0, 10);
//   // console.log(data);

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
// }

// function setUpScaling(data, x, y, svgSize) {
//   x.domain(range(data.length)).range([svgSize.m.l, svgSize.w - svgSize.m.r]);
//   y.domain([0, max(data, (d) => d.carCapacity)]).range([svgSize.h - svgSize.m.b, svgSize.m.t]);
// }

// function setUpAx(svg, data, x, y) {
//   svg
//     .append('g')
//     .attr('fill', 'royalblue')
//     .selectAll('rect')
//     .enter()
//     .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
//     .join('rect')
//     .attr('x', (d, i) => x(i))
//     .attr('y', (d) => y(d.carCapacity))
//     .attr('height', (d) => y(0) - y(d.carCapacity))
//     .attr('width', x.bandwidth());
// }

// // import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending, svg } from 'd3';
// // import { svgSize } from './helpers/svgsize';

// // export function drawVisualization(carCapacity) {
// //   console.log('joe');
// //   const data = carCapacity.splice(0, 10);
// //   console.log(data);

// //   const x = scaleBand().padding(0.1);
// //   const y = scaleLinear();
// //   const svg = select('#charts')
// //     .append('svg')
// //     .attr('width', svgSize.w - svgSize.m.l - svgSize.m.r)
// //     .attr('height', svgSize.h - svgSize.m.t - svgSize.m.b)
// //     .attr('viewBox', [0, 0, svgSize.w, svgSize.h])
// //     .classed('myBarChart', true);

// //   setUpScaling(data, x, y, svgSize);
// //   setUpAx(svg, data, x, y);
// //   drawBars(data, x, y);
// // }

// // function setUpScaling(data, x, y, svgSize) {
// //   x.domain(range(data.length)).range([svgSize.m.l, svgSize.w - svgSize.m.r]);
// //   y.domain([0, max(data, (d) => d.carCapacity)]).range([svgSize.h - svgSize.m.b, svgSize.m.t]);
// // }

// // function setUpAx(svg, data, x, y) {
// //   svg
// //     .append('g')
// //     .classed('axis axis-x', true)
// //     .call(axisBottom(x))
// //     .attr('transform', 'translate(0,' + svgSize.h + ')')
// //     .selectAll('text')
// //     .attr('transform', 'rotate(45)')
// //     .attr('dx', 0)
// //     .attr('dy', '1em');
// //   // .append('g')
// //   // .attr('fill', 'royalblue')
// //   // .selectAll('rect')
// //   // .enter()
// //   // .data(data.sort((a, b) => descending(a.carCapacity, b.carCapacity)))
// //   // .join('rect');
// //   // .attr('x', (d, i) => x(i))
// //   // .attr('y', (d) => y(d.carCapacity))
// //   // .attr('height', (d) => y(0) - y(d.carCapacity))
// //   // .attr('width', x.bandwidth());
// // }

// // function drawBars(data, x, y) {
// //   svg
// //     .selectAll('rect')
// //     .data(data)
// //     .enter()
// //     .append('rect')
// //     .classed('bar', true)
// //     .attr('x', (d, i) => x(i))
// //     .attr('y', (d) => y(d.carCapacity))
// //     .attr('height', (d) => y(0) - y(d.carCapacity))
// //     .attr('width', x.bandwidth());
// // }
