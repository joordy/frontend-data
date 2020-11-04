export async function getData(url1, url2) {
  try {
    const locationDataResponse = await fetch(url1);
    const parkingDataResponse = await fetch(url2);

    const locationData = await locationDataResponse.json();
    const parkingData = await parkingDataResponse.json();

    const result = locationData.map((location) => {
      const parkingSpecs = parkingData.find((parkingSpecs) => location.areaid === parkingSpecs.areaid);
      location.parkingSpecs = parkingSpecs;
      return location;
    });
    return result;
  } catch (err) {
    err;
  }
}
