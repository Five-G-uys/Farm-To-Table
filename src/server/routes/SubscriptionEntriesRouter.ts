// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import dayjs from 'dayjs';
// Import Models
import {
  SubscriptionEntries,
  Orders,
  OrderContents,
  Products,
} from '../db/models';

// Set Up Router
const subscriptionEntriesRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE SubscriptionEntry ROUTE
subscriptionEntriesRouter.post(
  `/api/add_subscription_entry/:id`,
  async (req: Request, res: Response) => {
    const {
      subscriptionId,
      streetAddress,
      city,
      state,
      zip,
      phone,
      start_date,
      paid,
    } = req.body;

    const address: any = `${streetAddress} ${city}`;
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg`,
      );

      const addSubscription = async () => {
        try {
          // init a new sub entry to a variable for later use when creating orders
          const newSubEntry: any = await SubscriptionEntries.create({
            // CHANGED REQ.PARMS.ID TO NUMBER, USED TO BE STRING
            userId: Number(req.params.id),
            subscriptionId,
            streetAddress,
            city,
            state,
            zip,
            lat: data.features[0].geometry.coordinates[1],
            lon: data.features[0].geometry.coordinates[0],
            phone,
            paid,
          });

          // console.log('LINE 53 || SUBSCRIPTION ENTRY ROUTER || ', newSubEntry);
          // .then((data: any) => { // CLOSES ON LINE 95

          // iterate over number of orders
          for (let i = 1; i < 15; i++) {
            // init a var to represent the delivery date for each order in the subscription starting with the value of the season start date destructured from the req body
            const today: any = dayjs(start_date)
              .add(7 * i, 'day')
              .format('YYYY-MM-DD');

            // search the orders table for any order with a matching date
            // if one is found, include it's order contents in the return with the
            // include property
            const foundOrder: any = await Orders.findOne({
              where: { delivery_date: today },
              // include products array
              include: [
                {
                  model: Products,
                  attributes: ['id'],
                },
              ],
            });
            // console.log('LINE 64 || SUBSCRIPTION ENTRY ROUTER', foundOrder);

            // declare a variable to store product ids of products that have
            // already been added to an order with the same delivery_date
            let foundProductIds: any;
            // only reassign foundProductIds if foundOrder exists
            if (foundOrder) {
              // check in FOUND order for a products property array.
              foundProductIds = foundOrder.products.map(
                (product: any) => product.id,
              );
              // console.log(
              //   'LINE 82 || SUBSCRIPTION ENTRY ROUTER || FOUND PRODUCT IDS',
              //   foundProductIds,
              // );
            }

            // Create a new order for every week in the season
            const newOrder = await Orders.create({
              // subscriptionId: data.dataValues.subscriptionId,
              subscriptionEntryId: newSubEntry.dataValues.id,
              delivery_date: today,
              paid,
            });
            // console.log(
            //   'LINE 93 || SUBSCRIPTION ENTRY ROUTER || NEW ORDER',
            //   newOrder.id,
            // );

            // Then check if foundProductIds.length > 0, which means the admin has added contents to the order
            if (foundProductIds && foundProductIds.length > 0) {
              // id's bulk create for every id in productIds
              const newOrderContentInfo = await foundProductIds.map(
                (productId: any) => ({ productId, orderId: newOrder.id }),
              );
              console.log(
                'LINE 110 || SUBSCRIPTION ENTRY ROUTER || NEW ORDER CONTENT INFO ARRAY',
                newOrderContentInfo,
              );

              await OrderContents.bulkCreate(newOrderContentInfo);
            }
            // const newOrderContent = await OrderContents.create({
            //   orderId: newOrder.id,
            //   productId,
            // });

            // Orders.create({
            //   // subscriptionId: data.dataValues.subscriptionId,
            //   subscriptionEntryId: newSubEntry.dataValues.id,
            //   delivery_date: today,
            // })
            //   .then((data: any) => {
            //     // console.log('LINE 82 || SERVER INDEX ||', data);
            //   })
            //   .catch((err: any) => {
            //     console.log('LINE 73 || SERVER INDEX || ERROR', err);
            //   });
          }
          // });
        } catch (err: any) {
          console.error(
            'LINE 78 || SUBSCRIPTION ENTRY ROUTER || ERROR',
            err,
            err.message,
          );
        }
      };

      await addSubscription();
      // console.log('LINE 332 || INDEXTS SUB POST');
      res.status(201).send('Subscribed!');
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL SubscriptionEntries ROUTE
subscriptionEntriesRouter.get('/api/subscription-entries', (req, res) => {
  SubscriptionEntries.findAll()
    .then((response: any) => {
      // console.log('FIND ALL SubscriptionEntries RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.error('FIND ALL SubscriptionEntries ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID SubscriptionEntry ROUTE
subscriptionEntriesRouter.patch(
  '/api/subscription-entries/:id',
  async (req: Request, res: Response) => {
    // console.log('UPDATE SubscriptionEntries REQUEST BODY: ', req.body);
    try {
      const updatedSubscriptionEntry = await SubscriptionEntries.update(
        req.body,
        {
          where: { id: req.params.id },
          returning: true,
        },
      );
      // console.log('SubscriptionEntry UPDATE INFO: ', updatedSubscriptionEntry);
      res.status(204).json(updatedSubscriptionEntry);
    } catch (err) {
      console.error('SubscriptionEntry UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID SubscriptionEntry ROUTE
subscriptionEntriesRouter.delete(
  '/api/subscription-entries/:id',
  (req: Request, res: Response) => {
    SubscriptionEntries.destroy({ where: req.params })
      .then((data: any) => {
        // console.log('SubscriptionEntry DELETION SUCCESSFUL: ', data);
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error('SubscriptionEntry DELETION WAS NOT SUCCESSFUL: ', err);
        res.sendStatus(400);
      });
  },
);

// Export Router
export default subscriptionEntriesRouter;
