/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// COMPONENT IMPORTS
import Map from './Map';

// MODULE IMPORTS
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

const DeliveryPage = ({ lat, lon, updateCoords, mode }: any) => {
  // STATE VAR FOR COORDINATE CHAIN STRING
  const [routeCoordinates, setRouteCoordinates] = useState('');
  const [routeData, setRouteData] = useState({});
  const [updateCounter, setUpdateCounter] = useState(0);
  // SET VAR FOR TODAYS DATE THAT MATCHES DATABASE FORMAT
  const today = dayjs().add(7, 'day').format().slice(0, 10);
  // console.log('LINE 21 || DELIVERY PAGE', today);

  let tempStr = '';
  //FIRST FETCH ALL ORDERS FOR TODAY
  const getTodaysOrders = () => {
    if (!lat || !lon) return;
    axios
      .get('/api/order/todaysOrders', {
        params: { delivery_date: today, lat, lon },
      })
      .then((data) => {
        console.log('LINE 34 || DELIVERY PAGE', data.data.waypoints);
        setRouteData(data.data);
        console.log('TEMP STRING', data.data.waypoints);
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
        setRouteCoordinates(tempStr);
        setUpdateCounter(updateCounter + 1);
        // setUpdateCounter(updateCounter + 1);
      })
      .catch((err) => {
        console.error('LINE 52 || DELIVERY PAGE ERROR', err);
      });
  };
  useEffect(getTodaysOrders, [lat, lon]);

  // console.log('LINE 57 || DELIVERY PAGE||', dayjs().format('H'));

  console.log('LINE 59', routeCoordinates);
  return (
    <div>
      <Map
        mode={mode}
        routeCoordinates={routeCoordinates}
        routeData={routeData}
        updateCoords={updateCoords}
        updateCounter={updateCounter}
        lat={lat}
        lon={lon}
      />
    </div>
  );
};

export default DeliveryPage;
