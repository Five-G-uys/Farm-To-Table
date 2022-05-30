// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';
import { Subscriptions } from '../db/models';

// Set Up Router
const subscriptionRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE Subscription ROUTE
subscriptionRouter.post('/api/subscriptions', (req, res) => {
  let { year, flat_price, weekly_price } = req.body;
  const { season, description, start_date, end_date, thumbnail } = req.body;
  year = Number(year);
  flat_price = Number(flat_price);
  weekly_price = Number(weekly_price);

  Subscriptions.create({
    season,
    year,
    flat_price,
    weekly_price,
    description,
    start_date,
    end_date,
    thumbnail,
  })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Subscriptions Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL Subscriptions ROUTE
subscriptionRouter.get('/api/subscriptions', (req, res) => {
  Subscriptions.findAll()
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('FIND ALL SUBSCRIPTION ERROR: ', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Subscription PUT ROUTE (original from index.ts)
//Subscription Admin PUT request:
subscriptionRouter.put(
  `/api/subscriptions/:id`,
  (req: Request, res: Response) => {
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
        console.error('SUBSCRIPTION UPDATE REQUEST ERROR:', err);
      });
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE BY ID Subscription PATCH ROUTE
subscriptionRouter.patch(
  '/api/subscriptions/:id',
  async (req: Request, res: Response) => {
    try {
      const updatedSubscription = await Subscriptions.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(204).json(updatedSubscription);
    } catch (err) {
      console.error('Subscription UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  },
);

// ///////////////////////////////////////////////////////////////////////////////////////////// DELETE BY ID Subscription ROUTE (ORIGINAL from index.ts)
subscriptionRouter.delete(
  '/api/subscriptions/:subscriptionId',
  (req: Request, res: Response) => {
    Subscriptions.destroy({
      where: { id: Number(req.params.subscriptionId) },
    })
      .then((data: any) => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error('444 Deletion was not successful', err);
        res.sendStatus(400);
      });
  },
);

export default subscriptionRouter;
