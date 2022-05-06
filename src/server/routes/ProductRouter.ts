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


///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Product ROUTE (ORIGINAL FROM index.ts)
productRouter.post('/api/products', (req: Request, res: Response) => {
  const {
    img_url,
    name,
    description,
    plant_date,
    harvest_date,
    subscriptionId,
  } = req.body.product;

  // console.log('162 Request object postEvent', req.body);
  Products.create({
    name,
    description,
    img_url,
    plant_date,
    harvest_date,
    subscriptionId,
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

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Products ROUTE
productRouter.get('/api/products', (req, res) => {
  Products.findAll()
    .then((response: any) => {
      console.log('FIND ALL Products RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL Products RESPONSE: ', err);
      res.sendStatus(500);
    });
});


///////////////////////////////////////////////////////////////////////////////////////////// POST PRODUCT ROUTE
productRouter.patch('/api/products/:id', async (req: Request, res: Response) => {
  console.log('LINE 271 || UPDATE PRODUCT', req.body);

  try {
    // update product model with async query and assign the result of that promise to a variable to res.send back
    const updatedProduct = await Products.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('LINE 278 || UPDATE PRODUCT', updatedProduct);

    res.status(204).json(updatedProduct);
  } catch (err) {
    console.error('LINE 274 || UPDATE PRODUCTS', err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Role ROUTE
productRouter.delete('/api/products/:id', (req: Request, res: Response) => {
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