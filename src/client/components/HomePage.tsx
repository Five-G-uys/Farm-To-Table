/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Farms from './Farms';
import { stringify } from 'querystring';

const HomePage = () => {
  // interface Farms {name: string, description: string, id: number, farmArray: any}
  const [farms, setFarms] = useState([]);

  const getFarms = () => {
    axios.get('/api/farms')
      .then((data: any) => {
        // console.log("front end axios call", data)
        setFarms((data.data))
      })
      .catch((err: unknown) => {
        console.error("OH NOOOOO", err)
      })
  }
  useEffect(() => {
    getFarms();
  }, [])
  // console.log("farms", 22, farms)

  return (
    <div>
      {/* {farms && farms.map((farm: { name: string, description: string, id: number }) => {
        return <Farms name={farm.name} description={farm.description} key={farm.id}></Farms>
      })} */}
    </div>
  )
};

export default HomePage;