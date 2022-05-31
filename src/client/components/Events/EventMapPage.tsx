import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import NewNavbar from '../NewNavBar';
// COMPONENT IMPORTS
import EventMap from './EventMap';
// import NewNavBar from '../NewNavBar';

// MODULE IMPORTS
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';
interface AppProps {
  mode: string;
  updateCoords(): void;
  lat: number;
  lon: number;
}

const EventMapPage = ({ mode, updateCoords, lat, lon }: AppProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState('');
  const [routeData, setRouteData] = useState({});
  const [updateCounter, setUpdateCounter] = useState(0);
  // SET VAR FOR TODAYS DATE THAT MATCHES DATABASE FORMAT
  const { event }: any = useLocation().state;
  //console.log('LINE 27 || EventMapPage', event);

  let tempStr = '';
  //FIRST FETCH ALL ORDERS FOR TODAY
  const getEventRoutes = () => {
    if (!lat || !lon) return;
    const eventLon = event.lon;
    const eventLat = event.lat;
    axios
      .get(`/api/event/${lat}/${lon}/${eventLon}/${eventLat}`)
      .then((data) => {
        console.log(
          'LINE 37 || EventMapPage',
          data,
          'AND',
          data.data.waypoints,
        );
        setRouteData(data.data);
        tempStr = data.data.waypoints
          .map((location: any) => {
            return `${location.location[0]},${location.location[1]}`;
          })
          .join(';');

        setRouteCoordinates(tempStr);
        setUpdateCounter(updateCounter + 1);
        console.log('LINE 47', tempStr);
      })
      .catch((err) => {
        console.error('LINE 50 || EventMapPage ERROR', err);
      });
  };
  useEffect(getEventRoutes, [lat, lon, event.id]);

  return (
    <div>
      <h1>Hello!</h1>
      <EventMap
        mode={mode}
        routeCoordinates={routeCoordinates}
        routeData={routeData}
        updateCoords={updateCoords}
        lat={lat}
        lon={lon}
        updateCounter={updateCounter}
        event={event}
      />
    </div>
  );
};
export default EventMapPage;
