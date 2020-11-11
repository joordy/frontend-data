import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3';

export function makeBar(insertedDataset) {
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 1000).classed('viz scatter', true);

  const props = {
    // Object with properties about which dataset to use, width, height, margins, x and y values.
    myData: insertedDataset.splice(10, 40),
    title: 'Capaciteit parkeergarages Nederland',
    xTitle: 'Aantallen',
    yTitle: 'Parkeergarages Nederland',
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 60, b: 80, l: 350, r: 30 },
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
    scaleX: scaleLinear() // Positioning the X-Scale
      .domain([0, max(props.myData.map(props.xValue))])
      .range([0, inner.width]),
    scaleY: scaleBand() // Positioning the Y-Scale
      .domain(props.myData.map(props.yValue))
      .range([0, inner.height])
      .padding(0.2),
  };
  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);

  createAxis(props, scales, inner, group);
  drawVisual(props, scales, group);
}

const createAxis = (props, scale, inner, group) => {
  //  Y-Axis
  const yAxisG = group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(axisLeft(scale.scaleY));
  yAxisG
    .append('text')
    .classed('axisTitle', true)
    .attr('y', -330)
    .attr('x', -350)
    .attr('transform', 'rotate(-90)')
    .text(props.yTitle);

  // X-Axis
  const xAxis = axisBottom(scale.scaleX).tickSize(-inner.height);
  const xAxisG = group // Applying the bottom axis with values to the group element.
    .append('g')
    .call(xAxis);
  xAxisG
    .attr('transform', `translate(0, ${inner.height})`)
    .append('text')
    .classed('axisTitle', true)
    .attr('y', 50)
    .attr('x', inner.width / 2)
    .text(props.xTitle);

  // Graph Title
  group.append('text').classed('graphTitle', true).attr('y', -20).attr('x', -300).text(props.title);
};

const drawVisual = (props, scale, group) => {
  group
    .selectAll('rect')
    .data(props.myData)
    .enter()
    .append('rect')
    .attr('y', (data) => scale.scaleY(props.yValue(data)))
    .attr('width', 0)
    .attr('height', scale.scaleY.bandwidth())
    .merge(group)
    .on('click', () => {
      console.log('test');
    });

  group
    .selectAll('rect')
    .transition()
    .duration(1000)
    .attr('width', (data) => scale.scaleX(props.xValue(data)));
};

function placeToolTip(data) {
  return (data) => props.myData.map(props.xValue);
}
