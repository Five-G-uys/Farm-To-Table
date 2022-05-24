// Import Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Box, Container, Typography } from "@mui/material";

const Weather = ({ lat, lon }: any) => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [humid, setHumid] = useState();

  useEffect(() => {
    axios
      .get(`/weather/${lat}/${lon}`)
      .then((response) => {
        console.log('Response Data', response.data);
        //console.log('Weather Data Response', response.data);
        setCity(response.data.name);
        setTemp(response.data.main.temp);
        setHumid(response.data.main.humidity);
        setWind(response.data.wind.speed);
      })
      .catch((error) => {
        console.error("GET WEATHER ERROR: ", error);
      });
  }, []);


  return (
    <>
      <CssBaseline />
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Current Local Weather
            </Typography>
          </Container>
        </Box>
      {!temp ? null : (
        <>
          <div id="weather_wrapper">
            <div className="weatherCard">
              <div className="currentTemp">
                <span className="temp">{Math.floor(temp)}°</span>
                <span className="location">{city}</span>
              </div>
              <div className="currentWeather">
                <span className="conditions">
                &#xf00d;
                </span>
                <div className="info">
                  <span className="rain">{humid}%</span>
                  <span className="wind">{wind} mph</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Weather;