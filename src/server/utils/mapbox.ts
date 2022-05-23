import axios from 'axios';

// Format order locations from array of strings into a single string for mapbox api
const formatOrderCoords = (orderLocations: any) => {
  const tempStr: any = orderLocations
    .map((location: any) => {
      return `${location.lon},${location.lat}`;
    })
    .join(';');
  return tempStr;
};

// make get request to mapbox api to get map sent to front end.
// need to hardcode lon and lat
// Invoke GETROUTE in OrderRouter in todaysOrders route
export const getRoute = async (lat: any, lon: any, orderLocations: any) => {
  try {
    const routeCoordinates = formatOrderCoords(orderLocations);

    const query = await axios.get(
      // HARDCODING INITIAL LAT AND LON VALUES SO GPS FUNCTIONALITY WON'T BE NECESSARY ON DEPLOYED INSTANCE TO RENDER MAP
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${-90.10436932015816},${29.949123908409483};${routeCoordinates}?steps=true&geometries=geojson&roundtrip=true&access_token=${
        process.env.MAPBOX_API_KEY
      }`,
    );
    // 29.949123908409483, -90.10436932015816;
    return query;
  } catch (err) {
    // console.error('LINE 22 || MAPBOX UTILS ERROR', err);
    return { message: 'ERROR FETCHING OPTIMIZED ROUTE FROM MAPBOX', err };
  }
};
