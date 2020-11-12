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
      carCapacity: parseInt(item.parkingSpecs && item.parkingSpecs.capacity ? item.parkingSpecs.capacity : undefined),
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
