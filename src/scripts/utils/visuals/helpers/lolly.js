import { axisLeft, axisBottom } from 'd3';

// Function to write the axes, with the
// @params props, scale, inner & group
export const createAxis = (props, scale, inner, group) => {
  //  Y-Axis
  const yAxisG = group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(axisLeft(scale.scaleY))
    .selectAll('.domain, line')
    .remove();

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

// Function to draw the visualisation, with
// the @params props, scale & group
export const drawVisual = (props, scale, group) => {
  group
    .selectAll('lines')
    .data(props.myData)
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', (data) => scale.scaleY(props.yValue(data)))
    .attr('y2', (data) => scale.scaleY(props.yValue(data)))
    .classed('lolliLine', true);

  group
    .selectAll('circles')
    .data(props.myData)
    .enter()
    .append('circle')
    .attr('cx', 0)
    .attr('cy', (data) => scale.scaleY(props.yValue(data)))
    .classed('lolliCircle', true)
    .attr('r', '10');

  group
    .selectAll('circle')
    .transition()
    .duration(1500)
    .attr('cx', (data) => scale.scaleX(props.xValue(data)));

  group
    .selectAll('line')
    .transition()
    .duration(1500)
    .attr('x1', (data) => scale.scaleX(props.xValue(data)));
};
