import React from 'react';

// COMPONENT IMPORTS
import EventMap from './EventMap';

// MODULE IMPORTS
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';
interface AppProps {
  mode: string;
  updateCoords(): void;
  lat: string;
  lon: string;
}

const EventMapPage = ({ mode, updateCoords, lat, lon }: AppProps) => {
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
        tempStr = data.data.waypoints
          .map((location: any) => {
            return `${location.location[0]},${location.location[1]}`;
          })
          .join(';');

        setRouteCoordinates(tempStr);
        setUpdateCounter(updateCounter + 1);
      })
      .catch((err) => {
        console.error('LINE 52 || DELIVERY PAGE ERROR', err);
      });
  };
  useEffect(getTodaysOrders, [lat, lon]);

  return (
    <div>
      <h1>Hello!</h1>
      <EventMap
        mode={mode}
        updateCoords={updateCoords}
        updateCounter={updateCounter}
        lat={lat}
        lon={lon}
      />
    </div>
  );
};
export default EventMapPage;
