/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { SubscriptionEntries } from '../db/models';

// Set Up Router
const subscriptionEntriesRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE SubscriptionEntry ROUTE
subscriptionEntriesRouter.post('/api/subscription-entry', (req, res) => {
  // console.log(req.body)
  const { subscriptionId, userId } =
    req.body;
    SubscriptionEntries.create({ subscriptionId, userId })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL SubscriptionEntries ROUTE
subscriptionEntriesRouter.get('/api/subscription-entry', (req, res) => {
  SubscriptionEntries.findAll()
    .then((response: any) => {
      console.log('FIND ALL SubscriptionEntries RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL SubscriptionEntries ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID SubscriptionEntry ROUTE
subscriptionEntriesRouter.patch(
  '/api/subscription-entry/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE SubscriptionEntries REQUEST BODY: ', req.body);
    try {
      const updatedSubscriptionEntry = await SubscriptionEntries.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('SubscriptionEntry UPDATE INFO: ', updatedSubscriptionEntry);
      res.status(204).json(updatedSubscriptionEntry);
    } catch (err) {
      console.error('SubscriptionEntry UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID SubscriptionEntry ROUTE
subscriptionEntriesRouter.delete('/api/subscription-entry/:id', (req: Request, res: Response) => {
  SubscriptionEntries.destroy({ where: req.params })
    .then((data: any) => {
      console.log("SubscriptionEntry DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('SubscriptionEntry DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default subscriptionEntriesRouter;