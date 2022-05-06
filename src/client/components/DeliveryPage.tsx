/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import Map from './Map';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

const DeliveryPage = ({ lat, lon, updateCoords }: any) => {
  //FIRST FETCH ORDER
  return (
    <div>
      <Map updateCoords={updateCoords} lat={lat} lon={lon} />
    </div>
  );
};

export default DeliveryPage;
