// Import Dependencies
import { Router } from 'express';
import { Request, Response } from 'express';

// Import Models
import { Users } from '../db/models';

// Set Up Router
const userRouter: Router = Router();

///////////////////////////////////////////////////////////////////////////////////////////// CREATE ONE USER ROUTE
userRouter.post('/api/users', (req, res) => {
  // console.log(req.body)
  const {
    googleId,
    name,
    email,
    streetAddress,
    cityAddress,
    stateAddress,
    zipCode,
    lat,
    lon,
    picture,
    roleId,
  } = req.body;
  Users.create({
    googleId,
    name,
    email,
    streetAddress,
    cityAddress,
    stateAddress,
    zipCode,
    lat,
    lon,
    picture,
    roleId,
  })
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// READ ALL USERs ROUTE
userRouter.get('/api/users', (req, res) => {
  Users.findAll()
    .then((response: any) => {
      // console.log('FINDALL USERS RESPONSE: ', response);
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// UPDATE ONE USER ROUTE
userRouter.patch('/api/users/:id', async (req: Request, res: Response) => {
  // console.log('UPDATE USERS REQUEST BODY: ', req);
  // console.log('UPDATE USERS REQUEST BODY: ', req.body);
  // console.log('UPDATE USERS REQUEST BODY: ', req.query);
  // console.log('UPDATE USERS REQUEST BODY: ', req.params);
  try {
    const updatedUser = await Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    // console.log('USER UPDATE INFO: ', updatedUser);
    res.status(204).json(updatedUser);
  } catch (err) {
    console.error('USER UPDATE WAS NOT SUCCESSFUL: ', err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////// DELETE ONE USER ROUTE
userRouter.delete('/api/users/:id', (req: Request, res: Response) => {
  Users.destroy({ where: req.params })
    .then((data: any) => {
      // console.log('USER DELETION SUCCESSFUL: ', data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('USER DELETION WAS NOT SUCCESSFUL: ', err);
      res.sendStatus(400);
    });
});

// Export Router
export default userRouter;
