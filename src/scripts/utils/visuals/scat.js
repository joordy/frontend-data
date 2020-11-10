import { select, range, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, descending } from 'd3';

import { view, inner } from './helpers/config';

export function makeScat(maxDriveThrough) {
  const svg = select('#charts')
    .append('svg')
    .attr('width', view.width)
    .attr('height', view.height)
    .classed('viz scatter', true);

  const props = {
    myData: maxDriveThrough.splice(0, 20),
    group: svg.append('g').attr('transform', `translate(${view.margin.l}, ${view.margin.t})`),
    y: scaleBand().padding(0.1),
    x: scaleLinear(),
    height: parseInt(svg.style('height'), 10) - view.margin.t - view.margin.b,
    width: parseInt(svg.style('width'), 10) - view.margin.l - view.margin.r,
  };

  setScaling(props);
  setAxes(props);
  drawVisual(props);
}

const setScaling = (props) => {
  // console.log('a');
  // console.log(props.myData);
  props.x.domain([0, max(props.myData.map((item) => item.evChargerCapacity))]);
  props.x.rangeRound([0, props.width]);
  props.y.domain(props.myData.map((item) => item.itemDesc));
  props.y.rangeRound([props.height, 0]);
};

const setAxes = (props) => {
  // console.log('b');
  // console.log(props);
  props.group
    .append('g')
    .attr('class', 'axis axis-x')
    .call(axisBottom(props.x))
    .attr('transform', 'translate(0,' + props.height + ')')
    .selectAll('text')
    //Note: There's prob a better way to do this...
    .attr('transform', 'rotate(45)')
    .attr('dx', 80)
    .attr('dy', '1em');

  props.group.append('g').attr('class', 'axis axis-y').call(axisLeft(props.y));
};

const drawVisual = (props) => {
  console.log('c');
  console.log(props);
  // const x = props.x;
  // const y = props.y;
  props.group
    .selectAll('rect')
    .data(props.myData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => props.x(d.maxDriveThrough))
    .attr('y', (d) => props.y(d.itemDesc))
    .attr('width', props.x.bandwidth())
    .attr('height', (d) => props.height - y(d.maxDriveThrough));
};
