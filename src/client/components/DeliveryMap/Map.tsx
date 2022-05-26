/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useReducer } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import * as turf from '@turf/turf';
import dayjs from 'dayjs';
import axios from 'axios';

//
import { driverLocationReducer } from './DeliveryPage';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg';

const Map = ({
  lat,
  lon,
  updateCoords,
  routeCoordinates,
  updateCounter,
  // mode,
  routeData,
  state,
  centerCoords,
}: any) => {
  const mapContainerRef = useRef(null);
  const map: any = useRef(null);
  // let warehouse: any;
  // const [distance, setDistance] = useState(0);
  // const [lng, setLng] = useState(lon);
  // const [latt, setLatt] = useState(lat);
  // console.log('LINE 33 || MAP || STATE', state);
  const [zoom, setZoom] = useState(13);

  // const [state, dispatch] = useReducer(driverLocationReducer, {
  //   driverLat: lat,
  //   driverLon: lon,
  // });
  console.log('LINE 42 || MAP TSX || STATE', state);
  console.log('LINE 43 || MAP TSX || CENTERCOORDS', centerCoords);
  const routeCoordinatesArray = routeCoordinates
    .split(';')
    .map((coordinate: any) => {
      return coordinate.split(',');
    });

  // Initialize map when component mounts
  useEffect(() => {
    if (!lat || !lon || !state.driverLat || !state.driverLon) return;
    // if (routeCoordinatesArray.length < 2) return;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/traffic-night-v2',
      // Number(dayjs().format('H')) > 6 || Number(dayjs().format('H')) <= 18 //mode === 'light'
      //   ? 'mapbox://styles/mapbox/traffic-night-v2'
      //   : 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: zoom,
      pitch: 40,
    });

    // Add geo control (the +/- zoom buttons)
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
    return () => map.current.remove();
    // : map.current
    // ? setTimeout(() => map.current.remove(), 2000)
    // : setTimeout(() => map.current.remove(), 2000);
  }, [lat, lon, state.driverLat, state.driverLon, zoom]);

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
      console.log('line 129', data);
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
      console.count();
      if (map.current.getSource('route')) {
        if (!map.current) return;
        map.current.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        console.count();
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

        console.count();
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
          // 'waterway-label',
        );
      }
      // }, 5000);

      console.count();
      for (let i = 0; i < waypoints.length; i++) {
        // log each waypoint to see if I can attach any other order info (paid vs unpaid) to the waypoints array
        // console.log('LINE 120 || MAP', waypoints[i]);
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
    // getRoute();
  }, [lat, lon, updateCounter, map.current, routeData.trips]);

  // console.log('LINE 251', driverCordinates);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  let driverLocation: any;

  useEffect(() => {
    // console.log('LINE 259 || DRIVER LOCATION USEEFFECT HIT');
    // if (!driverLat || !driverLon) return;
    // console.log('LINE 261 || DRIVER LOCATION defined');
    // driverLocation = turf.featureCollection([turf.point(driverCordinates)]);
    // console.log(
    //   'LINE 268 || driverlocation',
    //   driverLocation,
    //   driverLocation.features[0],
    // );
    // driverLocation = driverLocation.features[0];
    // map.current.on('load', () => {
    // });
  }, [map]);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // useEffect to drop warehouse icon once map and warehouse var load
  useEffect(() => {
    const { driverLat, driverLon } = state;
    if (!map.current || !lat || !lon || !driverLat || !driverLon) return;
    console.log('LINE 290 || driver lat & lon ', driverLat, driverLon);
    // if (!driverLat || !driverLon) return;
    // create hypothetical warehouse location coordinate. Set to current location of device for now. Will hardcode
    // once a permanent location is decided
    const warehouseLocation = [lon, lat];
    // // Turning warehouse coordinate (or potentially a series of coordinates) into a GeoJSON feature collection.
    warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // console.log('LINE 262 || WAREHOUSE', warehouse, warehouse.features[0]);
    warehouse = warehouse.features[0];
    const driverCordinates: any = [Number(driverLon), Number(driverLat)];
    driverLocation = turf.featureCollection([turf.point(driverCordinates)]);
    console.log(
      'LINE 292 || driverlocation',
      driverLocation,
      driverLocation.features[0],
    );
    map.current.on('load', () => {
      console.log('LINE 293 || DRIVER LAT || DRIVER LON', driverCordinates);

      const size = 200;

      // This implements `StyleImageInterface`
      // to draw a pulsing dot icon on the map.
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        // Call once before every frame where the icon will be used.
        render: function () {
          const duration = 1000;
          const t = (performance.now() % duration) / duration;

          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const context = this.context;

          // Draw the outer circle.
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2,
          );
          context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
          context.fill();

          // Draw the inner circle.
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // Update this image's data with data from the canvas.
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.current.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        },
      };
      // TRY LOAD IMAGE FIRST
      map.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      console.log('LINE 366 || DRIVER LAT || DRIVER LON', driverCordinates);
      map.current.addSource('dot-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [driverLon, driverLat], // icon position [lng, lat]
              },
            },
          ],
        },
      });
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
      map.current.addLayer({
        id: 'layer-with-pulsing-dot',
        type: 'symbol',
        source: 'dot-point',
        layout: {
          'icon-image': 'pulsing-dot',
        },
      });
      getRoute();
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
  }, [map, routeCoordinatesArray, state.driverLat, state.driverLon]);

  return (
    <div>
      <div className='map-container' ref={mapContainerRef}></div>
      <div className='sidebar'>
        <div>
          Longitude: {state.driverLon} | Latitude: {state.driverLat} | Zoom:{' '}
          {zoom}
        </div>
      </div>
    </div>
  );
};

export default Map;
