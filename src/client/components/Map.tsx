// import React, { useRef, useEffect, useState } from 'react';

// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import axios from 'axios';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

// mapboxgl.accessToken =
//   'pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A';

// const Map = ({ lat, lon, updateCoords, routeCoordinates }: any) => {
//   const mapContainerRef = useRef(null);
//   const map: any = useRef(null);

//   // const [lng, setLng] = useState(lon);
//   // const [latt, setLatt] = useState(lat);
//   const [zoom, setZoom] = useState(11);

//   // Initialize map when component mounts
//   useEffect(() => {
//     if (!lat && !lon) return;
//     if (map.current) return;

//     map.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lon, lat],
//       zoom: zoom,
//     });

//     // Add navigation control (the +/- zoom buttons)
//     map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
//     // Add directions start/destination widget (box to enter starting location and destination)
//     map.current.addControl(
//       new MapboxDirections({
//         unit: 'metric',
//         profile: 'mapbox/driving',
//         accessToken: mapboxgl.accessToken,
//         // coordinates,
//       }),
//       'top-left'
//     );
//     // Clean up on unmount
//     return () => map.remove();
//   }, [lat, lon, zoom]);

//   useEffect(() => {
//     if (!map.current) return;

//     map.current.on('move', () => {
//       updateCoords(
//         map.current.getCenter().lat.toFixed(2),
//         map.current.getCenter().lng.toFixed(2)
//       );
//       console.log('q');
//       // setLng(map.getCenter().lng.toFixed(lon));
//       // setLatt(map.getCenter().lat.toFixed(latt));
//       setZoom(map.current.getZoom().toFixed(5));
//     });
//   }, [map]);

//   //   useEffect(() => {
//   //     axios.post(
//   //       `https://api.mapbox.com/matching/v5/mapbox/driving?access_token=${mapboxgl.accessToken}
//   // `,
//   //       {}
//   //     );
//   //   }, []);
//   // useEffect(() => {
//   //   const address = '8319 Apricot Street New Orleans';

//   //   axios
//   //     .get(
//   //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iZGszeTExOGkzanBuNWNqcWNxdm8ifQ.fuECEnMtgosol8pKpegx2A`
//   //     )
//   //     .then((data) => {
//   //       console.log('LINE 76', data);
//   //     })
//   //     .catch((err) => {
//   //       console.error('LINE 79', err);
//   //     });
//   // }, []);

//   // create a function to make a directions request
//   async function getRoute() {
//     // make a directions request using cycling profile
//     // an arbitrary start will always be the same
//     // only the end or destination will change
//     try {
//       // lon is first (-90ish)
//       // for one way trips add source=first&destination=last& before access token
//       const query = await fetch(
//         `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${lon},${lat};${routeCoordinates}?steps=true&geometries=geojson&roundtrip=true&access_token=${mapboxgl.accessToken}`,
//         { method: 'GET' }
//       );
//       const matrixTime = await fetch(
//         `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${lon},${lat};${routeCoordinates}?&access_token=${mapboxgl.accessToken}`,
//         { method: 'GET' }
//       );
//       console.log('LINE 101 || MATRIX TIME', matrixTime);

//       const json = await query.json();
//       if (!json.trips || !json.waypoints) {
//         throw json;
//       }
//       const waypoints: any = json.waypoints;
//       // console.log('LINE 80 || MAP COMPONENT', json);
//       // console.log('LINE 81 || MAP COMPONENT', lat, lon);
//       const data = json.trips[0];

//       const route = data.geometry.coordinates;
//       const geojson = {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinates: route,
//         },
//       };

//       // if the route already exists on the map, we'll reset it using setData
//       if (map.current.getSource('route')) {
//         map.current.getSource('route').setData(geojson);
//       }
//       // otherwise, we'll make a new request
//       else {
//         map.current.addLayer({
//           id: 'route',
//           type: 'line',
//           source: {
//             type: 'geojson',
//             data: geojson,
//           },
//           layout: {
//             'line-join': 'round',
//             'line-cap': 'round',
//           },
//           paint: {
//             'line-color': '#3887be',
//             'line-width': 5,
//             'line-opacity': 0.75,
//           },
//         });
//       }

//       for (let i = 0; i < waypoints.length; i++) {
//         console.log('LINE 120 || MAP', waypoints[i]);
//         const marker1: any = new mapboxgl.Marker({
//           color:
//             i === 0
//               ? 'lightgreen'
//               : i === waypoints.length - 1
//               ? 'red'
//               : 'grey',
//         })
//           .setLngLat([waypoints[i].location[0], waypoints[i].location[1]])
//           .addTo(map.current);
//       }
//     } catch (err: any) {
//       console.error('LINE 94 || MAP ERROR', err);
//     }

//     // add turn instructions here at the end
//   }

//   useEffect(() => {
//     if (!lat || !lon) return;
//     console.log('LINE 125 || MAP', lat, lon);
//     getRoute();
//   }, [lat, lon]);

//   return (
//     <div>
//       <div className='sidebarStyle'>
//         <div>
//           Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
//         </div>
//       </div>
//       <div className='map-container' ref={mapContainerRef} />
//     </div>
//   );
// };

// export default Map;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxTraffic from "@mapbox/mapbox-gl-traffic";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import * as turf from "@turf/turf";
// import axios from 'axios';
import dayjs from "dayjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg";

const Map = ({ lat, lon, updateCoords, routeCoordinates, mode }: any) => {
  const mapContainerRef = useRef(null);
  const map: any = useRef(null);
  let warehouse: any;
  const [distance, setDistance] = useState(0);
  // const [lng, setLng] = useState(lon);
  // const [latt, setLatt] = useState(lat);
  const [zoom, setZoom] = useState(14);
  console.log("LINE 209", mode);
  const routeCoordinatesArray = routeCoordinates
    .split(";")
    .map((coordinate: any) => {
      return coordinate.split(",");
    });
  // Initialize map when component mounts
  useEffect(() => {
    if (!lat && !lon) return;
    if (routeCoordinatesArray.length < 2) return;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        Number(dayjs().format("H")) > 6 || Number(dayjs().format("H")) <= 18 //mode === 'light'
          ? "mapbox://styles/mapbox/traffic-night-v2"
          : "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    map.current.addControl(new MapboxTraffic(), "bottom-left");
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-left"
    );
    console.log("LINE 222 || MAP.CURRENT", map.current);
    // // Add directions start/destination widget (box to enter starting location and destination)
    // map.current.addControl(
    //   new MapboxDirections({
    //     unit: 'metric',
    //     profile: 'mapbox/driving',
    //     accessToken: mapboxgl.accessToken,
    //     // coordinates,
    //   }),
    //   'bottom-left'
    // );
    // Clean up on unmount
    return map.current
      ? () => map.current.remove()
      : map.current
      ? setTimeout(() => map.current.remove(), 2000)
      : setTimeout(() => map.current.remove(), 2000);
  }, [lat, lon, zoom]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      updateCoords(
        map.current.getCenter().lat.toFixed(2),
        map.current.getCenter().lng.toFixed(2)
      );
      console.log("q");
      // setLng(map.getCenter().lng.toFixed(lon));
      // setLatt(map.getCenter().lat.toFixed(latt));
      setZoom(map.current.getZoom().toFixed(5));
    });
  }, [map]);

  async function getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    try {
      // lon is first (-90ish)
      // for one way trips add source=first&destination=last& before access token
      const query = await fetch(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${lon},${lat};${routeCoordinates}?steps=true&geometries=geojson&roundtrip=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      // const matrixTime = await fetch(
      //   `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${lon},${lat};${routeCoordinates}?&access_token=${mapboxgl.accessToken}`,
      //   { method: 'GET' }
      // );
      // console.log('LINE 101 || MATRIX TIME', matrixTime);

      const json = await query.json();
      if (!json.trips || !json.waypoints) {
        throw json;
      }
      const waypoints: any = json.waypoints;
      console.log("LINE 80 || MAP COMPONENT", json);
      // console.log('LINE 81 || MAP COMPONENT', lat, lon);
      const data = json.trips[0];

      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      // if the route already exists on the map, we'll reset it using setData
      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.current.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });

        map.current.addLayer(
          {
            id: "routearrows",
            type: "symbol",
            source: "route",
            layout: {
              "symbol-placement": "line",
              "text-field": "▶",
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                24,
                22,
                60,
              ],
              "symbol-spacing": [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                30,
                22,
                160,
              ],
              "text-keep-upright": false,
            },
            paint: {
              "text-color": "#3887be",
              "text-halo-color": "hsl(55, 11%, 96%)",
              "text-halo-width": 3,
            },
          },
          "waterway-label"
        );
      }

      for (let i = 0; i < waypoints.length; i++) {
        console.log("LINE 120 || MAP", waypoints[i]);
        const marker1: any = new mapboxgl.Marker({
          color:
            i === 0
              ? "lightgreen"
              : i === waypoints.length - 1
              ? "red"
              : "grey",
        })
          .setLngLat([waypoints[i].location[0], waypoints[i].location[1]])
          .addTo(map.current);
      }
    } catch (err: any) {
      console.error("LINE 94 || MAP ERROR", err);
    }

    // add turn instructions here at the end
  }
  /*




*/

  let dropoffs: any;

  // useEffect to get route and apply it to map whenever the lat or lon change
  useEffect(() => {
    if (!lat || !lon) return;
    if (routeCoordinatesArray.length < 2) return;
    // console.log('LINE 125 || MAP', lat, lon);
    // create hypothetical warehouse location coordinate. Set to current location of device for now. Will hardcode
    // once a permanent location is decided
    const warehouseLocation = [lon, lat];
    // Turning warehouse coordinate (or potentially a series of coordinates) into a GeoJSON feature collection.
    warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // console.log('LINE 371 || WAREHOUSE', warehouse);

    // Creating empty feature collection to store all order points
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dropoffs = turf.featureCollection([
      turf.point([lon, lat]),
      ...routeCoordinatesArray.map((coordinate: any) => turf.point(coordinate)),
    ]);

    // console.log('LINE 362', dropoffs);

    // FOR EACH ORDER COORDINATE CREATE A POINT FEATURE

    // Add layer for drop off locations
    // map.current.addLayer({
    //   id: 'dropoffs-symbol',
    //   type: 'symbol',
    //   source: {
    //     data: dropoffs,
    //     type: 'geojson',
    //   },
    //   layout: {
    //     'icon-allow-overlap': true,
    //     'icon-ignore-placement': true,
    //     'icon-image': 'marker-15',
    //   },
    // });
    // dropoffs = turf.featureCollection([]);

    // Invoking getRoute function to get the route layer from mapbox
    getRoute();
  }, [lat, lon]);

  // useEffect to drop warehouse icon once map and warehouse var load
  useEffect(() => {
    if (!map.current) return;

    map.current.on("load", () => {
      map.current.addLayer({
        id: "warehouse",
        type: "circle",
        source: {
          data: warehouse,
          type: "geojson",
        },
        paint: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3,
        },
      });
      // Create a symbol layer on top of circle layer
      map.current.addLayer({
        id: "warehouse-symbol",
        type: "symbol",
        source: {
          data: warehouse,
          type: "geojson",
        },
        layout: {
          "icon-image": "grocery-15",
          "icon-size": 1,
        },
        paint: {
          "text-color": "#3887be",
        },
      });
      // Create a layer for all dropoff points
      map.current.addLayer({
        id: "dropoffs-symbol",
        type: "symbol",
        source: {
          data: dropoffs,
          type: "geojson",
        },
        layout: {
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-image": "marker-15",
        },
      });
    });
  }, [lat, lon]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef}>
        <div className="sidebar">
          <div>
            Longitude: {lon} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
