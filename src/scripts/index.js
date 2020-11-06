import 'regenerator-runtime/runtime';
import './../scss/main.scss';
// importing Utils
// import { makeMap } from './utils/visuals/map';
// import { locationMap } from './utils/visuals/locationMap';
import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
import { capacityFilter, evCapacityFilter, maxVehicleFilter, garageLocations } from './utils/filters/receivingData';

// let selectedColumn = null;

getData(endpoint1, endpoint2).then((rdwData) => {
  console.log(rdwData);

  const carCapacity = capacityFilter(rdwData);
  const evChargers = evCapacityFilter(rdwData);
  const maxDriveThrough = maxVehicleFilter(rdwData);
  const locations = garageLocations(rdwData);
  console.log('shows capacity', carCapacity);
  console.log('shows ev-chargers', evChargers);
  console.log('shows drive-height', maxDriveThrough);
  console.log('shows locations', locations);

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
