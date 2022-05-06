/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { RSVP } from '../db/models';

// Set Up Router
const rsvpRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE RSVP ROUTE
rsvpRouter.post('/api/rsvp', (req, res) => {
  // console.log(req.body)
  const { userId, eventId } =
    req.body;
    RSVP.create({ userId, eventId })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('RSVP Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL RSVPs ROUTE
rsvpRouter.get('/api/rsvp', (req, res) => {
  RSVP.findAll()
    .then((response: any) => {
      console.log('FIND ALL RSVPs RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL RSVPs RESPONSE: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID RSVP ROUTE
rsvpRouter.patch('/api/rsvp/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE RSVPs REQUEST BODY: ', req.body);
    try {
      const updatedRSVP = await RSVP.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('RSVP UPDATE INFO: ', updatedRSVP);
      res.status(204).json(updatedRSVP);
    } catch (err) {
      console.error('RSVP UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID RSVP ROUTE
rsvpRouter.delete('/api/rsvp/:id', (req: Request, res: Response) => {
  RSVP.destroy({ where: req.params })
    .then((data: any) => {
      console.log("RSVP DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('RSVP DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default rsvpRouter;