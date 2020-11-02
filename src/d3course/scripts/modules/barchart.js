import { select, csv } from 'd3';

export default function barChart() {
  const svg = select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  csv('./data/population.csv').then((data) => {
    console.log(data);
  });
}
