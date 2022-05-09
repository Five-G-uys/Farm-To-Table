/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Events, RSVP, Users } from '../db/models';

// Set Up Router
const eventRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE EVENT ROUTE
eventRouter.post('/api/events', (req, res) => {
  const { eventName, description, thumbnail, eventDate, eventType, location } =
    req.body.event;

  // console.log('162 Request object postEvent', req.body);
  Events.create({
    eventName,
    description,
    thumbnail,
    eventDate,
    eventType,
    location,
  })
    .then((data: any) => {
      //console.log("Return Events Route || Post Request", data);
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL EVENTs ROUTE
eventRouter.get('/api/events', (req, res) => {
  Events.findAll()
    .then((response: any) => {
      //console.log(response, "This is line 186 events gotten");
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE EVENT ROUTE
eventRouter.patch('/api/events/:id', async (req: Request, res: Response) => {
  // console.log('LINE 146 || UPDATE EVENT', req.body);

  try {
    // update product model with async query and assign the result of that promise to a variable to res.send back
    const updatedEvent = await Events.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('LINE 155 || UPDATE EVENT', updatedEvent);

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
    .then((data: any) => {
      //console.log("125 deletion was successful!", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('128 Deletion was not successful', err);
      res.sendStatus(400);
    });
});

// Export Router
export default eventRouter;
