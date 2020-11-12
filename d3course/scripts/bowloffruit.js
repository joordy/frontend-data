import 'regenerator-runtime/runtime';
import './../scss/main.scss';
import { fruitBowl } from './utils/fruitBowl';
import { select, range } from 'd3';

const svg = select('svg');

// Graph/viz

const makeFruit = (type) => ({ type, id: Math.random() });
let fruits = range(5).map(() => makeFruit('apple'));

const render = () => {
  fruitBowl(svg, {
    fruits,
    height: parseFloat(svg.attr('height')),
  });
};

render();

// Eat an apple
setTimeout(() => {
  fruits.pop();
  render();
}, 2000);

// Replacing an apple for lemon
setTimeout(() => {
  fruits[2].type = 'lemon';
  render();
}, 5000);

// Eat an 2nd apple
setTimeout(() => {
  fruits = fruits.filter((d, i) => i !== 1);
  render();
}, 7000);
