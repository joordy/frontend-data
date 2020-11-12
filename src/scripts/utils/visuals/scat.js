import { select, scaleLinear, extent } from 'd3';
import { drawVisual, createAxis } from './helpers/scat';
import { chooseValue } from './helpers/changeVal';

export function makeScat(insertedDataset) {
  console.log(insertedDataset);

  const svg = select('#charts').append('svg').attr('width', 960).attr('height', 700).classed('viz scatter', true);
  /////////////////////////////////////////////////////////////////
  let xColumn;
  /////////////////////////////////////////////////////////////////

  const props = {
    // Object with properties about which dataset to use, width, height, margins, x and y values.
    myData: insertedDataset, //.splice(0, 150),
    title: 'Informatie parkeergarages in Nederland',
    height: parseInt(svg.attr('height')),
    width: parseInt(svg.attr('width')),
    margin: { t: 100, b: 100, l: 100, r: 30 },
    xValue: (item) => item[xColumn],
    xTitle: 'Aantallen',
    yValue: (item) => item.maxDriveThrough,
    yTitle: 'Doorrijhoogte',
  };
  const group = svg.append('g').attr('transform', `translate(${props.margin.l}, ${props.margin.t})`);
  const inner = {
    // Calculating inner-width based on props, so needs to be outside of it.
    height: props.height - props.margin.t - props.margin.b,
    width: props.width - props.margin.l - props.margin.r,
  };
  const scales = {
    // Creating the X and Y scales, based on the properties value.
    // Functions are reusable for other scales.
    scaleX: scaleLinear() // Positioning the X-Scale
      .domain(extent(props.myData, props.xValue))
      .range([0, inner.width])
      .nice(),
    scaleY: scaleLinear() // Positioning the Y-Scale
      .domain(extent(props.myData, props.yValue))
      .range([inner.height, 0])
      .nice(),
  };
  /////////////////////////////////////////////////////////////////

  let data;

  data = props.myData;

  const onxColumnClicked = (value) => {
    xColumn = value;
    console.log([xColumn]);
    drawVisual(data, scales, group);
  };

  chooseValue(select('#charts'), {
    options: Object.keys(data[0]),
    onValueClicked: onxColumnClicked,
  });

  console.log(props.xValue);
  /////////////////////////////////////////////////////////////////

  createAxis(props, scales, inner, group);
  drawVisual(props, scales, group);
}
