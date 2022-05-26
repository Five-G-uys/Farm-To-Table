/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import { Op, or } from 'sequelize';
import express, { Express, Request, Response } from 'express';
import dayjs from 'dayjs';
import getCenter from 'geolib/es/getCenter';

// Import Models
import { Orders, Products, SubscriptionEntries } from '../db/models';

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
      // console.log('FIND ALL Orders RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      // console.log('FIND ALL Orders ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// GET TODAYS ORDER COORDINATES
orderRouter.get('/api/order/todaysOrders', (req, res) => {
  // console.log('LINE 47 || ORDER ROUTER', req.query);
  const { lat, lon, delivery_date } = req.query;
  // want to find all orders within 8 days of today.
  // create a delivery_date array of dates based of current delivery_date value using dayjs add 1 day 7 times
  const delivery_dates: any = [];
  // for loop
  for (let i = 0; i < 8; i++) {
    const date: any = dayjs().add(i, 'day').format().slice(0, 10);
    delivery_dates.push({ delivery_date: date });
  }
  // console.log('LINE 57 || ORDER ROUTER || TODAYS ORDERS', delivery_dates);

  Orders.findAll({ where: { [Op.or]: delivery_dates } })
    // Orders.findAll({ where: { delivery_date } })
    .then((response: any) => {
      // console.log('LINE 62 || ORDERROUTER', response);
      const subscriptionEntryIds = response.map((order: any) => {
        return { id: order.dataValues.subscriptionEntryId };
      });
      // console.log('LINE 66 || ORDER ROUTER', subscriptionEntryIds);

      // FIND SUBSCRIPTION ENTRIES WITH THE ID ARRAY
      return SubscriptionEntries.findAll({
        where: {
          [Op.or]: subscriptionEntryIds,
        },
      });
    })
    .then(async (data: any) => {
      // console.log('LINE 76 || ORDER ROUTER', data);
      const orderLocations = data.map((subscriptionEntry: any) => {
        return {
          // streetAddress: subscriptionEntry.streetAddress,
          // city: subscriptionEntry.city,
          // state: subscriptionEntry.state,
          // zip: subscriptionEntry.zip,
          latitude: subscriptionEntry.lat,
          longitude: subscriptionEntry.lon,
        };
      });

      // Get center of all dropoff points
      const center: any = getCenter([
        ...orderLocations,
        { latitude: 29.949123908409483, longitude: -90.10436932015816 },
      ]);
      console.log('LINE 92 || ORDER ROUTER ', center);
      // return result of GETROUTE function from UTILS folder, invoked with lat lon and delivery locations.
      // need to hardcode lat and lon values to simulate distribution center
      const routeData: any = [await getRoute(lat, lon, orderLocations), center];
      // console.log('LINE 96 || ORDER ROUTER ', routeData);
      return routeData;
    })
    .then((route: any) => {
      if (route.message) {
        throw route.err;
      }
      console.log('LINE 103 || ORDERROUTER', [route[0].data, route[1]]);
      res.json([route[0].data, route[1]]);
    })
    .catch((err: object) => {
      console.log('LINE 97, FIND ALL Orders ERROR: ', err);
      res.status(404).json(err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// GET USER'S UPCOMING ORDERS
orderRouter.get(`/api/upcoming_orders/:id`, (req: Request, res: Response) => {
  // console.log('LINE 93 || SERVER INDEX', req.params); // user id
  // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
  // QUERY USER TABLE THEN JOIN
  SubscriptionEntries.findAll({ where: { userId: Number(req.params.id) } })
    .then((data: Array<object>) => {
      const dataObj: Array<object> = [];
      // console.log('LINE 99 || ORDER ROUTER', data);
      data.forEach((subscriptionEntry: any) => {
        // console.log('LINE 100', subscriptionEntry.dataValues);
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
        include: [
          {
            model: Products,
            attributes: ['img_url', 'name', 'id', 'quantity'],
          },
        ],
      })
        .then((data: any) => {
          // console.log('LINE 137 || SERVER INDEX', Array.isArray(data), data); // ==> ARRAY OF ORDER OBJECTS
          // SORT ORDERS BY ORDER ID (SAME AS SORTING BY DATE)
          data.sort((a: any, b: any) => a.id - b.id);
          // console.log('LINE 139 || SERVER INDEX', data); // ==> ARRAY OF ORDER OBJECTS
          res.json(data);
        })
        .catch((err: any) => {
          console.error('LINE 141 || SERVER INDEX', err);
          res.send(err);
        });
    })
    .catch((err: any) => {
      console.error('LINE 149 || ORDER ROUTER || GET || ERROR', err);
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

orderRouter.get(
  '/api/order/deliveries',
  async (req: Request, res: Response) => {
    try {
      let orders = await Orders.findAll({
        include: [
          {
            model: Products,
            attributes: ['img_url', 'name', 'id', 'quantity'],
          },
        ],
      });
      // console.log('LINE 196 || ORDER ROUTER || ADMIN ORDERS', orders);
      orders = orders.sort((a: any, b: any) => a.id - b.id);
      // console.log('LINE 198 || ORDER ROUTER || ADMIN ORDERS', orders);
      // console.log(
      //   'LINE 179 || ORDER ROUTER || DELIVERIES',
      //   orders,
      //   orders.sort((a: any, b: any) => a.id - b.id),
      // );
      // map array then make a set
      const datesCopy: any = Array.from(
        new Set(
          orders.map((order: any, i: number) => {
            // console.log(`LINE 208 || ORDER ROUTER || ORDER${i}}`, order);

            return {
              id: i,
              delivery_date: order.delivery_date,
              products: order.products,
            };
          }),
        ),
      );
      // const dates = [...datesCopy];
      const uniqueDeliveryDateArray: any = [];
      // console.log(
      //   'LINE 212 || ORDER ROUTER ||',
      //   datesCopy.filter((order: any) => {
      //     if (uniqueDeliveryDateArray.indexOf(order.delivery_date) === -1) {
      //       uniqueDeliveryDateArray.push(order.delivery_date);
      //       return order;
      //     } else {
      //       return;
      //     }
      //   }),
      // );

      res.json(
        datesCopy.filter((order: any) => {
          if (uniqueDeliveryDateArray.indexOf(order.delivery_date) === -1) {
            uniqueDeliveryDateArray.push(order.delivery_date);
            return order;
          } else {
            return;
          }
        }),
      );
    } catch (err: any) {
      console.error('LINE 216 || ORDER ROUTER || DELIVERIES ERROR', err);
      res.json(err);
    }

    // .then((orders: any) => {
    // })
    // .catch((err: any) => {
    // });
  },
);

// Export Router
export default orderRouter;
