/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import { Op, or } from 'sequelize';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Orders, SubscriptionEntries } from '../db/models';

// Import Helper Functions
import { getRoute } from '../utils/mapbox';
// Set Up Router
const orderRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Order ROUTE
orderRouter.post('/api/order', (req, res) => {
  // console.log(req.body)
  const { subscriptionEntryId, deliveryDate } = req.body;
  Orders.create({ subscriptionEntryId, deliveryDate })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      // console.error('Order Post Request Failed', err);
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
      // console.log('FIND ALL Orders ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// GET TODAYS ORDER COORDINATES
orderRouter.get('/api/order/todaysOrders', (req, res) => {
  console.log('LINE 47 || ORDER ROUTER', req.query);
  const { lat, lon, delivery_date } = req.query;
  Orders.findAll({ where: { delivery_date } })
    .then((response: any) => {
      console.log('LINE 51 || ORDERROUTER', response);
      const subscriptionEntryIds = response.map((order: any) => {
        return { id: order.dataValues.subscriptionEntryId };
      });
      console.log('LINE 52 || ORDER ROUTER', subscriptionEntryIds);

      // FIND SUBSCRIPTION ENTRIES WITH THE ID ARRAY
      return SubscriptionEntries.findAll({
        where: {
          [Op.or]: subscriptionEntryIds,
        },
      });
    })
    .then((data: any) => {
      console.log('LINE 64 || ORDER ROUTER', data);
      const orderLocations = data.map((subscriptionEntry: any) => {
        return {
          streetAddress: subscriptionEntry.streetAddress,
          city: subscriptionEntry.city,
          state: subscriptionEntry.state,
          zip: subscriptionEntry.zip,
          lat: subscriptionEntry.lat,
          lon: subscriptionEntry.lon,
        };
      });
      return getRoute(lat, lon, orderLocations);
    })
    .then((route: any) => {
      if (route.message) {
        throw route.err;
      }
      console.log('LINE 82 || ORDERROUTER', route.data);
      res.json(route.data);
    })
    .catch((err: object) => {
      console.log('LINE 85, FIND ALL Orders ERROR: ', err);
      res.status(404).json(err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// ORDERS GET ROUTE
orderRouter.get(`/api/upcoming_orders/:id`, (req: Request, res: Response) => {
  console.log('LINE 93 || SERVER INDEX', req.params); // user id
  // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
  // QUERY USER TABLE THEN JOIN
  SubscriptionEntries.findAll({ where: { userId: Number(req.params.id) } })
    .then((data: Array<object>) => {
      const dataObj: Array<object> = [];
      console.log('LINE 99 || ORDER ROUTER', data);
      data.forEach((subscriptionEntry: any) => {
        console.log('LINE 100', subscriptionEntry.dataValues);
        if (subscriptionEntry.dataValues.userId === Number(req.params.id)) {
          dataObj.push(subscriptionEntry.dataValues.id);
        }
      });
      dataObj.map((subscriptionEntryId: any) => {
        return { subscriptionEntryId: subscriptionEntryId };
      });
      // Orders.findAll({ where: { subscriptionEntryId: req.params.id } })
      Orders.findAll({
        where: {
          [Op.or]: dataObj.map((subscriptionEntryId: any) => ({
            subscriptionEntryId: subscriptionEntryId,
          })),
        },
      })
        .then((data: any) => {
          console.log('LINE 117 || SERVER INDEX', Array.isArray(data)); // ==> ARRAY OF ORDER OBJECTS
          res.json(data);
        })
        .catch((err: any) => {
          console.error('LINE 121 || SERVER INDEX', err);
          res.send(err);
        });
    })
    .catch((err: any) => {
      console.error('LINE 126 || ORDER ROUTER || GET || ERROR', err);
    });

  // console.log('LINE 263 ||', dataObj);
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Orders ROUTE
orderRouter.patch('/api/order/:id', async (req: Request, res: Response) => {
  // console.log('UPDATE Order REQUEST BODY: ', req.body);
  try {
    const updatedOrder = await Orders.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('Order UPDATE INFO: ', updatedOrder);
    res.status(204).json(updatedOrder);
  } catch (err) {
    // console.error('Order UPDATE WAS NOT SUCCESSFUL: ', err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Order ROUTE
orderRouter.delete('/api/order/:id', (req: Request, res: Response) => {
  Orders.destroy({ where: req.params })
    .then((data: any) => {
      // console.log("Order DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      // console.error('Order DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default orderRouter;
