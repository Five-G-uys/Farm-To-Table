import React, { useEffect, useState, useCallback } from 'react';

import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Layer,
  Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getCenter from 'geolib/es/getCenter';
import { center } from '@turf/turf';

const MapRefactored = ({
  lat,
  lon,
  mode,
  routeCoordinates, // string of coordinates
  routeData, // waypoint and trip data for the route
  centerCoords, // object with the center of all order points
}: any) => {
  const [viewState, setViewState] = useState({});
  // const [markerCoords, setMarkerCoords]: any = useState([]);
  // const [geojson, setGeojson] = useState({});

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);
  console.log(
    'LINE 27 || REF MAP || STATE',
    Object.keys(routeData),
    centerCoords,
    routeData,
  );

  let data: any;
  const route: any = routeData.trips[0].geometry.coordinates;

  let routeLineLayer: any;
  let routeArrowLayer: any;
  const markerCoords: any = routeData.waypoints.map((waypoint: any) => {
    return {
      latitude: waypoint.location[1],
      longitude: waypoint.location[0],
    };
  });
  const geojson: any = {
    type: 'Feature',
    properties: { color: 'blue' },
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  };

  console.log('LINE 57 || MARKER COORDS', markerCoords);

  useEffect(() => {
    // error handling until waypoints are defined
    if (!routeData.waypoints) return;

    // Set coordinates for markers in tsx using the formatted 'data' array
    setViewState({
      longitude: centerCoords.longitude,
      latitude: centerCoords.latitude,
      zoom: 12,
    });
    // formatted geojson for route object
    // route = routeData.trips[0].geometry.coordinates;
    console.log('LINE 64 ROUTE ', route);

    // // Defining route line layer object
    routeLineLayer = {
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
        'line-width': 50,
        'line-opacity': 0.75,
      },
    };
    // // Defining route arrow layer object
    routeArrowLayer = {
      id: 'routearrows',
      type: 'symbol',
      source: 'route',
      layout: {
        'symbol-placement': 'line',
        'text-field': '▶',
        'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
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
    };
  }, [Object.keys(routeData).length, centerCoords, geolocateControlRef]);

  console.log('LINE 124 || REF MAP || GEOJSON', geojson);
  return (
    <div className='map-container'>
      <Map
        initialViewState={{
          latitude: 29.949123908409483,
          longitude: -90.10436932015816,
          zoom: 12,
        }}
        // this changes viewport from initial center to center of all dropoff points
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle='mapbox://styles/reneamerc/cl3lupwz8001514po6jghptx7'
        mapboxAccessToken='pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg'
        style={{}}
      >
        {markerCoords.length > 0 ? (
          markerCoords.map((coord: any) => (
            <div key={`${coord.longitude}+${coord.latitude}`}>
              <Marker
                longitude={coord.longitude}
                latitude={coord.latitude}
                color='red'
              />
            </div>
          ))
        ) : (
          <div></div>
        )}
        <Source id='routearrows' type='geojson' data={geojson}>
          <Layer
            id='delivery-route-arrows'
            type='symbol'
            layout={{
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
            }}
            paint={{
              'text-color': '#3887be',
              'text-halo-color': 'hsl(55, 11%, 96%)',
              'text-halo-width': 3,
            }}
            // {...routeArrowLayer}
          />
        </Source>
        <Source id='route' type='geojson' data={geojson}>
          <Layer
            id='delivery-route-line'
            type='line'
            paint={{
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75,
            }}
            // {...routeLineLayer}
          />
        </Source>
        <NavigationControl position='bottom-left' />
        <GeolocateControl
          showUserLocation={true}
          showUserHeading={true}
          trackUserLocation={true}
          ref={geolocateControlRef}
          position='bottom-left'
        />
      </Map>
    </div>
  );
};

export default MapRefactored;
