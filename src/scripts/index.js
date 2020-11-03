import 'regenerator-runtime/runtime';
import './../scss/main.scss';

// const corsURL = 'https://cors-anywhere.herokuapp.com/';
// const nprURL = 'https://npropendata.rdw.nl/parkingdata/v2/';

// //
// const nprData = d3.json(corsURL + nprURL).then((data) => {
//   console.log(data);
//   return data;
// });

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const overviewUrl = 'https://npropendata.rdw.nl/parkingdata/v2/';
const dataSource1 = 'https://npropendata.rdw.nl//parkingdata/v2/static/1208d277-9367-4c5b-8d90-611afaf92086';
const dataSource2 = 'https://npropendata.rdw.nl//parkingdata/v2/static/fc749565-1fe9-42f0-920a-3b4e718d62f9';

const parkingLocationsOverview = d3.json(proxyUrl + overviewUrl).then((locationsOverview) => {
  console.log('locationsoverview', locationsOverview);
  //Let's continue with just 10 items
  //Why do you think I won't use splice here?
  const allParkingLocations = locationsOverview.ParkingFacilities;
  const selection = locationsOverview.ParkingFacilities.slice(0, 10);
  console.log('firstTen', selection);
  const firstTenIDs = selection.map((parkingLocation) => parkingLocation.identifier);
  console.log(allParkingLocations);
  // const allAmsterdamLocations = allParkingLocations.filter((parkingLocation) => {
  //   if (!parkingLocation.name) return false;
  //   parkingLocation.name.includes('Amsterdam');
  // });
  console.log(allAmsterdamLocations);
});

//Let's get the first bit of data
const data1 = d3.json(proxyUrl + dataSource1).then((data) => {
  //If we don't return the data, the promise will resolve to undefined!
  return data;
});

//Let's get the second bit of data
const data2 = d3.json(proxyUrl + dataSource2).then((data) => {
  return data;
});

//How can we combine this data?
//We first need to wait for both pieces
Promise.all([data1, data2]).then((results) => {
  console.log(results);
  //d3 ga visualiseren
});

// //Let's get the second bit of data
// const data2 = d3.json(proxyUrl + dataSource2)
// 	.then(data => {
//  		return data
// })

// //How can we combine this data?
// //We first need to wait for both pieces
// Promise.all([data1, data2])
//   .then(results => {
//   	console.log(results)
//   	//d3 ga visualiseren
// })

// const dataSource2 = 'https://npropendata.rdw.nl//parkingdata/v2/static/fc749565-1fe9-42f0-920a-3b4e718d62f9';

// const data1 = d3.json(corsURL + dataSource1).then((data) => {
//   return data;
// });

// const data2 = d3.json(corsURL + dataSource2).then((data) => {
//   return data;
// });

// import { endpointOne } from './modules/config/endPoints';
// import { getApiData } from './modules/config/getApi';
// // import { getAreaManager } from './modules/data/data.js';

// let selectedColumn = null;

// getApiData(endpointOne).then((data) => {
//   let locationData = data;
//   console.log(locationData);
//   return locationData;
// });

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
