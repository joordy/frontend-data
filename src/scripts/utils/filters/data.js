export function getAreaManager(dataArray, key) {
  return dataArray.map((item) => item[key]);
}

// export function filterForBarChart(dataArray) {
//   return dataArray.map((item) => {
//     return {
//       areaDesc: item.areadesc,
//       parkingSpecs: {
//         carCapacity: item.parkingSpecs.capacity,
//       },
//       // parkingSpecs: {
//       //   capacity: item.parkingSpecs.capacity,
//       //   disabledAcces: item.parkingSpecs.disabledaccess,
//       //   chargingPoints: item.parkingSpecs.chargingpointcapacity,
//       // },
//     };
//   });
// }
