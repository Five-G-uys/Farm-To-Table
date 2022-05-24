// Import Dependencies
import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Router
const weatherRouter = Router();

///////////////////////////////////////////////////////////////////////////////////////////// GET WEATHER FUNCTION
const getCurrentWeather: any = (lat: any, lon: any) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=imperial`
    )
    .then((response: { data: any }) => response.data) //returns data object of current weather conditions
    .catch((err: any) => console.error('error in weather api call: ', err));
};

///////////////////////////////////////////////////////////////////////////////////////////// GET WEATHER ROUTE
//sends location to weather api and responds with current weather
weatherRouter.get('/weather/:lat/:lon', (req: any, res: any) => {
  const { lat, lon } = req.params;
  getCurrentWeather(lat, lon)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(404);
    });
});

// Export Router
export default weatherRouter;
