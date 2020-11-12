export async function getData(url1, url2) {
  try {
    const resp1 = await fetch(url1);
    const resp2 = await fetch(url2);

    const dataset1 = await resp1.json(); // locationData
    const dataset2 = await resp2.json(); // parkingData

    const result = dataset1.map((location) => {
      const parkingSpecs = dataset2.find((parkingSpecs) => location.areaid === parkingSpecs.areaid);
      location.parkingSpecs = parkingSpecs;
      return location;
    });
    return result;
  } catch (err) {
    err;
  }
}
