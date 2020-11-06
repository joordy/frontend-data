import 'regenerator-runtime/runtime';
import './../scss/main.scss';
// importing Utils
import { makeMap } from './utils/visuals/map';
import { endpoint1, endpoint2 } from './utils/config/endPoints';
import { getData } from './utils/config/getApi';
// import { getAreaManager } from './utils/filters/data';

// let selectedColumn = null;

getData(endpoint1, endpoint2).then((rdwData) => {
  console.log(rdwData);

  // function checkIfTrue() {
  //   rdwData.forEach((parkingSpecs) => {
  //     if (typeof parkingSpecs != undefined) {
  //       console.log('gotcha');
  //     }
  //   });
  // }
  // checkIfTrue();

  let filteredData = rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      long: item.location.longitude,
      parking: item.parkingSpecs.areaid,

      // parkingEV: item.parkingSpecs.chargingpointcapacity,
      // parking: item.parkingSpecs, // returned heel object
      // parkingCap: item.parkingSpecs, // onbereikbaar
    };
  });

  console.log(filteredData);

  // console.log(rdwData);
  // selectedColumn = 'areamanagerid';
  // const areaManagersID = getAreaManager(rdwData, selectedColumn);
  // console.log(areaManagersID);

  makeMap();
});
