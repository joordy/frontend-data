import 'regenerator-runtime/runtime';
import './../scss/main.scss';
import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
import { getAreaManager } from './utils/filters/data';

let selectedColumn = null;

getData(endpoint1, endpoint2).then((rdwData) => {
  console.log(rdwData);
  selectedColumn = 'areamanagerid';
  const areaManagersID = getAreaManager(rdwData, selectedColumn);
  console.log(areaManagersID);

  // let barchartResults = filterForBarChart(rdwData);
  // console.log(barchartResults);
});
