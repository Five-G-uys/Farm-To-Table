import { Router } from 'express';
// import { Farms } from '../db/models';

const farmRouter: Router = Router();

farmRouter.get('/api/farms', (req, res) => {
  Farms.findAll()
    .then((data: any) => {
      // console.log('this is the data from the farm api call', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
    });
});

export default farmRouter;
