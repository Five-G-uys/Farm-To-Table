/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Orders } from '../db/models';

// Set Up Router
const orderRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Order ROUTE
orderRouter.post('/api/order', (req, res) => {
  // console.log(req.body)
  const { subscriptionEntryId, deliveryDate } =
    req.body;
    Orders.create({ subscriptionEntryId, deliveryDate })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Orders ROUTE
orderRouter.get('/api/order', (req, res) => {
  Orders.findAll()
    .then((response: any) => {
      console.log('FIND ALL Orders RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL Orders ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Orders ROUTE
orderRouter.patch(
  '/api/order/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE Order REQUEST BODY: ', req.body);
    try {
      const updatedOrder = await Orders.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('Order UPDATE INFO: ', updatedOrder);
      res.status(204).json(updatedOrder);
    } catch (err) {
      console.error('Order UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Order ROUTE
orderRouter.delete('/api/order/:id', (req: Request, res: Response) => {
  Orders.destroy({ where: req.params })
    .then((data: any) => {
      console.log("Order DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Order DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default orderRouter;