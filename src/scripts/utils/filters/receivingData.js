// Special thanks to Gijs Laarman for helping me out with the operators.

export let capacityFilter = (rdwData) => {
  return rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      carCapacity: parseInt(item.parkingSpecs && item.parkingSpecs.capacity ? item.parkingSpecs.capacity : undefined),
    };
  });
};

export let evCapacityFilter = (rdwData) => {
  return rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      evChargerCapacity: parseInt(
        item.parkingSpecs && item.parkingSpecs.chargingpointcapacity
          ? item.parkingSpecs.chargingpointcapacity
          : undefined
      ),
    };
  });
};

export let maxVehicleFilter = (rdwData) => {
  return rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      evChargerCapacity: parseInt(
        item.parkingSpecs && item.parkingSpecs.chargingpointcapacity
          ? item.parkingSpecs.chargingpointcapacity
          : undefined
      ),
      maxDriveThrough: parseInt(
        item.parkingSpecs && item.parkingSpecs.maximumvehicleheight ? item.parkingSpecs.maximumvehicleheight : undefined
      ),
    };
  });
};

export let parkingSpecs = (rdwData) => {
  return rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      carCapacity: parseInt(item.parkingSpecs && item.parkingSpecs.capacity ? item.parkingSpecs.capacity : 0),
      evChargerCapacity: parseInt(
        item.parkingSpecs && item.parkingSpecs.chargingpointcapacity ? item.parkingSpecs.chargingpointcapacity : 0
      ),
      maxDriveThrough: getMaxDrive(
        item.parkingSpecs && item.parkingSpecs.maximumvehicleheight ? item.parkingSpecs.maximumvehicleheight : 0
      ),
      city: item.areadesc ? getCityName(item.areadesc) : undefined,
    };
  });
};
// Give maxDriveThrough average size when number is 0.
const getMaxDrive = (item) => {
  if (item === 0) {
    return parseInt(400);
  } else if (item === undefined) {
    return parseInt(400);
  } else {
    return parseInt(item);
  }
};
export let garageLocations = (rdwData) => {
  return rdwData.map((item) => {
    return {
      itemDesc: item.areadesc,
      itemID: item.areaid,
      lat: parseFloat(item.location.latitude),
      long: parseFloat(item.location.longitude),
    };
  });
};

// Gets name between the '( )' and place it inside an new object value.
// Used source:  https://stackoverflow.com/questions/49676897/javascript-es6-count-duplicates-to-an-array-of-objects && help of @lars-ruijs
const getCityName = (parkingName) => {
  let regex = /\(/g;
  const checker = regex.test(parkingName);
  if (checker === true) {
    let name = parkingName;
    let regPattern = /\(([^)]+)\)/;
    let cityname = regPattern.exec(name)[1];
    return cityname.toLowerCase();
  } else {
    return null;
  }
};

// Merges all the usable variables for barchart together
export const countValues = (dataset) => {
  const newData = filterCities(dataset);
  const finalData = mergeDataCity(dataset, newData);
  return finalData;
};

// Filter the cities on unique ones, goes from 355 to 86.
const filterCities = (dataset) => {
  let newData = [];
  dataset.forEach((item) => {
    let i = newData.findIndex((x) => x.cityName == item.city);
    if (i <= -1) {
      newData.push({ cityName: item.city });
    }
  });
  return newData;
};

const mergeDataCity = (dataset, newData) => {
  const allCities = dataset.map((item) => item.city);
  const uniqueCities = newData.map((item) => item.cityName);
  const allData = createObj(uniqueCities);
  parseInfo(allData, dataset, allCities);
  return allData;
};

const createObj = (allCities) => {
  let countObj;
  return allCities.map((city) => {
    return (countObj = {
      name: city,
      totalCapacity: 0,
      avgDriveThrough: 0,
      chargingPoints: 0,
      totalGarage: 0,
    });
  });
};

const parseInfo = (a, dataset, allCities) => {
  let num1;
  let cityCount;
  let avg;
  let num2;
  a.forEach((obj) => {
    num1 = 0;
    cityCount = 0;
    avg = 0;
    num2 = 0;
    dataset.forEach((totalObj) => {
      if (obj.name === totalObj.city) {
        num1 += totalObj.carCapacity;
        avg += totalObj.maxDriveThrough;
        num2 += totalObj.evChargerCapacity;
        cityCount++;
      }
    });
    obj.totalGarage = cityCount;

    let newAvg = avg / cityCount;
    obj.totalCapacity = num1;
    obj.avgDriveThrough = parseInt(newAvg);
    obj.chargingPoints = num2;
    // obj.totalGarage = cityCount
  });
};
