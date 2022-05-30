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
import MapRefactored from './MapRefactored';
import { UserContext } from '../App';

// MODULE IMPORTS
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

// takes in state and an action (an obj) , then uses switch case to update the state
export const driverLocationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setLocation':
      // console.log('LINE 28 || DELIVERY PAGE || SETTING LOCATION');
      // return  new state
      return {
        ...state,
        driverLat: action.payload.driverLat,
        driverLon: action.payload.driverLon,
      };

    // otherwise return state
    default:
      return state;
  }
};

const socketUrl = 'ws://localhost:3030';

const DeliveryPage = ({ lat, lon, updateCoords, mode }: any) => {
  const [state, dispatch] = useReducer(driverLocationReducer, {
    driverLat: lat,
    driverLon: lon,
  });

  const user: { id: number; roleId: number } = useContext(UserContext);
  // console.log('LINE 42', user);
  const roleId = user.roleId;

  // state var for websocket
  const [socket, setSocket]: any = useState(null);

  // STATE VAR FOR COORDINATE CHAIN STRING
  const [routeCoordinates, setRouteCoordinates] = useState('');
  const [centerCoords, setCenterCoords]: any = useState([]);
  const [routeData, setRouteData]: any = useState({});
  const [updateCounter, setUpdateCounter] = useState(0);
  // SET VAR FOR TODAYS DATE THAT MATCHES DATABASE FORMAT
  const today = dayjs().add(7, 'day').format().slice(0, 10);
  // console.log('LINE 21 || DELIVERY PAGE', today);

  let tempStr = '';
  let tempWaypointCoords: any;

  //FIRST FETCH ALL ORDERS FOR TODAY
  const getTodaysOrders = () => {
    if (!lat || !lon) return;
    axios
      .get('/api/order/todaysOrders', {
        params: { delivery_date: today, lat, lon },
      })
      .then((data) => {
        console.log('LINE 77 || DELIVERY PAGE', data.data);
        // set route data to the array of waypoints I get back
        setRouteData(data.data);
        // set center to the center {lat, lon} obj  I got back
        // setCenterCoords(data.data[1]);

        // tempWaypointCoords = data.data[0].waypoints.map((waypoint: any) => {
        //   console.log('LINE 80 || DELIVERY PAGE', waypoint.location);
        //   return {
        //     latitude: waypoint.location[1],
        //     longitude: waypoint.location[0],
        //   };
        // });

        tempStr = data.data.waypoints
          .map((location: any) => {
            // console.log(
            //   'LINE 33 || LOCATION MAP',
            //   `${location.lat},${location.lon}`,
            // );
            return `${location.location[0]},${location.location[1]}`;
          })
          .join(';');

        // console.log('LINE 46 || DELIVERY PAGE', tempStr);
        // setCenterCoords(tempWaypointCoords);
        setRouteCoordinates(tempStr);
        setUpdateCounter(updateCounter + 1);
        // setUpdateCounter(updateCounter + 1);
      })
      .catch((err) => {
        console.error('LINE 104 || DELIVERY PAGE ERROR', err);
      });
  };

  useEffect(getTodaysOrders, [lat, lon, roleId]);

  useEffect(() => {
    //  Return if socket isn't connected
    if (!socket || roleId != 3 || !lat || !lon) return;
    // only emit events for delivery drivers
    const locationInterval: any = setInterval(() => {
      // get current location (as obj with driverLat driverLon properties)
      // send to websocket server
      socket.send(JSON.stringify({ driverLat: lat, driverLon: lon }));
      // console.log('LINE 122 || DELIVERY PAGE || DRIVER INTERVAL USEEFFECT');
      dispatch({
        type: 'setLocation',
        payload: { driverLat: lat, driverLon: lon },
      });
    }, 3000);
    // Stop interval from running after unmounting.
    //Trying to clean up side effect to prevent unnecessary resource usage and slowdown
    return () => clearInterval(locationInterval);
  }, [lat, lon, socket]);

  // console.log('LINE 115 || STATE', state);

  // WebSocket: set up to create the socket and set it in state
  useEffect(() => {
    const socketInstance = new WebSocket(socketUrl);
    socketInstance.binaryType = 'arraybuffer';
    setSocket(socketInstance);
    // Cleanup ==> disconnect socket
    return () => socket.close();
  }, []);

  useEffect(() => {
    //  Return if socket isn't connected
    if (!socket || roleId != 4) return;

    socket.onopen = () => {
      console.log('LINE 129 || SOCKET OPENED');
    };

    // ONLY ADMIN SHOULD DISPATCH MESSAGE

    // if (roleId < 4) {
    socket.onmessage = (e: any) => {
      // console.log('LINE 133 || MESSAGE', e.data, e);
      const message: any = JSON.parse(e.data);
      console.log('LINE 157 || MESSAGE', message);

      // roleId > 3 &&
      dispatch({
        type: 'setLocation',
        payload: {
          driverLat: message.driverLat,
          driverLon: message.driverLon,
        },
      });
    };
    // }
  }, [socket, roleId]);

  // console.log('LINE 170 || DELIVERY PAGE || routedata', routeData);
  return (
    <div className='container-container'>
      {/* <section className='flex-grow pt-14 px-6'>
        <Map
          mode={mode}
          routeCoordinates={routeCoordinates}
          routeData={routeData}
          updateCoords={updateCoords}
          updateCounter={updateCounter}
          lat={lat}
          lon={lon}
          state={state}
          centerCoords={centerCoords}
        />{' '}
        'hello'
      </section> */}
      <section>
        {routeData.waypoints ? (
          <MapRefactored
            mode={mode}
            routeCoordinates={routeCoordinates}
            routeData={routeData}
            updateCoords={updateCoords}
            updateCounter={updateCounter}
            lat={lat}
            lon={lon}
            state={roleId == 4 && state}
            centerCoords={centerCoords}
          />
        ) : (
          <h1>Grabbing your map</h1>
        )}
      </section>
    </div>
  );
};

export default DeliveryPage;
