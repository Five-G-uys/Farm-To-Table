// Import Dependencies
import axios from 'axios';
import { Request, Response, Router } from 'express';

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

  const address: any = `${location} ${city}`;
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg`,
    );
    Events.create({
      eventName,
      description,
      thumbnail,
      eventDate,
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

// Export Router
export default eventRouter;
