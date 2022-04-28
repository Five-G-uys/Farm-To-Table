/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Router } from 'express';
import { Events } from '../db/models';

const eventRouter: Router = Router();


eventRouter.post('/api/event', (req, res) => {
  const { eventName, description, thumbnail, category, eventDate, eventType } =
    req.body.event;

  // console.log('162 Request object postEvent', req.body);
  Events.create({
    eventName,
    description,
    thumbnail,
    category,
    eventDate,
    eventType,
  })
    .then((data: any) => {
      // console.log('Return Events Route || Post Request', data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

//Events get request
eventRouter.get('/events', (req, res) => {
  Events.findAll()
    .then((response: any) => {
      // console.log(response, 'This is line 186 events gotten');
      res.status(200).send(response);
    })
    .catch((err: object) => {
      // console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

module.exports = eventRouter;