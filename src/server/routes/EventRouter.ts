/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Router } from "express";
import { Events, RSVP, Users } from "../db/models";
// Import Dependencies
import express, { Express, Request, Response } from "express";
//import dotenv from "dotenv";
require("dotenv").config();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const axios = require("axios");

const eventRouter: Router = Router();

eventRouter.post("/api/event", (req, res) => {
  const { eventName, description, thumbnail, eventDate, eventType, location } =
    req.body.event;

  console.log("162 Request object postEvent", req.body);
  Events.create({
    eventName,
    description,
    thumbnail,
    eventDate,
    eventType,
    location,
  })
    .then((data: any) => {
      console.log("Return Events Route || Post Request", data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error("Post Request Failed", err);
      res.sendStatus(500);
    });
});

//Events get request
eventRouter.get("/api/event", (req, res) => {
  Events.findAll()
    .then((response: any) => {
      // console.log(response, "This is line 186 events gotten");
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log("Something went wrong", err);
      res.sendStatus(404);
    });
});

//Get request for the Events with a certain type
eventRouter.post("/api/Rsvp/", (req: Request, res: Response) => {
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
eventRouter.get("/api/user/rsvps/:userId", (req: Request, res: Response) => {
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
        }).catch((err: any) => console.log(err));
      } catch {
        console.log("Failed to promisify");
      }
    })
    .catch((err: any) => {
      console.log("ERROR FAILED REQ", err);
    });
});

//delete request for deleting an event in the DB
eventRouter.delete("/api/event/delete", (req: Request, res: Response) => {
  console.log("line 210", req.query);
  //first delete the rsvps associated with a given event_id
  RSVP.destroy({
    where: { event_id: req.query.id },
  }).then((data: any) => {
    //then delete the event with that id.
    Events.destroy({ where: { id: req.query.id } })
      .then((data: any) => {
        console.log("deletion was successful!", data);
      })
      .catch((err: any) => {
        console.error("Deletion was not successful", err);
      });
  });
});
eventRouter.delete("/api/user/rsvps/delete", (req: Request, res: Response) => {
  console.log("line 221", req);
  RSVP.destroy({
    where: { user_id: req.query.id, event_id: req.query.event_id },
  })
    .then((data: any) => {
      console.log("125 deletion was successful!", data);
    })
    .catch((err: any) => {
      console.error("129 Deletion was not successful", err);
    });
});

//Get all from RSVP table
eventRouter.get("/api/rsvps", (req: Request, res: Response) => {
  RSVP.findAll()
    .then((data: any) => {
      console.log("LINE 228 ALL THE RESPONSES FROM RSVP", data);
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.log("FAILED REQUEST", err);
      res.sendStatus(500);
    });
});

module.exports = eventRouter;
