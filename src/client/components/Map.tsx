import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

const Map = ({ lat, lon, updateCoords }: any) => {
  const mapContainerRef = useRef(null);
  const map: any = useRef(null);

  // const [lng, setLng] = useState(lon);
  // const [latt, setLatt] = useState(lat);
  const [zoom, setZoom] = useState(10);

  // Initialize map when component mounts
  useEffect(() => {
    if (!lat && !lon) return;
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(
      new MapboxDirections({
        unit: 'metric',
        profile: 'mapbox/driving',
        accessToken: mapboxgl.accessToken,
        // coordinates,
      }),
      'top-left'
    );
    // Clean up on unmount
    return () => map.remove();
  }, [lat, lon, zoom]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on('move', () => {
      updateCoords(
        map.current.getCenter().lat.toFixed(2),
        map.current.getCenter().lng.toFixed(2)
      );
      // setLng(map.getCenter().lng.toFixed(lon));
      // setLatt(map.getCenter().lat.toFixed(latt));
      setZoom(map.current.getZoom().toFixed(5));
    });
  }, [map]);

  useEffect(() => {
    axios.post(
      `https://api.mapbox.com/matching/v5/mapbox/driving?access_token=${mapboxgl.accessToken}
`,
      {}
    );
  }, []);

  // create a function to make a directions request
  async function getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${lon},${
          lat + 1
        };29.97563,-90?steps=true&geometries=geojson&access_token=${
          mapboxgl.accessToken
        }`,
        { method: 'GET' }
      );
      const json = await query.json();
      console.log('LINE 81 || MAP COMPONENT', json);
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      };
    } catch (err: any) {
      console.error('LINE 94 || MAP ERROR', err);
    }

    // if the route already exists on the map, we'll reset it using setData
    // if (map.getSource('route')) {
    //   map.getSource('route').setData(geojson);
    // }
    // // otherwise, we'll make a new request
    // else {
    //   map.addLayer({
    //     id: 'route',
    //     type: 'line',
    //     source: {
    //       type: 'geojson',
    //       data: geojson,
    //     },
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round',
    //     },
    //     paint: {
    //       'line-color': '#3887be',
    //       'line-width': 5,
    //       'line-opacity': 0.75,
    //     },
    //   });
    // }
    // add turn instructions here at the end
  }

  useEffect(() => {
    if (!lat || !lon) return;
    getRoute();
  }, [lat, lon]);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
