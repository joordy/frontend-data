// Used code: https://vizhub.com/Razpudding/0e37e2146acf4a8db9a55f6f3509f090

import { scaleLinear, max, scaleBand, axisLeft, axisBottom, select } from 'd3';
import { countValues } from '../filters/receivingData';

// Declaring sizes of the SVG, group, inner sizes, etc.
const svg = select('#charts').append('svg').attr('width', 960).attr('height', 900);
const width = parseInt(svg.attr('width'));
const height = parseInt(svg.attr('height'));
const margin = { t: 100, r: 50, b: 80, l: 150 };
const innerW = width - margin.l - margin.r;
const innerH = height - margin.t - margin.b;
const group = svg.append('g').attr('transform', `translate(${margin.l}, ${margin.t})`);

// Updatable variables like X-value, scales, data, labels and graph title
let updatableValue = 'totalCapacity';
let valueY_Axis = (data) => data.name;
let valueX_Axis = (data) => data[updatableValue];
let labelAxisX = updatableValue;
let scaleAxis_Y = scaleBand().padding(0.1);
let scaleAxis_X = scaleLinear();
let myData;

// Head function-chain which exports to index.js, data is inserted here, and selected values injected from the DOM.
export function makeInterActiveBar(data) {
  const graphTitle = `Information about parking spots in the city`;
  let labelAxisY = 'Cities';

  // Fires function which merges cities together
  const filteredData = countValues(data);
  myData = filteredData.slice(0, 50);

  // Filter out only usable keys
  let selectedValues = Object.keys(myData[0]);
  selectedValues = selectedValues.filter((item) => item !== 'name');

  // Function-chain to draw the chart
  createUserInput(selectedValues);
  createScaling();
  createSkeleton(graphTitle, labelAxisX, labelAxisY);
  updateBars(0);
}

// Create updatable scales. Y-Axis is static, X-Axis is updatable
let createScaling = () => {
  scaleAxis_Y //
    .domain(myData.map(valueY_Axis))
    .range([0, innerH]);

  scaleAxis_X //
    .domain([0, max(myData, valueX_Axis)])
    .rangeRound([0, innerW]);
};

// Creating the core of the graph, with X & Y axis, graph title and labels
// This function is static. Cause the graph only needs to be draw once.
let createSkeleton = (graphTitle, labelAxisX, labelAxisY) => {
  group // Draws X-Axis
    .append('g')
    .classed('xAxis', true)
    .call(axisBottom(scaleAxis_X))
    .attr('transform', `translate(0, ${innerH})`)
    .selectAll('text')
    .attr('x', 10)
    .attr('y', 15)
    .attr('text-anchor', 'end');

  group // Draws Y-Axis
    .append('g')
    .classed('yAxis', true)
    .call(axisLeft(scaleAxis_Y).ticks(10));

  group // Y-Axis label
    .select('.yAxis')
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', -120)
    .attr('text-anchor', 'middle')
    .attr('x', -350)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .text(labelAxisY);

  group // X-Axis label
    .select('.xAxis')
    .append('text')
    .attr('class', 'axisLabel')
    .attr('y', 60)
    .attr('text-anchor', 'middle')
    .attr('x', innerW / 2)
    .attr('fill', 'black')
    .text(labelAxisX);

  group // Graph Title
    .append('text')
    .attr('class', 'graphTitle')
    .attr('y', -50)
    .attr('x', -125)
    .text(graphTitle);
};

// Draw bars, and updates the bar after .merge() when value changes.
// Sets width of bar to value of xScale
let updateBars = (num) => {
  let graphBars = group.selectAll('rect').data(myData);
  graphBars
    .enter()
    .append('rect')
    .merge(graphBars)
    .transition()
    .duration(num)
    .attr('class', 'graph__bars')
    .attr('x', 0)
    .attr('y', (data) => scaleAxis_Y(valueY_Axis(data)))
    .attr('height', scaleAxis_Y.bandwidth())
    .attr('width', (data) => scaleAxis_X(valueX_Axis(data)));
};

// Receives input from DOM > 4 options
// Fires createUpdate function
let createUserInput = (selectedValues) => {
  select('#form')
    .append('select')
    .on('change', createUpdate)
    .selectAll('option')
    .data(selectedValues)
    .enter()
    .append('option')
    .attr('value', (data) => data)
    .text((data) => data);
};

// Updates the bars, labels and axes
// Receives value from the DOM. which user gave, refires scaling of X value with new domain
// Fires UpdateBars function and updates the bottom Axis with new ticks and label.
function createUpdate() {
  updatableValue = this.value;
  // Fires scaling function to update value
  createScaling();
  // Changes X domain with updatableValue
  scaleAxis_X.domain([0, max(myData, valueX_Axis)]);
  // Draw bars again
  updateBars(1500);
  // Updates axis bottom
  group.select('.xAxis').transition().duration(500).call(axisBottom(scaleAxis_X));
  // Updates axis label
  group.select('.axisLabel').text(`${updatableValue}`);
}
