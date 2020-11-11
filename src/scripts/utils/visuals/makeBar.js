import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3';

export function makeBar(parkingSpec) {
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 500).classed('viz scatter', true);

  const props = {
    // Object with properties about which dataset to use, width, height, margins, x and y values.
    myData: parkingSpec.splice(0, 20),
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 100, b: 40, l: 320, r: 30 },
    xValue: (item) => item.carCapacity,
    yValue: (item) => item.itemDesc,
  };

  const inner = {
    // Calculating inner-width based on props, so needs to be outside of it.
    height: props.height - props.margin.t - props.margin.b,
    width: props.width - props.margin.l - props.margin.r,
  };

  const scales = {
    // Creating the X and Y scales, based on the properties value.
    // Functions are reusable for other scales.
    xScale: scaleLinear() // Positioning the X-Scale
      .domain([0, max(props.myData.map(props.xValue))])
      .range([0, inner.width]),
    yScale: scaleBand() // Positioning the Y-Scale
      .domain(props.myData.map(props.yValue))
      .range([0, inner.height])
      .padding(0.2),
  };
  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);

  createAxis(scales, inner, group);
  drawVisual(props, scales, group);
}

const createAxis = (scale, inner, group) => {
  group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(axisLeft(scale.yScale));
  group // Applying the bottom axis with values to the group element.
    .append('g')
    .call(axisBottom(scale.xScale))
    .attr('transform', `translate(0, ${inner.height})`);
};

const drawVisual = (props, scale, group) => {
  group
    .selectAll('rect')
    .data(props.myData)
    .enter()
    .append('rect')
    .attr('y', (data) => scale.yScale(props.yValue(data)))
    .attr('width', (data) => scale.xScale(props.xValue(data)))
    .attr('height', scale.yScale.bandwidth());
};
