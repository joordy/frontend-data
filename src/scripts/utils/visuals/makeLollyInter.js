import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom, svg } from 'd3';

// Global function with all the variables, data, and
// calling the functions for making the visualization
export function makeLollyInteractive(insertedDataset) {
  //
  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 700).classed('viz lollyInter', true);

  // Object with properties about which dataset to use, width,
  // height, margins, x and y values.
  const props = {
    myData: insertedDataset.splice(50, 30),
    title: 'Capaciteit parkeergarages Nederland',
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 80, b: 80, l: 360, r: 30 },
  };

  //
  let innerHeight = props.height - props.margin.t - props.margin.b;
  let innerWidth = props.width - props.margin.l - props.margin.r;
  let endPoint = 'carCapacity';
  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);

  //
  const scaleX = scaleLinear()
    .domain([0, max(props.myData, (item) => item[endPoint])])
    .rangeRound([0, innerWidth])
    .nice();
  const scaleY = scaleBand()
    .domain(props.myData.map((item) => item.itemDesc))
    .rangeRound([0, innerHeight])
    .padding(1);
  const xAxis = axisBottom(scaleX).tickSize(-innerHeight);

  // Calling functions
  createAxis(props, scaleY, group, innerHeight, innerWidth, xAxis);
  createViz(endPoint, group, props, scaleX, scaleY, xAxis);

  select('#carCap').on('click', (endPoint) => {
    endPoint = 'carCapacity';
    svg.selectAll('.lollyLine').remove();
    svg.selectAll('.lollyCircle').remove();
    scaleX.domain([0, max(props.myData, (item) => item[endPoint])]);

    createViz(endPoint, group, props, scaleX, scaleY, xAxis);
  });

  select('#evCap').on('click', (endPoint) => {
    endPoint = 'evChargerCapacity';
    svg.selectAll('.lollyLine').remove();
    svg.selectAll('.lollyCircle').remove();
    scaleX.domain([0, max(props.myData, (item) => item[endPoint])]);
    createViz(endPoint, group, props, scaleX, scaleY, xAxis);
  });

  select('#driveThrough').on('click', (endPoint) => {
    endPoint = 'maxDriveThrough';
    svg.selectAll('.lollyLine').remove();
    svg.selectAll('.lollyCircle').remove();
    scaleX.domain([0, max(props.myData, (item) => item[endPoint])]);
    createViz(endPoint, group, props, scaleX, scaleY, xAxis);
  });
}

function createAxis(props, scaleY, group, innerHeight, innerWidth, xAxis) {
  //  Y-Axis
  const yAxisG = group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(axisLeft(scaleY))
    .attr('class', 'Y-axis')
    .selectAll('.domain, line')
    .remove();

  // X-Axis
  const xAxisG = group // Applying the bottom axis with values to the group element.
    .append('g')
    .call(xAxis)
    .attr('class', 'X-axis')
    .attr('transform', `translate(0, ${innerHeight})`);

  // X-Axis Title
  group
    .append('text')
    .classed('xTitle', true)
    .attr('y', innerHeight + 50)
    .attr('x', innerWidth / 2)
    .text('Aantallen');

  // Y-Axis Title
  group
    .append('text')
    .classed('yTitle', true)
    .attr('transform', 'rotate(-90)')
    .attr('y', -330)
    .attr('x', -350)
    .text('Parkeergarages in Nederland');

  // Graph Title
  group.append('text').classed('graphTitle', true).attr('y', -20).attr('x', -340).text(props.title);
}

function createViz(selectedEndPoint, group, props, scaleX, scaleY, xAxis) {
  const lines = group.selectAll('lines').data(props.myData);
  const circles = group.selectAll('circles').data(props.myData);

  select('.X-axis').call(xAxis);

  lines
    .enter()
    .append('line')
    .classed('lollyLine', true)
    .merge(lines)
    .attr('x1', (parking) => scaleX(parking[selectedEndPoint]))
    .attr('x2', 0)
    .attr('y1', (parking) => scaleY(parking.itemDesc))
    .attr('y2', (parking) => scaleY(parking.itemDesc));

  circles
    .enter()
    .append('circle')
    .classed('lollyCircle', true)
    .merge(circles)
    .attr('r', '10')
    .attr('cx', (parking) => scaleX(parking[selectedEndPoint]))
    .attr('cy', (parking) => scaleY(parking.itemDesc));
}
