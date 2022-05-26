// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';

// Import Models
import { DeliveryZones } from '../db/models';

// Set Up Router
const deliveryZonesRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE USER ROUTE
deliveryZonesRouter.post('/api/delivery-zones', (req, res) => {
  // console.log(req.body)
  const { name, description, zipCodes } = req.body;
  DeliveryZones.create({ name, description, zipCodes })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL USERs ROUTE
deliveryZonesRouter.get('/api/delivery-zones', (req, res) => {
  DeliveryZones.findAll()
    .then((response: any) => {
      // console.log('FIND ALL DeliveryZones RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.error('FIND ALL DeliveryZones ERROR: ', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE USER ROUTE
deliveryZonesRouter.patch(
  '/api/delivery-zones/:id',
  async (req: Request, res: Response) => {
    // console.log('UPDATE USERS REQUEST BODY: ', req.body);
    try {
      const updatedDeliveryZones = await DeliveryZones.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      // console.log('DeliveryZones UPDATE INFO: ', updatedDeliveryZones);
      res.status(204).json(updatedDeliveryZones);
    } catch (err) {
      console.error('DeliveryZones UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE USER ROUTE
deliveryZonesRouter.delete(
  '/api/delivery-zones/:id',
  (req: Request, res: Response) => {
    DeliveryZones.destroy({ where: req.params })
      .then((data: any) => {
        // console.log('DeliveryZones DELETION SUCCESSFUL: ', data);
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error('DeliveryZones DELETION WAS NOT SUCCESSFUL: ', err);
        res.sendStatus(400);
      });
  }
);

// Export Router
export default deliveryZonesRouter;
