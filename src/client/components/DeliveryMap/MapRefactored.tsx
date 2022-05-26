import React, { useEffect, useState, useCallback, useRef } from 'react';

import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Layer,
  Source,
} from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getCenter from 'geolib/es/getCenter';
import { center } from '@turf/turf';
import { stat } from 'fs';
const size = 200;

// Style object for animated point on map to represent delivery driver in admin view
// const pointLayer: LayerProps = {
//   id: 'point',
//   type: 'circle',
//   paint: {
//     'circle-radius': 10,
//     'circle-color': '#007cbf',
//   },
// };
const pointLayer: LayerProps = {
  id: 'point',
  type: 'symbol',
  paint: {
    // radius: 10,
    'icon-color': '#000000',
  },
  layout: {
    'icon-size': 0.75,
    'icon-image': 'pulsing-dot',
  },
};
// Function for animated point on map to represent delivery driver in admin view
function pointOnCircle({ center }: any) {
  return {
    type: 'Point',
    coordinates: [center[0], center[1]],
  };
}

const MapRefactored = ({
  lat,
  lon,
  mode,
  routeCoordinates, // string of coordinates
  routeData, // waypoint and trip data for the route
  state,
  centerCoords, // object with the center of all order points
}: any) => {
  const [viewState, setViewState] = useState({});
  const [pointData, setPointData]: any = useState(null);
  const mapRef: any = useRef();

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
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
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
      mapRef.current.triggerRepaint();

      // Return `true` to let the map know that the image was updated.
      return true;
    },
  };
  const onMapLoad: any = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
  }, [mapRef.current]);

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  // console.log(
  //   'LINE 27 || REF MAP || STATE',
  //   Object.keys(routeData),
  //   centerCoords,
  //   routeData,
  // );
  console.log('LINE 48 || REF MAP || STATE', state.driverLat, state.driverLon);

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

  // console.log('LINE 57 || MARKER COORDS', markerCoords);

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
    // console.log('LINE 64 ROUTE ', route);

    // // Defining route line layer object
    routeLineLayer = {
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
    };
    // // Defining route arrow layer object
    routeArrowLayer = {
      id: 'routearrows',
      type: 'symbol',
      source: 'route',
    };
  }, [Object.keys(routeData).length, centerCoords, geolocateControlRef]);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(
        pointOnCircle({
          center: [state.driverLon, state.driverLat],
        }),
      ),
    );
    return () => window.cancelAnimationFrame(animation);
  });

  console.log('LINE 195 || REF MAP || mapref.current', mapRef.current);
  return (
    <div className='map-container'>
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        initialViewState={{
          latitude: 29.949123908409483,
          longitude: -90.10436932015816,
          zoom: 12,
          pitch: 30,
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
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75,
            }}
            // {...routeLineLayer}
          />
        </Source>
        {pointData && (
          <Source
            type='geojson'
            data={{
              properties: {},
              type: 'Feature',
              geometry: pointData,
            }}
          >
            <Layer {...pointLayer} />
          </Source>
        )}
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
