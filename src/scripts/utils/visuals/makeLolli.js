import { select, scaleLinear, scaleBand, max } from 'd3';
import { drawVisual, createAxis } from './helpers/lolly';

// Global function with all the variables, data, and
// calling the functions for making the visualization
export function makeLolly(insertedDataset) {
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 1000).classed('viz scatter', true);

  // Object with properties about which dataset to use, width,
  // height, margins, x and y values.
  const props = {
    myData: insertedDataset.splice(10, 40),
    title: 'Capaciteit parkeergarages Nederland',
    xTitle: 'Aantallen',
    yTitle: 'Parkeergarages Nederland',
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 140, b: 80, l: 350, r: 30 },
    xValue: (item) => item.carCapacity,
    yValue: (item) => item.itemDesc,
  };
  // Calculating inner-width based on props, so needs to be outside of it.
  const inner = {
    height: props.height - props.margin.t - props.margin.b,
    width: props.width - props.margin.l - props.margin.r,
  };

  // Creating the X and Y scales, based on the properties value.
  // Functions are reusable for other scales.
  const scales = {
    scaleX: scaleLinear() // Positioning the X-Scale
      .domain([0, max(props.myData.map(props.xValue))])
      .range([0, inner.width]),
    scaleY: scaleBand() // Positioning the Y-Scale
      .domain(props.myData.map(props.yValue))
      .range([0, inner.height])
      .padding(1),
  };

  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);

  // Calling functions
  createAxis(props, scales, inner, group);
  drawVisual(props, scales, group);
}
