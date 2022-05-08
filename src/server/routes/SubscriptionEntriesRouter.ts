/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';
import axios from 'axios';

// Import Models
import { SubscriptionEntries, Orders } from '../db/models';

// Set Up Router
const subscriptionEntriesRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE SubscriptionEntry ROUTE
subscriptionEntriesRouter.post(
  `/api/add_subscription_entry/:id`,
  async (req: Request, res: Response) => {
    console.log('LINE 284 || SERVER INDEX.TS', req.body, req.params);
    const { subscriptionId, streetAddress, city, state, zip } = req.body;

    const address: any = `${streetAddress} ${city}`;
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVuZWFtZXJjIiwiYSI6ImNsMm9iNTh3NTA0NTYzcnEwZXpibjRsNjAifQ.4XdAlX4G4l9gCed1kgdcdg`
      );

      console.log('LINE 293 || INDEX SERVER SUB POST', data.geometry);

      const addSubscription = () => {
        console.log('LINE 288 || INDEXSERVER || SUBSCRIPTION ENTRY POST ROUTE');
        SubscriptionEntries.create({
          // CHANGED REQ.PARMS.ID TO NUMBER, USED TO BE STRING
          userId: Number(req.params.id),
          subscriptionId,
          streetAddress,
          city,
          state,
          zip,
          lat: data.features[0].geometry.coordinates[1],
          lon: data.features[0].geometry.coordinates[0],
        })
          .then((data: any) => {
            console.log('LINE 301 || SERVER ||', data.dataValues.id);

            // CHANGE TODAY TO FIRST DAY OF SEASON START DATE
            const today: Date = new Date();
            // iterate over number of orders
            for (let i = 1; i < 15; i++) {
              const nextWeek = () => {
                const today = new Date();
                const nextwk = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 7 * i
                );
                return nextwk;
              };
              // console.log('LINE 218 || NEXTWEEK', nextWeek());
              Orders.create({
                // subscriptionId: data.dataValues.subscriptionId,
                subscriptionEntryId: data.dataValues.id,
                delivery_date: nextWeek(),
              })
                .then((data: any) => {
                  // console.log('LINE 318 || SERVER INDEX ||', data);
                })
                .catch((err: any) => {
                  console.log('LINE 326 || SERVER INDEX || ERROR', err);
                });
            }
          })
          .catch((err: any) => {
            console.error('LINE 327', err);
          });
      };

      await addSubscription();
      // console.log('LINE 332 || INDEXTS SUB POST');
      res.status(201).send('Subscribed!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
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
  '/api/subscription-entries/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE SubscriptionEntries REQUEST BODY: ', req.body);
    try {
      const updatedSubscriptionEntry = await SubscriptionEntries.update(
        req.body,
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
      console.log('SubscriptionEntry UPDATE INFO: ', updatedSubscriptionEntry);
      res.status(204).json(updatedSubscriptionEntry);
    } catch (err) {
      console.error('SubscriptionEntry UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID SubscriptionEntry ROUTE
subscriptionEntriesRouter.delete(
  '/api/subscription-entries/:id',
  (req: Request, res: Response) => {
    SubscriptionEntries.destroy({ where: req.params })
      .then((data: any) => {
        console.log('SubscriptionEntry DELETION SUCCESSFUL: ', data);
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error('SubscriptionEntry DELETION WAS NOT SUCCESSFUL: ', err);
        res.sendStatus(400);
      });
  }
);

// Export Router
export default subscriptionEntriesRouter;
