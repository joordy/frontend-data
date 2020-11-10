import 'regenerator-runtime/runtime';
import './../scss/main.scss';

// importing Utils
import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
import { capacityFilter, evCapacityFilter, maxVehicleFilter, garageLocations } from './utils/filters/receivingData';

// Importing Visuals
import { makeBar } from './utils/visuals/makeBar';
import { makeScatterPlot } from './utils/visuals/makeScatterPlot';

// let selectedColumn = null;

getData(endpoint1, endpoint2).then((rdwData) => {
  // New Data arrays to use in visuals
  const carCapacity = capacityFilter(rdwData);
  const evChargers = evCapacityFilter(rdwData);
  const maxDriveThrough = maxVehicleFilter(rdwData);
  const locations = garageLocations(rdwData);
  console.log('shows capacity', carCapacity);
  console.log('shows ev-chargers', evChargers);
  console.log('shows drive-height', maxDriveThrough);
  console.log('shows locations', locations);

  // Visuals
  makeBar(carCapacity);
  makeScatterPlot(maxDriveThrough);

  //locationMap(locations);
  // console.log(filterCapacity);
  // function checkIfTrue() {
  //   rdwData.forEach((parkingSpecs) => {
  //     if (typeof parkingSpecs != undefined) {
  //       console.log('gotcha');
  //     }
  //   });
  // }
  // checkIfTrue();

  // console.log(rdwData);
  // selectedColumn = 'areamanagerid';
  // const areaManagersID = getAreaManager(rdwData, selectedColumn);
  // console.log(areaManagersID);

  // makeBar(carCapacity);
  //makeMap();
});
