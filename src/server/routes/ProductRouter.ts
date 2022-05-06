/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Import Models
import { Products } from '../db/models';

// Set Up Router
const productRouter: Router = Router();


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Product ROUTE
productRouter.post('/api/product', (req, res) => {
  // console.log(req.body)
  const { name, description, imgUrl, plantDate, harvestDate, subscriptionId } =
    req.body;
    Products.create({ name, description, imgUrl, plantDate, harvestDate, subscriptionId })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Products Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Products ROUTE
productRouter.get('/api/product', (req, res) => {
  Products.findAll()
    .then((response: any) => {
      console.log('FIND ALL Products RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL Products RESPONSE: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Product ROUTE
productRouter.patch('/api/product/:id',
  async (req: Request, res: Response) => {
    console.log('UPDATE Product REQUEST BODY: ', req.body);
    try {
      const updatedProduct = await Products.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      console.log('Product UPDATE INFO: ', updatedProduct);
      res.status(204).json(updatedProduct);
    } catch (err) {
      console.error('Product UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Role ROUTE
productRouter.delete('/api/product/:id', (req: Request, res: Response) => {
  Products.destroy({ where: req.params })
    .then((data: any) => {
      console.log("Products DELETION SUCCESSFUL: ", data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Products DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default productRouter;