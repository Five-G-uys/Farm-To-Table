/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import * as turf from '@turf/turf';
import dayjs from 'dayjs';
import axios from 'axios';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg';

const Map = ({
  lat,
  lon,
  updateCoords,
  routeCoordinates,
  updateCounter,
  mode,
  routeData,
  state,
}: any) => {
  const mapContainerRef = useRef(null);
  const map: any = useRef(null);
  // let warehouse: any;
  // const [distance, setDistance] = useState(0);
  // const [lng, setLng] = useState(lon);
  // const [latt, setLatt] = useState(lat);
  console.log('LINE 33 || MAP || STATE', state);
  const [zoom, setZoom] = useState(13);

  const routeCoordinatesArray = routeCoordinates
    .split(';')
    .map((coordinate: any) => {
      return coordinate.split(',');
    });

  // Initialize map when component mounts
  useEffect(() => {
    if (!lat && !lon) return;
    // if (routeCoordinatesArray.length < 2) return;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        Number(dayjs().format('H')) > 6 || Number(dayjs().format('H')) <= 18 //mode === 'light'
          ? 'mapbox://styles/mapbox/traffic-night-v2'
          : 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: zoom,
      pitch: 40,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    map.current.addControl(new MapboxTraffic(), 'bottom-left');
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-left',
    );

    // NEED TO FIND OUT WHAT HAPPENS IF I DON'T REMOVE ON UNMOUNT
    // Clean up on unmount
    // map.remove();
    return map.current
      ? () => map.current.remove()
      : map.current
      ? setTimeout(() => map.current.remove(), 2000)
      : setTimeout(() => map.current.remove(), 2000);
  }, [lat, lon, zoom]);

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
      // console.log('LINE 117 || MAP COMPONENT', routeData);
      // console.log('LINE 81 || MAP COMPONENT', lat, lon);
      const data = routeData.trips[0];

      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
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
            'line-color': '#3887be',
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
        // log each waypoint to see if I can attach any other order info (paid vs unpaid) to the waypoints array
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
    } catch (err: any) {
      console.error('LINE 217 || MAP ERROR', err.message, err);
    }

    // add turn instructions here at the end
  }
  /*




*/

  let dropoffs: any;
  let warehouse: any;
  let driverLocation: any;
  // useEffect to get route and apply it to map whenever the lat or lon change
  useEffect(() => {
    // console.log('LINE 235', routeData, lat, lon, map.current);
    if (!lat || !lon || !map.current || !routeData.trips) return;
    // if (routeCoordinatesArray.length < 2) return;
    // // create hypothetical warehouse location coordinate. Set to current location of device for now. Will hardcode
    // // once a permanent location is decided
    // const warehouseLocation = [lon, lat];
    // console.log('LINE 244 || MAP', lat, lon);
    // // // Turning warehouse coordinate (or potentially a series of coordinates) into a GeoJSON feature collection.
    // warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // console.log('LINE 247 || WAREHOUSE', warehouse, warehouse.features[0]);
    // warehouse = warehouse.features[0];
    // // // Creating empty feature collection to store all order points
    // // // eslint-disable-next-line @typescript-eslint/no-empty-function
    // dropoffs = turf.featureCollection([
    //   turf.point([lon, lat]),
    //   ...routeCoordinatesArray.map((coordinate: any) => turf.point(coordinate)),
    // ]);
    // console.log('LINE 255', dropoffs);
    getRoute();
  }, [lat, lon, updateCounter]);

  // console.log('LINE 259 || WAREHOUSE', warehouse);
  // console.log('LINE 260', dropoffs);
  const { driverLat, driverLon } = state;
  // useEffect to drop warehouse icon once map and warehouse var load
  useEffect(() => {
    if (!map.current || !lat || !lon || !driverLat || !driverLon) return;
    // create hypothetical warehouse location coordinate. Set to current location of device for now. Will hardcode
    // once a permanent location is decided
    const warehouseLocation = [lon, lat];
    // console.log('LINE 268 || MAP', lat, lon);
    // // Turning warehouse coordinate (or potentially a series of coordinates) into a GeoJSON feature collection.
    warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    console.log('LINE 271 || WAREHOUSE', warehouse, warehouse.features[0]);
    warehouse = warehouse.features[0];
    // // Creating empty feature collection to store all order points
    // // eslint-disable-next-line @typescript-eslint/no-empty-function
    // dropoffs = turf.featureCollection([
    //   turf.point([lon, lat]),
    //   ...routeCoordinatesArray.map((coordinate: any) => turf.point(coordinate)),
    // ]);

    // const driverCordinates = [state.driverLon, state.driverLat];
    // console.log('LINE 271 || DRIVER LOCAITON ARRAY', driverCordinates);
    // driverLocation = turf.featureCollection([turf.point(driverCordinates)]);

    map.current.on('load', () => {
      map.current.addLayer({
        id: 'warehouse',
        type: 'circle',
        source: {
          data: warehouse,
          type: 'geojson',
        },
        paint: {
          'circle-radius': 20,
          'circle-color': 'white',
          'circle-stroke-color': '#3887be',
          'circle-stroke-width': 3,
        },
      });
      // Create a symbol layer on top of circle layer
      map.current.addLayer({
        id: 'warehouse-symbol',
        type: 'symbol',
        source: {
          data: warehouse,
          type: 'geojson',
        },
        layout: {
          'icon-image': 'grocery-15',
          'icon-size': 1,
        },
        paint: {
          'text-color': '#3887be',
        },
      });
      // Create a layer for all dropoff points
      // map.current.addLayer({
      //   id: 'dropoffs-symbol',
      //   type: 'symbol',
      //   source: {
      //     data: dropoffs,
      //     type: 'geojson',
      //   },
      //   layout: {
      //     'icon-allow-overlap': true,
      //     'icon-ignore-placement': true,
      //     'icon-image': 'marker-15',
      //   },
      // });
    });
  }, [map, routeCoordinatesArray]);

  return (
    <div>
      <div className='map-container' ref={mapContainerRef}></div>
      <div className='sidebar'>
        <div>
          Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
};

export default Map;
