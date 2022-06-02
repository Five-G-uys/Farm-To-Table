/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';

// COMPONENT IMPORTS
import Map from './Map';
import EventMapRefact from './EventMapRefact';
import { UserContext } from '../App';

// MODULE IMPORTS
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';

interface AppProps {
  mode: string;
  updateCoords(): void;
  lat: number;
  lon: number;
}

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

const EventMapPageRefact = ({ lat, lon, updateCoords, mode }: any) => {
  const { event }: any = useLocation().state;
  const user: { id: number; roleId: number } = useContext(UserContext);
  // console.log('LINE 42', user);
  const roleId = user.roleId;

  // STATE VAR FOR COORDINATE CHAIN STRING
  const [routeCoordinates, setRouteCoordinates] = useState('');
  const [centerCoords, setCenterCoords]: any = useState([]);
  const [routeData, setRouteData]: any = useState({});
  const [updateCounter, setUpdateCounter] = useState(0);
  // SET VAR FOR TODAYS DATE THAT MATCHES DATABASE FORMAT
  const today = dayjs().add(7, 'day').format().slice(0, 10);
  // console.log('LINE 21 || DELIVERY PAGE', today);

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
    <div className='container-container'>
      <section>
        {routeData.waypoints ? (
          <EventMapRefact
            mode={mode}
            routeCoordinates={routeCoordinates}
            routeData={routeData}
            updateCoords={updateCoords}
            updateCounter={updateCounter}
            setUpdateCounter={setUpdateCounter}
            lat={lat}
            lon={lon}
            centerCoords={centerCoords}
            getEventRoutes={getEventRoutes}
            event={event}
          />
        ) : (
          <h1>Grabbing your map</h1>
        )}
      </section>
    </div>
  );
};

export default EventMapPageRefact;
