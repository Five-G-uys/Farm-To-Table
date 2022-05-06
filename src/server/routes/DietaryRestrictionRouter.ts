/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { DietaryRestrictions } from '../db/models';

// Set Up Router
const dietaryRestrictionRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE DietaryRestriction ROUTE
dietaryRestrictionRouter.post('/api/dietary-restrictions', (req, res) => {
  // console.log(req.body)
  const { name, description, productsToExclude, productToExclude1, productToExclude2, productToExclude3, productToExclude4 } =
    req.body;
    DietaryRestrictions.create({ name, description, productToExclude1, productToExclude2, productToExclude3, productToExclude4 })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('DietaryRestrictions Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL DietaryRestrictions ROUTE
dietaryRestrictionRouter.get('/api/dietary-restrictions', (req, res) => {
  DietaryRestrictions.findAll()
    .then((response: any) => {
      console.log('FIND ALL DietaryRestrictions RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL DietaryRestrictions ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID DietaryRestriction ROUTE
dietaryRestrictionRouter.patch(
  '/api/dietary-restrictions/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE DietaryRestriction REQUEST BODY: ', req.body);
    try {
      const updatedDietaryRestriction = await DietaryRestrictions.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('DietaryRestriction UPDATE INFO: ', updatedDietaryRestriction);
      res.status(204).json(updatedDietaryRestriction);
    } catch (err) {
      console.error('DietaryRestriction UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID DietaryRestriction ROUTE
dietaryRestrictionRouter.delete('/api/dietary-restrictions/:id', (req: Request, res: Response) => {
  DietaryRestrictions.destroy({ where: req.params })
    .then((data: any) => {
      res.sendStatus(200);
    })
    .catch((err: any) => {
      res.sendStatus(400);
    });
});

// Export Router
export default dietaryRestrictionRouter;