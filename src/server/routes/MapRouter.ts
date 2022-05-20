/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import axios from 'axios';
require('dotenv').config();

// Initialize Router
const mapRouter = Router();

///////////////////////////////////////////////////////////////////////////////////////////// GET MAP FUNCTION
const getCurrentMap: any = (latt: any, long: any, rc: any) => {
  return fetch(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${latt},${long};${rc}?steps=true&geometries=geojson&roundtrip=true&access_token=${process.env.MAPBOX_PUBLIC_KEY}`,
    { method: 'GET' }
  )
    .then((response: any ) => {
      // console.log(response);
      return response
    }) //returns data object of current weather conditions
    .catch((err: any) => console.error('error in map api call: ', err));
};

///////////////////////////////////////////////////////////////////////////////////////////// GET MAP ROUTE
//sends location to weather api and responds with current weather
mapRouter.get('/map/:lat/:lon/:routeCoordinates', (req: any, res: any) => {
  // console.log('TRIGGERED', req.params);

  const { lat, lon, routeCoordinates } = req.params;
  getCurrentMap(lat, lon, routeCoordinates)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(404);
    });
});

// Export Router
export default mapRouter;