/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';

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
  const [updateCounter, setUpdateCounter] = useState(0);
  // SET VAR FOR TODAYS DATE THAT MATCHES DATABASE FORMAT
  const today = dayjs().add(7, 'day').format().slice(0, 10);
  // console.log('LINE 21 || DELIVERY PAGE', today);

  let tempStr = '';
  //FIRST FETCH ALL ORDERS FOR TODAY
  const getTodaysOrders = () => {
    axios
      .get('/api/order/todaysOrders', { params: { delivery_date: today } })
      .then((data) => {
        console.log('LINE 26 || DELIVERY PAGE', data.data);

        tempStr = data.data
          .map((location: any) => {
            // console.log(
            //   'LINE 33 || LOCATION MAP',
            //   `${location.lat},${location.lon}`
            // );
            return `${location.lon},${location.lat}`;
          })
          .join(';');

        // console.log('LINE 42 || DELIVERY PAGE', tempStr);
        setRouteCoordinates(tempStr);
        setUpdateCounter(updateCounter + 1);
      })
      .catch((err) => {
        console.error('LINE 29 || DELIVERY PAGE ERROR', err);
      });
  };
  useEffect(getTodaysOrders, []);

  console.log('LINE 52 || DELIVERY PAGE||', dayjs().format('H'));

  console.log('LINE 49', routeCoordinates);
  return (
    <div>
      <Map
        mode={mode}
        routeCoordinates={routeCoordinates}
        updateCoords={updateCoords}
        lat={lat}
        lon={lon}
      />
    </div>
  );
};

export default DeliveryPage;
