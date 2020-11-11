import 'regenerator-runtime/runtime';
import './../scss/main.scss';

// importing Utils
import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
import {
  capacityFilter,
  evCapacityFilter,
  maxVehicleFilter,
  garageLocations,
  parkingSpecs,
} from './utils/filters/receivingData';

// Importing Visuals
import { makeBar } from './utils/visuals/makeBar';
import { makeScat } from './utils/visuals/scat';

getData(endpoint1, endpoint2).then((rdwData) => {
  // New Data arrays to use in visuals
  const carCapacity = capacityFilter(rdwData);
  const evChargers = evCapacityFilter(rdwData);
  const maxDriveThrough = maxVehicleFilter(rdwData);
  const locations = garageLocations(rdwData);
  const parkingSpec = parkingSpecs(rdwData);

  // Logging the datasets
  console.log('shows capacity', carCapacity);
  console.log('shows ev-chargers', evChargers);
  console.log('shows drive-height', maxDriveThrough);
  console.log('shows locations', locations);

  // Visualizations
  makeBar(carCapacity);
  makeScat(parkingSpec);
});
