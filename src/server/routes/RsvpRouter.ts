// Import Dependencies
import { Router } from "express";
import { Request, Response } from "express";

// Import Models
import { RSVP, Events } from "../db/models";

// Set Up Router
const rsvpRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE RSVP ROUTE
rsvpRouter.post("/api/rsvps", (req: Request, res: Response) => {
  // console.log(req.body)
  const { userId, eventId } = req.body;
  RSVP.create({ userId, eventId })
    .then(() => {
      RSVP.findAll({ where: { eventId } }).then((data: []) => {
        // console.log("LINE 22 Three", data.length);
        res.json(data.length);
      });
    })
    .catch((err: string) => {
      console.error("RSVP Post Request Failed", err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL - RSVPs ROUTE
rsvpRouter.get("/api/rsvps", (req: Request, res: Response) => {
  RSVP.findAll()
    .then((response: { data: [] }) => {
      // console.log('FIND ALL RSVPs RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log("FIND ALL RSVPs RESPONSE: ", err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ BY USER - RSVPs ROUTE
rsvpRouter.get("/api/rsvps/user-id/:userId", (req: Request, res: Response) => {
  RSVP.findAll({
    where: { userId: req.params.userId },
  })
    .then(async (posts: []) => {
      try {
        //console.log("LINE 199", posts);
        const promises = posts.map(
          (rsvp: { userId: number; eventId: number }) => {
            //console.log("LINE 197", rsvp.eventId);
            return Events.findAll({ where: { id: rsvp.eventId } });
          }
        );
        Promise.allSettled(promises)
          .then(async (event: object[]) => {
            //console.log("LINE 200, EVENTS FOR USER", event[0].value);
            res.status(200).send(event);
          })
          .catch((err: object) => console.log(err));
      } catch {
        console.log("Failed to promisify");
      }
    })
    .catch((err: object) => {
      console.log("ERROR FAILED REQ", err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID RSVP ROUTE
rsvpRouter.patch("/api/rsvps/:id", async (req: Request, res: Response) => {
  // console.log('UPDATE RSVPs REQUEST BODY: ', req.body);
  try {
    const updatedRSVP = await RSVP.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('RSVP UPDATE INFO: ', updatedRSVP);
    res.status(204).json(updatedRSVP);
  } catch (err: any) {
    console.error("RSVP UPDATE WAS NOT SUCCESSFUL: ", err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY USER ID and EVENT ID - RSVP ROUTE
rsvpRouter.delete("/api/rsvps", (req: Request, res: Response) => {
  // console.log('line 90', req.query);
  //console.log("LINE 91", req.params);
  RSVP.destroy({
    where: { userId: req.query.userId, eventId: req.query.eventId },
  })
    .then(() => {
      // console.log("LINE 96 ALL THE RESPONSES FROM RSVP", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.log("FAILED REQUEST", err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID - RSVP ROUTE
rsvpRouter.delete("/api/rsvp/delete/:id", (req: Request, res: Response) => {
  //console.log("Line 107 ", req);
  RSVP.destroy({
    where: { eventId: req.query.eventId, userId: req.query.userId },
  })
    .then((data: any) => {
      // console.log("RSVP DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error("RSVP DELETION WAS NOT SUCCESSFUL: ", err);
      res.sendStatus(400);
    });
});

//Get by id from RSVP table
rsvpRouter.get("/api/rsvps/:id", (req: Request, res: Response) => {
  //console.log("Line 149", req.query);
  RSVP.findAll({
    where: { eventId: req.query.eventId, userId: req.query.userId },
  })
    .then((data: []) => {
      // console.log("LINE 228 ALL THE RESPONSES FROM RSVP", data);
      res.status(200).send(data);
    })
    .catch((err: string) => {
      console.log("FAILED REQUEST", err);
      res.sendStatus(500);
    });
});
//Get by id from RSVP table
rsvpRouter.get("/api/rsvps/total/:eventId", (req: Request, res: Response) => {
  //console.log("Query object in the request", req.query);
  RSVP.findAll({
    where: { eventId: req.query.eventId },
  })
    .then((data: []) => {
      // console.log("LINE 140 ALL THE RESPONSES FROM RSVP", data.length);
      res.send(data);
    })
    .catch((err: string) => {
      console.log("FAILED REQUEST", err);
      res.sendStatus(500);
    });
});
// Export Router
export default rsvpRouter;
