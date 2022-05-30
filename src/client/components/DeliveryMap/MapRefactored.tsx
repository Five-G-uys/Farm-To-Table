import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';

// COMPONENT IMPORTS
import DirectionsModal from './DirectionsModal';

// MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN product CARD COMPONENT
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// MAPBOX IMPORTS
import Map, {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import getCenter from 'geolib/es/getCenter';
import { center } from '@turf/turf';
import { Dir, stat } from 'fs';
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
  updateCounter,
  setUpdateCounter,
  routeData, // waypoint and trip data for the route
  state,
  centerCoords, // object with the center of all order points
  getTodaysOrders,
}: any) => {
  const [viewState, setViewState] = useState({});
  const [pointData, setPointData]: any = useState(null);
  const [popupInfo, setPopupInfo]: any = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [paid, setPaid]: any = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // This provides a way to reference the map created in the tsx directly (mapRef.current)
  const mapRef: any = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    if (!mapRef.current || !popupInfo) return;
    mapRef.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    // mapRef.current.
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
  // console.log('LINE 48 || REF MAP || STATE', state.driverLat, state.driverLon);
  // console.log('LINE 49 || REF MAP || WAYPOINTS', routeData.waypoints);

  let data: any;
  const route: any = routeData.trips[0].geometry.coordinates;

  let routeLineLayer: any;
  let routeArrowLayer: any;
  // const markerCoords: any = routeData.waypoints.map(
  //   (waypoint: any, i: number) => {
  //     // Since the first waypoint will always be the "warehouse", all subsequent
  //     // waypoints must be orders. That means I can set up a condition so that
  //     // on each order waypoint I also add it's paid status from the orderLocations.
  //     // This way when I map over this 'markerCoords' array, I can conditionally
  //     // render the color of the marker based on the order's paid status
  //     return i === 0
  //       ? {
  //           latitude: waypoint.location[1],
  //           longitude: waypoint.location[0],
  //         }
  //       : {
  //           paid: routeData.orderLocations[i - 1].paid,
  //           latitude: waypoint.location[1],
  //           longitude: waypoint.location[0],
  //         };
  //   },
  // );
  const markerCoords: any = useMemo(
    () =>
      routeData.waypoints.map((order: any, i: number) => {
        // console.log('LINE 157 || REF MAP || ORDER ', order);
        // console.log(
        //   'LINE 308 || REF MAP || routeData.trips[0].legs',
        //   routeData.trips[0].legs[i].steps,
        // );

        return (
          <Marker
            key={`marker-${i}${order.longitude}${order.latitude}`}
            longitude={order.location[0]}
            latitude={order.location[1]}
            anchor='center'
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`

              e.originalEvent.stopPropagation();
              order.i = i;
              i !== 0 &&
                (order.orderId = routeData.orderLocations[i - 1].orderId);
              if (i > 0) {
                order.paid = routeData.orderLocations[i - 1].paid;
              }
              order.steps =
                routeData.trips[0].legs[
                  order.waypoint_index === 0 ? 4 : order.waypoint_index - 1
                ].steps;
              setPopupInfo(order);
              handleClose();
              handleOpen();
              console.log('LINE 233 || REF MAP || order', order);
              // console.log(
              //   'LINE 246 || REF MAP || routeData.orderLocation',
              //   routeData.orderLocations,
              // );
              mapRef.current.easeTo({
                center: [order.location[0], order.location[1]],
              });
              console.log('LINE 254 || REF MAP ||', popupInfo);
            }}
            color={
              i === 0
                ? 'green'
                : routeData.orderLocations[i - 1].paid
                ? 'gray'
                : 'red'
            }
          />
        );

        // Since the first order will always be the "warehouse", all subsequent
        // orders must be orders. That means I can set up a condition so that
        // on each order order I also add it's paid status from the orderLocations.
        // This way when I map over this 'markerCoords' array, I can conditionally
        // render the color of the marker based on the order's paid status
        //     return i === 0
        //       ? {
        //           latitude: order.location[1],
        //           longitude: order.location[0],
        //         }
        //       : {
        //           paid: routeData.orderLocations[i - 1].paid,
        //           latitude: order.location[1],
        //           longitude: order.location[0],
        //         };
        //
        //
        //
        //
        //
        //
      }),
    [updateCounter],
  );
  // console.log('LINE 156 || MARKER COORDS', markerCoords);

  const geojson: any = {
    type: 'Feature',
    properties: { color: 'blue' },
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  };

  useEffect(() => {
    // error handling until waypoints are defined
    if (!routeData.waypoints) return;

    // Set coordinates for markers in tsx using the formatted 'data' array
    setViewState({
      longitude: -90.10436932015816,
      latitude: 29.949123908409483,
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

  // console.log('LINE 313 || REF MAP || mapRef', mapRef);

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
        {markerCoords}
        {popupInfo && (
          <DirectionsModal
            open={open}
            handleClose={handleClose}
            popupInfo={popupInfo}
            getTodaysOrders={getTodaysOrders}
            lat={lat}
            lon={lon}
            updateCounter={updateCounter}
            setUpdateCounter={setUpdateCounter}
          />
        )}
        {/* {markerCoords.length > 0 ? (
          markerCoords.map((coord: any, i: number) => {
            console.log('LINE 230 || DELIVERY PAGE || COORD', coord);
            return (
              <div key={`${coord.longitude}+${coord.latitude}`}>
                <Marker
                  longitude={coord.longitude}
                  latitude={coord.latitude}
                  color={
                    i === 0 ? 'green' : coord.paid === true ? 'gray' : 'red'
                  }
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )} */}
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
          onGeolocate={}
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
