import './../scss/index.scss';
import { endpoint } from './modules/getData';
console.log('hello');

let selectedColumn = null;

getData(endpoint).then((data) => {
  console.log('hello, data is loaded');
  console.log(data);
  selectedColumn = 'areaid';
  const areaManagerID = getAreaManager(data, selectedColumn);
  console.log(areaManagerID);
});

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    err;
  }
}

// Place all Area Manager ID's inside an new array
function getAreaManager(dataArray, key) {
  return dataArray.map((item) => item[key]);
}
