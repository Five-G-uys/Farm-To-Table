/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Vendors } from '../db/models';

// Set Up Router
const vendorRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Vendor ROUTE
vendorRouter.post('/api/vendor', (req, res) => {
  // console.log(req.body)
  const { name, contactInformation } =
    req.body;
    Vendors.create({ name, contactInformation })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Vendor Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Vendors ROUTE
vendorRouter.get('/api/vendor', (req, res) => {
  Vendors.findAll()
    .then((response: any) => {
      console.log('FIND ALL Vendor RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('SFIND ALL Vendor ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Vendor ROUTE
vendorRouter.patch(
  '/api/vendor/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE Vendor REQUEST BODY: ', req.body);
    try {
      const updatedVendor = await Vendors.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('Vendor UPDATE INFO: ', updatedVendor);
      res.status(204).json(updatedVendor);
    } catch (err) {
      console.error('Vendor UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Vendor ROUTE
vendorRouter.delete('/api/vendor/:id', (req: Request, res: Response) => {
  Vendors.destroy({ where: req.params })
    .then((data: any) => {
      console.log("Vendor DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Vendor DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default vendorRouter;