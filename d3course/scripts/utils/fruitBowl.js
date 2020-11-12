import { scaleOrdinal } from 'd3';

const colorScale = scaleOrdinal() //
  .domain(['apple', 'lemon'])
  .range(['#c11d1d', '#eae600']);

const radiusScale = scaleOrdinal() //
  .domain(['apple', 'lemon'])
  .range([50, 30]);

export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  const bowl = selection
    .selectAll('rect')
    .data([null])
    .enter()
    .append('rect')
    .attr('y', 110)
    .attr('width', 600)
    .attr('height', 300)
    .attr('rx', 400 / 2);

  const groups = selection
    .selectAll('g') // makes empty selection
    .data(fruits); // creates d3 data join with elements, pass in the data

  const groupsEnter = groups.enter().append('g');

  groupsEnter.merge(groups).attr(
    'transform',
    (d, i) => `translate(${i * 120 + 60}, ${height / 2})` // function for location
  );

  groups.exit().remove();

  groupsEnter
    .append('circle') // appends circle elements
    .merge(groups.select('circle'))
    .attr('r', (d) => radiusScale(d.type)) // radius
    .attr('fill', (d) => colorScale(d.type)); // fill color

  groupsEnter
    .append('text') // appends circle elements
    .merge(groups.select('text'))
    .attr('y', 120)
    .text((d) => d.type);
};

// Version with transition

// import { scaleOrdinal } from 'd3';

// const colorScale = scaleOrdinal() //
//   .domain(['apple', 'lemon'])
//   .range(['#c11d1d', '#eae600']);

// const radiusScale = scaleOrdinal() //
//   .domain(['apple', 'lemon'])
//   .range([50, 30]);

// const xPosition = (d, i) => i * 120 + 60;
// export const fruitBowl = (selection, props) => {
//   const { fruits, height } = props;

//   const circles = selection
//     .selectAll('circle') // makes empty selection
//     .data(fruits, (d) => d.id); // creates d3 data join with elements, pass in the data

//   circles
//     .enter() // returns data from .DATA
//     .append('circle') // appends circle elements
//     .attr('cx', xPosition) // width position
//     .attr('cy', height / 2) // height position
//     .attr('r', 0)

//     .merge(circles)
//     .attr('fill', (d) => colorScale(d.type)) // fill color

//     .transition()
//     .duration(1000)
//     .attr('cx', xPosition) // width position
//     .attr('r', (d) => radiusScale(d.type)); // radius

//   circles
//     .exit() // finished item
//     .transition()
//     .duration(1000)
//     .attr('r', 0)
//     .remove(); // removes item
// };
