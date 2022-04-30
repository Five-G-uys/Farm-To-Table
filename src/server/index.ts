/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import express, { Express, Request, Response } from 'express';
//import dotenv from "dotenv";
require('dotenv').config();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');
// require Op object from sequelize to modify where clause in options object
const { Op } = require('sequelize');

// Import database and models
require('./db/database.ts');
require('./middleware/auth');
import {
  Farms,
  Roles,
  Orders,
  DeliveryZones,
  Products,
  RSVP,
  Subscriptions,
  Users,
  Vendors,
  SubscriptionEntries,
  DietaryRestrictions,
  Events,
} from './db/models';
const authRouter = require('./routes/AuthRouter');
const eventRouter = require('./routes/EventRouter');
// const subscriptionRouter = require('./routes/SubscriptionsRouter')
// const farmRouter = require('./routes/FarmRouter')
import UserInterface from '../types/UserInterface';
import Profile from 'src/client/components/ProfilePage';
//import { postEvent } from "./routes/EventRoutes";

// // Needs to stay until used elsewhere (initializing models)
// console.log(Farms, Roles, Events, Orders, DeliveryZones,Products, RSVP, Subscriptions, Users, Vendors);

//dotenv.config();

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, '..', '..', 'dist');
// console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/auth', authRouter);
app.use('/events', eventRouter);
// app.use('/subscriptions', subscriptionRouter);
// app.use('/', farmRouter)

// // Middleware
// const isAdmin = (req: { user: { role_id: number } }, res: any, next: any) => {
//   if (!req.user || req.user.role_id !== 4) {
//     // res.redirect('/'); // Whats is the use case?
//     res.status(404); // What is the use case?
//   } else {
//     next();
//   }
// };

// const successLoginUrl = process.env.CALLBACK_URI;
// const errorLoginUrl = 'http://localhost:5555/login/error';

// // all backend routes should start at a common place that dont exist on the front end

// passport.serializeUser((user: any, done: any) => {
//   // console.log('Serializing User:', user);
//   done(null, user);
// });
// passport.deserializeUser((user: any, done: any) => {
//   // console.log('Deserializing User:', user);
//   done(null, user);
// });

// // Auth Routes

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/error', (req: Request, res: Response) =>
//   res.send('Unknown Error')
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google'),
//   (req: any, res: any) => {
//     res.redirect('/profile-page');
//   }
// );

// // Check if a user is logged in
// app.get('/api/isLoggedIn', (req: Request, res: Response) => {
//   req.cookies ? res.send(true) : res.send(false);
// });

// // Logout route
// app.delete('/api/logout', (req: Request, res: Response) => {
//   res.clearCookie('crushers');
//   res.json(false);
// });

// // Get current user route
// app.get('/api/userProfile', (req, res) => {
//   // console.log(`Body: `, req);
//   // console.log(`Params: `, req.);
//   Users.findOne()
//     .then((data: any) => {
//       // console.log('data', data);
//       res.send(data).status(200);
//     })
//     .catch((err: any) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// //Events requests
// app.post('/api/event', isAdmin, (req: Request, res: Response) => {
//   const { eventName, description, thumbnail, category, eventDate, eventType } =
//     req.body.event;

//   // console.log('162 Request object postEvent', req.body);
//   Events.create({
//     eventName,
//     description,
//     thumbnail,
//     category,
//     eventDate,
//     eventType,
//   })
//     .then((data: any) => {
//       // console.log('Return Events Route || Post Request', data);
//       res.status(201);
//     })
//     .catch((err: string) => {
//       console.error('Post Request Failed', err);
//       res.sendStatus(500);
//     });
// });

// //Events get request
// app.get('/events', (req: Request, res: Response) => {
//   Events.findAll()
//     .then((response: any) => {
//       // console.log(response, 'This is line 186 events gotten');
//       res.status(200).send(response);
//     })
//     .catch((err: object) => {
//       // console.log('Something went wrong', err);
//       res.sendStatus(404);
//     });
// });

// //Get request for the Events with a certain type
// app.post("/api/Rsvp/", (req: Request, res: Response) => {
//   console.log("Line 170", "user ID", req.body);
//   //console.log("Line 171", "Event Id", req.body.eventId);
//   RSVP.create({
//     event_id: req.body.eventId,
//     user_id: req.body.userId,
//     farm_id: 1,
//   })
//     .then((data: any) => {
//       console.log("174 LINE ", data);
//       res.status(201).send(data);
//     })
//     .catch((err: any) => {
//       console.error("177 REQUEST FAILED", err);
//     });
// });

// //Get request For the RSVP
// app.get("/api/user/rsvps/:userId", (req: Request, res: Response) => {
//   RSVP.findAll({
//     where: { user_id: req.params.userId },
//   })
//     .then(async (posts: any) => {
//       try {
//         console.log("LINE 199", posts);
//         const promises = posts.map((rsvp: any) => {
//           console.log("LINE 197", rsvp.event_id);
//           return Events.findAll({ where: { id: rsvp.event_id } });
//         });
//         Promise.allSettled(promises).then(async (event: any) => {
//           console.log("LINE 200, EVENTS FOR USER", event[0].value);
//           res.status(200).send(event);
//         });
//       } catch {
//         console.log("Failed to promisify");
//       }
//     })
//     .catch((err: any) => {
//       console.log("ERROR FAILED REQ", err);
//     });
// });

// //patch request for deleting an event in the DB
// app.delete("/api/event/delete", (req: Request, res: Response) => {
//   console.log("line 210", req.query);
//   RSVP.destroy({
//     where: { event_id: req.query.id },
//   }).then((data: any) => {
//     Events.destroy({ where: { id: req.query.id } })
//       .then((data: any) => {
//         console.log("deletion was successful!", data);
//       })
//       .catch((err: any) => {
//         console.error("Deletion was not successful", err);
//       });
//   });
// });

// //Get all from RSVP table
// app.get("/api/rsvps", (req: Request, res: Response) => {
//   RSVP.findAll()
//     .then((data: any) => {
//       console.log("LINE 228 ALL THE RESPONSES FROM RSVP", data);
//     })
//     .catch((err: any) => {
//       console.log("FAILED REQUEST", err);
//     });
// });

////////SUBSCRIPTION REQUEST////////////

///////////////////////////////////////////////////////////////////////////////////////////// POST PRODUCT ROUTE
app.post('/api/product', (req: Request, res: Response) => {
  const {
    img_url,
    name,
    description,
    plant_date,
    harvest_date,
    subscription_id,
  } = req.body.product;

  console.log('162 Request object postEvent', req.body);
  Products.create({
    name,
    description,
    img_url,
    plant_date,
    harvest_date,
    subscription_id,
  })
    .then((data: any) => {
      console.log('LINE 187 || Product Post Request', data);
      res.status(201).json(data);
    })
    .catch((err: string) => {
      console.error('Product Post Request Failed', err);
      res.status(500).json(err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// POST PRODUCT ROUTE
app.patch('/api/product/:id', async (req: Request, res: Response) => {
  console.log('LINE 271 || UPDATE PRODUCT', req.body);

  try {
    const updatedProduct = await Products.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    console.log('LINE 278 || UPDATE PRODUCT', updatedProduct);

    res.status(204).json(updatedProduct);
  } catch (err) {
    console.error('LINE 274 || UPDATE PRODUCTS', err);
    res.status(500).json(err);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////// GET ALL PRODUCT ROUTE
app.get('/get_all_products', (req: Request, res: Response) => {
  // findAll products in the current season for users. find ALL products (organized by season) for admin
  // NEED TO GIVE ALL SEASONS A CURRENT SEASON BOOLEAN. WILL MAKE REQUEST EASIER??
  // CHECK SEASON START DATE PROPERTY

  // IMPLEMENTING SIMPLE GETALL REQUEST FOR MVP
  Products.findAll({ where: {} })
    .then((data: any) => {
      // console.log('LINE 293 || INDEX GET ALL PRODUCTS', data);
      res.json(data);
    })
    .catch((err: any) => {
      console.error('LINE 297 || INDEX GET ALL PRODUCTS ERROR', err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// ORDERS GET ROUTE
app.get(`/api/upcoming_orders/:id`, (req: Request, res: Response) => {
  // console.log('LINE 238 || SERVER INDEX', req.params); // user id
  // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
  // QUERY USER TABLE THEN JOIN
  SubscriptionEntries.findAll({ where: { user_id: req.params.id } })
    .then((data: Array<object>) => {
      const dataObj: Array<object> = [];
      console.log(
        'LINE 253',
        data.forEach((subscriptionEntry: any) => {
          // console.log('LINE 255', subscriptionEntry.dataValues);
          if (subscriptionEntry.dataValues.user_id === Number(req.params.id)) {
            dataObj.push(subscriptionEntry.dataValues.id);
          }
        })
      );
      console.log(
        'LINE 261',
        dataObj.map((subscriptionEntryId: any) => {
          return { subscription_entry_id: subscriptionEntryId };
        })
      );
      // Orders.findAll({ where: { subscription_entry_id: req.params.id } })
      Orders.findAll({
        where: {
          [Op.or]: dataObj.map((subscriptionEntryId: any) => ({
            subscription_entry_id: subscriptionEntryId,
          })),
        },
      })
        .then((data: any) => {
          // console.log('LINE 241 || SERVER INDEX', Array.isArray(data)); // ==> ARRAY OF ORDER OBJECTS
          res.json(data);
        })
        .catch((err: any) => {
          console.error('LINE 244 || SERVER INDEX', err);
          res.send(err);
        });
    })
    .catch((err: any) => {
      console.error('LINE 254', err);
    });

  // console.log('LINE 263 ||', dataObj);
});

////////////////////////////////////////////////////////////////////////////// SUBSCRIPTION REQUESTS ////////////
app.put(`/api/subscribed/:id`, (req: Request, res: Response) => {
  Users.update(req.body, { where: { id: req.params.id }, returning: true })
    .then((response: any) => {
      // console.log('Subscription Route', response[1]);
      // res.redirect(
      //   200,
      //   'https://localhost:5555/subscriptions-page/confirmation-page'
      // );
      res.send(203);
    })
    .catch((err: unknown) => {
      console.error('SUBSCRIPTION ROUTES:', err);
    });
});

app.post(
  `/api/add_subscription_entry/:id`,
  async (req: Request, res: Response) => {
    // console.log('LINE 200 || SERVER INDEX.TS', req.body);

    const addSubscription = (id: number) => {
      SubscriptionEntries.create({
        user_id: req.params.id,
        farm_id: 1,
        subscription_id: id,
      })
        .then((data: any) => {
          // console.log('LINE 196 || SERVER ||', data.dataValues.id);

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
              // subscription_id: data.dataValues.subscription_id,
              subscription_entry_id: data.dataValues.id,
              delivery_date: nextWeek(),
              farm_id: 1,
            })
              .then((data: any) => {
                // console.log('LINE 224 || SERVER INDEX ||', data);
              })
              .catch((err: any) => {
                console.log('LINE 228 || SERVER INDEX || ERROR', err);
              });
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    };
    try {
      if (req.body.season === 'whole year') {
        await addSubscription(1);
        await addSubscription(2);
        res.status(201).send('Subscribed!');
      } else {
        const subscription_id = req.body.season === 'fall' ? 2 : 1;
        await addSubscription(subscription_id);
        res.status(201).send('Subscribed!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

app.get(`/api/subscriptions/`, (req: Request, res: Response) => {
  Subscriptions.findAll()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error('Subscription Route ERROR', err);
    });
});

//////////////////////////////////////////////////////////////Subscription ADMIN Creation/Edit/Delete Routes//

app.post('/api/subscriptions-admin', (req: Request, res: Response) => {
  // console.log('LINE 272 ****', req.body.event);
  const {
    season,
    year,
    flat_price,
    weekly_price,
    description,
    start_date,
    end_date,
  } = req.body.event;

  console.log('283 Request object postSubscription', req.body);
  Subscriptions.create({
    season,
    year,
    flat_price,
    weekly_price,
    description,
    start_date,
    end_date,
    farm_id: 1,
  })
    .then((data: any) => {
      console.log('294 Return Subscriptions Route || Post Request', data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

app.get('/api/farms', (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
      console.log('this is the data from the farm api call', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});

//ADMIN RECORDS ROUTES

app.get('/records/deliveryZones', (req: Request, res: Response) => {
  DeliveryZones.findAll()
    .then((data: any) => {
      console.log('delivery data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/dietaryRestrictions', (req: Request, res: Response) => {
  DietaryRestrictions.findAll()
    .then((data: any) => {
      console.log('DietaryRestrictions data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/events', (req: Request, res: Response) => {
  Events.findAll()
    .then((data: any) => {
      console.log('Events data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/farms', (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
      console.log('Farms data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/orders', (req: Request, res: Response) => {
  Orders.findAll()
    .then((data: any) => {
      console.log('Orders data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/products', (req: Request, res: Response) => {
  Products.findAll()
    .then((data: any) => {
      console.log('Products data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/roles', (req: Request, res: Response) => {
  Roles.findAll()
    .then((data: any) => {
      console.log('Roles data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/rsvps', (req: Request, res: Response) => {
  RSVP.findAll()
    .then((data: any) => {
      console.log('RSVP data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/subscriptionEntries', (req: Request, res: Response) => {
  SubscriptionEntries.findAll()
    .then((data: any) => {
      console.log('SubscriptionEntries data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/subscriptions', (req: Request, res: Response) => {
  Subscriptions.findAll()
    .then((data: any) => {
      console.log('Subscriptions data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/users', (req: Request, res: Response) => {
  Users.findAll()
    .then((data: any) => {
      console.log('Users data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/vendors', (req: Request, res: Response) => {
  Vendors.findAll()
    .then((data: any) => {
      console.log('Vendors data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});

// KEEP AT BOTTOM OF GET REQUESTS
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function findUser(crushers: any) {
  throw new Error('Function not implemented.');
}
