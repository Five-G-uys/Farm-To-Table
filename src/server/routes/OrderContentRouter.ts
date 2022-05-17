// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Orders, OrderContents } from '../db/models';
// Set Up Router
const orderContentRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE OrderContent ROUTE
orderContentRouter.post(
  '/api/order-content',
  async (req: Request, res: Response, next: any) => {
    console.log('LINE 18', req.body);
    // destructure product id array from req.body as well
    const { delivery_date } = req.body;
    try {
      // find all orders with same delivery date
      const orders = await Orders.findAll({
        where: { delivery_date },
      });
      console.log('LINE 23 || ORDER CONTENTS ROUTER', orders);

      if (orders.length < 1) {
        // use throw to send custom error obj to catch block and call next
        const err: any = new Error('No orders on this date');
        res.status(404);
        next(err);
        // throw err;
      }
      // logic to loop through each order and on each order loop through product id's to add
      // to order contents

      // OR

      // await
      // map through orders, return from map each object that should be an orderContent entry

      res.json(orders);
    } catch (err: any) {
      // err ==> {status: 404, message: 'No orders on this date'}
      console.log('LINE 35', err.message);
      next(err);
      // res.json(err);
    }

    // OrderContents.create({ productId, orderId })
    //   .then((data: any) => {
    //     res.status(201).send(data);
    //   })
    //   .catch((err: string) => {
    //     console.error('Post Request Failed', err);
    //     res.sendStatus(500);
    //   });
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL OrderContents ROUTE
orderContentRouter.get('/api/order-content', (req, res) => {
  OrderContents.findAll()
    .then((response: any) => {
      console.log('FINDALL USERS RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE OrderContents ROUTE
orderContentRouter.patch(
  '/api/order-content/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE OrderContent REQUEST BODY: ', req.body);
    try {
      const updatedUser = await OrderContents.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('OrderContent UPDATE INFO: ', updatedUser);
      res.status(204).json(updatedUser);
    } catch (err) {
      console.error('OrderContents UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE OrderContents ROUTE
orderContentRouter.delete(
  '/api/order-content/:id',
  (req: Request, res: Response) => {
    OrderContents.destroy({ where: req.params })
      .then((data: any) => {
        console.log('OrderContent DELETION SUCCESSFUL: ', data);
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error('OrderContent DELETION WAS NOT SUCCESSFUL: ', err);
        res.sendStatus(400);
      });
  }
);

// Export Router
export default orderContentRouter;
