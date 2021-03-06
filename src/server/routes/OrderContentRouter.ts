// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';
import { Op, or } from 'sequelize';

// Import Models
import { Orders, OrderContents } from '../db/models';
// Set Up Router
const orderContentRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE OrderContent ROUTE
orderContentRouter.post(
  '/api/order-content',
  async (req: Request, res: Response, next: any) => {
    // console.log('LINE 18', req.body);
    // destructure product id array from req.body as well
    const { delivery_date, productsIds } = req.body;
    try {
      // find all orders with same delivery date
      const orders = await Orders.findAll({
        where: { delivery_date },
      });
      // console.log('LINE 26 || ORDER CONTENTS ROUTER', orders);

      if (orders.length < 1) {
        // use throw to send custom error obj to catch block and call next
        const err: any = new Error('No orders on this date');
        res.status(404);
        next(err);
        // throw err;
      }

      // logic to loop through each order and on each order loop through product id's to add
      // to order contents
      const orderContents: any = [];

      // console.log('LINE 40 ORDERCONTENTOROUTER', delivery_date, productsIds);
      for (let i = 0; i < productsIds.length; i++) {
        for (let j = 0; j < orders.length; j++) {
          const contentOBj: any = {
            orderId: orders[j].id,
            productId: Number(productsIds[i]),
          };
          // console.log('LINE 46 ORDERCONTENTOROUTER', contentOBj);
          orderContents.push(contentOBj);
        }
      }
      // console.log('LINE 50 ORDERCONTENTOROUTER', orderContents);
      await OrderContents.bulkCreate(orderContents);
      res.json({ message: 'ORDER CONTENTS ADDED' });
    } catch (err: any) {
      // err ==> {status: 404, message: 'No orders on this date'}
      console.log('LINE 55', err.message, err);
      next(err);
      // res.json(err);
    }

    // OrderContents.create({ productId, orderId })
    //   .then((data: any) => {
    //     res.status(201).send(data);
    //   })
    //   .catch((err: string) => {
    //     console.error('Post Request Failed', err);
    //     res.sendStatus(500);
    //   });
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL OrderContents ROUTE
// GET UPCOMING ORDER CONTENTS

orderContentRouter.get('/api/order-content/:upcomingOrderId', (req, res) => {
  console.log('LINE 76 || ORDER CONTENT ROUTER', req.params);

  OrderContents.findAll({
    where: { orderId: Number(req.params.upcomingOrderId) },
  })
    .then((response: any) => {
      console.log('LINE 80 || ORDER CONTENT ROUTER', response);
      // for each order content obj, I want to return the product info from each one
      response = response.map((orderContent: any) => orderContent.productId);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE OrderContents ROUTE
orderContentRouter.patch(
  '/api/order-content/:id',
  async (req: Request, res: Response) => {
    // console.log('UPDATE OrderContent REQUEST BODY: ', req.body);
    try {
      const updatedUser = await OrderContents.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      // console.log('OrderContent UPDATE INFO: ', updatedUser);
      res.status(204).json(updatedUser);
    } catch (err) {
      console.error('OrderContents UPDATE WAS NOT SUCCESSFUL: ', err);
      res.status(500).json(err);
    }
  },
);

///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE OrderContents ROUTE
orderContentRouter.delete(
  '/api/order-content/:orderContentId/:productId/:orderId/:delivery_date',
  async (req: Request, res: Response) => {
    console.log('LINE 112 || ORDER CONTENT ROUTER || DELETE', req.params);
    const { orderContentId, orderId, productId, delivery_date }: any =
      req.params;
    const orders = await Orders.findAll({
      where: { delivery_date },
      raw: true,
      nest: true,
    });
    // .map((order: any) => order.id);
    console.log(
      'LINE 120 || CONTENT ROUTER',
      orders.map((order: any) => ({ orderId: order.id })),
    );
    const orderIds: any = orders.map((order: any) => ({ orderId: order.id }));

    // try {
    //   // console.log('LINE 117');
    //   orders = await Orders.findAll({
    //     where: { delivery_date },
    //     attributes: ['id'],
    //   });
    //   console.log('LINE 121 || ORDER CONTENT ROUTER || orders', orders);
    //   return orders;
    // } catch (err) {
    //   console.error('LINE 129 || ORDER CONTENT ROUTER || ERROR', err);
    // }

    // NEED TO SEND A DELETE REQUEST THAT TARGETS ALL INSTANCES OF AN ORDER ON A CERTAIN DATE
    // NEED AN ARRAY OF ORDER CONTENT ID OBJECTS? OR ORDER OBJECTS
    // NEED TO SEND PRODUCT AND ORDER ID?
    // MIGHT BE EASIER TO ADD A DELIVERY_DATE FIELD TO THE ORDERCONTENTS TABLE DO DELETE BASED ON PRODUCTID AND DELIVERY_DATE
    // FINDALL ORDERCONTENTS AND DESTROY WHERE DELIVERY_DATE AND PRODUCT ID ARE THE SAME
    OrderContents.destroy({
      where: {
        // id: Number(orderContentId),
        [Op.or]: orderIds,
        productId: Number(productId),
      },
    })
      .then((data: any) => {
        // console.log('LINE 119 || OrderContent DELETION SUCCESSFUL: ', data);
        res.sendStatus(200);
      })
      .catch((err: any) => {
        console.error(
          'LINE 124 || OrderContent DELETION WAS NOT SUCCESSFUL: ',
          err,
        );
        res.sendStatus(400);
      });
  },
);

// Export Router
export default orderContentRouter;
