/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import express, { Express, Request, Response } from 'express';
require('dotenv').config();
import path from 'path';
// import cors from 'cors';
// const uuid = require(uuid/v4);
import uuid from 'uuid';
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

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
const weatherRouter = require('./routes/WeatherRouter');

// const subscriptionRouter = require('./routes/SubscriptionsRouter')
// const farmRouter = require('./routes/FarmRouter')
import UserInterface from '../types/UserInterface';
import Profile from 'src/client/components/ProfilePage';
//import { postEvent } from "./routes/EventRoutes";

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, '..', '..', 'dist');
// console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day
    keys: [process.env.PASSPORT_CLIENT_SECRET],
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
  })
);

// Sets us req.user
app.use(cookieParser());

app.use(express.json());
// app.use(cors());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

// Stripe Setup
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Season Subscription' }],
  [2, { priceInCents: 20000, name: 'Annual Subscription' }],
]);
//routes

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/events', eventRouter);
// app.use('/subscriptions', subscriptionRouter);
// app.use('/', farmRouter)
app.use('/weather', weatherRouter);

// Create a post request for /create-checkout-session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Stripe Session req', req);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // subscriptions would be added here
      line_items: req.body.items.map((item: { id: number; quantity: any }) => {
        const storeItem: any = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/orders-page`,
      cancel_url: `${process.env.SERVER_URL}/subscriptions-page`,
    });
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}),
  //////////////////////////////////////////////////////////////////////////////////////////// GET ALL USERS ROUTE
  app.get('/get_all_users', (req: Request, res: Response) => {
    // findAll products in the current season for users. find ALL products (organized by season) for admin
    // NEED TO GIVE ALL SEASONS A CURRENT SEASON BOOLEAN. WILL MAKE REQUEST EASIER??
    // CHECK SEASON START DATE PROPERTY

    // IMPLEMENTING SIMPLE GET ALL REQUEST FOR MVP
    Users.findAll({ where: {} })
      .then((data: any) => {
        console.log('LINE 129 || INDEX GET ALL USERS', data);
        res.json(data);
      })
      .catch((err: any) => {
        console.error('LINE 133 || INDEX GET ALL USERS ERROR', err);
      });
  });

///////////////////////////////////////////////////////////////////////////////////////////// POST USER ROUTE
app.patch('/api/user/:id', async (req: Request, res: Response) => {
  console.log('LINE 271 || UPDATE PRODUCT', req.body);

  try {
    // update product model with async query and assign the result of that promise to a variable to res.send back
    const updatedUser = await Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    console.log('LINE 147 || UPDATE USER', updatedUser);

    res.status(204).json(updatedUser);
  } catch (err) {
    console.error('LINE 151 || UPDATE USERS', err);
    res.status(500).json(err);
  }
});

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
    // update product model with async query and assign the result of that promise to a variable to res.send back
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
  console.log('LINE 184 || SERVER INDEX', req.params); // user id
  // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
  // QUERY USER TABLE THEN JOIN
  SubscriptionEntries.findAll({ where: { user_id: Number(req.params.id) } })
    .then((data: Array<object>) => {
      const dataObj: Array<object> = [];
      console.log(
        'LINE 191',
        data.forEach((subscriptionEntry: any) => {
          console.log('LINE 230', subscriptionEntry.dataValues);
          if (subscriptionEntry.dataValues.user_id === Number(req.params.id)) {
            dataObj.push(subscriptionEntry.dataValues.id);
          }
        })
      );
      console.log(
        'LINE 237',
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
app.patch('/api/subscribed/:id', async (req: Request, res: Response) => {
  // console.log('LINE 216 || UPDATE SEASON', req.body);
  try {
    // update subscription model with async query and assign the result of that promise to a variable to res.send back
    const updatedSubscription = await Subscriptions.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('LINE 224 || UPDATE SEASON', updatedSubscription);

    res.status(204).json(updatedSubscription);
  } catch (err) {
    console.error('LINE 228 || UPDATE SEASONS', err);
    res.status(500).json(err);
  }
});

app.post(
  `/api/add_subscription_entry/:id`,
  async (req: Request, res: Response) => {
    console.log('LINE 287 || SERVER INDEX.TS', req.body, req.params);

    const addSubscription = (id: number) => {
      console.log(
        'LINE 291 || INDEXSERVER || SUBSCRIPTION ENTRY POST ROUTE',
        id
      );
      SubscriptionEntries.create({
        // CHANGED REQ.PARMS.ID TO NUMBER, USED TO BE STRING
        user_id: Number(req.params.id),
        farm_id: 1,
        subscription_id: id,
      })
        .then((data: any) => {
          console.log('LINE 301 || SERVER ||', data.dataValues.id);

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
                // console.log('LINE 318 || SERVER INDEX ||', data);
              })
              .catch((err: any) => {
                console.log('LINE 326 || SERVER INDEX || ERROR', err);
              });
          }
        })
        .catch((err: any) => {
          console.error('LINE 331', err);
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
      // console.log("294 Return Subscriptions Route || Post Request", data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

//Subscription Admin PUT request:
app.put(`/api/subscriptions/:id`, (req: Request, res: Response) => {
  console.log('LINE 305 Subscription PUT req', req.params.id);
  Subscriptions.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then((response: any) => {
      res.json(response).status(204);
    })
    .catch((err: unknown) => {
      console.error('SUBSCRIPTION UPDATE REQUEST:', err);
    });
});

//SUBSCRIPTION Admin DELETE req:
app.delete('/api/subscriptions/delete', (req: Request, res: Response) => {
  SubscriptionEntries.destroy({
    where: {
      subscription_id: req.query.subscription_id,
    },
    return: true,
  })
    .then((data: any) => {
      Subscriptions.destroy({ where: { id: req.query.subscription_id } })
        .then((data: any) => {
          res.sendStatus(200);
        })
        .catch((err: unknown) => {
          console.log('Subscription DELETE', err);
          res.sendStatus(404);
        });
    })
    .catch((err: unknown) => {
      console.error('Server-side Delete Req FAIL', err);
      res.sendStatus(404);
    });
});

// Home page routes
app.get('/api/farms', (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
      // console.log("this is the data from the farm api call", data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});

// ADMIN RECORDS ROUTES

app.get('/records/deliveryZones', (req: Request, res: Response) => {
  DeliveryZones.findAll()
    .then((data: any) => {
      // console.log('delivery data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/events', (req: Request, res: Response) => {
  Events.findAll()
    .then((data: any) => {
      // console.log('Events data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/farms', (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
      // console.log('Farms data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/orders', (req: Request, res: Response) => {
  Orders.findAll()
    .then((data: any) => {
      // console.log('Orders data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});

// app.delete('/api/orders/delete', (req: Request, res: Response) => {
//   Orders.destroy({
//     where: {
//       id: req.query.subscription_id,
//     },
//     return: true,
//   })
//   .then((rowDeleted: unknown) => {
//     if(rowDeleted === 1) {
//       console.log('deleted successfully')
//       res.sendStatus(204)
//     }
//   })
//     .catch((err: unknown) => {
//       console.error('Server-side Delete Req FAIL', err);
//       res.sendStatus(404);
//     });
// });

app.get('/records/products', (req: Request, res: Response) => {
  Products.findAll()
    .then((data: any) => {
      // console.log('Products data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/roles', (req: Request, res: Response) => {
  Roles.findAll()
    .then((data: any) => {
      // console.log('Roles data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/rsvps', (req: Request, res: Response) => {
  RSVP.findAll()
    .then((data: any) => {
      // console.log('RSVP data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/subscriptionEntries', (req: Request, res: Response) => {
  SubscriptionEntries.findAll()
    .then((data: any) => {
      // console.log('SubscriptionEntries data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/subscriptions', (req: Request, res: Response) => {
  Subscriptions.findAll()
    .then((data: any) => {
      // console.log('Subscriptions data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/users', (req: Request, res: Response) => {
  Users.findAll()
    .then((data: any) => {
      // console.log('Users data', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});
app.get('/records/vendors', (req: Request, res: Response) => {
  Vendors.findAll()
    .then((data: any) => {
      // console.log('Vendors data', data);
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
  console.log(`⚡️[server]: Server is running at ${process.env.SERVER_URL}`);
});

function findUser(crushers: any) {
  throw new Error('Function not implemented.');
}
