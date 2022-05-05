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
  const [zoom, setZoom] = useState(11);

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
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // Add directions start/destination widget (box to enter starting location and destination)
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
      console.log('q');
      // setLng(map.getCenter().lng.toFixed(lon));
      // setLatt(map.getCenter().lat.toFixed(latt));
      setZoom(map.current.getZoom().toFixed(5));
    });
  }, [map]);

  //   useEffect(() => {
  //     axios.post(
  //       `https://api.mapbox.com/matching/v5/mapbox/driving?access_token=${mapboxgl.accessToken}
  // `,
  //       {}
  //     );
  //   }, []);

  // create a function to make a directions request
  async function getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    try {
      // lon is first (-90ish)
      // for one way trips add source=first&destination=last& before access token
      const query = await fetch(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${lon},${lat};-90.09924,29.97477;-90.11315,29.96796;-90.10499,29.95749?steps=true&geometries=geojson&roundtrip=true&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      if (!json.trips || !json.waypoints) {
        throw json;
      }
      const waypoints: any = json.waypoints;
      console.log('LINE 80 || MAP COMPONENT', json);
      console.log('LINE 81 || MAP COMPONENT', lat, lon);
      const data = json.trips[0];

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
      if (map.current.getSource('route')) {
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
      }

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
    } catch (err: any) {
      console.error('LINE 94 || MAP ERROR', err);
    }

    // add turn instructions here at the end
  }

  useEffect(() => {
    if (!lat || !lon) return;
    console.log('LINE 125 || MAP', lat, lon);
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
