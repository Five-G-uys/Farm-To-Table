import React, { useRef, useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

import * as turf from '@turf/turf';
import FullCalendar from '@fullcalendar/react';
import {
  Modal,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import EventDirections from './EventDirections';
// import axios from 'axios';
interface AppProps {
  mode: string;
  updateCoords: any;
  lat: number;
  lon: number;
  routeCoordinates: string;
  updateCounter: any;
  routeData: any;
  event: any;
}

const EventMap = ({
  lat,
  lon,
  updateCoords,
  routeCoordinates,
  updateCounter,
  mode,
  routeData,
  event,
}: AppProps) => {
  console.log('event line 35, EventMap', event);
  const mapContainerRef = useRef(null);
  const map: any = useRef(null);
  let step = '';

  mapboxgl.accessToken =
    'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

  // let warehouse: any;
  // const [distance, setDistance] = useState(0);
  // const [lng, setLng] = useState(lon);
  // const [latt, setLatt] = useState(lat);
  const [zoom, setZoom] = useState(13);
  // console.log('LINE 33', mode);
  const routeCoordinatesArray = routeCoordinates
    .split(';')
    .map((coordinate: any) => {
      return coordinate.split(',');
    });
  // Initialize map when component mounts
  useEffect(() => {
    if (!lat && !lon) return;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/traffic-night-v2',
      // Number(dayjs().format('H')) > 6 || Number(dayjs().format('H')) <= 18 //mode === 'light'
      //   ? 'mapbox://styles/mapbox/traffic-night-v2'
      //   : 'mapbox://styles/mapbox/streets-v11',
      pitch: 60,
      bearing: -60,
      center: [lon, lat],
      zoom: zoom,
    });

    // Add geo control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    map.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      'bottom-left',
    );
    map.current.addControl(new MapboxTraffic(), 'bottom-right');
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-right',
    );
    // console.log('LINE 69 || MAP.CURRENT', map.current);
    // // Add directions start/destination widget (box to enter starting location and destination)
    // map.current.addControl(
    //   new MapboxDirections({
    //     unit: 'metric',
    //     profile: 'mapbox/driving',
    //     accessToken: mapboxgl.accessToken,
    //     // coordinates,
    //   }),
    //   'bottom-left'
    // );
    // Clean up on unmount
    return map.current
      ? (): any => map.current.remove()
      : map.current
      ? setTimeout(() => map.current.remove(), 2000)
      : setTimeout(() => map.current.remove(), 2000);
  }, [lat, lon, zoom, event.id]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on('move', () => {
      updateCoords(
        map.current.getCenter().lat.toFixed(2),
        map.current.getCenter().lng.toFixed(2),
      );
      // console.log('q');
      // setLng(map.getCenter().lng.toFixed(lon));
      // setLatt(map.getCenter().lat.toFixed(latt));
      setZoom(map.current.getZoom().toFixed(1));
    });
  }, [map]);

  async function getRoute() {
    console.log('LINE 103 MAP', routeData);
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    try {
      //   const query = await fetch(
      //     `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${lon},${lat};${routeCoordinates}?steps=true&geometries=geojson&roundtrip=true&access_token=${mapboxgl.accessToken}`,
      //     { method: 'GET' }
      //   );

      // console.log('QUERY RESULTS FROM FRONTEND!: ', query)
      // const matrixTime = await fetch(
      //   `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${lon},${lat};${routeCoordinates}?&access_token=${mapboxgl.accessToken}`,
      //   { method: 'GET' }
      // );
      // console.log('LINE 101 || MATRIX TIME', matrixTime);

      // const json = await query.json();
      if (!routeData.trips || !routeData.waypoints) {
        throw routeData;
      }
      const waypoints: any = routeData.waypoints;

      // console.log('LINE 81 || MAP COMPONENT', lat, lon);
      const data = routeData.trips[0];
      // const duration = routeData.trips[0].duration;
      // console.log('line 129', data);
      const route = data.geometry.coordinates;

      console.log('ROUTE LINE 142', route);
      const geojson = {
        type: 'Feature',
        ...data,
        properties: {},
        // geometry: {
        //   type: 'LineString',
        //   coordinates: route,
        // },
      };

      // if the route already exists on the map, we'll reset it using setData
      // setTimeout(() => {
      if (map.current.getSource('route')) {
        if (!map.current) return;
        map.current.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#ff0',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });

        map.current.addLayer(
          {
            id: 'routearrows',
            type: 'symbol',
            source: 'route',
            layout: {
              'symbol-placement': 'line',
              'text-field': '▶',
              'text-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                24,
                22,
                60,
              ],
              'symbol-spacing': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                30,
                22,
                160,
              ],
              'text-keep-upright': false,
            },
            paint: {
              'text-color': '#3887be',
              'text-halo-color': 'hsl(55, 11%, 96%)',
              'text-halo-width': 3,
            },
          },
          'waterway-label',
        );
      }
      // }, 5000);

      for (let i = 0; i < waypoints.length; i++) {
        console.log('LINE 120 || MAP', waypoints[i]);
        const marker1: any = new mapboxgl.Marker({
          color:
            i === 0
              ? 'lightgreen'
              : i === waypoints.length - 1
              ? 'red'
              : 'grey',
        })
          .setLngLat([waypoints[i].location[0], waypoints[i].location[1]])
          .addTo(map.current);
      }
      //Directions
      (async () => {
        const directions: any = await routeData.trips;
        console.log('LINE 254', directions[0].legs[0].steps);
        // let step = '';
        for (let i = 0; i < directions[0].legs[0].steps.length; i++) {
          console.log('LINE 120 || MAP', directions[0].legs[0].steps[i]);
          step += `<li>${directions[0].legs[0].steps[i].maneuver.instruction}</li>`;
          console.log('LINE 49', step);
        }
        return step;
      })();
    } catch (err: any) {
      console.error('LINE 217 || MAP ERROR', err);
    }

    // add turn instructions here at the end
    // for ()
  }

  // add turn instructions here at the end

  let dropoffs: any;
  // let warehouse: any;
  // useEffect to get route and apply it to map whenever the lat or lon change
  useEffect(() => {
    // console.log('LINE 235', routeData, lat, lon, map.current);
    if (!lat || !lon || !map.current || !routeData.trips) return;
    // if (routeCoordinatesArray.length < 2) return;
    // create hypothetical warehouse location coordinate. Set to current location of device for now. Will hardcode
    // once a permanent location is decided
    // const warehouseLocation = [lon, lat];
    // // console.log('LINE 241 || MAP', lat, lon);
    // // Turning warehouse coordinate (or potentially a series of coordinates) into a GeoJSON feature collection.
    // warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // // console.log('LINE 244 || WAREHOUSE', warehouse.features[0]);
    // warehouse = warehouse.features[0];
    // Creating empty feature collection to store all order points
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dropoffs = turf.featureCollection([
      turf.point([lon, lat]),
      ...routeCoordinatesArray.map((coordinate: any) => turf.point(coordinate)),
    ]);
    console.log('LINE 252', dropoffs);
    getRoute();
  }, [lat, lon, updateCounter]);

  // useEffect to drop warehouse icon once map and warehouse var load
  // useEffect(() => {
  //   if (!map.current) return;

  //   // map.current.on('load', () => {
  //   //   map.current.addLayer({
  //   //     id: 'warehouse',
  //   //     type: 'circle',
  //   //     source: {
  //   //       data: warehouse,
  //   //       type: 'geojson',
  //   //     },
  //   //     paint: {
  //   //       'circle-radius': 20,
  //   //       'circle-color': 'white',
  //   //       'circle-stroke-color': '#3887be',
  //   //       'circle-stroke-width': 3,
  //   //     },
  //   //   });
  //   //   // Create a symbol layer on top of circle layer
  //   //   map.current.addLayer({
  //   //     id: 'warehouse-symbol',
  //   //     type: 'symbol',
  //   //     source: {
  //   //       data: warehouse,
  //   //       type: 'geojson',
  //   //     },
  //   //     layout: {
  //   //       'icon-image': 'grocery-15',
  //   //       'icon-size': 1,
  //   //     },
  //   //     paint: {
  //   //       'text-color': '#3887be',
  //   //     },
  //   //   });
  //   //   // Create a layer for all dropoff points
  //   //   map.current.addLayer({
  //   //     id: 'dropoffs-symbol',
  //   //     type: 'symbol',
  //   //     source: {
  //   //       data: dropoffs,
  //   //       type: 'geojson',
  //   //     },
  //   //     layout: {
  //   //       'icon-allow-overlap': true,
  //   //       'icon-ignore-placement': true,
  //   //       'icon-image': 'marker-15',
  //   //     },
  //   //   });
  //   // });
  // }, [map.current, routeCoordinatesArray]);
  // const instructions: HTML = document.getElementById('instructions');
  return (
    <div>
      <div className='sidebar-event'>
        Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className='map-container' ref={mapContainerRef} />
      <div id='instructions'>
        <div>
          <Divider
            className='direction-divider'
            variant='middle'
            sx={{ color: 'darkgreen' }}
          >
            <Chip />
          </Divider>
          <Card
            sx={{
              display: 'flex',
              backgroundColor: 'transparent',
              boxShadow: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                justifyContent: 'center',
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', justifyContent: 'center' }}>
                <Typography
                  variant='subtitle1'
                  color='darkgreen'
                  component='div'
                >
                  <ol>{step}</ol>
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default EventMap;
