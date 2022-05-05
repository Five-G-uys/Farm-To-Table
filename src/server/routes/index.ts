/* eslint-disable @typescript-eslint/no-explicit-any */
import authRouter from './AuthRouter';
import eventRouter from './EventRouter'
// import farmRouter from './FarmRouter';
// import subscriptionsRouter from './SubscriptionsRouter';
import userRouter from './UserRouter';
import weatherRouter from './WeatherRouter';



/*This is where we organize the endpoints that we use to call functions in the
associated route file.*/
module.exports = (app: any) => {
  app.use('/auth', authRouter);
  app.use('/events', eventRouter);
  // app.use('/farms', farmRouter);
  // app.use('/subscriptions', subscriptionsRouter);
  app.use('/users', userRouter);
  app.use('/weather', weatherRouter);
};