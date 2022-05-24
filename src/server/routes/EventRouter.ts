// Import Dependencies
import axios from 'axios';
import { Request, Response, Router } from 'express';
import { nextTick } from 'process';

// Import Models
import { Events } from '../db/models';

// Set Up Router
const eventRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE EVENT ROUTE
eventRouter.post('/api/events', async (req: Request, res: Response) => {
  const {
    eventName,
    description,
    thumbnail,
    eventDate,
    eventType,
    city,
    location,
    // monthTitle,
    // seasonTitle,
  } = req.body.event;
  const date: string = eventDate.slice(0, 10);
  const time = `time: ${eventDate.slice(11, eventDate.length)}`;

  const address: any = `${location} ${city}`;
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg`,
    );
    Events.create({
      eventName,
      description,
      thumbnail,
      eventDate: date + ' ' + time,
      eventType,
      city,
      location,
      lat: data.features[0].geometry.coordinates[1],
      lon: data.features[0].geometry.coordinates[0],
      // monthTitle,
      // seasonTitle,
    })
      .then((data: []) => {
        console.log('Return Events Route || Post Request', data);
        res.status(201).send(data);
      })
      .catch((err: string) => {
        console.error('Post Request Failed', err);
        res.sendStatus(500);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL EVENTs ROUTE
eventRouter.get('/api/events', (req: Request, res: Response) => {
  Events.findAll()
    .then((response: []) => {
      //console.log(response, "This is line 186 events gotten");
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.error('Something went wrong', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE EVENT ROUTE
eventRouter.patch('/api/events/:id', async (req: Request, res: Response) => {
  //console.log("LINE 146 || UPDATE EVENT", req.body);

  try {
    // update product model with async query and assign the result of that promise to a variable to res.send back
    const updatedEvent = await Events.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    //console.log("LINE 155 || UPDATE EVENT", updatedEvent);

    res.status(204).json(updatedEvent);
  } catch (err) {
    console.error('LINE 159 || UPDATE EVENTS', err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE EVENT ROUTE
eventRouter.delete('/api/events/:id', (req: Request, res: Response) => {
  // console.log("line 120", req.query);
  // console.log("LINE 121", req.params);
  Events.destroy({
    where: req.params,
  })
    .then(() => {
      //console.log("125 deletion was successful!", data);
      res.sendStatus(200);
    })
    .catch((err: string) => {
      console.error('128 Deletion was not successful', err);
      res.sendStatus(400);
    });
});

//////////////////////////EVENT MAP BOX GET REQUEST ////////////////////////////
eventRouter.get(
  '/api/event/:lat/:lon/:eventLon/:eventLat',
  async (req: Request, res: Response) => {
    console.log('LINE 111', req.params, '||', req.query);

    const { lon, lat, eventLat, eventLon } = req.params;

    try {
      console.log('LINE 113', lon, lat, 'AND EVENT', eventLat, eventLon);
      const query = await axios.get(
        // HARDCODING INITIAL LAT AND LON VALUES SO GPS FUNCTIONALITY WON'T BE NECESSARY ON DEPLOYED INSTANCE TO RENDER MAP
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${lon},${lat};${eventLon},${eventLat}?steps=true&geometries=geojson&roundtrip=true&access_token=${process.env.MAPBOX_API_KEY}`,
      );
      console.log('LINE 122', query);
      return res.status(200).json(query);
    } catch (err: any) {
      console.log('LINE 125', err.message);
      return res.sendStatus(400);
      // return { message: 'ERROR FETCHING OPTIMIZED ROUTE FROM MAPBOX', err };
      //next(err);
    }
  },
);

// Export Router
export default eventRouter;
