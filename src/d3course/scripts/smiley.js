import './../scss/main.scss';

import { select, arc } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
const eyeSpacing = 70;
const eyeOffset = -50;
const eyeHeight = 40;
const eyebrowWidth = 70;
const eyebrowHeight = 15;
const eyebrowYOffset = -70;

const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

const circle = g
  .append('circle')
  .attr('r', height / 2.5)
  .attr('fill', 'yellow')
  .attr('stroke', 'black');

const eyesG = g.append('g').attr('transform', `translate(0, ${eyeOffset})`);

const leftEye = eyesG.append('circle').attr('r', eyeHeight).attr('cx', -eyeSpacing);

const rightEye = eyesG
  .append('circle')
  .attr('r', eyeHeight)
  .attr('cx', +eyeSpacing);

const eyebrowsG = eyesG.append('g').attr('transform', `translate(0, ${eyebrowYOffset})`);

eyebrowsG
  .transition()
  .duration(1000)
  .attr('transform', `translate(0, ${eyebrowYOffset - 40})`)
  .transition()
  .duration(1000)
  .attr('transform', `translate(0, ${eyebrowYOffset})`);

const leftEyebrow = eyebrowsG
  .append('rect')
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)
  .attr('x', -eyeSpacing - eyebrowWidth / 2);

const rightEyebrow = eyebrowsG
  .append('rect')
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)
  .attr('x', eyeSpacing - eyebrowWidth / 2);

const mouth = g.append('path').attr(
  'd',
  arc()({
    innerRadius: 150,
    outerRadius: 160,
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  })
);
