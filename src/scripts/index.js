import 'regenerator-runtime/runtime';
import './../scss/main.scss';
import { endpointOne, endpointTwo } from './modules/config/endPoints';
import { getApi } from './modules/config/getApi';
import { getAreaManager } from './modules/data/data.js';

let selectedColumn = null;

getApi(endpointOne).then((data) => {
  let locationData = data;
  console.log(locationData);
  return locationData;
});

getApi(endpointTwo).then((data) => {
  let specsData = data;
  console.log(specsData);
  return specsData;
});

// getApi().then((locationData, specsData) => {
//   selectedColumn = 'areaid';
//   const areaManagerID = getAreaManager(dataOne, selectedColumn);
//   console.log(areaManagerID);
// });

// getData(endpointTwo).then((data) => {
//   console.log('hello, data is loaded');
//   console.log(data);
// });

// async function getData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     err;
//   }
// }

// getData(endpointOne).then((data) => {
// selectedColumn = 'areaid';
// const areaManagerID = getAreaManager(data, selectedColumn);
// console.log(areaManagerID);

//   // console.log('hello, data is loaded');
//   // selectedColumn = 'areaid';
//   // const areaManagerID = getAreaManager(data, selectedColumn);
//   // console.log(areaManagerID);
// });

// Place all Area Manager ID's inside an new array
