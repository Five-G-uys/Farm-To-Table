// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';

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
    quantity,
    // plant_date,
    harvest_dates,
    // subscriptionId,
    available,
  } = req.body.product;

  console.log('LINE 28 || PRODUCT ROUTER || POST', req.body);
  Products.create({
    name,
    description,
    quantity,
    img_url,
    // plant_date,
    harvest_dates,
    // subscriptionId,
    available,
  })
    .then((data: any) => {
      console.log('LINE 40 || Product Post Request', data);
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
      res.status(200).send(response);
    })
    .catch((err: object) => {
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// PATCH PRODUCT ROUTE
productRouter.get('/api/availableProducts', (req, res) => {
  Products.findAll({ where: { available: true } })
    .then((response: any) => {
      // console.log('LINE 66 || GET AVAILABLE PRODUCTS: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('LINE 70 || FIND ALL Products ERROR: ', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// PATCH PRODUCT ROUTE
productRouter.patch(
  '/api/products/:id',
  async (req: Request, res: Response) => {
    // console.log('LINE 79 || UPDATE PRODUCT', req.body);

    try {
      // update product model with async query and assign the result of that promise to a variable to res.send back
      const updatedProduct = await Products.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.status(204).json(updatedProduct);
    } catch (err) {
      console.error('LINE 91 || UPDATE PRODUCTS', err);
      res.status(500).json(err);
    }
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID
productRouter.delete('/api/products/:id', (req: Request, res: Response) => {
  // console.log('LINE 99', req);
  Products.destroy({ where: req.params })
    .then((data: any) => {
      console.log('Products DELETION SUCCESSFUL: ', data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('Products DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default productRouter;
