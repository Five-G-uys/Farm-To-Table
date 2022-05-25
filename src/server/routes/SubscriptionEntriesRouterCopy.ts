// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import dayjs from 'dayjs';
// Import Models
import { SubscriptionEntries, Orders } from '../db/models';

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
    } = req.body;

    const address: any = `${streetAddress} ${city}`;
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg`,
      );

      const addSubscription = async () => {
        try {
          const createdSubEntry = await SubscriptionEntries.create({
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
          });
          // .then(async (data: any) => {
          // CHANGE TODAY TO FIRST DAY OF SEASON START DATE
          // iterate over number of orders
          for (let i = 1; i < 15; i++) {
            const today: any = dayjs(start_date)
              .add(7 * i, 'day')
              .format('YYYY-MM-DD');

            // before creating orders query database for any other orders with same delivery date to match order contents
            // get array of products from order on a delivery date
            const foundOrder = await Orders.findOne({
              where: { delivery_date: today },
            });

            console.log('LINE 64 || SUBSCRIPTION ENTRY ROUTER', foundOrder);

            const createdOrder = await Orders.create({
              // subscriptionId: data.dataValues.subscriptionId,
              subscriptionEntryId: createdSubEntry.dataValues.id,
              delivery_date: today,
            });

            // check in FOUND order for a products property array. Then check if length > 0, which means the admin
            // has added contents to order

            // if it has contents, map over product array making a new array with the product id and CREATED order id. Use
            // this array to bulk create order contents,

            // .then((data: any) => {
            //   // console.log('LINE 318 || SERVER INDEX ||', data);
            // })
            // .catch((err: any) => {
            //   console.log('LINE 73 || SERVER INDEX || ERROR', err);
            // });

            // can create order contents for each order after creating the order
          }
          // })
        } catch (err: any) {
          console.error('LINE 83 || SUB ENTRY ROUTER ERROR', err);
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

// BASIC CRUD POST ROUT. FEEL FREE TO DELETE, JUST THOUGHT ID LEAVE IT HERE INCASE YOU WANTED IT FOR SOME REASON. TESTED AND WORKING (Murphy)
// subscriptionEntriesRouter.post('/api/subscription-entries', (req, res) => {
//   // console.log(req.body)
//   const { subscriptionId, userId } =
//     req.body;
//     SubscriptionEntries.create({ subscriptionId, userId })
//     .then((data: any) => {
//       res.status(201).send(data);
//     })
//     .catch((err: string) => {
//       console.error('Post Request Failed', err);
//       res.sendStatus(500);
//     });
// });

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
