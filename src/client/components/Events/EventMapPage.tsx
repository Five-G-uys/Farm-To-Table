import React from 'react';

// COMPONENT IMPORTS
import EventMap from './EventMap';

// MODULE IMPORTS
import 'mapbox-gl/dist/mapbox-gl.css';

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
