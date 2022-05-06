// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-var-requires */

// // Import Dependencies
// import { Router } from 'express';
// import express, { Express, Request, Response } from 'express';

// // Import Models
// import { OrderContents } from '../db/models';

// // Set Up Router
// const orderContentRouter: Router = Router();


// ///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE OrderContent ROUTE
// orderContentRouter.post('/api/order-content', (req, res) => {
//   // console.log(req.body)
//   const { productId, orderId } =
//     req.body;
//     OrderContents.create({ productId, orderId  })
//     .then((data: any) => {
//       res.status(201).send(data);
//     })
//     .catch((err: string) => {
//       console.error('Post Request Failed', err);
//       res.sendStatus(500);
//     });
// });

// ///////////////////////////////////////////////////////////////////////////////////////////// READ ALL OrderContents ROUTE
// orderContentRouter.get('/api/order-content', (req, res) => {
//   OrderContents.findAll()
//     .then((response: any) => {
//       console.log('FINDALL USERS RESPONSE: ', response);
//       res.status(200).send(response);
//     })
//     .catch((err: object) => {
//       console.log('Something went wrong', err);
//       res.sendStatus(404);
//     });
// });

// ///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE OrderContents ROUTE
// orderContentRouter.patch(
//   '/api/order-content/:id',
//   async (req: Request, res: Response) => {
//     console.log('UPDATE OrderContent REQUEST BODY: ', req.body);
//     try {
//       const updatedUser = await OrderContents.update(req.body, {
//         where: { id: req.params.id },
//         returning: true,
//       });
//       console.log('OrderContent UPDATE INFO: ', updatedUser);
//       res.status(204).json(updatedUser);
//     } catch (err) {
//       console.error('OrderContents UPDATE WAS NOT SUCCESSFUL: ', err);
//       res.status(500).json(err);
//     }
//   }
// );

// ///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE OrderContents ROUTE
// orderContentRouter.delete('/api/order-content/:id', (req: Request, res: Response) => {
//   OrderContents.destroy({ where: req.params })
//     .then((data: any) => {
//       console.log("OrderContent DELETION SUCCESSFUL: ", data);
//       res.sendStatus(200);
//     })
//     .catch((err: any) => {
//       console.error('OrderContent DELETION WAS NOT SUCCESSFUL: ', err);
//       res.sendStatus(400);
//     });
// });

// // Export Router
// export default orderContentRouter;