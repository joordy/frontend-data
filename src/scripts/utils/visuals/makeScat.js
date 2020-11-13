import { select, scaleLinear, extent, axisLeft, axisBottom } from 'd3';

export function makeScat(insertedDataset) {
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 700).classed('viz scatter', true);
  const props = {
    // Object with properties about which dataset to use, width, height, margins, x and y values.
    myData: insertedDataset,
    title: 'Informatie parkeergarages in Nederland',
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 100, b: 100, l: 100, r: 30 },
    xValue: (item) => item.carCapacity,
    yValue: (item) => item.maxDriveThrough,
  };

  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);
  const inner = {
    height: props.height - props.margin.t - props.margin.b,
    width: props.width - props.margin.l - props.margin.r,
  };
  // Creating the X and Y scales, based on the properties value.
  // Functions are reusable for other scales.

  const scales = {
    scaleX: scaleLinear() // Positioning the X-Scale
      .domain(extent(props.myData, props.xValue))
      .range([0, inner.width])
      .nice(),

    scaleY: scaleLinear() // Positioning the Y-Scale
      .domain(extent(props.myData, props.yValue))
      .range([inner.height, 0])
      .nice(),
  };
  createAxis(props, scales, inner, group);
  drawVisual(props, scales, group);
}

const createAxis = (props, scale, inner, group) => {
  //  Y-Axis
  const yAxis = axisLeft(scale.scaleY).tickSize(-inner.width).tickPadding(20);
  const yAxisG = group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(yAxis);
  // .selectAll('.domain')
  // .remove();

  // yAxisG
  //   .append('text')
  //   .classed('axisTitle', true)
  //   .attr('y', -70)
  //   .attr('x', -inner.height / 2)
  //   .attr('transform', 'rotate(-90)')
  //   .text(props.yTitle);

  // X-Axis
  const xAxis = axisBottom(scale.scaleX).tickSize(-inner.height).tickPadding(20);
  const xAxisG = group // Applying the bottom axis with values to the group element.
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${inner.height})`);

  // xAxisG
  //   .attr('transform', `translate(0, ${inner.height})`)
  //   .append('text')
  //   .classed('axisTitle', true)
  //   .attr('transform', `translate(0,0)`)
  //   .attr('y', 70)
  //   .attr('x', inner.width / 2)
  //   .text('Aantallen');

  // X-Axis Title
  group
    .append('text')
    .classed('xTitle', true)
    .attr('y', innerHeight - 300)
    .attr('x', innerWidth / 4)
    .text('Aantal Parkeerplekken');

  // Y-Axis Title
  group
    .append('text')
    .classed('yTitle', true)
    .attr('transform', 'rotate(-90)')
    .attr('y', -70)
    .attr('x', -310)
    .text('Door-rij hoogte');

  // Graph Title
  group //
    .append('text')
    .classed('graphTitle', true)
    .attr('y', -40)
    .attr('x', -30)
    .text(props.title);
};

const drawVisual = (props, scale, group) => {
  group
    .selectAll('circle')
    .data(props.myData)
    .enter()
    .append('circle')
    .attr('cy', (data) => scale.scaleY(props.yValue(data)))
    .attr('cx', 0)
    .attr('r', 10)
    .merge(group)
    .on('click', () => {
      console.log('test');
    });

  group
    .selectAll('circle')
    .transition()
    .duration(2000)
    .delay(2000)
    .attr('cx', (data) => scale.scaleX(props.xValue(data)));
};
