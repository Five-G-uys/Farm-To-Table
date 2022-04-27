/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import express, { Express, Request, Response } from "express";
//import dotenv from "dotenv";
require("dotenv").config();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const axios = require("axios");
// require Op object from sequelize to modify where clause in options object
const { Op } = require("sequelize");

// Import database and models
require("./db/database.ts");
require("./middleware/auth");
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
} from "./db/models";
import Events from "./db/models/Events";
import UserInterface from "../types/UserInterface";

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, "..", "..", "dist");
// console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.PASSPORT_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// Sets us req.user
app.use(passport.initialize());
app.use(passport.session());

// Middleware
const isAdmin = (req: { user: { role_id: number } }, res: any, next: any) => {
  if (!req.user || req.user.role_id !== 4) {
    return next(new Error("User is Unauthorized!"));
  } else {
    next();
  }
};

const successLoginUrl = process.env.CALLBACK_URI;
const errorLoginUrl = "http://localhost:5555/login/error";

// all backend routes should start at a common place that dont exist on the front end

passport.serializeUser((user: any, done: any) => {
  // console.log('Serializing User:', user);
  done(null, user);
});
passport.deserializeUser((user: any, done: any) => {
  // console.log('Deserializing User:', user);
  done(null, user);
});

// Auth Routes

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/error", (req: Request, res: Response) =>
  res.send("Unknown Error")
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "cannot login to Google",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req: any, res: any) => {
    res.redirect("/profile-page");
  }
);

// Check if a user is logged in
app.get("/api/isLoggedIn", (req: Request, res: Response) => {
  req.cookies.crushers ? res.send(true) : res.send(false);
});

// Logout route
app.delete("/api/logout", (req: Request, res: Response) => {
  res.clearCookie("crushers");
  res.json(false);
});

// Get current user route
app.get("/api/userProfile", (req, res) => {
  // console.log(`Body: `, req);
  // console.log(`Params: `, req.);
  Users.findOne()
    .then((data: any) => {
      console.log("122 data", data);
      res.send(data).status(200);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//Events requests
app.post("/api/event", (req: Request, res: Response) => {
  const { eventName, description, thumbnail, category, eventDate, eventType } =
    req.body.event;

  // console.log('162 Request object postEvent', req.body);
  Events.create({
    eventName,
    description,
    thumbnail,
    category,
    eventDate,
    eventType,
  })
    .then((data: any) => {
      // console.log('Return Events Route || Post Request', data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error("Post Request Failed", err);
      res.sendStatus(500);
    });
});

//Events get request
app.get("/events", (req: Request, res: Response) => {
  Events.findAll()
    .then((response: any) => {
      //console.log(response, "This is line 186 events gotten");
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log("Something went wrong", err);
      res.sendStatus(404);
    });
});

//Get request for the Events with a certain type
app.post("/api/Rsvp/", (req: Request, res: Response) => {
  console.log("Line 170", "user ID", req.body);
  //console.log("Line 171", "Event Id", req.body.eventId);
  RSVP.create({
    event_id: req.body.eventId,
    user_id: req.body.userId,
    farm_id: 1,
  })
    .then((data: any) => {
      console.log("174 LINE ", data);
      res.status(201).send(data);
    })
    .catch((err: any) => {
      console.error("177 REQUEST FAILED", err);
    });
});

//Get request For the RSVP
app.get("/api/user/rsvps/:userId", (req: Request, res: Response) => {
  //console.log("REQUEST BODY FROM LINE 189", req.params);

  RSVP.findAll({
    where: { user_id: req.params.userId },
  })
    .then(async (posts: any) => {
      try {
        console.log("LINE 199", posts);
        const promises = posts.map((rsvp: any) => {
          console.log("LINE 197", rsvp.event_id);
          return Events.findAll({ where: { id: rsvp.event_id } });
        });
        Promise.allSettled(promises).then(async (event: any) => {
          console.log("LINE 200, EVENTS FOR USER", event[0].value);
          res.status(200).send(event);
        });
      } catch {
        console.log("Failed to promisify");
      }
    })
    .catch((err: any) => {
      console.log("ERROR FAILED REQ", err);
    });
});

////////SUBSCRIPTION REQUEST////////////
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
      console.error("SUBSCRIPTION ROUTES:", err);
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
                console.log("LINE 228 || SERVER INDEX || ERROR", err);
              });
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    };
    try {
      if (req.body.season === "whole year") {
        await addSubscription(1);
        await addSubscription(2);
        res.status(201).send("Subscribed!");
      } else {
        const subscription_id = req.body.season === "fall" ? 2 : 1;
        await addSubscription(subscription_id);
        res.status(201).send("Subscribed!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

app.get(`/api/upcoming_orders/:id`, (req: Request, res: Response) => {
  console.log("LINE 238 || SERVER INDEX", req.params); // user id
  // NEED TO QUERY BETWEEN USER TABLE AND SUBSCRIPTION ENTRY TABLE
  // QUERY USER TABLE THEN JOIN
  SubscriptionEntries.findAll({ where: { user_id: req.params.id } })
    .then((data: Array<object>) => {
      const dataObj: Array<object> = [];
      // console.log(
      //   'LINE 253',
      //   data.forEach((subscriptionEntry: any) => {
      //     console.log('LINE 255', subscriptionEntry.dataValues);
      //     if (subscriptionEntry.dataValues.user_id === Number(req.params.id)) {
      //       dataObj.push(subscriptionEntry.dataValues.id);
      //     }
      //   })
      // );
      // console.log(
      //   'LINE 261',
      //   dataObj.map((subscriptionEntryId: any) => {
      //     return { subscription_entry_id: subscriptionEntryId };
      //   })
      // );
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
          console.error("LINE 244 || SERVER INDEX", err);
          res.send(err);
        });
    })
    .catch((err: any) => {
      console.error("LINE 254", err);
    });

  // console.log('LINE 263 ||', dataObj);
});
app.get(`/api/subscriptions/`, (req: Request, res: Response) => {
  Subscriptions.findAll()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error("Subscription Route ERROR", err);
    });
});

// Home page routes
app.get("/api/farms", (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
      // console.log('this is the data from the farm api call', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error("OH NOOOOO", err);
    });
});

// KEEP AT BOTTOM OF GET REQUESTS
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(dist, "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function findUser(crushers: any) {
  throw new Error("Function not implemented.");
}
