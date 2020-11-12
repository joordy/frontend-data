import { axisLeft, axisBottom } from 'd3';

export const createAxis = (props, scale, inner, group) => {
  //  Y-Axis
  const yAxis = axisLeft(scale.scaleY).tickSize(-inner.width).tickPadding(20);

  const yAxisG = group // Applying the left axis with parking names to the group element.
    .append('g')
    .call(yAxis);
  // .selectAll('.domain')
  // .remove();

  yAxisG
    .append('text')
    .classed('axisTitle', true)
    .attr('y', -70)
    .attr('x', -inner.height / 2)
    .attr('transform', 'rotate(-90)')
    .text(props.yTitle);

  // X-Axis
  const xAxis = axisBottom(scale.scaleX).tickSize(-inner.height).tickPadding(20);

  const xAxisG = group // Applying the bottom axis with values to the group element.
    .append('g')
    .call(xAxis);

  xAxisG
    .attr('transform', `translate(0, ${inner.height})`)
    .append('text')
    .classed('axisTitle', true)
    .attr('y', 70)
    .attr('x', inner.width / 2)
    .text(props.xTitle);

  // Graph Title
  group.append('text').classed('graphTitle', true).attr('y', -40).attr('x', -30).text(props.title);
};

export const drawVisual = (props, scale, group) => {
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
    .duration(3000)
    .attr('cx', (data) => scale.scaleX(props.xValue(data)))
    .delay(1000);
};
