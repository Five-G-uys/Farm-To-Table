// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Subscriptions } from '../db/models';

// Set Up Router
const subscriptionRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Subscription ROUTE
subscriptionRouter.post('/api/subscription', (req, res) => {
  // console.log(req.body)
  const { season, year, flatPrice, weeklyPrice, description, startDate, endDate } =
    req.body;
    Subscriptions.create({ season, year, flatPrice, weeklyPrice, description, startDate, endDate })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Subscriptions Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Subscriptions ROUTE
subscriptionRouter.get('/api/subscription', (req, res) => {
  Subscriptions.findAll()
    .then((response: any) => {
      console.log('FINDALL Subscriptions RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL SUBSCRIPTION ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Subscription ROUTE
subscriptionRouter.patch(
  '/api/subscription/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE Subscription REQUEST BODY: ', req.body);
    try {
      const updatedSubscription = await Subscriptions.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('Subscription UPDATE INFO: ', updatedSubscription);
      res.status(204).json(updatedSubscription);
    } catch (err) {
      console.error('Subscription UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Subscription ROUTE
subscriptionRouter.delete('/api/subscription/:id', (req: Request, res: Response) => {
  Subscriptions.destroy({ where: req.params })
    .then((data: any) => {
      console.log("Subscription DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Subscription DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default subscriptionRouter;












////////// THIS WAS HERE BEFORE I GOT HERE, DIDN'T WANT TO DELETE (MURPHY)

// import { Router } from 'express';
// import {
//   Farms,
//   Roles,
//   Orders,
//   DeliveryZones,
//   Products,
//   RSVP,
//   Subscriptions,
//   Users,
//   Vendors,
//   SubscriptionEntries,
// } from '../db/models';

// const subscriptionRouter: Router = Router();

// subscriptionRouter.put(`/api/subscribed/:id`, (req, res) => {
//   Users.update(req.body, { where: { id: req.params.id }, returning: true })
//     .then((response: any) => {
//       // console.log('Subscription Route', response[1]);
//       res.redirect(
//         200,
//         'https://localhost:5555/subscriptions-page/confirmation-page'
//       );
//       res.send(203);
//     })
//     .catch((err: unknown) => {
//       console.error('SUBSCRIPTION ROUTES:', err);
//     });
// });

// subscriptionRouter.post(`/api/add_subscription_entry/:id`, async (req, res) => {
//   // console.log('LINE 200 || SERVER INDEX.TS', req.body);

//   const addSubscription = (id: number) => {
//     SubscriptionEntries.create({
//       userId: req.params.id,
//       farm_id: 1,
//       subscriptionId: id,
//     })
//       .then((data: any) => {
//         // console.log('LINE 196 || SERVER ||', data.dataValues.id);

//         const today: Date = new Date();
//         // iterate over number of orders
//         for (let i = 1; i < 15; i++) {
//           const nextWeek = () => {
//             const today = new Date();
//             const nextwk = new Date(
//               today.getFullYear(),
//               today.getMonth(),
//               today.getDate() + 7 * i
//             );
//             return nextwk;
//           };
//           // console.log('LINE 218 || NEXTWEEK', nextWeek());
//           Orders.create({
//             // subscriptionId: data.dataValues.subscriptionId,
//             subscriptionEntryId: data.dataValues.id,
//             delivery_date: nextWeek(),
//             farm_id: 1,
//           })
//             .then((data: any) => {
//               // console.log('LINE 224 || SERVER INDEX ||', data);
//             })
//             .catch((err: any) => {
//               console.log('LINE 228 || SERVER INDEX || ERROR', err);
//             });
//         }
//       })
//       .catch((err: any) => {
//         console.error(err);
//       });
//   };
//   try {
//     if (req.body.season === 'whole year') {
//       await addSubscription(1);
//       await addSubscription(2);
//       res.status(201).send('Subscribed!');
//     } else {
//       const subscriptionId = req.body.season === 'fall' ? 2 : 1;
//       await addSubscription(subscriptionId);
//       res.status(201).send('Subscribed!');
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// subscriptionRouter.get(`/api/upcoming_orders/:id`, (req, res) => {
//   // console.log('LINE 238 || SERVER INDEX', req.params); // user id
//   // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
//   // QUERY USER TABLE THEN JOIN
//   SubscriptionEntries.findAll({ where: { userId: req.params.id } })
//     .then((data: Array<object>) => {
//       const dataObj: Array<object> = [];
//       console.log(
//         'LINE 253',
//         data.forEach((subscriptionEntry: any) => {
//           console.log('LINE 255', subscriptionEntry.dataValues);
//           if (subscriptionEntry.dataValues.userId === Number(req.params.id)) {
//             dataObj.push(subscriptionEntry.dataValues.id);
//           }
//         })
//       );
//       console.log(
//         'LINE 261',
//         dataObj.map((subscriptionEntryId: any) => {
//           return { subscriptionEntryId: subscriptionEntryId };
//         })
//       );
//       // Orders.findAll({ where: { subscriptionEntryId: req.params.id } })
//       Orders.findAll({
//         where: {
//           [Op.or]: dataObj.map((subscriptionEntryId: any) => ({
//             subscriptionEntryId: subscriptionEntryId,
//           })),
//         },
//       })
//         .then((data: any) => {
//           // console.log('LINE 241 || SERVER INDEX', Array.isArray(data)); // ==> ARRAY OF ORDER OBJECTS
//           res.json(data);
//         })
//         .catch((err: any) => {
//           console.error('LINE 244 || SERVER INDEX', err);
//           res.send(err);
//         });
//     })
//     .catch((err: any) => {
//       console.error('LINE 254', err);
//     });

//   // console.log('LINE 263 ||', dataObj);
// });
// subscriptionRouter.get(`/api/subscriptions/`, (req, res) => {
//   Subscriptions.findAll()
//     .then((data: any) => {
//       res.status(200).send(data);
//     })
//     .catch((err: any) => {
//       console.error('Subscription Route ERROR', err);
//     });
// });

// //Subscription ADMIN Creation/Edit/Delete Routes//
// //SUBSCRIPTION CREATE Req:
// subscriptionRouter.post('/api/subscriptions-admin', (req, res) => {
//   console.log('LINE 272 ****', req.body.event);
//   const {
//     season,
//     year,
//     flat_price,
//     weekly_price,
//     description,
//     start_date,
//     end_date,
//   } = req.body.event;

//   console.log('283 Request object postSubscription', req.body);
//   Subscriptions.create({
//     season,
//     year,
//     flat_price,
//     weekly_price,
//     description,
//     start_date,
//     end_date,
//     farm_id: 1,
//   })
//     .then((data: any) => {
//       console.log('294 Return Subscriptions Route || Post Request', data);
//       res.status(201);
//     })
//     .catch((err: string) => {
//       console.error('Post Request Failed', err);
//       res.sendStatus(500);
//     });
// });

// //Subscription Admin PUT request:
// subscriptionRouter.put(`/api/subscriptions/:id`, (req, res) => {
//   console.log('LINE 305 Subscription PUT req', req.params.id);
//   Subscriptions.update(req.params, {
//     where: {
//       id: req.params.id,
//     },
//     returning: true,
//   })
//     .then((response: any) => {
//       res.send(203);
//     })
//     .catch((err: unknown) => {
//       console.error('SUBSCRIPTION UPDATE REQUEST:', err);
//     });
// });

// //SUBSCRIPTION Admin DELETE req:
// subscriptionRouter.delete('/api/subscriptions/:id', (req, res) => {
//   console.log('Subscription DELETE req:', req.body);
//   Subscriptions.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(() => {
//       res.send(200);
//     })
//     .catch((err: unknown) => {
//       console.error('SUBSCRIPTION DELETE REQUEST:', err);
//     });
// });

// module.exports = subscriptionRouter;
