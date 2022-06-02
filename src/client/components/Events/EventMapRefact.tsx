import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';

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
import EventDirectionModal from './EventDirectionModal';

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

const EventMapRefact = ({
  lat,
  lon,
  mode,
  routeCoordinates, // string of coordinates
  updateCounter,
  setUpdateCounter,
  routeData, // waypoint and trip data for the route
  state,
  centerCoords, // object with the center of all event points
  getEventRoutes,
  event,
}: any) => {
  const [viewState, setViewState] = useState({});
  const [pointData, setPointData]: any = useState(null);
  const [popupInfo, setPopupInfo]: any = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // This provides a way to reference the map created in the tsx directly (mapRef.current)
  const mapRef: any = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  let data: any;
  const route: any = routeData.trips[0].geometry.coordinates;

  const markerCoords: any = useMemo(
    () =>
      routeData.waypoints.map((event: any, i: number) => {
        // console.log('LINE 157 || REF MAP || ORDER ', event);
        // console.log(
        //   'LINE 308 || REF MAP || routeData.trips[0].legs',
        //   routeData.trips[0].legs[i].steps,
        // );
        console.log('EVENT MAP 125', event);
        return (
          <Marker
            key={`marker-${i}${event.longitude}${event.latitude}`}
            longitude={event.location[0]}
            latitude={event.location[1]}
            anchor='center'
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              console.log('LINE 135', e.originalEvent.stopPropagation());
              e.originalEvent.stopPropagation();
              event.i = i;

              event.steps =
                routeData.trips[0].legs[
                  event.waypoint_index === 0 ? 4 : event.waypoint_index - 1
                ].steps;
              setPopupInfo(event);
              handleClose();
              handleOpen();
              //   console.log('LINE 233 || REF MAP || event', event);
              mapRef.current.easeTo({
                center: [event.location[0], event.location[1]],
              });
              console.log('LINE 254 || REF MAP ||', popupInfo);
            }}
            color={i === 0 ? 'green' : 'red'}
          />
        );
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
      longitude: lon,
      latitude: lat,
      zoom: 12,
    });

    const routeLineLayer = {
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
    };
    // // Defining route arrow layer object
    const routeArrowLayer = {
      id: 'routearrows',
      type: 'symbol',
      source: 'route',
    };
  }, [Object.keys(routeData).length, centerCoords, geolocateControlRef]);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(
        pointOnCircle({
          center: [lon, lat],
        }),
      ),
    );
    return () => window.cancelAnimationFrame(animation);
  });

  return (
    <div
      className='map-containerEvent'
      sx={{ height: '100vh', width: '100vw' }}
    >
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        initialViewState={{
          latitude: lat,
          longitude: lon,
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
          <EventDirectionModal
            open={open}
            handleClose={handleClose}
            popupInfo={popupInfo}
            getTodaysOrders={getEventRoutes}
            lat={lat}
            lon={lon}
            updateCounter={updateCounter}
            setUpdateCounter={setUpdateCounter}
            event={event}
          />
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
              type: 'Feature',
              properties: {},
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

export default EventMapRefact;
