/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Roles } from '../db/models';

// Set Up Router
const roleRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Role ROUTE
roleRouter.post('/api/role', (req, res) => {
  // console.log(req.body)
  const { role } =
    req.body;
    Roles.create({ role })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('RSVP Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Roles ROUTE
roleRouter.get('/api/role', (req, res) => {
  Roles.findAll()
    .then((response: any) => {
      console.log('FIND ALL Roles RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL Roles RESPONSE: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Role ROUTE
roleRouter.patch('/api/role/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE Role REQUEST BODY: ', req.body);
    try {
      const updatedRole = await Roles.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('Role UPDATE INFO: ', updatedRole);
      res.status(204).json(updatedRole);
    } catch (err) {
      console.error('Role UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Role ROUTE
roleRouter.delete('/api/role/:id', (req: Request, res: Response) => {
  Roles.destroy({ where: req.params })
    .then((data: any) => {
      console.log("Role DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Role DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default roleRouter;