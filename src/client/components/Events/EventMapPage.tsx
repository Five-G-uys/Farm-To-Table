import React from 'react';

// COMPONENT IMPORTS
import EventMap from './EventMap';

// MODULE IMPORTS
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dayjs from 'dayjs';
import axios from 'axios';

const EventMapPage = ({ mode, updateCoords, updateCounter, lat, lon }: any) => {
    
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
