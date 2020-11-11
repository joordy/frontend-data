import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3';

export function makeScat(parkingSpec) {
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 500).classed('viz scatter', true);

  const props = {
    myData: parkingSpec.splice(0, 20),
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 100, b: 40, l: 320, r: 30 },
    xValue: (item) => item.carCapacity,
    yValue: (item) => item.itemDesc,
  };

  const inner = {
    height: props.height - props.margin.t - props.margin.b,
    width: props.width - props.margin.l - props.margin.r,
  };

  const scales = {
    xScale: scaleLinear() // Positioning the X-Scale
      .domain([0, max(props.myData.map(props.xValue))])
      .range([0, inner.width]),
    yScale: scaleBand() // Positioning the Y-Scale
      .domain(props.myData.map(props.yValue))
      .range([0, inner.height])
      .padding(0.2),
  };

  drawVisual(props, svg, scales, inner);
}
let drawVisual = (props, svg, scale, inner) => {
  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);

  console.log('a');
  group.append('g').call(axisLeft(scale.yScale));
  group.append('g').call(axisBottom(scale.xScale)).attr('transform', `translate(0, ${inner.height})`);

  group
    .selectAll('rect')
    .data(props.myData)
    .enter()
    .append('rect')
    .attr('y', (data) => scale.yScale(props.yValue(data)))
    .attr('width', (data) => scale.xScale(props.xValue(data)))
    .attr('height', scale.yScale.bandwidth());
};
